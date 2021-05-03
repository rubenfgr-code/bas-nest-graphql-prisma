/*
  Warnings:

  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile.name_unique` ON `Profile`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `name`,
    ADD COLUMN     `firstname` VARCHAR(191),
    ADD COLUMN     `lastname` VARCHAR(191),
    ADD COLUMN     `gender` ENUM('MALE', 'FEMALE'),
    ADD COLUMN     `birthday` DATETIME(3);
