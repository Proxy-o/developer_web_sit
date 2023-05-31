/*
  Warnings:

  - Added the required column `code_repo` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "code_repo" TEXT NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL;
