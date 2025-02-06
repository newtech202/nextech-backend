import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de empresas
export const ActualizarDespesaDTO = Yup.object().shape({
        comprovativo: Yup.string().url().nullable(),
        nome: Yup.string().optional().min(1, 'O nome é obrigatório'),
        valor: Yup.number().optional().positive('O valor deve ser positivo'),
        retencaoFonte: Yup.boolean().optional(),
        motivo: Yup.string().optional(), // Supondo que DespesaMotivo seja uma string
});

export type ActualizarDespesaDTOType = Yup.InferType<typeof ActualizarDespesaDTO>;
