-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sel_category_id" TEXT,
ADD COLUMN     "sel_cup_id" TEXT,
ADD COLUMN     "sel_team_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sel_team_id_fkey" FOREIGN KEY ("sel_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sel_cup_id_fkey" FOREIGN KEY ("sel_cup_id") REFERENCES "cups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sel_category_id_fkey" FOREIGN KEY ("sel_category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
