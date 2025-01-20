# Localização de Cálculos (Financeiros e Outros) no Projeto

Este projeto segue uma estrutura modular e organizada, com o objetivo de manter o código limpo, reutilizável e fácil de manter. Os cálculos financeiros e outros cálculos necessários para o sistema estão localizados em classes utilitárias e especializadas. Abaixo está a descrição detalhada de onde e como procurar essas funcionalidades.

## 1. Cálculos Financeiros
Todos os cálculos relacionados a preços, impostos, descontos, margens de lucro e outros cálculos financeiros estão localizados dentro da pasta `src/modules/financeiro/`.

### Cálculos de Preço
**Cálculos de preço com impostos:** Qualquer cálculo relacionado ao preço final, incluindo o imposto sobre o valor base, é feito nas classes dentro de `src/modules/financeiro/calculadora-preco.ts`.

Exemplo:
```typescript
CalculadoraPreco.calcularPrecoFinal(precoBase, percentualImposto)
Cálculos de Desconto
Descontos em produtos ou serviços: Qualquer lógica de aplicação de descontos em valores é tratada em src/modules/financeiro/calculadora-desconto.ts.

Exemplo:

typescript
 
CalculadoraDesconto.calcularPrecoComDesconto(precoBase, percentualDesconto)
Cálculos de Impostos
Cálculos de impostos aplicados a preços: O cálculo de impostos, dependendo de um percentual, é feito em src/modules/financeiro/calculadora-imposto.ts.

Exemplo:

CalculadoraImposto.calcularImposto(precoBase, percentualImposto)
Cálculos de Margem de Lucro
Cálculos de margem de lucro baseada no custo e preço de venda: As margens de lucro são calculadas com base no custo e no preço final de venda em src/modules/financeiro/calculadora-margem-lucro.ts.

Exemplo:

typescript
 
CalculadoraMargemLucro.calcularMargemLucro(precoVenda, custoProduto)
2. Cálculos de Estoque
A gestão de estoque e os cálculos relacionados ao valor total do estoque, vendas totais e custos totais dos produtos em estoque podem ser encontrados em src/modules/estoque/.

Controle de Estoque
Cálculos de valor total de estoque: O valor total do estoque é calculado multiplicando o preço unitário pela quantidade disponível em estoque. Este cálculo está localizado em src/modules/estoque/controle-estoque.ts.

Exemplo:
 
ControleEstoque.calcularValorTotalEstoque(precoUnitario, quantidadeEmEstoque)
Cálculos de Custo Total de Estoque
Cálculos do custo total do estoque: O custo total é calculado com base no preço de custo dos itens e a quantidade em estoque.

Exemplo:

 
ControleEstoque.calcularCustoTotalEstoque(custoUnitario, quantidadeEmEstoque)
3. Funções Matemáticas Utilitárias
Para cálculos genéricos e arredondamentos de valores, utilizamos funções utilitárias. Estas funções podem ser encontradas em src/core/utils/math-utils.ts.

Arredondamento
Arredondamento de valores para um número dinâmico de casas decimais: As funções de arredondamento permitem arredondar valores para qualquer número de casas decimais especificado.

Exemplo:

 
MathUtils.arredondar(valor, casasDecimais)
Cálculo de Percentual de Aumento
Cálculo do percentual de aumento entre dois valores: Calcula a diferença percentual entre dois valores.

Exemplo:

 
MathUtils.calcularPercentualAumento(valorInicial, valorFinal)
4. Onde Procurar e Como Usar
Localização das Classes
Todas as classes de cálculos financeiros, controle de estoque e funções matemáticas estão organizadas em pastas dentro de src/modules/financeiro/, src/modules/estoque/, e src/core/utils/.

Importação
Para usar qualquer uma dessas funcionalidades, basta importar as classes e métodos necessários. Exemplo:
 
import { CalculadoraPreco } from 'src/modules/financeiro/calculadora-preco';
import { MathUtils } from 'src/core/utils/math-utils';

// Exemplo de uso
const precoFinal = CalculadoraPreco.calcularPrecoFinal(precoBase, percentualImposto);
const precoArredondado = MathUtils.arredondar(precoFinal, 2);
5. Adaptação e Extensão
Essas classes são projetadas para serem flexíveis e reutilizáveis, e podem ser facilmente adaptadas a novas necessidades financeiras ou de estoque. Se houver necessidade de cálculos específicos para um novo módulo ou funcionalidade, basta criar novas funções ou adaptar as existentes com base na estrutura proposta.

6. Exemplo de Fluxo de Trabalho para Implementação
Definir as regras de cálculo: Antes de implementar qualquer cálculo, verifique se as regras e parâmetros financeiros estão claros (como faixas de imposto, descontos, etc.).
Usar as classes de cálculo: Importe e use as classes já implementadas. Se necessário, crie novas funções ou utilize os utilitários.
Testar os cálculos: Aplique testes unitários para garantir que as fórmulas estejam corretas e que os cálculos estejam funcionando conforme esperado.

```