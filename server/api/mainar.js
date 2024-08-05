const express = require('express');
const pool = require('../database');
const router = express.Router();


router.post('/post', async (req,res)=>{
   const  item  = req.body
   console.log(JSON.stringify(item));
    try{
        const insertRoomQuery = "INSERT INTO rooms (room_name) VALUES ($1)";
          pool.query(insertRoomQuery,[item],(err,data)=>{
      if(err){
        res.send({status:201,msg:'something wrong on post api'})
      }
      else{
        res.send({status:200,data:data})
      }
                
        });
        // res.status(201).json(newRoom.rows[0]);
    }
    catch(err){

    }
})
router.get('/profile/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const selectQuery = 'SELECT id, room_name FROM rooms WHERE room_name = $1';
        pool.query(selectQuery, [id], (err, data) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).send({status: 500, err: 'Profile API encountered an error'});
            } else if (data.rows.length === 0) {
                res.status(404).send({status: 404, msg: 'Room not found'});
            } else {
                res.status(200).send({status: 200, data: data.rows[0]});
            }
        });
    } catch (error) {
        console.error('Catch block error:', error);
        res.status(500).send({status: 500, msg: 'Internal server error'});
    }
});





module.exports = router;