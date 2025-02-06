import { Despesa, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

// Repositório de Despesa
export class DespesaRepository extends BaseRepository<Despesa> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.despesa); // Passando o modelo 'Despesa' para o repositório base
    }
}