import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import PerfilController from "../controller/PerfilController";
import { PerfilService } from "../services/PerfilServices";


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o PerfilService e passando o prisma para o repositório
const perfilService = new PerfilService(prisma);

// Agora passamos o PerfilService para o perfilController
const perfilController = new PerfilController(perfilService);

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

perfilRoutes.patch('/:id', async (req, res) => {
    await perfilController.update(req, res)
});


export { perfilRoutes };

