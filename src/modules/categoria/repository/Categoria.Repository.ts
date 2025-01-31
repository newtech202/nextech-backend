import { Categoria, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

export class CategoriaRepository extends BaseRepository<Categoria> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.categoria); // Passando o modelo 'Categoria' para o repositório base
    }

}

