import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import TipoDeClienteController from "../controller/TipoDeCliente.Controller";
import { TipoDeClienteService } from "../services/TipoDeClienteServices";
 

// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o PerfilService e passando o prisma para o repositório
const tipoDeClienteService = new TipoDeClienteService(prisma);

// Agora passamos o PerfilService para o perfilController
const perfilController = new TipoDeClienteController(tipoDeClienteService);

// Criando o roteador
const perfilRoutes = Router();

perfilController.getAll
// Definindo a rota para buscar todos os usuários
perfilRoutes.get('/', async (req, res) => {
    await perfilController.getAll(req, res)
});
perfilRoutes.post('/', async (req, res) => {
    await perfilController.create(req, res)
});
perfilRoutes.get('/:id', async (req, res) => {
    await perfilController.getById(req, res)
});
perfilRoutes.delete('/:id', async (req, res) => {
    await perfilController.delete(req, res)
});


export { perfilRoutes };

