require('dotenv').config();
const path = require('path');
const express = require('express');
const db = require('./src/models/sqlite');
const app = express();

// --- AGREGAR ESTO: Para que Express pueda leer los datos JSON que envía login.js ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- AGREGAR ESTO: La lógica del Login ---
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    // Buscamos en la tabla 'usuario' que creaste en src/models/sqlite.js
    const sql = `SELECT * FROM usuario WHERE usuario = ? AND password = ?`;
    
    db.get(sql, [usuario, password], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: "Error en el servidor" });
        }
        
        if (row) {
            // Si encontró al usuario con ese mail y contraseña
            res.json({ success: true });
        } else {
            // Si los datos no coinciden
            res.json({ success: false, message: "Email o contraseña incorrectos" });
        }
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>console.log(`✅ Servidor funcionando en: http://localhost:${PORT}`));