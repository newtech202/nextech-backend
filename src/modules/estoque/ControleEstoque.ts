export class ControleEstoque {
    // Calcular o valor total do estoque com base no preço unitário
    static calcularValorTotalEstoque(precoUnitario: number, quantidadeEmEstoque: number): number {
        return precoUnitario * quantidadeEmEstoque;
    }

    // Calcular o valor total das vendas com base no preço de venda e quantidade em estoque
    static calcularValorTotalVendas(precoVenda: number, quantidadeEmEstoque: number): number {
        return precoVenda * quantidadeEmEstoque;
    }

    // Calcular o custo total do estoque com base no preço de custo e quantidade em estoque
    static calcularCustoTotalEstoque(custoUnitario: number, quantidadeEmEstoque: number): number {
        return custoUnitario * quantidadeEmEstoque;
    }
}
