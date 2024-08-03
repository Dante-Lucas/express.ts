-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_do_usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "data_de_nascimento" DATETIME,
    "genero" TEXT,
    "telefone" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nome_do_usuario_key" ON "Usuario"("nome_do_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
