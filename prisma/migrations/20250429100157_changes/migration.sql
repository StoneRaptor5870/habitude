/*
  Warnings:

  - You are about to drop the `HabitLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitLog" DROP CONSTRAINT "HabitLog_habitId_fkey";

-- DropForeignKey
ALTER TABLE "HabitLog" DROP CONSTRAINT "HabitLog_userId_fkey";

-- DropTable
DROP TABLE "HabitLog";
