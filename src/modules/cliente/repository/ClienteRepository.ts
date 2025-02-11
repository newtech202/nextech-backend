import { Cliente, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

// Repositório de Cliente
export class ClienteRepository extends BaseRepository<Cliente> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.cliente); // Passando o modelo 'Cliente' para o repositório base
    }
}