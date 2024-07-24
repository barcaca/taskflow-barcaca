/*
  Warnings:

  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `SubTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_labelId_fkey";

-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_parentId_fkey";

-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_projectId_fkey";

-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_userId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "description";

-- DropTable
DROP TABLE "SubTask";
