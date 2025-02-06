import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import DespesaController from "../controller/DespesaController";
import { DespesaService } from "../services/DespesaServices";
 



// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o despesaService e passando o prisma para o repositório
const despesaService = new DespesaService(prisma);

// Agora passamos o despesaService para o despesaController
const despesaController = new DespesaController(despesaService);

// Criando o roteador
const despesaRoutes = Router();

despesaRoutes.post('/', async (req, res) => {
    await despesaController.create(req, res)
});

despesaRoutes.get('/', async (req, res) => {
    await despesaController.getAll(req, res)
});
despesaRoutes.get('/:id', async (req, res) => {
    await despesaController.getById(req, res)
});
despesaRoutes.delete('/:id', async (req, res) => {
    await despesaController.delete(req, res)
});

despesaRoutes.patch('/:id', async (req, res) => {
    await despesaController.update(req, res)
});

despesaRoutes.get('/companies/:empresaId', async (req, res) => {
    await despesaController.listarPorEmpresaId(req, res)
});


export { despesaRoutes };

