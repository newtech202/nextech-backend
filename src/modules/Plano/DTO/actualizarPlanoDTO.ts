import * as Yup from 'yup';

export const ActualizarPlanolDTO = Yup.object().shape({
  nome: Yup.string().optional(),
  descricao: Yup.string().optional(),
  valor: Yup.number().optional(),
  periodo: Yup.number().optional(),
});

export type ActualizarPlanoDTOType = Yup.InferType<typeof ActualizarPlanolDTO>;
