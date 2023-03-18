const express = require('express');
const mysqlConnection = require('../database');
const { isvalidToken } = require('../libs/authentication');
const router = express.Router();


router.get('/productos', isvalidToken, async (req, res) => {
    // console.log(req.data);


    await mysqlConnection.query('SELECT * FROM productos', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
            // console.log("me ejecute bien");
        } else {
            console.log(err);
        }
    })
});



// router.get('/productos' , async (req, res) => {
//     const helados = await pool.query('SELECT * FROM productos');
//     console.log({helados});

//     res.send(helados);
//     // res.render('heladeriaViews/productos',{ helados });
//     // res.send("Helados")
// });

router.get('/carrito', isvalidToken, async (req, res) => {

    const { id } = req.data;

    await mysqlConnection.query('SELECT * FROM carrito WHERE id = ?', [id],
        (err, rows, fields) => {

            if (!err) {
                res.status(200).json(rows);
            } else {
                console.log(err);
            }
        })

});

router.post('/carrito', isvalidToken ,async (req, res) => {

    const { id, } = req.data;
    const newCarrito = req.body;

    console.log(newCarrito);

    // await mysqlConnection.query('SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?', [newCarrito],
    //     (err, rows, fields) => {

    //         if (!err) {
    //             res.status(200).json(rows);
    //         } else {
    //             console.log(err);
    //         }
    //     })

    // const { id_producto, precioxUni } = req.body;

    // const boolProduct = await pool.query('SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?',[id_usuario,id_producto]);

    // console.log(boolProduct);
    // if(!boolProduct[0]){
    //     const newCarrito = {
    //         id_usuario,
    //         id_producto,
    //         subTotal:precioxUni,
    //         cantidad:1
    //     };
    //     console.log("no hay producto");
    //     const newProduct = await pool.query('INSERT INTO carrito set ? ',[newCarrito]);
    //     req.flash('registroCorrecto','El producto ha sido añadido satisfactorimente');
    // }else{
    //     console.log("si hay producto");

    //     // const addProducto
    // }

    // console.log("se añade el producto con id " + idProducto);

    // const response = await pool.query('SELECT * FROM productos WHERE id = ?',[idProducto]);
    // console.log("respuesta "+response[0]['id']);

    // res.redirect('/twist/productos');
});

module.exports = router;
