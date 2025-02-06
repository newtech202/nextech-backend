import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de Fos

// Definição do schema de validação para o DTO de criação de Fornecedores
export const CriarFornecedorDTO = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório.'),
    email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório.'),
    nif: Yup.string().required('O NIF é obrigatório.'),
    endereco: Yup.string().required('O endereço é obrigatório.'),
    telefone: Yup.string().required('O telefone é obrigatório.'),
    logo: Yup.string().nullable(), // O campo logo é opcional e pode ser nulo
    empresaId: Yup.number().required('O ID da empresa é obrigatório.'),
});

export type CriarFornecedorDTOType = Yup.InferType<typeof CriarFornecedorDTO>;
