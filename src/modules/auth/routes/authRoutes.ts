import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express"; // Importando Request e Response explicitamente
import AuthController from "../controller.ts/AuthController";

// Criando uma instância do PrismaClient
const prisma = new PrismaClient();

// Criando o roteador
const authRoutes = Router();

const authController = new AuthController()
// Definindo a rota para buscar todos os usuários
authRoutes.post('/signin',async (req: Request, res: Response)=> {await authController.sigin(req, res)  });
authRoutes.post('/signup',async (req: Request, res: Response)=> {await authController.signup(req, res)  });



export { authRoutes };

