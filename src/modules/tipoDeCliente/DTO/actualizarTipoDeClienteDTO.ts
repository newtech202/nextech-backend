import * as Yup from 'yup';

export const ActualizarTipoDeClienteDTO = Yup.object().shape({
  tipo: Yup.string().optional(),
});

export type ActualizarTipoDeClienteDTOType = Yup.InferType<typeof ActualizarTipoDeClienteDTO>;
