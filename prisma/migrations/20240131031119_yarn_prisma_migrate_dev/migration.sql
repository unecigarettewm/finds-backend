/*
  Warnings:

  - You are about to drop the column `ratingId` on the `Find` table. All the data in the column will be lost.
  - You are about to drop the `FindTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Find` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Find" DROP CONSTRAINT "Find_ratingId_fkey";

-- DropForeignKey
ALTER TABLE "FindTag" DROP CONSTRAINT "FindTag_findId_fkey";

-- DropForeignKey
ALTER TABLE "FindTag" DROP CONSTRAINT "FindTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Find" DROP COLUMN "ratingId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "FindTag";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Find" ADD CONSTRAINT "Find_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
