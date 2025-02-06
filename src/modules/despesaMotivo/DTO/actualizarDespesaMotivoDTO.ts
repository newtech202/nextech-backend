import * as Yup from 'yup';

export const ActualizarDespesaMotivoDTO = Yup.object().shape({
  motivo: Yup.string().optional(),
});

export type ActualizarDespesaMotivoDTOType = Yup.InferType<typeof ActualizarDespesaMotivoDTO>;
