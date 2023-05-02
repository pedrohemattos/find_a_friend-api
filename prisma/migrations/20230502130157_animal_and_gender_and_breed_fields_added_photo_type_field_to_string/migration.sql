/*
  Warnings:

  - You are about to drop the column `photos` on the `pets` table. All the data in the column will be lost.
  - Added the required column `animal` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photos",
ADD COLUMN     "animal" "Animal" NOT NULL,
ADD COLUMN     "breed" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "photo" TEXT;
