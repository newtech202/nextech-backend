/*
  Warnings:

  - You are about to drop the column `criadoPor` on the `despesa` table. All the data in the column will be lost.
  - Added the required column `criadoPorId` to the `Despesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesa` DROP COLUMN `criadoPor`,
    ADD COLUMN `criadoPorId` INTEGER NOT NULL;
