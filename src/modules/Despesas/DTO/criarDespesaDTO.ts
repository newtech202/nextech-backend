import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de Fos

// Definição do schema de validação para o DTO de criação de Despesaes
export const CriarDespesaDTO = Yup.object().shape({
    comprovativo: Yup.string().required(),
    nome: Yup.string().required().min(1, 'O nome é obrigatório'),
    valor: Yup.number().required().positive('O valor deve ser positivo'),
    fornecedorId: Yup.number().integer().positive().required('O ID do fornecedor é obrigatório'),
    retencaoFonte: Yup.boolean().required(),
    motivo: Yup.string().required('O motivo é obrigatório'), // Supondo que DespesaMotivo seja uma string
    criadoPorId: Yup.string().required('O criador é obrigatório'),
    empresaId: Yup.number().integer().positive().required('O ID da empresa é obrigatório'),
    dataCriacao: Yup.date().default(() => new Date()), // Data de criação padrão
});

export type CriarDespesaDTOType = Yup.InferType<typeof CriarDespesaDTO>;
