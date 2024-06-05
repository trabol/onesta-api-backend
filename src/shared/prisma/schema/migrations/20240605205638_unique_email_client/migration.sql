/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Clients_email_nombre_key";

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");
