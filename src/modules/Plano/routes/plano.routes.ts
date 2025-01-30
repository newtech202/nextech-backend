import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import PlanoController from "../controller/PlanoController";
import { PlanoService } from "../services/PlanoServices";
 


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o PlanoService e passando o prisma para o repositório
const planoService = new PlanoService(prisma);

// Agora passamos o PlanoService para o planoController
const planoController = new PlanoController(planoService);

// Criando o roteador
const planoRoutes = Router();

planoController.getAll
// Definindo a rota para buscar todos os usuários
planoRoutes.get('/', async (req, res) => {
    await planoController.getAll(req, res)
});
planoRoutes.post('/', async (req, res) => {
    await planoController.create(req, res)
});
planoRoutes.get('/:id', async (req, res) => {
    await planoController.getById(req, res)
});
planoRoutes.delete('/:id', async (req, res) => {
    await planoController.delete(req, res)
});

planoRoutes.patch('/:id', async (req, res) => {
    await planoController.update(req, res)
});


export { planoRoutes };

