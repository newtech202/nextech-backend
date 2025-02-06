import { Despesa, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { DespesaMotivoService } from "../../despesaMotivo/services/DespesaMotivoServices";
import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { FornecedorService } from "../../forncedores/services/FornecedorServices";
import { UsuarioService } from "../../user/services/UsuarioServices";
import { ActualizarDespesaDTO } from "../DTO/actualizarFornecedorDTO";
import { CriarDespesaDTO } from "../DTO/criarDespesaDTO";
import { DespesaService } from "../services/DespesaServices";


class DespesaController extends BaseController<Despesa> {

    private despesaService: DespesaService
    protected prisma = new PrismaClient()

    constructor(despesaService: DespesaService) {
        super(despesaService, CriarDespesaDTO, ActualizarDespesaDTO)
        this.despesaService = despesaService;
    }

    async create(req: Request, res: Response) {
        const empresaService = new EmpresaService(this.prisma);
        const despesaMotivoService = new DespesaMotivoService(this.prisma);
        const fornecedorService = new FornecedorService(this.prisma);
        const usuarioService = new UsuarioService(this.prisma)

        const { nome, comprovativo, criadoPorId, empresaId, fornecedorId, motivoId, retencaoFonte, valor } = req.body;
        const despesa = await this.despesaService.create({
            nome,
            comprovativo,
            criadoPorId,
            empresaId,
            fornecedorId,
            motivoId,
            retencaoFonte,
            valor
        },
            empresaService,
            fornecedorService,
            despesaMotivoService,
            usuarioService);
        return res.status(201).json(despesa); // Retorna a despesa criada
    }

    async listarPorEmpresaId(req: Request, res: Response) {
        const { empresaId } = req.params;

        const despesaes = await this.despesaService.listByEmpresaId(Number(empresaId), req.query);
        return res.status(200).json(despesaes);
    }


}

export default DespesaController;  // Exportação padrão
