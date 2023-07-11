-- AlterTable
ALTER TABLE "cup_config" ADD COLUMN     "name" TEXT,
ADD COLUMN     "registration_deadline" DATE;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "code" TEXT;
