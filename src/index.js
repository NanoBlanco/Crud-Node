const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {engine} = require('express-handlebars');
const sesion = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const { nextTick } = require('process');
const sesionMysql = require('express-mysql-session')(sesion);

const { database } = require('./keys');

// Inicializando
const app = express();
require('./libs/passport.js');

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'Layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./libs/handelbars')
}));
app.set('view engine','.hbs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(sesion({
    secret: 'miSecreto',
    resave: false,
    saveUninitialized: false,
    store: new sesionMysql(database)
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(validator());

// Variables globales
app.use((req, res, next)=>{
    app.locals.message = req.flash('message');
    app.locals.exito = req.flash('exito');
    app.locals.usuario = req.usuario;
    next();
});


// Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/links', require('./routes/links'));

// Publico
app.use(express.static(path.join(__dirname, 'public')));


// Arrancando Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto : ',app.get('port'));
});