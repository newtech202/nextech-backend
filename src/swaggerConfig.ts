import swaggerJsDoc, { Options } from "swagger-jsdoc";

// Verificando o ambiente (ex: 'development', 'production')
const isDevelopment = process.env.NODE_ENV === "development";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da API NexTech",
      version: "1.0.0",
      description: "Documentação da API NexTech",
    },
    servers: [
      {
        url: isDevelopment
          ? "http://localhost:4400" // URL base da API em desenvolvimento
          : "https://api.nextech.com", // URL base da API em produção (exemplo)
      },
    ],
  },
  apis: ["./src/routes/**/*.ts"], // Caminho dos arquivos que contêm as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
