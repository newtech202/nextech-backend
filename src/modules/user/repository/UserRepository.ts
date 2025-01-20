import { PrismaClient, User } from '@prisma/client';
import { BaseRepository } from '../../../core/repositories/base.repository';

 export class UserRepository extends BaseRepository<User> {
    constructor(prisma: PrismaClient) {
        super(prisma, prisma.user); // Passando o modelo 'user' para o repositório base
    }
    async create(data: User): Promise<User> {
        try {
            // Usando o Prisma para criar o usuário no banco de dados
            const user = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password
                    // Outros campos podem ser adicionados conforme necessário
                }
            });
            return user;
        } catch (error) {
            throw new Error('Erro ao criar usuário: ' + error);
        }
    }
}

