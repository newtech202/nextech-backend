import * as Yup from 'yup';

export const CriarPerfilDTO = Yup.object().shape({
    nome: Yup.string().required(),
    descricao: Yup.string().optional()
});
export type CriarPerfilDTOType = Yup.InferType<typeof CriarPerfilDTO>;