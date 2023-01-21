/*
  Warnings:

  - You are about to drop the column `email` on the `VerifyEmail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `VerifyEmail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `VerifyEmail` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "VerifyEmail_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "VerifyEmail" DROP COLUMN "email",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerifyEmail_userId_key" ON "VerifyEmail"("userId");

-- AddForeignKey
ALTER TABLE "VerifyEmail" ADD CONSTRAINT "VerifyEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
