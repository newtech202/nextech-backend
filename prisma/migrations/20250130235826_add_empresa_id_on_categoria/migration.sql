/*
  Warnings:

  - Added the required column `empresaID` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `empresaID` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Categoria_empresaID_fkey` ON `Categoria`(`empresaID`);

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_empresaID_fkey` FOREIGN KEY (`empresaID`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
