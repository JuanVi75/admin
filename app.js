const express = require("express");
const path = require("path");

const app = express();

// Middleware JSON
app.use(express.json());

/* =========================
   RUTAS DEL SISTEMA
========================= */
const departamentosRoutes = require("./routes/departamentos.routes");

// 👉 API departamentos
app.use("/departamentos", departamentosRoutes);

/* =========================
   FRONTEND
========================= */
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
