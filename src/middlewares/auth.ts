import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { UserSession } from "../@types/express/session";

// Definindo a tipagem para a sessão
interface Session {
  id: string;
  role: string;
  name: string;
  email: string;
}

// Middleware para autenticação JWT
export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização existe
  if (!authHeader) {
    return res
      .status(401)
      .json({ erro: "você precisa iniciar sessão!", status: 1234 });
  }

  // Extrai o token do cabeçalho Authorization
  const [, token] = authHeader.split(" ");

  try {
    // Decodifica o token JWT de forma assíncrona
    const decoded: unknown = await promisify(jwt.verify)(
      token,
    );

    // Tipando os dados decodificados do token
    const userSession: UserSession = decoded as UserSession

    // Atribui os dados da sessão ao objeto req.sessao
    req.session = userSession


    return next();
  } catch (error) {
    return res.status(401).json({ error, authHeader });
  }
};
