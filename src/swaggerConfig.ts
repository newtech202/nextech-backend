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
        ? 
        "https://api.nextech.com/v1/":"http://localhost:4400/v1/" // URL base da API em desenvolvimento, // URL base da API em produção (exemplo)
      },
    ],
  },
  apis:
   [
    "./src/routes/**/*.ts", // Rotas gerais
    "./src/modules/**/routes/*.ts"
  ] // Rotas dentro dos módulos// Caminho dos arquivos que contêm as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
