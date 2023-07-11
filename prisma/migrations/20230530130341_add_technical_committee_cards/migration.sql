-- CreateTable
CREATE TABLE "technical_committee_cards" (
    "id" TEXT NOT NULL,
    "techcnical_committee_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "card_type_id" TEXT NOT NULL,
    "time" TIME(6) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "technical_committee_cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "technical_committee_cards" ADD CONSTRAINT "technical_committee_cards_techcnical_committee_id_fkey" FOREIGN KEY ("techcnical_committee_id") REFERENCES "technical_committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_committee_cards" ADD CONSTRAINT "technical_committee_cards_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "technical_committee_cards" ADD CONSTRAINT "technical_committee_cards_card_type_id_fkey" FOREIGN KEY ("card_type_id") REFERENCES "card_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
