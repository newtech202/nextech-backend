export class MathUtils {
    // Arredondar valores para um número dinâmico de casas decimais
  static arredondar(valor: number, casasDecimais: number): number {
    const fator = Math.pow(10, casasDecimais);
    return Math.round(valor * fator) / fator;
  }
    // Calcular o percentual de aumento entre dois valores
    static calcularPercentualAumento(valorInicial: number, valorFinal: number): number {
      return ((valorFinal - valorInicial) / valorInicial) * 100;
    }
  }
  