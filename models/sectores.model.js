const db = require("../config/db");

/* =========================
   LISTAR
========================= */
function listarSectores(callback) {
    const sql = `
        SELECT 
            id,
            sector,
            subcategoria,
            created_at,
            updated_at,
            deleted_at,
            is_deleted
        FROM sectores
        WHERE is_deleted = 0
        ORDER BY subcategoria ASC, sector ASC
    `;

    db.query(sql, (err, results) => {
        callback(err, results);
    });
}

/* =========================
   CREAR
========================= */
function crearSector(sector, subcategoria, callback) {
    const sql = `
        INSERT INTO sectores (sector, subcategoria, created_at, is_deleted)
        VALUES (?, ?, NOW(), 0)
    `;

    db.query(sql, [sector, subcategoria], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   MODIFICAR
========================= */
function modificarSector(id, sector, subcategoria, callback) {
    const sql = `
        UPDATE sectores 
        SET sector = ?, subcategoria = ?, updated_at = NOW()
        WHERE id = ?
          AND is_deleted = 0
    `;

    db.query(sql, [sector, subcategoria, id], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   BORRAR (LÓGICO)
========================= */
function borrarSector(id, callback) {
    const sql = `
        UPDATE sectores 
        SET is_deleted = 1, deleted_at = NOW()
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
        callback(err, result);
    });
}

/* =========================
   ESTADÍSTICAS
========================= */
function stats(callback) {
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

            GREATEST(
                COALESCE(MAX(created_at), '1970-01-01'),
                COALESCE(MAX(updated_at), '1970-01-01'),
                COALESCE(MAX(deleted_at), '1970-01-01')
            ) AS ultima_actualizacion

        FROM sectores;
    `;

    db.query(sql, (err, result) => {
        callback(err, result[0]);
    });
}

module.exports = {
    listarSectores,
    crearSector,
    modificarSector,
    borrarSector,
    stats
};
