const express = require('express');
const app = express();
const db = require('./database');
const jwt = require('jsonwebtoken');

const validateToken = (req,res,next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')){
        //Has token
        // Verify token
        const tokenRaw = headerToken.split(" ");
        const token = tokenRaw[1];
        try {
            const validToken = jwt.verify(token,process.env.SECRET_KEY);
            next();
            
        } catch (error) {
            res.status(500).json({
                msg: 'Acceso denegado'
            })
        }
    }else{
        res.status(404).json({
            error:'Acceso Denegado'
        });
    }
};

module.exports = validateToken;