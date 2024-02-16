-- CreateTable
CREATE TABLE "Waitlister" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Waitlister_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlister_email_key" ON "Waitlister"("email");
