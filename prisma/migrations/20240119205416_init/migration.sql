-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstname" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Find" (
    "id" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "google_place_id" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "authorId" INTEGER,

    CONSTRAINT "Find_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Find" ADD CONSTRAINT "Find_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
