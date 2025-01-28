import { PrismaClient, Usuario } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

type UsuarioData = {
    nome: string;
    email: string;
    senha: string;
    empresaId: number;
    perfilId?: number;
    perfil: any;
}
export class UsuarioRepository extends BaseRepository<Usuario> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.usuario); // Passando o modelo 'usuario' para o repositório base
    }

    async create(data: UsuarioData ): Promise<Usuario> {
       
        try {
            // Usando o Prisma para criar o usuário no banco de dados
            const usuario = await this.prisma.usuario.create({
                data: {
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha,
                    perfilId: data.perfilId,
                    // Outros campos podem ser adicionados conforme necessário

                }
            });
            return usuario;
        } catch (error) {
            throw new Error('Erro ao criar usuário: ' + error);
        }
    }
}

