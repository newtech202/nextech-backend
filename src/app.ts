import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import 'express-async-errors';
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swaggerConfig";


import { ErrorMiddleware } from "./middlewares/error.middleware";
import { routes } from "./routes/routes.index";

const isDevelopment = process.env.NODE_ENV === "DEVELOPMENT";
class App {
    public server: Express;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionError();
        this.setupSwagger()
    }

    private middlewares(): void {
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
        this.server.use(cors({
            origin: "*", // Substitua por origens confiáveis no ambiente de produção
            allowedHeaders: "*",
            exposedHeaders: [],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        }));

        const UPLOAD_DIR = path.resolve(__dirname, "..", "temp", "upload");
        const PUBLIC_DIR = path.resolve(__dirname, "..", "public");

        this.server.use("/files", express.static(UPLOAD_DIR));
        this.server.use("/public", express.static(PUBLIC_DIR));
    }
    setupSwagger() {
        this.server.use(
            "/V1/api-docs", // URL para acessar a documentação
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocs)
        );
        console.log(`📚 Swagger disponível em ${isDevelopment ?  "https://api.nextech/v1/api-docs":"http://localhost:4400/v1/api-docs"}`);
    }

    private routes(): void {
        this.server.use("/v1", routes);
    }
    private exceptionError(): void {
        this.server.use(ErrorMiddleware);
    }
}

export default new App().server;
