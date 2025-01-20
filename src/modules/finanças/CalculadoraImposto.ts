export class CalculadoraImposto {
    static calcularImposto(precoBase: number, percentualImposto: number): number {
      return (precoBase * percentualImposto) / 100;
    }
  }
  