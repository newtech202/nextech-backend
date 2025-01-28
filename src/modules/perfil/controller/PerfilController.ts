import { Perfil } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { ActualizarPerfilDTO } from "../DTO/actualizarPerfilDTO";
import { CriarPerfilDTO } from "../DTO/criarPerfilDTO";
import { PerfilService } from "../services/PerfilServices";

class PerfilController extends BaseController<Perfil> {
    private perfilService: PerfilService;

    constructor(perfilService: PerfilService) {
        super(perfilService, CriarPerfilDTO, ActualizarPerfilDTO);
        this.perfilService = perfilService; // Usando a instância fornecida
    }

    async create(req: Request, res: Response) {

        const { nome, descricao } = req.body;
        const perfil = await this.perfilService.create({ nome, descricao });
        return res.status(201).json(perfil); // Retorna o perfil criado

    }
}

export default PerfilController;
