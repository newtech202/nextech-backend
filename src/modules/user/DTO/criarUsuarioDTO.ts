import * as Yup from 'yup';

export const CriarUsuarioDTO = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().email().required(),
    senha: Yup.string().min(6).optional(),
    perfilId: Yup.number().required(),
    empresaId: Yup.number().required(),
});
export type CriarUsuarioDTOType = Yup.InferType<typeof CriarUsuarioDTO>;