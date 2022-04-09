import express from 'express';
import mysql from 'mysql';
const router = express.Router();

export const getAllUsers = async (req, res) => {
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
    let qry = `SELECT * FROM tbl_user;`;
    try {
        db.query(qry, (err, data) => {
            if (err) throw err;

            return res.status(200).json(data);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('internal server error');
    }

    });
};

export const getAllPosts = async (req, res) => {

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
    let qry = `SELECT * FROM tbl_content;`;
    try {
        db.query(qry, (err, data) => {
            if (err) throw err;

            return res.status(200).json(data);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('internal server error');
    }

    });
};

export const getEachPosts = async (req, res) => {
    

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
            // var datetime = new Date().toISOString().slice(0,10);
            // console.log("Date",datetime)
            console.log(req.body)
        let qry = `SELECT * FROM tbl_content where content_id=${req.body.body.content_Id};`;
        try {
            db.query(qry, (err, data) => {
                if (err) throw err;
    
                return res.status(200).json(data);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('internal server error');
        }
    
        });
    };

    export const acceptPost = async (req, res) => {
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
            // console.log('Request body',req.body)
            // console.log('Value',req.body.body.content_Id)
            // console.log('Request body',req.body.content_Id)
        let qry = `UPDATE tbl_content SET content_Status = 'Accepted' WHERE content_Id = ${req.body.body.content_Id};`;
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

    export const rejectPost = async (req, res) => {
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
            
                // console.log('Request body',req.body)
                // console.log('Value',req.body.body.content_Id)
                // console.log('Request body',req.body.content_Id)
            let qry = `UPDATE tbl_content SET content_Status = 'Rejected' WHERE content_Id = ${req.body.body.content_Id};`;
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

        export const getApprovedPosts = async (req, res) => {

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
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                 c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                 inner join tbl_cat as t on t.cat_ID = c.cat_ID
                 where content_Status='Accepted';`;
                try {
                    db.query(qry, (err, data) => {
                        if (err) throw err;
            
                        return res.status(200).json(data);
                    });
                } catch (error) {
                    console.error(error);
                    return res.status(500).send('internal server error');
                }
            
                });
            };


            export const changeStatus = async (req, res) => {
    

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
                        console.log('Reached ChangeStatus')
                        const id = req.body.body.user_Id;
                        const remark=req.body.body.user_remark;
                        const status =req.body.body.user_Status;
                        console.log('Status',req.body.body.user_Status)
                        // var datetime = new Date().toISOString().slice(0,10);
                        // console.log("Date",datetime)
                        console.log(req.body)
                    let qry = `Insert into tbl_remark values(0,?,?)`;
                    const insert_qry = mysql.format(qry, [id,remark])
                    let qry2 = `UPDATE tbl_user SET user_Status = ? WHERE user_ID = ?;`;
                    const update_qry = mysql.format(qry2, [status,id])
                    console.log(qry2);
                    let qry3 = `DELETE from tbl_remark where user_ID=?;`;
                    const delete_qry = mysql.format(qry3, [id])
                    console.log(qry2);       

                    console.log('Statuus',status)
                    try {
                        db.query(insert_qry, (err, data) => {
                            db.query(update_qry, (err, data) => {
                                if(status==='Active')
                                {
                                    db.query(delete_qry, (err, data) => {
                                        if   (err) throw err;
                
                           
                                });
                            }
                             
                            
                            if   (err) throw err;
                
                            return res.status(200).json(data);
                            });
                        });
                    } catch (error) {
                        console.error(error);
                        return res.status(500).send('internal server error');
                    }
                
                    });
                };


                export const createContest = async (req, res) => {
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
                            console.log('Reached createContest')
                            const from= req.body.body.from;
                            const to =req.body.body.to;
                            const cat= req.body.body.category
                            // console.log('Request body',req.body)
                            // console.log('Value',req.body.body.content_Id)
                            // console.log('Request body',req.body.content_Id)
                        let qry1 = `INSERT INTO tbl_contest values (0,?,?,?,'Pending');`;
                        const qry = mysql.format(qry1, [from,to,cat])
                            console.log("query",qry);
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

                    export const getAllContest = async (req, res) => {
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
                        as c inner join tbl_cat as cat on c.cat_ID=cat.cat_ID where c.contest_status="Pending"`;
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