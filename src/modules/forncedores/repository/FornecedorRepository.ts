import { Fornecedor, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

// Repositório de Fornecedor
export class FornecedorRepository extends BaseRepository<Fornecedor> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.fornecedor); // Passando o modelo 'Fornecedor' para o repositório base
    }
}