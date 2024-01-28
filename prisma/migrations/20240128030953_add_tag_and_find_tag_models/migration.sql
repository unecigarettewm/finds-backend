/*
  Warnings:

  - You are about to drop the column `categories` on the `Place` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "categories";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FindTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "findId" INTEGER NOT NULL,

    CONSTRAINT "FindTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "FindTag" ADD CONSTRAINT "FindTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FindTag" ADD CONSTRAINT "FindTag_findId_fkey" FOREIGN KEY ("findId") REFERENCES "Find"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
