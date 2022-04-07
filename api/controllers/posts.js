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


    const date = new Date().toISOString().slice(0,10);
    // console.log("Date",datetime)

    const file = req.body.file;
    const title = req.body.title;
    const desc = req.body.desc;
    const status = 'pending'
    // const user = 1;
    const likes=0;
    const category = req.body.category;

    console.log("Inside create post");

    console.log("Hi");

    console.log(title);
    console.log(desc);
    console.log(file);

    const user_id = req.user.user_identity;
    console.log("session is this",req.user.user_identity);
    console.log('session is this', user_id)

    const sqlInsert = "INSERT INTO tbl_content VALUES (0,?,?,?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [user_id,category,file,desc, status, title,likes,date])
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
   const postId=req.body.body.content_Id;
console.log("IDENTITY",req.user.user_identity)
    const user_id = req.user.user_identity;
    console.log("session is this",req.user.user_identity);
    console.log('session is this', user_id)

    const sqlCheck="Select like_ID from tbl_likes where user_ID= '?' and content_Id= '?' "
    const check_query = mysql.format(sqlCheck,[user_id,postId])
    const sqlInsertlike="UPDATE tbl_content set content_Likes= content_Likes+1 where content_Id='?'"
    const insert_likes=mysql.format(sqlInsertlike,[postId])
    const sqlInsert = "INSERT INTO tbl_likes VALUES (0,?,?)"
    const insert_query = mysql.format(sqlInsert, [user_id,postId])
    console.log('Check query',check_query)
    // ? will be replaced by values
    // ?? will be replaced by string
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


                // await connection.query(insert_likes, async (err, result) => {
                //     if (err) throw (err)
        
                //     else {
                //         await connection.query(insert_likes, (err, result) => {
                //             connection.release()
                //             if (err) throw (err)
        
                //             res.send('Liked');
                //         })
                //     }
                // })
                
            }
            else{
                res.send('Already Liked');
            }
        })
        // await connection.query(insert_query, async (err, result) => {
        //     if (err) throw (err)

        //     else {
        //         await connection.query(insert_query, (err, result) => {
        //             connection.release()
        //             if (err) throw (err)

        //             res.sendStatus(200);
        //         })
        //     }
        // }) //end of connection.query()
    });
};



export const getUserPosts = async (req, res) => {


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



   

    console.log("Inside GETUSERpost");

// console.log(req.body)
//    const postId=req.body.body.content_Id;
console.log("IDENTITY",req.user.user_identity)
    const user_id = req.user.user_identity;
    // console.log("session is this",req.user.user_identity);
    console.log('session is this', user_id)

    const sqlGet="Select * from tbl_content where user_id = '?'"
    const get_query = mysql.format(sqlGet,[user_id])
    // const sqlInsertlike="UPDATE tbl_content set content_Likes= content_Likes+1 where content_Id='?'"
    // const insert_likes=mysql.format(sqlInsertlike,[postId])
    // const sqlInsert = "INSERT INTO tbl_likes VALUES (0,?,?)"
    // const insert_query = mysql.format(sqlInsert, [user_id,postId])
    // console.log('Check query',check_query)
    // ? will be replaced by values
    // ?? will be replaced by string
    db.getConnection(async (err, connection) => {
        
            try {
                db.query(get_query, (err, data) => {
                    if (err) throw err;
        
                    return res.status(200).json(data);
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send('internal server error');
            }
    });
};
