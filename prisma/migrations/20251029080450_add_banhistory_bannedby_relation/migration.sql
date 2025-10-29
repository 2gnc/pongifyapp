/*
  Warnings:

  - You are about to drop the `Ban` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ban" DROP CONSTRAINT "Ban_clubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ban" DROP CONSTRAINT "Ban_userId_fkey";

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."Ban";

-- CreateTable
CREATE TABLE "BanHistory" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT,
    "bannedById" TEXT,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unbannedAt" TIMESTAMP(3),

    CONSTRAINT "BanHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BanHistory_clubId_userId_bannedAt_key" ON "BanHistory"("clubId", "userId", "bannedAt");

-- AddForeignKey
ALTER TABLE "BanHistory" ADD CONSTRAINT "BanHistory_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanHistory" ADD CONSTRAINT "BanHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BanHistory" ADD CONSTRAINT "BanHistory_bannedById_fkey" FOREIGN KEY ("bannedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
