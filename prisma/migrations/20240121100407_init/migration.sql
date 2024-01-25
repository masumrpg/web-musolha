-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'member');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "namaLengkap" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "desa" VARCHAR(20) NOT NULL,
    "rtRw" VARCHAR(100) NOT NULL,
    "noHp" VARCHAR(14) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absensi" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musolah" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(100) NOT NULL,

    CONSTRAINT "Musolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "musolahId" TEXT NOT NULL,
    "hariBersih" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Absensi" ADD CONSTRAINT "Absensi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_musolahId_fkey" FOREIGN KEY ("musolahId") REFERENCES "Musolah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
