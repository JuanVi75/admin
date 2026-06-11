const Departamentos = require("../models/departamentos.model");

function listar(req, res) {
    Departamentos.listarDepartamentos((err, results) => {
        if (err) {
            console.log("Error en controller departamentos:", err);
            return res.status(500).json({ error: "Error en base de datos" });
        }

        res.json(results);
    });
}

module.exports = {
    listar
};
