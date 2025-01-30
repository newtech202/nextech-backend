import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import FornecedorController from "../controller/FornecedorController";
import { FornecedorService } from "../services/FornecedorServices";



// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o FornecedorService e passando o prisma para o repositório
const fornecedorService = new FornecedorService(prisma);

// Agora passamos o FornecedorService para o FornecedorController
const fornecedorController = new FornecedorController(fornecedorService);

// Criando o roteador
const fornecedorRoutes = Router();

fornecedorRoutes.post('/', async (req, res) => {
    await fornecedorController.create(req, res)
});

fornecedorRoutes.get('/', async (req, res) => {
    await fornecedorController.getAll(req, res)
});
fornecedorRoutes.get('/:id', async (req, res) => {
    await fornecedorController.getById(req, res)
});
fornecedorRoutes.delete('/:id', async (req, res) => {
    await fornecedorController.delete(req, res)
});

fornecedorRoutes.patch('/:id', async (req, res) => {
    await fornecedorController.update(req, res)
});

fornecedorRoutes.get('/companies/:empresaId', async (req, res) => {
    await fornecedorController.listarPorEmpresaId(req, res)
});


export { fornecedorRoutes };

