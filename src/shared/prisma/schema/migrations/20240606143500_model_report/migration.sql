/*
  Warnings:

  - You are about to drop the `Clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Harvests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Clients";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Harvests";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mail_agricultor" TEXT NOT NULL,
    "nombre_agricultor" TEXT NOT NULL,
    "apellido_agricultor" TEXT NOT NULL,
    "mail_cliente" TEXT NOT NULL,
    "nombre_cliente" TEXT NOT NULL,
    "apellido_cliente" TEXT NOT NULL,
    "nombre_campo" TEXT NOT NULL,
    "ubicacion_campo" TEXT NOT NULL,
    "fruta_cosechada" TEXT NOT NULL,
    "variedad_cosechada" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Reports_fruta_cosechada_key" ON "Reports"("fruta_cosechada");
