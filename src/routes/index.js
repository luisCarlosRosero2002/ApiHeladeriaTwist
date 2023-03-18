const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/',(req,res) => {
    console.log("Hola mundo");
    res.send("Hola mundo");
});

module.exports = router;