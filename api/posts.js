const path = require('path');
require("dotenv").config({ path: path.resolve('dotenv.env') });

const express = require("express");
const mysql = require("mysql");



var app = express();

var cors = require('cors')
app.use(cors())
 

const DB_HOST = process.env.DB_HOST

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const SERVER_PORT = process.env.PORT;
const db = mysql.createPool({
    
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

console.log(DB_DATABASE,DB_HOST,DB_USER,DB_PASSWORD,DB_PORT);
console.log(db);



app.use(express.json())
//middleware to read req.body.<params>
//CREATE USER
app.post("/createPost", async (req, res) => {
    
    const image = req.body.image;
    const title = req.body.title;
    const desc = req.body.desc;
    const status = 'pending'
    const user=1;

    
    
    db.getConnection(async (err, connection) => {
        console.log("Hi");
        console.log(err);
        console.log(title);
        console.log(desc);
        if (err) throw (err)
        
        
        const sqlInsert = "INSERT INTO tbl_content VALUES (0,1,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert, [image,title,desc,status,user])
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query(insert_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                // console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    // console.log("--------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
});

app.listen(SERVER_PORT,
    () => console.log(`Server Started on port ${SERVER_PORT}...`));




    