import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de empresas
export const ActualizarFornecedorDTO = Yup.object().shape({
        nome: Yup.string().optional(),
        email: Yup.string().email('E-mail inválido.').optional( ),
        nif: Yup.string().optional( ),
        endereco: Yup.string().optional( ),
        telefone: Yup.string().optional( ),
        logo: Yup.string().nullable(), // O campo logo é opcional e pode ser nulo
        empresaId: Yup.number().optional(),
});

export type ActualizarFornecedorDTOType = Yup.InferType<typeof ActualizarFornecedorDTO>;
