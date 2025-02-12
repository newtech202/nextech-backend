import { Cliente, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import session from "express-session";
import { BaseController } from "../../../core/controllers/base.controller";
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
        const registadoPor = (req.session as any).nome;
        const empresaService = new EmpresaService(this.prisma);
        const { nome, email, nif, telefone, endereco, logoUrl, tipoId } = req.body;
        const cliente = await this.ClienteService.create({
            nome,
            email,
            nif,
            telefone,
            endereco,
            logoUrl,
            empresaId,
            tipoId,
            registadoPor
        }, empresaService);
        return res.status(201).json(cliente); // Retorna o Cliente criada
    }

    async findCompanyId(req: Request, res: Response) {
        (req as Request & { session: session.Session }).session
        const empresaId = req.session
        const clientes = this.service.getOneBy({ empresaId })

        return res.status(200).json(clientes);
    }
}

export default ClienteController;  // Exportação padrão
