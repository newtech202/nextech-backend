import * as Yup from "yup";
import "../../../config/yup";
export const ActualizarEmpresaDTO = Yup.object().shape({
    nome: Yup.string().required(),
    logo: Yup.string().optional(),
    email: Yup.string().email(),
    telefone: Yup.string()
        .matches(/^[0-9]{9,15}$/, "O telefone deve conter entre 9 e 15 dígitos.")
        .optional(),
    nif: Yup.string()
        .matches(/^\d{9}$/, "O NIF deve conter exatamente 9 dígitos.")
        .optional(),
    endereco: Yup.string().optional(),
    // status: Yup.string().oneOf(["ativo", "inativo"], "O status deve ser 'ativo' ou 'inativo'.").optional(),
});

export type ActualizarEmpresaDTOType = Yup.InferType<typeof ActualizarEmpresaDTO>;
