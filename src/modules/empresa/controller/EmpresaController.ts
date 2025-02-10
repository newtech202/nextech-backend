import { Empresa, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import session from "express-session";
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
        const proprietarioId = Number(req.session?.id);

        const { nome, email, nif, telefone, endereco, regimeIvaId, logoURL, planoId } = req.body;
        const planoService = new PlanoService(this.prisma); // Create an instance of PlanoService
        const empresa = await this.empresaService.create({
            nome, email, nif, endereco, telefone, regimeIvaId, logoURL,
            planoId,
            proprietarioId

        },
            planoService);
        return res.status(201).json(empresa); // Retorna a empresa criada
    }

    async findExpensesByCompanyId(req: Request, res: Response) {
        (req as Request & { session: session.Session }).session
        const userId = req.session?.id 

        return res.status(200).json({ userId });
    }
}

export default EmpresaController;  // Exportação padrão
