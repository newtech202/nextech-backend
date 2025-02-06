/*
  Warnings:

  - You are about to drop the column `motivo` on the `despesa` table. All the data in the column will be lost.
  - Added the required column `motivoId` to the `Despesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesa` DROP COLUMN `motivo`,
    ADD COLUMN `motivoId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `DespesaMotivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DespesaMotivo_motivo_key`(`motivo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DespesaToDespesaMotivo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DespesaToDespesaMotivo_AB_unique`(`A`, `B`),
    INDEX `_DespesaToDespesaMotivo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_motivoId_fkey` FOREIGN KEY (`motivoId`) REFERENCES `DespesaMotivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DespesaToDespesaMotivo` ADD CONSTRAINT `_DespesaToDespesaMotivo_A_fkey` FOREIGN KEY (`A`) REFERENCES `Despesa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DespesaToDespesaMotivo` ADD CONSTRAINT `_DespesaToDespesaMotivo_B_fkey` FOREIGN KEY (`B`) REFERENCES `DespesaMotivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
