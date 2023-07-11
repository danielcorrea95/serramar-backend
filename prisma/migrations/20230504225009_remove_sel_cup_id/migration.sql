/*
  Warnings:

  - You are about to drop the column `sel_cup_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_sel_cup_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "sel_cup_id",
ADD COLUMN     "sel_cup_config_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sel_cup_config_id_fkey" FOREIGN KEY ("sel_cup_config_id") REFERENCES "cup_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;
