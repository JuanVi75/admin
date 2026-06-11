const express = require("express");
const path = require("path");

const app = express();

// Middleware para JSON (futuro CRUD)
app.use(express.json());

// 👉 Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// 👉 Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Puerto Hostinger o local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
