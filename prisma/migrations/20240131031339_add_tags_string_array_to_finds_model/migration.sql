-- AlterTable
ALTER TABLE "Find" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
