import { DespesaMotivo, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

export class DespesaMotivoRepository extends BaseRepository<DespesaMotivo> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.despesaMotivo); // Passando o modelo 'DespesaMotivo' para o repositório base
    }

}

