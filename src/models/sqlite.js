const path = require('path');
const sqlite = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../../database.db');
// codigo para pasar bd a la original de aca
//const scarafiaPath = path.resolve(__dirname, '../../bdscarafia.db');

const db = new sqlite.Database(dbPath, (error) => {
    if (error) return console.error("Error al abrir database.db:", error.message);
    
    console.log("Conectado a database.db");

    // 1. Creamos la tabla de usuarios (la que ya tenías)
    const sqlUsuarios = `CREATE TABLE IF NOT EXISTS usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL)`;

    db.run(sqlUsuarios, (err) => {
        if (err) console.error("Error tabla usuarios:", err.message);

        // 2. PROCESO DE IMPORTACIÓN ÚNICA
        // Adjuntamos el archivo de la bd temporalmente
        /* db.run(`ATTACH DATABASE '${scarafiaPath}' AS temp_db`, (err) => {
            if (err) {
                console.log("Nota: El archivo bdscarafia.db no se encontró o ya fue procesado.");
                return;
            }

            // Copiamos la tabla Scarafia de la base externa a la base principal
            // Esto crea la tabla física adentro de 'database.db'
            db.run(`CREATE TABLE IF NOT EXISTS scarafia AS SELECT * FROM temp_db.scarafia`, (err) => {
                if (err) {
                    console.error("Error al copiar la tabla (quizás ya existe):", err.message);
                } else {
                    console.log("✅ ¡ÉXITO! La tabla SCARAFIA se ha copiado adentro de database.db");
                }

                // Desconectamos la base de datos externa porque ya no la necesitamos
                db.run(`DETACH DATABASE temp_db`);
            }); 
        });*/
    });
});

module.exports = db;

/* 
Cogigo para la insercion de datos:
 sql = `INSERT INTO usuario (usuario,password) VALUES(?,?)`;

db.run(sql,['admin','1234'],(error)=>{

            if (error){

                return console.error(error);

            }

        });  

*/ 