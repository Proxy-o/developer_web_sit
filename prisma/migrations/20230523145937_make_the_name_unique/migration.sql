/*
  Warnings:

  - A unique constraint covering the columns `[firstname,lastname]` on the table `Developer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Developer_firstname_lastname_key" ON "Developer"("firstname", "lastname");
