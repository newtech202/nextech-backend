/*
  Warnings:

  - You are about to drop the column `empresaID` on the `categoria` table. All the data in the column will be lost.
  - Added the required column `empresaId` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `Categoria_empresaID_fkey`;

-- DropIndex
DROP INDEX `Categoria_empresaID_fkey` ON `categoria`;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `empresaID`,
    ADD COLUMN `empresaId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Categoria_empresaId_fkey` ON `Categoria`(`empresaId`);

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
