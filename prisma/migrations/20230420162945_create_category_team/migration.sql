-- CreateTable
CREATE TABLE "category_team" (
    "category_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "category_team_pkey" PRIMARY KEY ("category_id","team_id")
);

-- AddForeignKey
ALTER TABLE "category_team" ADD CONSTRAINT "category_team_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_team" ADD CONSTRAINT "category_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
