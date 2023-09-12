const { Router } = require('express');
const db = require('../database');


const router = Router();

// /users/

// Get all users
router.get('/',(req,res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error al consultar la BD',err);
            res.status(500).send('Error 500');
        }else{
            res.json(results);
        }
    });
});

// post new user
router.post('/',(req,res)=>{

    const query = 'INSERT INTO users (email,password) VALUES (?,?)';
    db.query(query,[req.body.email,req.body.password],(err,results)=>{
        if(err){
            // console.error('Error al consultar la BD',err);
            res.status(422).send('Error 422');
        }else{
            res.json(req.body);
        }
    }  )
});

// get specific user
router.get('/:id',(req,res) => {
    const query = 'SELECT * FROM users WHERE id = ?'
    db.query(query, [req.params.id],(err,results) =>{
        if(err){
            console.error('Error al traer usuario de la BD',err);
        }else{
            console.log("success");
            res.json(results)
        }
    } );
});

module.exports = router;