import * as Yup from 'yup';

export const CriarTipoDeClienteDTO = Yup.object().shape({
    tipo: Yup.string().required(),
});
export type CriarTipoDeClienteDTOType = Yup.InferType<typeof CriarTipoDeClienteDTO>;