/*
  Warnings:

  - You are about to drop the column `desa` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `namaLengkap` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `noHp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalLahir` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Absensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jadwal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Musolah` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Absensi" DROP CONSTRAINT "Absensi_userId_fkey";

-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_musolahId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "desa",
DROP COLUMN "namaLengkap",
DROP COLUMN "noHp",
DROP COLUMN "tanggalLahir",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(14) NOT NULL,
ADD COLUMN     "village" VARCHAR(20) NOT NULL;

-- DropTable
DROP TABLE "Absensi";

-- DropTable
DROP TABLE "Jadwal";

-- DropTable
DROP TABLE "Musolah";

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mosque" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Mosque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "mosqueId" TEXT NOT NULL,
    "dayClean" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_mosqueId_fkey" FOREIGN KEY ("mosqueId") REFERENCES "Mosque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
