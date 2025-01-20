import "dotenv/config";
import { createServer } from "http";
import app from "./app";

const PORT = parseInt(process.env.PORT || "4400", 10);
if (isNaN(PORT)) {
  console.error("❌ A porta especificada não é válida.");
  process.exit(1);
}

const server = createServer(app);

server.listen(PORT, () =>
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`)
);

["uncaughtException", "unhandledRejection"].forEach((event) => {
  process.on(event, (err) => {
    console.error(
      `🚨 Algo deu errado!\nEvento: ${event}\nErro: ${err.stack || err}`
    );
  });
});

process.on("SIGINT", () => {
  console.log("🛑 Encerrando o servidor...");
  server.close(() => {
    console.log("🔌 Servidor encerrado com sucesso.");
    process.exit(0);
  });
});
