/*
  Warnings:

  - You are about to drop the `PlayerNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerNumber" DROP CONSTRAINT "PlayerNumber_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerNumber" DROP CONSTRAINT "PlayerNumber_playerId_fkey";

-- DropTable
DROP TABLE "PlayerNumber";

-- CreateTable
CREATE TABLE "player_number" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_number_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "player_number" ADD CONSTRAINT "player_number_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_number" ADD CONSTRAINT "player_number_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
