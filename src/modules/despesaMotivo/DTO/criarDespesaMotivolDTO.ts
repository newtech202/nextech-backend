import * as Yup from 'yup';

export const CriarDespesaMotivoDTO = Yup.object().shape({
    motivo: Yup.string().required(),
});
export type CriarDespesaMotivoDTOType = Yup.InferType<typeof CriarDespesaMotivoDTO>;