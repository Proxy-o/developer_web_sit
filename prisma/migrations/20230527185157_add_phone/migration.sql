/*
  Warnings:

  - You are about to drop the column `education` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Developer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "skills",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "portfolio" TEXT;
