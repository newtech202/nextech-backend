import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../../../config/auth";
import '../../../config/yup';
import { UnauthorizedError } from "../../../core/helpers/api.errors";
import { validateData } from "../../../core/helpers/validate-data.dtos";
import { CreateUserDTO } from "../../user/DTO/createUserDTO";
import { UserService } from "../../user/services/UserServices";
import { SigninDTO } from "../DTO/SiginDTO";
// Definindo a interface para o usuário
interface User {
  id: number;
  role: object | string;
  name: string;
  email: string

}

// Definindo a interface para o corpo da requisição
interface LoginRequestBody {
  email: string;
  password: string;
}

const prisma = new PrismaClient()
const userService = new UserService(prisma)
class AuthController {

  async sigup(req: Request, res: Response): Promise<Response> {
    await validateData(req.body, CreateUserDTO);
    const { email, password, name } = req.body;
    const prisma = new PrismaClient()
    const userService = new UserService(prisma)

    const newUSer = await userService.create({ email, password, name });

    return res.status(201).json(newUSer);

  }

  async sigin(req: Request, res: Response): Promise<Response> {

    // Validação do corpo da requisição
    await validateData(req.body, SigninDTO)

    const { email, password } = req.body;

    // validar as credenciais
    const userValid = await userService.validateLogin(email, password);

    if (!userValid) {
      throw new UnauthorizedError("usuarios ou password incorrectos!")
    }

    const { id, name } = await userService.getByEmail(email)

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id,
        email,
        name
      },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );

    // Retorna a resposta com os dados do usuário e o token
    return res.status(200).json({
     token
    });
  }
}

export default AuthController;
