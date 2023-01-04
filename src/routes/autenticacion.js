const express = require("express");
const rutas = express.Router();
const passp = require('passport');

rutas.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// rutas.post('/signup', (req, res) => {
//     passport.authenticate('local.signup', {
//             successRedirect: '/profile',
//             failureRedirect: '/Error',
//             failureFlash: true
//     });
// });

rutas.post('/signup',  passp.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/Error',
        failureFlash: true
}));

rutas.get('/profile', (req, res) => {
    res.send('Este es tu perfil');
});

rutas.get('/Error', (req, res) => {
    res.send('Error');
});

module.exports = rutas;