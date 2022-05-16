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
            console.log('Request body',req.body.id)
            console.log('Value',req.body.id)
            // console.log('Request body',req.body.content_Id)
        let qry = `UPDATE tbl_contest SET contest_status = 'Ongoing' WHERE contest_Id = ${req.body.id};`;
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
            let qry = `UPDATE tbl_contest SET contest_status = 'Completed' WHERE contest_Id = ${req.body.id};`;
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
            // const category = req.body.category;
            const conId=req.body.conId;
            const sub=req.body.sub;
        
            console.log("Inside create post");
        
            console.log("Hi");
        
            console.log(title);
            console.log(desc);
            console.log(file);
        
            const user_id = req.user.user_identity;
            console.log("session is this",req.user.user_identity);
            console.log('session is this', user_id)
        
            const sqlInsert = "INSERT INTO tbl_contestpost VALUES (0,?,?,?,?,?,?,?,?,?)"
            const insert_query = mysql.format(sqlInsert, [user_id,file,desc, status, title,likes,date,conId,sub])
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
        

        export const getEachContest = async (req, res) => {
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
                // console.log('req bof y', req.body.body);
            let qry = `SELECT c.*,
             u.user_Name FROM tbl_contestpost as c
             inner join tbl_user as u 
             on c.user_ID = u.user_ID where contest_id= ${req.body.contest_Id} ;`;
            //  && c.content_Status ='pending' and 'accepted'
            console.log('qry',qry)
            try {
                db.query(qry, (err, data) => {
                    // console.log('res',res.json(data));
                    if (err) throw err;
                    
                    
                    return res.status(200).json(data);
                    // console.log('res',res)
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send('internal server error');
            }
        
            });
        };
        

        export const acceptContestPost = async (req, res) => {
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
                let qry = `UPDATE tbl_contestpost SET content_Status = 'Accepted' WHERE cp_id = ${req.body.content_Id};`;
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
        
            export const rejectContestPost = async (req, res) => {
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
                    let qry = `UPDATE tbl_contestpost SET content_Status = 'Rejected' WHERE cp_id = ${req.body.content_Id};`;
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

                export const getApprovedContestPosts = async (req, res) => {

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
                            // console.log(req.body)

            
            const sub=req.body.sub;
            const id=req.body.con_id;
            if(sub != 0)
            {

                        let qry = `SELECT   c.*, u.user_Name FROM tbl_contestpost as c 
                         inner join tbl_user as u 
                         on c.user_ID = u.user_ID
                         where (content_Status='Accepted' and c.sub_id='?') and contest_id = ? `;

                        
                         let get_Qry = mysql.format(qry,[sub,id])
                         console.log(get_Qry)
                        try {
                            db.query(get_Qry, (err, data) => {
                                if (err) throw err;
                    
                                return res.status(200).json(data);
                            });
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send('internal server error');
                        }
            }

            else if(sub === 0)
            {

                        let qry = `SELECT   c.*, u.user_Name FROM tbl_contestpost as c 
                         inner join tbl_user as u 
                         on c.user_ID = u.user_ID
                         where content_Status='Accepted' and contest_id = ? `;
                         let get_Qry = mysql.format(qry,[id])
                         console.log(get_Qry)
                        try {
                            db.query(get_Qry, (err, data) => {
                                if (err) throw err;
                    
                                return res.status(200).json(data);
                            });
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send('internal server error');
                        }
                    }

                        });
                    };
        



                    export const getWinnerContestPost = async (req, res) => {

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
                                // console.log(req.body)
                            let qry = `SELECT   c.*, u.user_Name FROM tbl_contestpost as c 
                             inner join tbl_user as u 
                             on c.user_ID = u.user_ID
                             where content_Status='Winner' and contest_id = ${req.body.contest_Id}`;
                             console.log(qry)
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
        
                        


                    export const getEachContestPosts = async (req, res) => {
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
                            console.log('req bof y', req.body);
                        let qry = `SELECT c.*,
                         u.user_Name, u.user_CD FROM tbl_contestpost as c
                         inner join tbl_user as u 
                         on c.user_ID = u.user_ID where cp_id= ${req.body.content_Id} ;`;
                        //  && c.content_Status ='pending' and 'accepted'
                        console.log('qry',qry)
                        try {
                            db.query(qry, (err, data) => {
                                // console.log('res',res.json(data));
                                if (err) throw err;
                                
                                
                                return res.status(200).json(data);
                                // console.log('res',res)
                            });
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send('internal server error');
                        }
                    
                        });
                    };


                    export const getEachCompContestPosts = async (req, res) => {
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
                            console.log('req bof y', req.body);
                        let qry = `SELECT c.*,
                         u.user_Name, u.user_CD FROM tbl_contestpost as c
                         inner join tbl_user as u 
                         on c.user_ID = u.user_ID where cp_id= ${req.body.content_Id} ;`;
                        //  && c.content_Status ='pending' and 'accepted'
                        console.log('qry',qry)
                        try {
                            db.query(qry, (err, data) => {
                                // console.log('res',res.json(data));
                                if (err) throw err;
                                
                                
                                return res.status(200).json(data);
                                // console.log('res',res)
                            });
                        } catch (error) {
                            console.error(error);
                            return res.status(500).send('internal server error');
                        }
                    
                        });
                    };



         export const likePost = async (req, res) => {


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
                    

                    
                        console.log("Inside Like post");
                    
                        console.log("Liking the post");
                    // console.log(req.body)
                    console.log(req.body.content_Id)
                       const postId=req.body.content_Id;
                    console.log("IDENTITY",req.user.user_identity)
                        const user_id = req.user.user_identity;
                        console.log("session is this",req.user.user_identity);
                        console.log('session is this', user_id)
                    
                        const sqlCheck="Select id from tbl_conlikes where user_ID= '?' and cp_id= '?' "
                        const check_query = mysql.format(sqlCheck,[user_id,postId])
                        const sqlInsertlike="UPDATE tbl_contestpost set content_Likes= content_Likes+1 where cp_id='?'"
                        const insert_likes=mysql.format(sqlInsertlike,[postId])
                        const sqlInsert = "INSERT INTO tbl_conlikes VALUES (0,?,?)"
                        const insert_query = mysql.format(sqlInsert, [user_id,postId])
                        console.log('Check query',check_query)
                       
                        db.getConnection(async (err, connection) => {
                            await connection.query(check_query, async(err,result)=>{
                                if(result.length===0){
                                    await connection.query(insert_query,async (err, result) => {
                                        if (err) throw (err)
                            
                                        else {
                                            await connection.query(insert_query, (err, result) => {
                                                connection.query(insert_likes)
                                                connection.release()
                                                if (err) throw (err)
                                                res.send('Liked');
                                                
                                            })
                                        }
                                    })
                    
                    
                                    
                                }
                                else{
                                    res.send('Already Liked');
                                }
                            })
                        
                        });
                    };
                    