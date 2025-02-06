import * as Yup from 'yup';

export const CriarCategoriaDTO = Yup.object().shape({
    nome: Yup.string().required(),
    descricao: Yup.string().optional(),
    empresaId: Yup.number().required(),
});
export type CriarCategoriaDTOType = Yup.InferType<typeof CriarCategoriaDTO>;