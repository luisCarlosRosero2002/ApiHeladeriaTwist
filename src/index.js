// importaciones
const express = require('express');
const morgan = require('morgan');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const flash = require('connect-flash');
// const session = require('express-session');
// const MySqlStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
const cors = require('cors');

// inicializaciones
const app = express();
// require('./lib/passport');

// configuraciones 
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname,'views'));
// app.engine('.hbs', exphbs.engine({
//     defaultLayout: 'main',
//     layoutsDir: path.join(app.get('views'), 'layouts'),
//     partialsDir: path.join(app.get('views'), 'partials'),
//     extname: '.hbs',
//     helpers: require('./lib/handlebars')
//   }))
// app.set('view engine','.hbs');

// middlewares
// app.use(session({
//     secret: 'secretSession',
//     resave: false,
//     saveUninitialized:false,
//     store: new MySqlStore(database)
// }));
// app.use(flash());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());

// variable globales
// app.use((req,res,next) => {
//     app.locals.loginCorrecto = req.flash('loginCorrecto');
//     app.locals.loginError = req.flash('loginError');
//     // app.locals.registroCorrecto = req.flash('registroCorrecto');
//     app.locals.usuario = req.user;

//     next();
// });

// rutas
app.use(require('./routes'));
app.use('/api',require('./routes/auth'));
app.use('/api',require('./routes/helados'));

// archivos publicos
// app.use(express.static(path.join(__dirname,'public')));



// inicio del servidor
app.listen(app.get('port'), () =>{
    console.log("Server corriendo en el puerto: " + app.get('port'));
});
