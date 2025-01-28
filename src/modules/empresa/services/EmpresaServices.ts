import { Empresa, PrismaClient } from "@prisma/client";
import { validateData } from "../../../core/helpers/validate-data.dtos";
import { BaseService } from "../../../core/services/BaseServices";
import { UsuarioService } from "../../user/services/UsuarioServices";
import { CriarEmpresaDTO, CriarEmpresaDTOType } from "../DTO/criarEmpresaDTO";
import { EmpresaRepository } from "../repository/EmpresaRepository";

export class EmpresaService extends BaseService<Empresa, PrismaClient> {
    constructor(prisma: PrismaClient) {
        const empresaRepository = new EmpresaRepository(prisma);
        super(empresaRepository);
    }

    async create(data: CriarEmpresaDTOType, proprientarioService: UsuarioService): Promise<Empresa> {
        const {
            nome,
            email,
            telefone,
            nif,
            endereco,
            proprietarioId } = data;

        // Validar os campos obrigatórios
        await validateData(data, CriarEmpresaDTO);

        // Verificar se já existe uma empresa com o mesmo email ou NIF
        await this.ensureRecordExistsBy(email, "Já existe uma empresa com este email.");
        await this.ensureRecordExistsBy(nif, "Já existe uma empresa com este NIF.");

        // Verificar se o proprietário existe
        await proprientarioService.ensureRecordExistsBy(proprietarioId, "Proprietário não encontrado.");

        // Criar a empresa
        const novaEmpresa = await this.repository.create({
            ...data,
        });
        return novaEmpresa;
    }

}
