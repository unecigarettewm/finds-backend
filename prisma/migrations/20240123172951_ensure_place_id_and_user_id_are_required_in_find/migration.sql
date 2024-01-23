/*
  Warnings:

  - Made the column `placeId` on table `Find` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Find` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Find" DROP CONSTRAINT "Find_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Find" DROP CONSTRAINT "Find_userId_fkey";

-- AlterTable
ALTER TABLE "Find" ALTER COLUMN "placeId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Find" ADD CONSTRAINT "Find_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Find" ADD CONSTRAINT "Find_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
