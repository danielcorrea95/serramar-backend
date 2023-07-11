-- CreateTable
CREATE TABLE "PlayerNumber" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerNumber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerNumber" ADD CONSTRAINT "PlayerNumber_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerNumber" ADD CONSTRAINT "PlayerNumber_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
