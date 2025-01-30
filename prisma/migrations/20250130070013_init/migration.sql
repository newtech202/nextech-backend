-- CreateTable
CREATE TABLE `Artigo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `impostoAplicado` DOUBLE NOT NULL,
    `tipo` ENUM('PRODUTO', 'SERVICO', 'SERVICO_COM_RETENCAO_6_5', 'ARRENDAMENTO', 'ARRENDAMENTO_COM_RETENCAO_15') NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemUrl` VARCHAR(191) NULL,
    `empresaId` INTEGER NOT NULL,

    INDEX `Artigo_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Cliente_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Despesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comprovativo` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `fornecedorId` INTEGER NOT NULL,
    `retencaoFonte` BOOLEAN NOT NULL,
    `motivo` ENUM('COMPRA_PRODUTO', 'PAGAMENTO_SERVICO', 'DESPESA_INTERNA', 'AMORTIZACOES', 'PAGAMENTO_CREDITO', 'DESPESAS_BANCARIAS') NOT NULL,
    `criadoPor` VARCHAR(191) NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Despesa_empresaId_fkey`(`empresaId`),
    INDEX `Despesa_fornecedorId_fkey`(`fornecedorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `dataEmissao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `produtoServicoId` INTEGER NOT NULL,
    `precoUnitario` DOUBLE NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `totalLiquido` DOUBLE NOT NULL,
    `totalImpostos` DOUBLE NOT NULL,
    `impostosRetidos` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `descontoPercentual` DOUBLE NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `criadoPor` VARCHAR(191) NOT NULL,

    INDEX `Documento_clienteId_fkey`(`clienteId`),
    INDEX `Documento_empresaId_fkey`(`empresaId`),
    INDEX `Documento_produtoServicoId_fkey`(`produtoServicoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `logoURL` VARCHAR(191) NULL,
    `nif` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `planoId` INTEGER NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Empresa_nif_key`(`nif`),
    INDEX `Empresa_planoId_fkey`(`planoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nif` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Fornecedor_nif_key`(`nif`),
    INDEX `Fornecedor_empresaId_fkey`(`empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PagamentoSubscricao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `planoId` INTEGER NOT NULL,
    `dataPagamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valor` DOUBLE NOT NULL,
    `statusPagamento` ENUM('PENDENTE', 'CONCLUIDO', 'CANCELADO') NOT NULL,

    INDEX `PagamentoSubscricao_empresaId_fkey`(`empresaId`),
    INDEX `PagamentoSubscricao_planoId_fkey`(`planoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plano` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `empresaId` INTEGER NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `perfilId` INTEGER NOT NULL,
    `resetsenhaToken` VARCHAR(191) NULL,
    `resetsenhaExpires` DATETIME(3) NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_resetsenhaToken_key`(`resetsenhaToken`),
    INDEX `Usuario_perfilId_fkey`(`perfilId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Artigo` ADD CONSTRAINT `Artigo_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `Fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Documento` ADD CONSTRAINT `Documento_produtoServicoId_fkey` FOREIGN KEY (`produtoServicoId`) REFERENCES `Artigo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_planoId_fkey` FOREIGN KEY (`planoId`) REFERENCES `Plano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fornecedor` ADD CONSTRAINT `Fornecedor_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PagamentoSubscricao` ADD CONSTRAINT `PagamentoSubscricao_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PagamentoSubscricao` ADD CONSTRAINT `PagamentoSubscricao_planoId_fkey` FOREIGN KEY (`planoId`) REFERENCES `Plano`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_perfilId_fkey` FOREIGN KEY (`perfilId`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
