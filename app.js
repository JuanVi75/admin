const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* TEST DIRECTO SIN ROUTES */
app.get("/departamentos", (req, res) => {
  res.json([
    { id: 1, depto: "TEST ANTIOQUIA" },
    { id: 2, depto: "TEST CUNDINAMARCA" }
  ]);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
