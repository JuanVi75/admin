const Departamentos = require("../models/departamentos.model");

/* =========================
   LISTAR
========================= */
function listar(req, res) {
    Departamentos.listarDepartamentos((err, results) => {
        if (err) {
            console.log("Error en controller departamentos:", err);
            return res.status(500).json({ error: "Error en base de datos" });
        }

        res.json(results);
    });
}

/* =========================
   CREAR
========================= */
function crear(req, res) {

    const { id, depto } = req.body;

    Departamentos.crearDepartamento(id, depto, (err, result) => {
        if (err) {
            console.log("Error en controller crear:", err);
            return res.status(500).json({ error: "Error al crear departamento" });
        }

        res.json({ ok: true });
    });
}

/* =========================
   MODIFICAR
========================= */
function modificar(req, res) {

    const id = req.params.id;
    const { depto } = req.body;

    Departamentos.modificarDepartamento(id, depto, (err, result) => {
        if (err) {
            console.log("Error en controller modificar:", err);
            return res.status(500).json({ error: "Error al modificar departamento" });
        }

        res.json({ ok: true });
    });
}

/* =========================
   BORRAR
========================= */
function borrar(req, res) {

    const id = req.params.id;

    Departamentos.borrarDepartamento(id, (err, result) => {
        if (err) {
            console.log("Error en controller borrar:", err);
            return res.status(500).json({ error: "Error al borrar departamento" });
        }

        res.json({ ok: true });
    });
}

module.exports = {
    listar,
    crear,
    modificar,
    borrar
};
