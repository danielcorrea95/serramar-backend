-- CreateTable
CREATE TABLE "technical_committee_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "technical_committee_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technical_committee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "attachment" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "technical_committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_team_technical_committee" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "technicalCommittee_id" TEXT NOT NULL,
    "avatar" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_team_technical_committee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_team_technical_committee" ADD CONSTRAINT "category_team_technical_committee_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_team_technical_committee" ADD CONSTRAINT "category_team_technical_committee_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_team_technical_committee" ADD CONSTRAINT "category_team_technical_committee_technicalCommittee_id_fkey" FOREIGN KEY ("technicalCommittee_id") REFERENCES "technical_committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
