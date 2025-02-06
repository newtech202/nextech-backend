import { Perfil, PrismaClient, } from '@prisma/client';
import { BadRequestError } from '../../../core/helpers/api.errors';
import { validateData } from '../../../core/helpers/validate-data.dtos';
import { BaseService } from '../../../core/services/BaseServices';
import { CriarPerfilDTO, CriarPerfilDTOType } from '../DTO/criarPerfilDTO';
import { PerfilRepository } from '../repository/Perfil.Repository';



export class PerfilService extends BaseService<Perfil, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const perfilRepository = new PerfilRepository(prisma);
        super(perfilRepository,);
    }

    create = async (data: CriarPerfilDTOType): Promise<Perfil> => {
        const { nome, descricao, } = data

        await validateData(data, CriarPerfilDTO);
        const perfilExist = this.getOneBy(nome);

        if ((await perfilExist)?.id) {
            throw new BadRequestError("Perfil Já existe")
        }

        // Criando um novo usuário com a senha criptografada
        const newperfil = await this.repository.create({
            nome,
            descricao
        });

        return newperfil
    }
    async getOneBy(nome: string): Promise<Perfil> {
        return this.repository.getOneBy({ nome });
    }
}
