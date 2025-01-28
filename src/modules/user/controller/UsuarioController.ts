import { PrismaClient, Usuario } from "@prisma/client";
import { Request, Response } from "express";
import { BaseController } from "../../../core/controllers/base.controller";
import { PerfilService } from "../../perfil/services/PerfilServices";
import { ActualizarUsuarioDTO } from "../DTO/actualizarUsuarioDTO";
import { CriarUsuarioDTO } from "../DTO/criarUsuarioDTO";
import { UsuarioService } from "../services/UsuarioServices";

class UsuarioController extends BaseController<Usuario> {
    private usuarioService: UsuarioService;

    protected prisma = new PrismaClient()
    constructor(usuarioService: UsuarioService) {
        super(usuarioService, CriarUsuarioDTO, ActualizarUsuarioDTO)
        this.usuarioService = usuarioService;
    }

    async create(req: Request, res: Response) {
        const { nome, email, perfilId, empresaId } = req.body;

        const perfilService = new PerfilService(this.prisma);

        const usuario = await this.usuarioService.create(
            { nome, email, perfilId, empresaId },
            perfilService);

        return res.status(201).json(usuario);

    }
}

export default UsuarioController;  // Exportação padrão
