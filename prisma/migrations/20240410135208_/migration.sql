/*
  Warnings:

  - A unique constraint covering the columns `[shadowId]` on the table `Bounty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bounty_shadowId_key" ON "Bounty"("shadowId");
