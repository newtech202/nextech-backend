export class CalculadoraMargemLucro {
    static calcularMargemLucro(precoVenda: number, custoProduto: number): number {
      return ((precoVenda - custoProduto) / precoVenda) * 100;
    }
  }
  