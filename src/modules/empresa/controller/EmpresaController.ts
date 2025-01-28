import { Empresa, PrismaClient } from "@prisma/client";
import { BaseController } from "../../../core/controllers/base.controller";
import { CriarEmpresaDTO } from "../DTO/criarEmpresaDTO";

import { Request, Response } from "express";
import { UsuarioService } from "../../user/services/UsuarioServices";
import { ActualizarEmpresaDTO } from "../DTO/actualizarEmpresaDTO";
import { EmpresaService } from "../services/EmpresaServices";


class EmpresaController extends BaseController<Empresa> {

    private empresaService: EmpresaService
    protected prisma = new PrismaClient()
    private proprietarioService = new UsuarioService(this.prisma)

    constructor(empresaService: EmpresaService) {
        super(empresaService, CriarEmpresaDTO, ActualizarEmpresaDTO)
        this.empresaService = empresaService;
    }

    async create(req: Request, res: Response) {

        const { nome, email, telefone, nif, endereco, proprietarioId } = req.body;
        const empresa = await this.empresaService.create({
            nome,
            email,
            telefone,
            nif,
            endereco,
            proprietarioId
        },
            this.proprietarioService);
        return res.status(201).json(empresa); // Retorna a empresa criada
    }

}

export default EmpresaController;  // Exportação padrão
