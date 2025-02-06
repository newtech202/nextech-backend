import { Categoria, PrismaClient, } from '@prisma/client';
import { validateData } from '../../../core/helpers/validate-data.dtos';
import { BaseService } from '../../../core/services/BaseServices';
import { EmpresaService } from '../../empresa/services/EmpresaServices';
import { CriarCategoriaDTO, CriarCategoriaDTOType } from '../DTO/criarCategoriaDTO';
import { CategoriaRepository } from '../repository/Categoria.Repository';


export class CategoriaService extends BaseService<Categoria, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const categoriaRepository = new CategoriaRepository(prisma);
        super(categoriaRepository,);
    }

    create = async (data: CriarCategoriaDTOType, empresaService: EmpresaService): Promise<Categoria> => {
        const { nome, descricao, empresaId } = data
        await validateData(data, CriarCategoriaDTO);

        // Verificar se a empresa existe
        await empresaService.ensureRecordExistsBy({ id: empresaId }, { haveToexist: true }, "Empresa não encontrada");

        // Verificar se a categoria já existe
        await this.ensureRecordExistsBy({ nome, empresaId }, { haveToexist: false }, "Já existe uma categoria com este nome");

        const newCategoria = await this.repository.create({
            nome,
            descricao,
            empresaId,
        });

        return newCategoria
    }
    async getOneBy(nome: string): Promise<Categoria> {
        return this.repository.getOneBy({ nome });
    }
}
