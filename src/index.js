const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const { nextTick } = require('process');

// Inicializando
const app = express();

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

// Variables globales
app.use((req, res, next)=>{
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