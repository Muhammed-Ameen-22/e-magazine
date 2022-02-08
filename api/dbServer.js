const path = require('path');
require("dotenv").config({ path: path.resolve('dotenv.env') });

const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt")
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
app.post("/createUser", async (req, res) => {
    console.log("Hello12");
    // console.log(db);
    const user = req.body.name;
    const cd = req.body.cd;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(user);
    // console.log(cd);
    // console.log(email);
    // console.log(hashedPassword);
    db.getConnection(async (err, connection) => {
        console.log("Hi");
        console.log(err);
        console.log(email);
        if (err) throw (err)
        
        const sqlSearch = "SELECT * FROM tbl_user WHERE user_Email = ?"
        const search_query = mysql.format(sqlSearch, [user])
        const sqlInsert = "INSERT INTO tbl_user VALUES (0,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert, [user, cd, email, hashedPassword])
        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("--------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        }) //end of connection.query()
    }) //end of db.getConnection()
});






    //middleware to read req.body.<params>
    //CREATE USER
    app.post("/createUser1", async (req,res) => {
    const user = req.body.name;
    console.log("hi",req.body.name,req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.getConnection( async (err, connection) => {
     if (err) throw (err)
     const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
     const search_query = mysql.format(sqlSearch,[user])
     const sqlInsert = "INSERT INTO userTable VALUES (?,?)"
     const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
     // ? will be replaced by values
     // ?? will be replaced by string
     await connection.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length != 0) {
       connection.release()
       console.log("------> User already exists")
       res.sendStatus(409) 
      } 
      else {
       await connection.query (insert_query, (err, result)=> {
       connection.release()
       if (err) throw (err)
       console.log ("--------> Created new User")
       console.log(result.insertId)
       res.sendStatus(201)
      })
     }
    }) //end of connection.query()
    }) //end of db.getConnection()
    }) //end of app.post()
    app.listen(SERVER_PORT,
        () => console.log(`Server Started on port ${SERVER_PORT}...`));