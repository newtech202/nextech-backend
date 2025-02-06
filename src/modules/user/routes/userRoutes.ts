import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import UserController from "../controller/UsuarioController";
import { UsuarioService } from "../services/UsuarioServices";


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o UsuarioService e passando o prisma para o repositório
const usuarioService = new UsuarioService(prisma);

// Agora passamos o UsuarioService para o UserController
const userController = new UserController(usuarioService);

// Criando o roteador
const userRoutes = Router();
 /**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todas os usuarios
 *     description: Retorna uma lista de todas as empresas cadastradas.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de empresas retornada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
// Definindo a rota para buscar todos os usuários
userRoutes.get('/', async (req, res) => {
    await userController.getAll(req, res)
});

userRoutes.post('/', async (req, res) => {
    await userController.create(req, res)
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

