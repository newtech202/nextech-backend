import { TipoDeCliente } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { ActualizarTipoDeClienteDTO } from "../DTO/actualizarTipoDeClienteDTO";
import { CriarTipoDeClienteDTO } from "../DTO/criarTipoDeClienteDTO";
import { TipoDeClienteService } from "../services/TipoDeClienteServices";

class TipoDeClienteController extends BaseController<TipoDeCliente> {
    private tipoDeClienteService: TipoDeClienteService;

    constructor(tipoDeClienteService: TipoDeClienteService) {
        super(tipoDeClienteService, CriarTipoDeClienteDTO, ActualizarTipoDeClienteDTO);
        this.tipoDeClienteService = tipoDeClienteService; // Usando a instância fornecida
    }

    async create(req: Request, res: Response) {

        const { tipo } = req.body;
        const tipoDeCliente = await this.tipoDeClienteService.create({ tipo, });
        return res.status(201).json(tipoDeCliente); // Retorna o TipoDeCliente criado

    }
}

export default TipoDeClienteController;
