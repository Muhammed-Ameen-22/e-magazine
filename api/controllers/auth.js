import mysql from 'mysql';
import { createRequire } from 'module';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const require = createRequire(import.meta.url);
const path = require('path');
require("dotenv").config({ path: path.resolve('dotenv.env') });

const DB_HOST = process.env.DB_HOST

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const db = mysql.createPool({

    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

export const login = (req, res) => {
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
   
                        // req.session.user=result[0].user_Name;
             
                        // var session=req.session;
                        // session.username=result[0].user_Name;
                        // session.user_identity = result[0].user_ID;


                        const username = result[0].user_Name;
                        const user_identity = result[0].user_ID;
                        console.log("This is session",req.session);
          
                          const token = jwt.sign({ username, user_identity }, process.env.JWT_SECRET, {
                            expiresIn: '25 days',
                          });

                          console.log("This is token",token);
                          res.cookie('token', token, {
                            httpOnly: true,
                            maxAge: 2160000000,
                            secure: process.env.ENV == 'production' ? true : false,
                          });


                        res.send(result);
    
                    } else {
                        res.send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
}


export const logout = (req, res) => {
    console.log("logging out ",req.session.user);
    res.clearCookie("token");
    console.log("Suvvess");
    req.session.destroy((err) => {
        //res.redirect('/') 
      })
    
      res.end();
}
