/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Content` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Content" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "public"."Content"("slug");
