import { PrismaClient } from "@prisma/client";
import { Router } from "express"; // Importando Request e Response explicitamente
import ensureEmpresaIsSetupped from "../../../middlewares/ensureEmpresaIsSetupped.middleware";
import ClienteController from "../controller/ClienteController";
import { ClienteService } from "../services/ClienteServices";



// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Instanciando o ClienteService e passando o prisma para o repositório
const clienteService = new ClienteService(prisma);

// Agora passamos o ClienteService para o ClienteController
const clienteController = new ClienteController(clienteService);

// Criando o roteador
const clienteRoutes = Router();

clienteRoutes.post('/', ensureEmpresaIsSetupped, async (req, res) => {
    await clienteController.create(req, res)
});

clienteRoutes.get('/', async (req, res) => {
    await clienteController.getAll(req, res)
});
clienteRoutes.get('/:id', async (req, res) => {
    await clienteController.getById(req, res)
});
clienteRoutes.delete('/:id', async (req, res) => {
    await clienteController.delete(req, res)
});

clienteRoutes.patch('/:id', async (req, res) => {
    await clienteController.update(req, res)
});

export { clienteRoutes };

