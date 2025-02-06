import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import auth from "../config/auth";
 
 declare module "express-serve-static-core" {
  interface Request {
    session?: Session;
  }
}
// Definindo a tipagem para a sessão
interface Session {
  id: string;
  role: string;
  nome: string;
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
    // Verifica se a chave secreta está disponível
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({ erro: "Chave secreta não configurada!" });
    }
    // Decodifica o token JWT de forma assíncrona
    const decoded = await jwt.verify(token, auth.secret) as Session;

    // Tipando os dados decodificados do token
    const userSession: Session = decoded;

    // Atribui os dados da sessão ao objeto req.sessao
    req.session = userSession;
    console.log(userSession);
    


    return next();
  } catch (error) {
    return res.status(401).json({ error, authHeader });
  }
};
