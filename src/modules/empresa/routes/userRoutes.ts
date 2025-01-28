import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import UserController from "../controller/EmpresaController";
import { UserService } from "../services/EmpresaServices";

// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o UserService e passando o prisma para o repositório
const userService = new UserService(prisma);

// Agora passamos o UserService para o UserController
const userController = new UserController(userService);

// Criando o roteador
const userRoutes = Router();
userController.getAll
// Definindo a rota para buscar todos os usuários
userRoutes.get('/', async (req, res) => {
    await userController.getAll(req, res)
});
userRoutes.get('/:id', async (req, res) => {
    await userController.getById(req, res)
});
userRoutes.delete('/:id', async (req, res) => {
    await userController.delete(req, res)
});

userRoutes.patch('/:id', async (req, res) => {
    await userController.update(req, res)
});


export { userRoutes };

