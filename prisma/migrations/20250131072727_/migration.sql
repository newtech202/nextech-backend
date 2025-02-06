/*
  Warnings:

  - You are about to drop the `_despesatodespesamotivo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_despesatodespesamotivo` DROP FOREIGN KEY `_DespesaToDespesaMotivo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_despesatodespesamotivo` DROP FOREIGN KEY `_DespesaToDespesaMotivo_B_fkey`;

-- AlterTable
ALTER TABLE `despesamotivo` ADD COLUMN `dataActualizacao` DATETIME(3) NULL,
    ADD COLUMN `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `_despesatodespesamotivo`;
