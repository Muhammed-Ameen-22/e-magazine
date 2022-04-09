import express from 'express';
import mysql from 'mysql';
const router = express.Router();


export const startContest = async (req, res) => {
    console.log('updatePost')
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
        db.getConnection(async (err, connection) => {
            console.log('Reached eachPost')
            console.log(req.body)
            console.log('Request body',req.body.body.id)
            console.log('Value',req.body.id)
            // console.log('Request body',req.body.content_Id)
        let qry = `UPDATE tbl_contest SET contest_status = 'Ongoing' WHERE contest_Id = ${req.body.body.id};`;
       console.log('query',qry)
        try {
            db.query(qry, (err, data) => {
                if (err) throw err;
    
                return res.json(data);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('internal server error');
        }
    });
    };

    export const getCurrContest = async (req, res) => {
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
        db.getConnection(async (err, connection) => {
        let qry = `SELECT c.contest_id, c.from_date,c.to_date,c.cat_ID, cat.cat_ID,cat.cat_Name FROM tbl_contest
        as c inner join tbl_cat as cat on c.cat_ID=cat.cat_ID where c.contest_status="Ongoing"`;
        try {
            db.query(qry, (err, data) => {
                if (err) throw err;
                // console.log('res',data);
                
                return res.status(200).json(data);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('internal server error');
        }
    
        });
    };
    export const stopContest = async (req, res) => {
        console.log('updatePost')
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
            db.getConnection(async (err, connection) => {
                console.log('Reached eachPost')
    
                // console.log('Request body',req.body.id)
                // console.log('Value',req.body.body.content_Id)
                // console.log('Request body',req.body.content_Id)
            let qry = `UPDATE tbl_contest SET contest_status = 'Completed' WHERE contest_Id = ${req.body.body.id};`;
           console.log('query',qry)
            try {
                db.query(qry, (err, data) => {
                    if (err) throw err;
        
                    return res.json(data);
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send('internal server error');
            }
        });
        };


        export const getCompContest = async (req, res) => {
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
            db.getConnection(async (err, connection) => {
            let qry = `SELECT c.contest_id, c.from_date,c.to_date,c.cat_ID, cat.cat_ID,cat.cat_Name FROM tbl_contest
            as c inner join tbl_cat as cat on c.cat_ID=cat.cat_ID where c.contest_status="Completed"`;
            try {
                db.query(qry, (err, data) => {
                    if (err) throw err;
                    // console.log('res',data);
                    
                    return res.status(200).json(data);
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send('internal server error');
            }
        
            });
        };

        export const createContestPost = async (req, res) => {




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
        
        
            const date = new Date().toISOString().slice(0,10);
            // console.log("Date",datetime)
        
            const file = req.body.file;
            const title = req.body.title;
            const desc = req.body.desc;
            const status = 'pending'
            // const user = 1;
            const likes=0;
            const category = req.body.category;
            const contest_id=req.body.contest_id;
        
            console.log("Inside create post");
        
            console.log("Hi");
        
            console.log(title);
            console.log(desc);
            console.log(file);
        
            const user_id = req.user.user_identity;
            console.log("session is this",req.user.user_identity);
            console.log('session is this', user_id)
        
            const sqlInsert = "INSERT INTO tbl_contestpost VALUES (0,?,?,?,?,?,?,?,?,?)"
            const insert_query = mysql.format(sqlInsert, [user_id,category,file,desc, status, title,likes,date,contest_id])
            // ? will be replaced by values
            // ?? will be replaced by string
            db.getConnection(async (err, connection) => {
                await connection.query(insert_query, async (err, result) => {
                    if (err) throw (err)
        
                    else {
                        
                            connection.release()
                    
        
                            res.sendStatus(200);
                        
                    }
                }) //end of connection.query()
            });
        };
        
        