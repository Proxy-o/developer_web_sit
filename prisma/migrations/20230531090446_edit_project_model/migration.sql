/*
  Warnings:

  - You are about to drop the column `developerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `Project` table. All the data in the column will be lost.
  - Added the required column `demo_link` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "developerId",
DROP COLUMN "review",
ADD COLUMN     "demo_link" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;
