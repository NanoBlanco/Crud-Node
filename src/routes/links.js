const express = require("express");
const rutas = express.Router();

const pool = require('../database');

rutas.get('/add', (req, res) => {
    res.render('links/add');
});

rutas.post('/add', async (req, res) => {
    const { titulo, url, descrip } = req.body;
    const nuevo = {
        titulo,
        url,
        descrip
    };
    await pool.query('INSERT INTO links SET ?', [nuevo]);
    req.flash('exito', 'Enlace creado con éxito');
    res.redirect('/links');
});

rutas.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/lista', {links});
});

rutas.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('exito', 'Enlace borrado con éxito');
    res.redirect('/links');
});

rutas.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/editar', {link: link[0]});
});

rutas.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url, descrip } = req.body;
    const updated = {
        titulo,
        url,
        descrip
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [updated, id]);
    req.flash('exito', 'Enlace actualizado con éxito');
    res.redirect('/links');
});
module.exports = rutas;