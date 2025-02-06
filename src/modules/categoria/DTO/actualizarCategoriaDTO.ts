import * as Yup from 'yup';

export const ActualizarCategoriaDTO = Yup.object().shape({
  nome: Yup.string().optional(),
  descricao: Yup.string().optional(),
});

export type ActualizarCategoriaDTOType = Yup.InferType<typeof ActualizarCategoriaDTO>;
