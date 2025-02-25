const { Router } = require('express');
const db = require('../database');
const jwt = require('jsonwebtoken');
const validateToken = require('../validateToken');
const router = Router();

// /users/

// Get all users
router.get('/',validateToken,(req,res) => {
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
    })
});

// login user
router.post('/login',(req,res)=>{
    const query = 'SELECT email,password FROM users WHERE email = ? and password = ? ';
    const email = req.body.email;
    const password = req.body.password;
    db.query(query,[email,password],(err,results)=>{
        if(err){
            res.status(500).send(err);
        }else{
            console.log(req.body)
            if (results.length == 1) {
                const token = jwt.sign({
                    email:email,
                }, process.env.SECRET_KEY)
                res.json(token);
            }else{
                res.status(401).json({ error:'Invalid user or password' });
            }
        }
    });
});

// get specific user
router.get('/:id',validateToken,(req,res) => {
    const query = 'SELECT * FROM users WHERE id = ?'
    db.query(query, [req.params.id],(err,results) =>{
        if(err){
            console.error('Error al traer usuario de la BD',err);
        }else{
            console.log("success");
            res.json(results)
        }
    });
});

module.exports = router;