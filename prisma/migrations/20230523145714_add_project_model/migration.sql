/*
  Warnings:

  - You are about to drop the column `email` on the `Developer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Developer` table. All the data in the column will be lost.
  - Added the required column `experience` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Developer_email_key";

-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "skills" TEXT[];

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
