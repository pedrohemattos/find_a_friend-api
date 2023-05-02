/*
  Warnings:

  - You are about to drop the column `address_id` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_address_id_fkey";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "address_id",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "age" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "addresses";
