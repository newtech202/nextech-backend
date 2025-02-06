import { Plano, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { ActualizarPlanolDTO } from "../DTO/actualizarPlanoDTO";
import { CriarPlanoDTO } from "../DTO/criarPlanoDTO";
import { PlanoService } from "../services/PlanoServices";


class PlanoController extends BaseController<Plano> {
    private planoService: PlanoService;
    protected prisma = new PrismaClient();

    constructor(planoService: PlanoService) {
        super(planoService, CriarPlanoDTO, ActualizarPlanolDTO);
        this.planoService = planoService; // Usando a instância fornecida
    }

    async create(req: Request, res: Response) {

        const { nome, periodo, valor } = req.body;
        const Plano = await this.planoService.create({ nome, periodo, valor });
        return res.status(201).json(Plano); // Retorna o Plano criado

    }
}

export default PlanoController;
