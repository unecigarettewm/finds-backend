/*
  Warnings:

  - You are about to drop the column `rating` on the `Find` table. All the data in the column will be lost.
  - Added the required column `ratingId` to the `Find` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Find" DROP COLUMN "rating",
ADD COLUMN     "ratingId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "rating" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Find" ADD CONSTRAINT "Find_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
