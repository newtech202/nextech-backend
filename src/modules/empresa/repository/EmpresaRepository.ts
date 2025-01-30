import { Empresa, PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

// Repositório de Empresa
export class EmpresaRepository extends BaseRepository<Empresa> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.empresa); // Passando o modelo 'empresa' para o repositório base
    }
}