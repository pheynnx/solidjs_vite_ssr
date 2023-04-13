-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "featured" BOOL NOT NULL,
    "published" BOOL NOT NULL,
    "slug" STRING NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "title" STRING NOT NULL,
    "series" STRING NOT NULL,
    "categories" STRING[],
    "markdown" STRING NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
