export class CalculadoraPreco {
    static calcularPrecoFinal(precoBase: number, impostoPercentual: number): number {
      const imposto = (precoBase * impostoPercentual) / 100;
      return precoBase + imposto;
    }
  }
  