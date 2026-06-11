const Departamentos = require("../models/departamentos.model");
const db = require("../config/db");

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

/* =========================
   ESTADÍSTICAS DASHBOARD
========================= */
function stats(req, res) {

    const sql = `
        SELECT 
            COUNT(*) AS total,

            SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS ingresados_hoy,

            SUM(CASE 
                WHEN updated_at IS NOT NULL 
                AND DATE(updated_at) = CURDATE() 
                THEN 1 ELSE 0 
            END) AS modificados_hoy,

            SUM(CASE 
                WHEN is_deleted = 1 
                AND DATE(deleted_at) = CURDATE() 
                THEN 1 ELSE 0 
            END) AS eliminados_hoy,

            MAX(created_at) AS ultima_actualizacion

        FROM departamentos;
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Error stats departamentos:", err);
            return res.status(500).json({ error: "Error stats" });
        }

        res.json(result[0]);
    });
}

module.exports = {
    listar,
    crear,
    modificar,
    borrar,
    stats
};
