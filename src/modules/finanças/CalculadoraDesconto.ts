export class CalculadoraDesconto {
    static calcularPrecoComDesconto(precoBase: number, percentualDesconto: number): number {
      const desconto = (precoBase * percentualDesconto) / 100;
      return precoBase - desconto;
    }
  }
  