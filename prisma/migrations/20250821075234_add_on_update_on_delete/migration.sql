-- DropForeignKey
ALTER TABLE "public"."ContentTag" DROP CONSTRAINT "ContentTag_contentId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ContentTag" ADD CONSTRAINT "ContentTag_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
