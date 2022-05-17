
// import { createRequire } from 'module';
// const path = require('path');
// require("dotenv").config({ path: path.resolve('dotenv.env') });

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { dirname } from 'path';
import posts from './routes/posts.js';
import authRoutes from './routes/auth.js';
import contest from './routes/contest.js';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import session from 'express-session';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import otp from './routes/otp.js';


const path = require('path');
require("dotenv").config({ path: path.resolve('dotenv.env') });



console.log("This is host",process.env);

global.__basedir = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.json());

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);


app.use(cookieParser());

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true , parameterLimit:50000 }));

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

// console.log(DB_DATABASE, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT);
// console.log(db);





app.use(express.json())
//middleware to read req.body.<params>
//CREATE USER
app.post("/createUser", async (req, res) => {

    // console.log("body",!req.body.name);
    // console.log("body",req.body);
    if(!req.body.name){
        res.send({ message: "Please enter a name" });
        return; 
    }
    if(!req.body.email){
        res.send({ message: "Please enter an email" });
        return; 
    }
    if(!String(req.body.email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        res.send({ message: "Please enter a valid email" });
        return; 
    }
    if(!req.body.password || req.body.password.length<5){
        res.send({ message: "Please enter a password greater than 5 characters" });
        return; 
    }

    console.log("Here");
    const user = req.body.name;
    const cd = req.body.cd;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const status = 'Active'
    console.log(user);
    // console.log(cd);
    // console.log(email);
    // console.log(hashedPassword);
    db.getConnection(async (err, connection) => {
        console.log("Connection established");

        console.log(email);
        if (err) throw (err)

        const sqlSearch = "SELECT * FROM tbl_user WHERE user_Email = ?"
        const search_query = mysql.format(sqlSearch, [email])
        const sqlInsert = "INSERT INTO tbl_user VALUES (0,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert, [user, cd, email, hashedPassword,status])

        const sqlInsert2 = "INSERT INTO tbl_login VALUES (?,?,'Content Creator')"
        const insert_query2 = mysql.format(sqlInsert2, [email, hashedPassword])

        // ? will be replaced by values
        // ?? will be replaced by string
        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.send({ message: "Email already exists!" });
                // res.sendStatus(409)
                
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.query(insert_query2, (err, result) => {

                        // connection.release()
                        if (err) throw (err)
                        console.log("--------> Created new User")
                        console.log(result.insertId)
                        // res.sendStatus(201)
                    })

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




app.get("/loginUser", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: "true", user: req.session.user });
        //   console.log('IN POST LOGIN')
    } else {
        res.send({ loggedIn: false });
    }
});



app.post("/changePassword", async (req, res) => {
    const email = req.body.email;
    
console.log('REQ',req.body)
    console.log("hi", req.body.email, req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection(async (err, connection) => {
        
        if (err) throw (err)
        
        const sqlInsert = "update tbl_user set user_Pass=? where user_Email=?"
        const insert_query = mysql.format(sqlInsert, [hashedPassword,email])
        // ? will be replaced by values
        // ?? will be replaced by string
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("Changed Password")
                    // console.log(result.insertId)
                    res.sendStatus(201)
                })
})
});

app.get("/logout", (req, res) => {
    console.log("logging out ",req.session.user);
    res.clearCookie("user_ID");
    req.session.destroy((err) => {
        //res.redirect('/') 
      })
    
      res.end();
});

//auth
app.use('/api',authRoutes);


//posts
app.use('/create', posts);
app.use('/fetch', posts);
app.use('/fetchPost',posts)
app.use('/eachPost',posts)
app.use('/post',posts);
app.use('/like',posts);
app.use('/status',posts);

//contest

app.use('/contest',contest);


//otp
app.use('/otp',otp);



app.listen(SERVER_PORT,
    () => console.log(`Server Started on port ${SERVER_PORT}...`));

