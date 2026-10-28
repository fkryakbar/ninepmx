-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('open_source', 'close_source');

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "link" TEXT,
    "githubLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
