/*
  Warnings:

  - You are about to drop the column `gameId` on the `player_number` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `player_number` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `player_number` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `player_number` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "player_number" DROP CONSTRAINT "player_number_gameId_fkey";

-- DropForeignKey
ALTER TABLE "player_number" DROP CONSTRAINT "player_number_playerId_fkey";

-- AlterTable
ALTER TABLE "player_number" DROP COLUMN "gameId",
DROP COLUMN "playerId",
ADD COLUMN     "game_id" TEXT NOT NULL,
ADD COLUMN     "player_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "player_number" ADD CONSTRAINT "player_number_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_number" ADD CONSTRAINT "player_number_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
