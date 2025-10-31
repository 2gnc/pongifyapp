-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('DRAFT', 'SEALED', 'TWO_PICKS_DRAFT', 'PRERELEASE', 'COMMANDER_DRAFT', 'BUNDLE_SEALED', 'DISPLAY_SEALED', 'COMMANDER_PARTY', 'CUBE_DRAFT', 'RAINBOW_DRAFT');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "setCodes" TEXT[],
    "maxParticipants" INTEGER,
    "registrationOpensAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconSvgUri" TEXT NOT NULL,
    "parentSetCode" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Set_code_key" ON "Set"("code");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
