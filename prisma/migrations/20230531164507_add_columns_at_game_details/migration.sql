/*
  Warnings:

  - Added the required column `extra_period_end` to the `game_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extra_period_start` to the `game_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_period_end` to the `game_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_period_start` to the `game_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obs` to the `game_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_period_end` to the `game_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second_period_start` to the `game_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_details" ADD COLUMN     "extra_period_end" TIME NOT NULL,
ADD COLUMN     "extra_period_start" TIME NOT NULL,
ADD COLUMN     "first_period_end" TIME NOT NULL,
ADD COLUMN     "first_period_start" TIME NOT NULL,
ADD COLUMN     "obs" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "second_period_end" TIME NOT NULL,
ADD COLUMN     "second_period_start" TIME NOT NULL;
