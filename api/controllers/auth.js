import mysql from 'mysql';
import { createRequire } from 'module';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
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


    if(email == "admin@gmail.com" && password === "admin"){
    
        res.send({ isadmin: true });
        return;
    }

    db.query(
        "Select * from tbl_user where user_Email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                if (result[0].user_Status === "Active") {
                    bcrypt.compare(password, result[0].user_Pass, (error, response) => {
                        if (response) {

                            // req.session.user=result[0].user_Name;

                            // var session=req.session;
                            // session.username=result[0].user_Name;
                            // session.user_identity = result[0].user_ID;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


                            const username = result[0].user_Name;
                            const user_identity = result[0].user_ID;
                            console.log("This is session", req.session);

                            const token = jwt.sign({ username, user_identity }, process.env.JWT_SECRET, {
                                expiresIn: '25 days',
                            });

                            console.log("This is token", token);
                            res.cookie('token', token, {
                                httpOnly: false,
                                maxAge: 2160000000,
                                secure: process.env.ENV == 'production' ? true : false,
                            });


                            res.send(result);

                        } else {
                            res.send({ message: "Wrong username/password combination!" });
                        }
                    });
                } else {
                    db.query("select * from tbl_remark where user_ID = ?",result[0].user_ID,(err,result)=>{
                        if (err) {
                            res.send({ err: err });
                        }
                    const remark = result[0].remark;
                    res.send({ message: `Sorry your account has been disabled.  
                                             Reason: ${remark}` });
                    })
                    
                }

            } else {
                
                res.send({ message: `User doesn't exist` });
            }
        }
    );
}


export const logout = (req, res) => {
    console.log("logging out ", req.session.user);
    res.clearCookie("token");
    console.log("Successfully logged out");
    req.session.destroy((err) => {
        // res.redirect('/') 
    })

    res.end();
}
