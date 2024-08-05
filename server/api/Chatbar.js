const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/profile',async (req,res)=>{
    try{
        const select = 'SELECT * FROM auth ';
        pool.query(select, (err,data) => {
            if(err){
                res.send({status: 201, msg: "error getting profile"})
            }
            else{
                res.send({status: 200, data: data})
            }
        })
        

    }
    catch(error){
        res.status(500).json({message:`Internal server error ${error}`})
    }
})

module.exports =router;
