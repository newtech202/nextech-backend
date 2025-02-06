import { Categoria, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { ActualizarCategoriaDTO } from "../DTO/actualizarCategoriaDTO";
import { CriarCategoriaDTO } from "../DTO/criarCategoriaDTO";
import { CategoriaService } from "../services/CategoriaServices";


class CategoriaController extends BaseController<Categoria> {
    private categoriaService: CategoriaService;

    constructor(categoriaService: CategoriaService) {
        super(categoriaService, CriarCategoriaDTO, ActualizarCategoriaDTO);
        this.categoriaService = categoriaService; // Usando a instância fornecida
    }

    async create(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const empresaService = new EmpresaService(prisma);
        const { nome, descricao, empresaId } = req.body;

        const categoria = await this.categoriaService.create({ nome, descricao, empresaId }, empresaService);
        return res.status(201).json(categoria); // Retorna o categoria criado

    }
}

export default CategoriaController;
