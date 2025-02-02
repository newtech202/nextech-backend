import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import DespesaMotivoController from "../controller/DespesaMotivoController";
import { DespesaMotivoService } from "../services/DespesaMotivoServices";


// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o despesaMotivoService e passando o prisma para o repositório
const despesaMotivoService = new DespesaMotivoService(prisma);

// Agora passamos o despesaMotivoService para o despesaMotivoController
const despesaMotivoController = new DespesaMotivoController(despesaMotivoService);

// Criando o roteador
const despesaMotivoRoutes = Router();

despesaMotivoController.getAll
// Definindo a rota para buscar todos os usuários
despesaMotivoRoutes.get('/', async (req, res) => {
    await despesaMotivoController.getAll(req, res)
});
despesaMotivoRoutes.post('/', async (req, res) => {
    await despesaMotivoController.create(req, res)
});
despesaMotivoRoutes.get('/:id', async (req, res) => {
    await despesaMotivoController.getById(req, res)
});
despesaMotivoRoutes.delete('/:id', async (req, res) => {
    await despesaMotivoController.delete(req, res)
});

despesaMotivoRoutes.patch('/:id', async (req, res) => {
    await despesaMotivoController.update(req, res)
});


export { despesaMotivoRoutes };

