import { Despesa, PrismaClient } from "@prisma/client";
import { validateData } from "../../../core/helpers/validate-data.dtos";
import { BaseService } from "../../../core/services/BaseServices";
import { DespesaMotivoService } from "../../despesaMotivo/services/DespesaMotivoServices";
import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { FornecedorService } from "../../forncedores/services/FornecedorServices";
import { UsuarioService } from "../../user/services/UsuarioServices";
import { CriarDespesaDTO, CriarDespesaDTOType } from "../DTO/criarDespesaDTO";
import { DespesaRepository } from "../repository/DespesaRepository";


export class DespesaService extends BaseService<Despesa, PrismaClient> {
    constructor(prisma: PrismaClient) {
        const despesaRepository = new DespesaRepository(prisma);
        super(despesaRepository);
    }

    async create
        (
            data: CriarDespesaDTOType,
            empresaService: EmpresaService,
            fornecedorService: FornecedorService, despesaMotivoService: DespesaMotivoService, operadorService: UsuarioService): Promise<Despesa> {
        const {
            comprovativo,
            criadoPorId,
            empresaId,
            fornecedorId,
            motivoId,
            nome,
            retencaoFonte,
            valor
        } = data;

        // Validar os campos obrigatórios
        await validateData(data, CriarDespesaDTO);

        // Verificar se já existe uma Despesa com o mesmo dados
        // await this.ensureRecordExistsBy({ nome, empresaId, valor, fornecedorId, motivo }, { haveToexist: false }, "Já existe uma Despesa semelhante.");

        // Verificar se a empresa existe
        await empresaService.getById(empresaId);
        // verificar se o motivo existe
        await despesaMotivoService.getById(motivoId)
        // verificar se o operador existe
        await operadorService.getById(criadoPorId)

        const novaDespesa = await this.repository.create({
            comprovativo,
            empresaId,
            fornecedorId,
            criadoPorId,
            motivoId,
            nome,
            retencaoFonte,
            valor
        });
        return novaDespesa;
    }
    async listByEmpresaId(empresaId: number, data: { page?: number, limit?: number }): Promise<Despesa[]> {
        const { page = 1, limit = 10 } = data;
        const offset = (page - 1) * limit;
        const Despesaes = await this.repository.findAll({
            where: { empresaId },
            skip: offset,
            take: limit
        });
        return Despesaes
    }
}
