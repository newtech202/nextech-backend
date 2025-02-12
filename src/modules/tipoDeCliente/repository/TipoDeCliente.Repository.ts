import { PrismaClient, TipoDeCliente } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

export class TipoDeClienteRepository extends BaseRepository<TipoDeCliente> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.tipoDeCliente); // Passando o modelo 'tipo de cliente' para o repositório base
    }
}

