import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../../../config/auth";
import '../../../config/yup';
import { UnauthorizedError } from "../../../core/helpers/api.errors";
import { validateData } from "../../../core/helpers/validate-data.dtos";

import { PerfilService } from "../../perfil/services/PerfilServices";
import { CriarUsuarioDTO } from "../../user/DTO/criarUsuarioDTO";
import { UsuarioService } from "../../user/services/UsuarioServices";
import { SigninDTO } from "../DTO/SiginDTO";
// Definindo a interface para o usuário
interface IUsuario {
  id: number;
  perfilId: object | string;
  nome: string;
  email: string;
  senha: string;
  empresaid: number;


}

// Definindo a interface para o corpo da requisição
interface ILoginRequestBody {
  email: string;
  senha: string;
}

const prisma = new PrismaClient()
const usuarioService = new UsuarioService(prisma)
class AuthController {

  async signup(req: Request, res: Response): Promise<Response> {
    await validateData(req.body, CriarUsuarioDTO);
    const { email, senha, nome, perfilId, empresaId } = req.body;
    const prisma = new PrismaClient()
    const usuarioService = new UsuarioService(prisma)
    const perfilService = new PerfilService(prisma)

    const novoUsuario = await usuarioService.createOnSignup(
      {
        email,
        senha,
        nome,
        perfilId,
      }, perfilService);

    return res.status(201).json(novoUsuario);

  }

  async sigin(req: Request, res: Response): Promise<Response> {

    // Validação do corpo da requisição
    await validateData(req.body, SigninDTO)

    const { email, senha } = req.body;

    // validar as credenciais
    const userValid = await usuarioService.validateLogin(email, senha);

    if (!userValid) {
      throw new UnauthorizedError("usuarios ou senha incorrectos!")
    }

    const { id, nome, perfilId, empresaId } = await usuarioService.getByEmail(email)

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id,
        email,
        nome,
        perfilId,
        empresaId,
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
