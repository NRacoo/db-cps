/*
  Warnings:

  - Added the required column `authorName` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "authorName" TEXT NOT NULL;
