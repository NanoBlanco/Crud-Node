const passp = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database.js');
const helpers = require('./helpers.js');

// passp.use("local.signup", new LocalStrategy({
//         usernameField: "usuario",
//         passwordField: "clave",
//         passReqToCallback: true,
//     }, async (req, usuario, clave, done) => {
//         const [rows] = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);
//         if (rows.lenght > 0) {
//             done(null, false, req.flash("message", "El usuario ya existe, por favor escriba otro!"))
//         }else{
//             const { nombre } = req.body;
//             let newUser = {
//                 nombre,
//                 usuario,
//                 clave,
//             };
//             newUser.clave = await helpers.encryptPassword(clave);
//             // Grabando en DB
//             const [result] = await pool.query("INSERT INTO usuarios SET ? ", [newUser]);
//             newUser.id = result.insertId;
//             return done(null, newUser);
//         }
//     })
// );

passp.use('local.signup', new LocalStrategy({
    usuarioField: "usuario",
    claveField: "clave",
    passReqtoCallback: true
}, (req, usuario, clave, done) => {
    // const { nombre } = req.body;
    // const newUser = {
    //     usuario,
    //     nombre,
    //     clave,
    // };
    // try {
    //     newUser.clave = await helpers.encryptPassword(clave);
    //     const result = pool.query('INSERT INTO usuarios SET ?', [newUser]);
    //     newUser.id = result.insertId;
    //     return done(null, newUser);
    // } catch (error) {
    //     return done(null, false, req.flash('message', error));
    // }
    console.log('Cuerpo -> ', req.body);
}));

passp.serializeUser((user, done) => {
    done(null, user.id);
});

passp.deserializeUser(async (id, done) => {
    const fila = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, fila[0]);
});