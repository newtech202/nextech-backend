import { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
  statusCode?: number;
}

export const ErrorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Erro Interno!";

  res.status(statusCode).json({
    message,
    statusCode,
  });
};
