import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { BadRequestError } from '../../../core/helpers/api.errors';
import { BaseService } from '../../../core/services/BaseServices';
import { CreateUserDTOType } from '../DTO/createUserDTO';
import { UserRepository } from '../repository/UserRepository';

export class UserService extends BaseService<User, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const userRepository = new UserRepository(prisma);
        super(userRepository);
    }

    async create(data: CreateUserDTOType): Promise<User> {
        const { email, name, password } = data
        const userExist = this.getByEmail(email);

        if ((await userExist)?.id) {
            throw new BadRequestError("email inválido")
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de saltos (aumentar aumenta a segurança)

        // Criando um novo usuário com a senha criptografada
        const newUser = await this.repository.create({
            ...data,
            password: hashedPassword
        });

        return newUser
    }
    async getByEmail(email: string): Promise<User> {
        return this.repository.getOneBy({ email });
    }

    // Método para validar a senha do usuário
    async validateLogin(email: string, senha: string): Promise<boolean> {
        // Buscar o usuário pelo email
        const user = await this.getByEmail(email);

        // Se o usuário não existir, retorna false
        if (!user) {
            return false;
        }

        // Comparar a senha fornecida com a senha armazenada no banco de dados
        const isValid = await bcrypt.compare(senha, user.password);

        return isValid;
    }

    async updatePassword() {

    }
    async askToUpdatePassword() {
        
    }
}
