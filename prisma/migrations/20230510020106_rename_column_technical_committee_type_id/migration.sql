/*
  Warnings:

  - You are about to drop the column `technical_committee_types_id` on the `category_team_technical_committee` table. All the data in the column will be lost.
  - Added the required column `technical_committee_type_id` to the `category_team_technical_committee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category_team_technical_committee" DROP CONSTRAINT "category_team_technical_committee_technical_committee_type_fkey";

-- AlterTable
ALTER TABLE "category_team_technical_committee" DROP COLUMN "technical_committee_types_id",
ADD COLUMN     "technical_committee_type_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "category_team_technical_committee" ADD CONSTRAINT "category_team_technical_committee_technical_committee_type_fkey" FOREIGN KEY ("technical_committee_type_id") REFERENCES "technical_committee_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
