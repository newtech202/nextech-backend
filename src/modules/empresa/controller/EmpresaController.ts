import { Empresa, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { PlanoService } from "../../Plano/services/PlanoServices";
import { ActualizarEmpresaDTO } from "../DTO/actualizarEmpresaDTO";
import { CriarEmpresaDTO } from "../DTO/criarEmpresaDTO";
import { EmpresaService } from "../services/EmpresaServices";


class EmpresaController extends BaseController<Empresa> {

    private empresaService: EmpresaService
    protected prisma = new PrismaClient()

    constructor(empresaService: EmpresaService) {
        super(empresaService, CriarEmpresaDTO, ActualizarEmpresaDTO)
        this.empresaService = empresaService;
    }

    async create(req: Request, res: Response) {

        const { nome, email, nif, telefone, endereco, regimeIvaId, logoURL, planoId } = req.body;
        const planoService = new PlanoService(this.prisma); // Create an instance of PlanoService
        const empresa = await this.empresaService.create({
            nome, email, nif, endereco, telefone, regimeIvaId, logoURL,
            planoId

        },
            planoService);
        return res.status(201).json(empresa); // Retorna a empresa criada
    }

}

export default EmpresaController;  // Exportação padrão
