const Usuarios = require("../models/usuarios.model");

/* =========================
   LISTAR
========================= */
function listar(req, res) {

   Usuarios.listarUsuarios((err, results) => {

      if (err) {
         console.error(err);
         return res.status(500).json({ error: "DB error usuarios" });
      }

      res.json(results);
   });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {

   Usuarios.crearUsuario(req.body, (err, result) => {

      if (err) {
         console.error(err);
         return res.status(500).json({ error: "DB error usuarios" });
      }

      res.json({ ok: true, result });
   });
}

/* =========================
   MODIFICAR
========================= */
function modificar(req, res) {

   Usuarios.modificarUsuario(req.params.id, req.body, (err, result) => {

      if (err) {
         console.error(err);
         return res.status(500).json({ error: "DB error usuarios" });
      }

      res.json({ ok: true, result });
   });
}

/* =========================
   BORRAR
========================= */
function borrar(req, res) {

   Usuarios.borrarUsuario(req.params.id, (err, result) => {

      if (err) {
         console.error(err);
         return res.status(500).json({ error: "DB error usuarios" });
      }

      res.json({ ok: true, result });
   });
}

/* =========================
   STATS
========================= */
function stats(req, res) {

   Usuarios.stats((err, result) => {

      if (err) {
         console.error(err);
         return res.status(500).json({ error: "DB error usuarios" });
      }

      res.json(result);
   });
}

module.exports = {
   listar,
   crear,
   modificar,
   borrar,
   stats
};