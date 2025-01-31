import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import CategoriaController from "../controller/CategoriaController";
import { CategoriaService } from "../services/CategoriaServices";
 


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o categoriaService e passando o prisma para o repositório
const categoriaService = new CategoriaService(prisma);

// Agora passamos o categoriaService para o categoriaController
const categoriaController = new CategoriaController(categoriaService);

// Criando o roteador
const categoriaRoutes = Router();

categoriaController.getAll
// Definindo a rota para buscar todos os usuários
categoriaRoutes.get('/', async (req, res) => {
    await categoriaController.getAll(req, res)
});
categoriaRoutes.post('/', async (req, res) => {
    await categoriaController.create(req, res)
});
categoriaRoutes.get('/:id', async (req, res) => {
    await categoriaController.getById(req, res)
});
categoriaRoutes.delete('/:id', async (req, res) => {
    await categoriaController.delete(req, res)
});

categoriaRoutes.patch('/:id', async (req, res) => {
    await categoriaController.update(req, res)
});


export { categoriaRoutes };

