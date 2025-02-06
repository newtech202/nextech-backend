import { Plano, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

export class PlanoRepository extends BaseRepository<Plano> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.plano); // Passando o modelo 'Plano' para o repositório base
    }

}

