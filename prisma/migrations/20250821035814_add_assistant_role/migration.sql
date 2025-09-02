-- CreateTable
CREATE TABLE "public"."Assistant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "divisi" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "github" TEXT NOT NULL,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_id_key" ON "public"."Assistant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_kode_key" ON "public"."Assistant"("kode");
