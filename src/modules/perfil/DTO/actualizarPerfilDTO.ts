import * as Yup from 'yup';

export const ActualizarPerfilDTO = Yup.object().shape({
  nome: Yup.string().optional(),
  descricao: Yup.string().optional()
});

export type ActualizarPerfilDTOType = Yup.InferType<typeof ActualizarPerfilDTO>;
