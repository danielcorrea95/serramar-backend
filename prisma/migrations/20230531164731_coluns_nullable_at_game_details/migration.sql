-- AlterTable
ALTER TABLE "game_details" ALTER COLUMN "extra_period_end" DROP NOT NULL,
ALTER COLUMN "extra_period_start" DROP NOT NULL,
ALTER COLUMN "first_period_end" DROP NOT NULL,
ALTER COLUMN "first_period_start" DROP NOT NULL,
ALTER COLUMN "obs" DROP NOT NULL,
ALTER COLUMN "second_period_end" DROP NOT NULL,
ALTER COLUMN "second_period_start" DROP NOT NULL;
