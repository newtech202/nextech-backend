import { PrismaClient, Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { BadRequestError } from '../../../core/helpers/api.errors';
import { validateData } from '../../../core/helpers/validate-data.dtos';
import { BaseService } from '../../../core/services/BaseServices';
import { SignupDTO, SignupDTOType } from '../../auth/DTO/SignupDTO';
import { EmpresaService } from '../../empresa/services/EmpresaServices';
import { PerfilService } from '../../perfil/services/PerfilServices';
import { CriarUsuarioDTO, CriarUsuarioDTOType } from '../DTO/criarUsuarioDTO';
import { UsuarioRepository } from '../repository/UsuarioRepository';


export class UsuarioService extends BaseService<Usuario, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const usuarioRepository = new UsuarioRepository(prisma);
        super(usuarioRepository);
    }

    protected randomPassword() {
        return Math.random().toString(36).slice(-8);
    }

    async create(data: CriarUsuarioDTOType, perfilService: PerfilService, empresaService: EmpresaService): Promise<Usuario> {
        const { email, nome, perfilId, empresaId } = data
        await validateData(data, CriarUsuarioDTO);

        const usuarioExist = this.getByEmail(email);
        if ((await usuarioExist)?.id) {
            throw new BadRequestError("email inválido")
        }

        const perfil = await perfilService.getById(perfilId);
        if (!perfil) {
            throw new BadRequestError("Perfil não existe")
        }

        const empresa = await empresaService.getById(empresaId);
        if (!empresa) {
            throw new BadRequestError("Empresa não existe")
        }

        // Criptografando a senha
        const hashedsenha = await bcrypt.hash(this.randomPassword(), 10); // 10 é o número de saltos (aumentar aumenta a segurança)

        // Criando um novo usuário com a senha criptografada
        const newUsuario = await this.repository.create({
            ...data,
            senha: hashedsenha,
        });

        return newUsuario
    }
    async Signup(data:  SignupDTOType, perfilService: PerfilService,): Promise<Usuario> {
        const { email, nome, perfilId, senha } = data
        await validateData(data, SignupDTO);

        const usuarioExist = this.getByEmail(email);
        if ((await usuarioExist)?.id) {
            throw new BadRequestError("email inválido")
        }

        const perfil = await perfilService.getById(perfilId);
        if (!perfil) {
            throw new BadRequestError("Perfil não existe")
        }

        // Criptografando a senha
        const hashedsenha = await bcrypt.hash(senha, 10); // 10 é o número de saltos (aumentar aumenta a segurança)

        // Criando um novo usuário com a senha criptografada
        const newUsuario = await this.repository.create({
            nome,
            email,
            perfilId,
            senha: hashedsenha,
        });

        return newUsuario
    }
    async getByEmail(email: string): Promise<Usuario> {
        return this.repository.getOneBy({ email });
    }

    // Método para validar a senha do usuário
    async validateLogin(email: string, senha: string): Promise<boolean> {
        // Buscar o usuário pelo email
        const usuario = await this.getByEmail(email);

        // Se o usuário não existir, retorna false
        if (!usuario) {
            return false;
        }

        // Comparar a senha fornecida com a senha armazenada no banco de dados
        const isValid = await bcrypt.compare(senha, usuario.senha);

        return isValid;
    }

    async updatesenha() {

    }
    async askToUpdatesenha() {

    }
}
