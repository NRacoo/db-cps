/*
  Warnings:

  - You are about to drop the column `authorId` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Content" DROP CONSTRAINT "Content_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Content" DROP COLUMN "authorId";
