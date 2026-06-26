-- CreateIndex
CREATE INDEX "Comment_postSlug_idx" ON "Comment"("postSlug");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Comment_authorId_idx" ON "Comment"("authorId");
