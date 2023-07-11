/*
  Warnings:

  - You are about to drop the column `deleted` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "deleted",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions_roles" (
    "permission_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "permissions_roles_pkey" PRIMARY KEY ("permission_id","role_id")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "users_permissions" (
    "permission_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_permissions_pkey" PRIMARY KEY ("permission_id","user_id")
);

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions_roles" ADD CONSTRAINT "permissions_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
