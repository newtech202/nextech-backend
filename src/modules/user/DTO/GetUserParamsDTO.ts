import * as Yup from 'yup';

// DTO para validar e converter o parâmetro "id" da URL
export const GetUserParamsDTO = Yup.object().shape({
    id: Yup.number()
        .transform((value, originalValue) => {
            // Tentando converter o valor para um número inteiro
            const convertedValue = parseInt(value, 10);
            return isNaN(convertedValue) ? NaN : convertedValue;
        })
        .test('is-valid-id', 'O id deve ser um número inteiro e maior que zero', value => {
          
            return value !== undefined && !isNaN(value) && value > 0;
        })
       
});

// Tipo inferido a partir do schema do Yup
export type GetUserParamsDTOType = Yup.InferType<typeof GetUserParamsDTO>;
