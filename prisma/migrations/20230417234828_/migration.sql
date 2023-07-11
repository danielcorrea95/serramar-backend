/*
  Warnings:

  - You are about to drop the column `is_admin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_admin",
DROP COLUMN "role_id",
ADD COLUMN     "roleId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
