-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `despesa` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `documento` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `fornecedor` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `plano` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `dataActualizacao` DATETIME(3) NULL;
