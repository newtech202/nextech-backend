import { Cliente, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import session from "express-session";
import { BaseController } from "../../../core/controllers/base.controller";
import { PlanoService } from "../../Plano/services/PlanoServices";

import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { ActualizarClienteDTO } from "../DTO/actualizarClienteDTO";
import { CriarClienteDTO } from "../DTO/criarClienteDTO";
import { ClienteService } from "../services/ClienteServices";


class ClienteController extends BaseController<Cliente> {

    private ClienteService: ClienteService
    protected prisma = new PrismaClient()
    constructor(ClienteService: ClienteService) {
        super(ClienteService, CriarClienteDTO, ActualizarClienteDTO)
        this.ClienteService = ClienteService;
    }

    async create(req: Request, res: Response) {
        const empresaId = (req.session as any).empresaId;
    
        const empresaService = new EmpresaService(this.prisma);
        const { nome, email, nif, telefone, endereco, regimeIvaId, logoUrl, planoId } = req.body;
        const planoService = new PlanoService(this.prisma); // Create an instance of PlanoService
        const Cliente = await this.ClienteService.create({
            nome,
            email,
            nif,
            telefone,
            endereco,
            logoUrl,
            empresaId,
            tipoId: 0,
            registadoPor: (req.session as any).nome
        }, empresaService);
        return res.status(201).json(Cliente); // Retorna a Cliente criada
    }

    async findExpensesByCompanyId(req: Request, res: Response) {
        (req as Request & { session: session.Session }).session
        const userId = req.session?.id

        return res.status(200).json({ userId });
    }
}

export default ClienteController;  // Exportação padrão
