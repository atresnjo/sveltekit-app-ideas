/*
  Warnings:

  - You are about to drop the `Follows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Follows";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserFriends" (
    "friendId" INTEGER NOT NULL,
    "friendRelationId" INTEGER NOT NULL,
    "isFriendRequestConfirmed" BOOLEAN NOT NULL,

    PRIMARY KEY ("friendId", "friendRelationId"),
    CONSTRAINT "UserFriends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserFriends_friendRelationId_fkey" FOREIGN KEY ("friendRelationId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
