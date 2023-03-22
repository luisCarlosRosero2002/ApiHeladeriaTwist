const mysqlConnection = require('../database');
const {
    isvalidToken
} = require('../libs/authentication');
const {
    secretJWT
} = require('../keys');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



// router.get('/login', isvalidToken ,async (req, res) => {
//     await mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
//         if (!err) {
//             res.json(rows);
//         } else {
//             console.log(err);
//         }
//     });

// });

router.post('/login', async (req, res) => {
    const {
        usuario,
        password
    } = req.body;
    await mysqlConnection.query('SELECT * FROM usuarios WHERE usuario =? AND password = ?', [usuario, password],
        (err, rows, fields) => {
            if (!err) {
                if (rows.length > 0) {

                    const user = JSON.stringify(rows[0]);
                    const token = jwt.sign(user, secretJWT);
                    res.status(200).json({
                        token
                    });
                } else {
                    res.status(401).json('Usuario o clave incorrecto');
                }
            } else {
                res.status(500).json(err.code);
                console.log('Error consulta: ' + err.code);
            }
        });
    // console.log(req.body);
});



// router.post('/login',async(req ,res) => {
//     console.log(req.body);
//     const { usuario,password } = req.body;
//     // const obtenerUsuario = { usuario,password };
//     // const response = await pool.query('SELECT * FROM usuarios WHERE usuario = "'+usuario+'" and password = "'+password+'"');
//     // console.log(response);
//     // if(response[0]){
//     //     req.flash('loginCorrecto','Bienvenido '+ response[0]['usuario']);
//     //     res.redirect('/twist/perfil');

//     // }else{
//     //     req.flash('loginError','Constraseña o Usuario incorrecto');
//     //     res.redirect('/twist/login');
//     // };
// });

// // router.get('/logup',(req ,res) => {
// //     res.render('heladeriaViews/logup');
// // });


// // router.post('/logup', passport.authenticate('local.logup', {
// //     successRedirect: '/twist/perfil',
// //     failureRedirect: '/twist/login',
// //     failureFlash: true
// // }));

// router.post('/login',passport.authenticate('local.login', {
//     successRedirect: '/twist/perfil',
//     failureRedirect: '/twist/login',
//     failureFlash: true
// }));
//     // (req, res, next)= {

//     // };



router.post('/register', async (req, res) => {

    const {
        nombres,
        apellidos,
        fechaNac,
        telefono,
        correo,
        direccion,
        usuario,
        password
    } = req.body;
    const addUser = {
        usuario,
        password
    };
    // await pool.query('INSERT INTO info_usuarios set ?', [nuevoUsuario]);

    await mysqlConnection.query('INSERT INTO usuarios set ?', [addUser],
        async (err, rows, fields) => {
            if (!err) {

                await mysqlConnection.query('SELECT * FROM usuarios WHERE usuario =? AND password = ?', [usuario, password],
                    async (err, rows, fields) => {
                        if (!err) {
                            if (rows.length > 0) {
                                console.log("Entrea a consultar");
                                const nuevoUsuario = {
                                    id_usuario: rows[0]['id'],
                                    nombres,
                                    apellidos,
                                    fechaNac,
                                    telefono,
                                    correo,
                                    direccion
                                };

                                await mysqlConnection.query('INSERT INTO info_usuarios set ?', [nuevoUsuario],
                                    (err, rows, fields) => {
                                        if (!err) {
                                           
                                            const user = JSON.stringify(rows[0]);
                                            const token = jwt.sign(user, secretJWT);
                                            res.status(200).json({
                                                token
                                            });
                                           
                                          
                                        } else {
                                            res.status(500).json(err.code);
                                            console.log('Error consulta: ' + err.code);
                                        }
                                    });

                            } else {
                                res.status(401);
                            }
                        } else {
                            res.status(500).json(err.code);
                            console.log('Error consulta: ' + err.code);
                        }
                    })



            } else {
                res.status(500).json(err.code);
                console.log('Error consulta: ' + err.code);
            }
        });
});

// router.get('/logout',isloLoggeedIn,(req, res, next) => {
//     req.logout( (err) => {
//         if (err) { return next(err); }
//         res.redirect('/twist/login')
//     });
// });

// router.get('/perfil', isloLoggeedIn , (req, res) => {
//     res.render('heladeriaViews/perfil')
//     console.log("Estas en el perfil");
// });


module.exports = router;