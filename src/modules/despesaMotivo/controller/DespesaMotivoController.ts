import { DespesaMotivo } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { ActualizarDespesaMotivoDTO } from "../DTO/actualizarDespesaMotivoDTO";
import { CriarDespesaMotivoDTO } from "../DTO/criarDespesaMotivolDTO";
import { DespesaMotivoService } from "../services/DespesaMotivoServices";


class DespesaMotivoController extends BaseController<DespesaMotivo> {
    private despesaMotivoService: DespesaMotivoService;

    constructor(despesaMotivoService: DespesaMotivoService) {
        super(despesaMotivoService, CriarDespesaMotivoDTO, ActualizarDespesaMotivoDTO);
        this.despesaMotivoService = despesaMotivoService; // Usando a instância fornecida
    }

    async create(req: Request, res: Response) {
        const { motivo } = req.body;
        const DespesaMotivo = await this.despesaMotivoService.create({ motivo });
        return res.status(201).json(DespesaMotivo); // Retorna o DespesaMotivo criado

    }
}

export default DespesaMotivoController;
