import { Fornecedor, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { ActualizarFornecedorDTO } from "../DTO/actualizarFornecedorDTO";
import { CriarFornecedorDTO } from "../DTO/criarDespesaDTO";
import { FornecedorService } from "../services/FornecedorServices";


class FornecedorController extends BaseController<Fornecedor> {

    private fornecedorService: FornecedorService
    protected prisma = new PrismaClient()

    constructor(fornecedorService: FornecedorService) {
        super(fornecedorService, CriarFornecedorDTO, ActualizarFornecedorDTO)
        this.fornecedorService = fornecedorService;
    }

    async create(req: Request, res: Response) {
        const empresaService = new EmpresaService(this.prisma);

        const { nome, email, nif, endereco, empresaId, telefone, logo } = req.body;
        const fornecedor = await this.fornecedorService.create({
            nome, email, nif, endereco, empresaId, telefone, logo
        }, empresaService);


        return res.status(201).json(fornecedor); // Retorna a Fornecedor criada
    }

    async listarPorEmpresaId(req: Request, res: Response) {
        const { empresaId } = req.params;

        const fornecedores = await this.fornecedorService.listByEmpresaId(Number(empresaId), req.query);
        return res.status(200).json(fornecedores);
    }


}

export default FornecedorController;  // Exportação padrão
