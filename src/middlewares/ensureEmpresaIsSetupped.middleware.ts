import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../core/helpers/api.errors';
import { PerfilService } from '../modules/perfil/services/PerfilServices';

async function ensureEmpresaIsSetupped(req: Request, res: Response, next: NextFunction) {
    const { empresaId, perfilId } = (req.session as any);
    const prisma = new PrismaClient();
    const perfilService = new PerfilService(prisma);

    const { nome: perfilNome } = await perfilService.ensureRecordExistsBy({ id: perfilId }, { haveToexist: true }, 'Perfil não encontrado');

    if (perfilNome.toLocaleLowerCase() !== "admin master" && !empresaId) {

        throw new UnauthorizedError('Configure primeiro a empresa');
    }
    next();
}

export default ensureEmpresaIsSetupped;