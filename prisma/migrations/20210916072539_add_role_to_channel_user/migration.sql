/*
  Warnings:

  - Added the required column `role` to the `Channel_User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('owner', 'modurator', 'member');

-- AlterTable
ALTER TABLE "Channel_User" ADD COLUMN     "role" "Role" NOT NULL;
