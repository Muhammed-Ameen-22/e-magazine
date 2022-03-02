import express from 'express';
import mysql from 'mysql';
const router = express.Router();


export const createPost = async (req, res) => {




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



    const file = req.body.file;
    const title = req.body.title;
    const desc = req.body.desc;
    const status = 'pending'
    // const user = 1;
    const category = req.body.category;

    console.log("Inside create post");

    console.log("Hi");

    console.log(title);
    console.log(desc);
    console.log(file);

    const user_id = req.session.user_identity;
    console.log("session is this",req.session.user_identity);
    console.log('session is this', user_id)

    const sqlInsert = "INSERT INTO tbl_content VALUES (0,?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [user_id,category,file,desc, status, title])
    // ? will be replaced by values
    // ?? will be replaced by string
    db.getConnection(async (err, connection) => {
        await connection.query(insert_query, async (err, result) => {
            if (err) throw (err)

            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)

                    res.sendStatus(200);
                })
            }
        }) //end of connection.query()
    });
};





