import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import EmpresaController from "../controller/EmpresaController";
import { EmpresaService } from "../services/EmpresaServices";


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o empresaService e passando o prisma para o repositório
const empresaService = new EmpresaService(prisma);

// Agora passamos o empresaService para o empresaController
const empresaController = new EmpresaController(empresaService);

// Criando o roteador
const empresaRoutes = Router();

empresaRoutes.post('/', async (req, res) => {
    await empresaController.create(req, res)
});

empresaRoutes.get('/', async (req, res) => {
    await empresaController.getAll(req, res)
});
empresaRoutes.get('/:id', async (req, res) => {
    await empresaController.getById(req, res)
});
empresaRoutes.delete('/:id', async (req, res) => {
    await empresaController.delete(req, res)
});

empresaRoutes.patch('/:id', async (req, res) => {
    await empresaController.update(req, res)
});


export { empresaRoutes };

