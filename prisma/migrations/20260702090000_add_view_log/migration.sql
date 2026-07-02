-- CreateTable
CREATE TABLE "ViewLog" (
    "postSlug" TEXT NOT NULL,
    "visitorHash" TEXT NOT NULL,
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewLog_pkey" PRIMARY KEY ("postSlug","visitorHash")
);

-- AddForeignKey
ALTER TABLE "ViewLog" ADD CONSTRAINT "ViewLog_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "Post"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
