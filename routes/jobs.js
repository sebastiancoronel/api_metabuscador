const { Router } = require('express');
const db = require('../database');
const jwt = require('jsonwebtoken');
const validateToken = require('../validateToken');



const router = Router();

// /jobs/
router.get('/', /*validateToken ,*/(req,res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
        if (err) {
            console.error('Error al consultar la BD',err);
            res.status(500).send('Error 500');
        }else{
            res.json(results);
        }
    });
});

module.exports = router;