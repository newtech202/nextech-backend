import { Perfil, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

export class PerfilRepository extends BaseRepository<Perfil> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.perfil); // Passando o modelo 'perfil' para o repositório base
    }

}

