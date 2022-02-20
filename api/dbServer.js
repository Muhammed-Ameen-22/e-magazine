const path = require('path');
require("dotenv").config({ path: path.resolve('dotenv.env') });

const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt")
// import jwt from 'jsonwebtoken';

const cors = require('cors');
const { response } = require('express');



const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "user_ID",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24 * 1000,
        },
    })
);




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

console.log(DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT);
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
        console.log("Connection established");
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
app.post("/createUser1", async (req, res) => {
    const user = req.body.name;

    console.log("hi", req.body.name, req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection(async (err, connection) => {
        console.log("LOGIN ENTERED")
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
        const search_query = mysql.format(sqlSearch, [user])
        const sqlInsert = "INSERT INTO userTable VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert, [user, hashedPassword])
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
}) //end of app.post()
app.listen(SERVER_PORT,
    () => console.log(`Server Started on port ${SERVER_PORT}...`));



// app.post("/loginUser", async (req, res)=> {
//     console.log('LOGIN BACKEND')
//     const user = req.body.email
//     const password = req.body.password
//     console.log(user , password)
//     db.getConnection ( async (err, connection)=> {
//      if (err) throw (err)
//      const sqlSearch = "Select * from tbl_user where user_Email = ?"
//      const search_query = mysql.format(sqlSearch,[user])
//      await connection.query (search_query, async (err, result) => {
//       connection.release()

//       if (err) throw (err)
//       if (result.length == 0) {
//        console.log("--------> User does not exist")
//     //    res.json({loggedIn: false, message: "User does not exist"})
//     //    res.sendStatus(404)
//       } 
//       else {
//           console.log("DATA FOUND")
//           console.log(result[0])
//          const hashedPassword = result[0].user_Pass
//          //get the hashedPassword from result
//         if (await bcrypt.compare(password, hashedPassword,(error,response)=>{
//             req.session.user = result;
//             console.log(req.session.user);
//         console.log("---------> Login Successful")
//         // res.send(`${user} is logged in!`)

//         // res.json({loggedIn: true, username: result[0].user_Name })
//         // res.redirect('http://localhost:3000/Write')
//         // window.location.replace("/Write")
//         // this.props.history.replace('/Write');

//         }));


//         else {
//         console.log("---------> Password Incorrect")
//         // res.json({loggedIn: false, message: "Wrong Password"})

//         alert("Password Incorrect")
//         } //end of bcrypt.compare()
//         res.end();
//       }//end of User exists i.e. results.length==0
//      }) //end of connection.query()
//     }) //end of db.connection()
//     }) //end of app.post()l


app.get("/loginUser", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
        //   console.log('IN POST LOGIN')
    } else {
        res.send({ loggedIn: false });
    }
});


//   const token = jwt.sign({ username, user_type, name }, process.env.JWT_SECRET, {
//     expiresIn: '25 days',
//   });

//   res.cookie('token', token, {
//     httpOnly: true,
//     maxAge: 2160000000,
//     secure: process.env.ENV == 'production' ? true : false,
//   });

app.post("/loginUser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "Select * from tbl_user where user_Email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].user_Pass, (error, response) => {
                    if (response) {
                        // req.session.user({ attributes: ['id', 'name', 'cd', 'email'] }) = result;
                        req.session.user=result[0].user_Name;
             
                        console.log(result[0].user_ID);

                        var session=req.session;
                        session.username=result[0].user_Name;
                        // console.log(session);
                        
                        console.log("This is session",req.session);
                        // console.log(req.session.user.name);
                        // return res.json({
                        //     error: false,
                        //     user: {
                        //         username,
                        //         user_type,
                        //         haschangedpass,
                        //         name,
                        //         isLoggedIn: true,
                        //     },
                        // });
                        //   console.log('Hello')
                        //   console.log(result)
                        res.send(result);
                        //   console.log(req.session.user[0].user_Email)
                    } else {
                        res.send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
});


app.get("/logout", (req, res) => {
    console.log("logging out ",req.session.user);
    res.clearCookie("user_ID");
    req.session.destroy((err) => {
        //res.redirect('/') 
      })
    
      res.end();
});
