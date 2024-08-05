
const { Pool } = require('pg');

const pool = new Pool({
    user:"root",
    password:"root",
    database:"postgres",
    host:"localhost",
    port:5432
});

pool.connect(function(err,data){
    if(err){
        console.log("err",err);
    }
    console.log(`Database connected`)
})

module.exports = pool