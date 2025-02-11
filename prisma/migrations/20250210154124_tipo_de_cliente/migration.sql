-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `logoUrl` VARCHAR(191) NULL,
    ADD COLUMN `tipoId` INTEGER NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `TipoDeCliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dataActualizacao` DATETIME(3) NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `TipoDeCliente_tipo_key`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `TipoDeCliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
