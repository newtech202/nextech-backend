import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import TipoDeClienteController from "../controller/TipoDeCliente.Controller";
import { TipoDeClienteService } from "../services/TipoDeClienteServices";


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o PerfilService e passando o prisma para o repositório
const tipoDeClienteService = new TipoDeClienteService(prisma);
const tipoDeClienteController = new TipoDeClienteController(tipoDeClienteService);

// Criando o roteador
const tipoDeClienteRoutes = Router();


// Definindo a rota para buscar todos os usuários
tipoDeClienteRoutes.get('/', async (req, res) => {
    await tipoDeClienteController.getAll(req, res)
});
tipoDeClienteRoutes.post('/', async (req, res) => {
    await tipoDeClienteController.create(req, res)
});
tipoDeClienteRoutes.get('/:id', async (req, res) => {
    await tipoDeClienteController.getById(req, res)
});
tipoDeClienteRoutes.delete('/:id', async (req, res) => {
    await tipoDeClienteController.delete(req, res)
});


export { tipoDeClienteRoutes };

