/*
  Warnings:

  - Added the required column `proprietarioId` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `proprietarioId` INTEGER NOT NULL;
