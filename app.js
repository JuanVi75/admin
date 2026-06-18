const express = require("express");
const path = require("path");

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC FILES */
app.use(express.static(path.join(__dirname, "public")));

/* ROUTES */
const departamentosRoutes = require("./routes/departamentos.routes");
const ciudadesRoutes = require("./routes/ciudades.routes");
const sectoresRoutes = require("./routes/sectores.routes");
const contactosRoutes = require("./routes/clienteContactos.routes");
const clientesRoutes = require("./routes/clientes.routes");
const clientesSucursalesRoutes = require("./routes/clientesSucursales.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const whatsappMensajesRoutes = require("./routes/whatsappMensajes.routes");

app.use("/departamentos", departamentosRoutes);
app.use("/ciudades", ciudadesRoutes);
app.use("/sectores", sectoresRoutes);
app.use("/contactos", contactosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/sucursales", clientesSucursalesRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/whatsapp-mensajes", whatsappMensajesRoutes);

/* HOME */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

/* SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
