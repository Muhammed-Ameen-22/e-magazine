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
    const status = 'Pending'
    // const user = 1;
    const likes=0;
    const category = req.body.category;
    const sub=req.body.sub;

    console.log("Inside create post");

    console.log("Hi");

    console.log(title);
    console.log(desc);
    console.log(file);
    console.log(category);
    console.log(sub);

    const user_id = req.user.user_identity;
    console.log("session is this",req.user.user_identity);
    console.log('session is this', user_id)

    const sqlInsert = "INSERT INTO tbl_content VALUES (0,?,?,?,?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert, [user_id,category,file,desc, status, title,likes,date,sub])
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
console.log(req.body.content_Id)
   const postId=req.body.content_Id;
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

export const getApprovedPostsUser = async (req, res) => {

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

        console.log('reqbody', req.body)

        db.getConnection(async (err, connection) => {
            const cat=req.body.catg;
            const sub=req.body.sub;
            const date=req.body.date;

            if(cat === 0 && sub != 0 && date === 0)
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where  c.sub_id='?' and   content_Status='Accepted' order by content_Date desc;`
                let get_Qry = mysql.format(qry,[sub])
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
            else if(sub === 0 && cat != 0 && date === 0)
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where c.cat_ID='?' and content_Status='Accepted' order by content_Date desc;`
                let get_Qry = mysql.format(qry,[cat])
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
            else if(sub === 0 && cat === 0 && date != 0)
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where ((Month(content_Date) = '?') and content_Status='Accepted') order by content_Date desc;`
                let get_Qry = mysql.format(qry,[date])
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
            else if(sub != 0 && cat === 0 && date != 0)
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where content_Status='Accepted' and ((Month(content_Date)= '?') and c.sub_id='?')  order by content_Date desc;`
                let get_Qry = mysql.format(qry,[date,sub])
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
            else if(sub === 0 && cat != 0 && date !=0 )
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where content_Status='Accepted' and ((Month(content_Date)= '?') and c.cat_ID='?') order by content_Date desc;`
                let get_Qry = mysql.format(qry,[date,cat])
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
            else if(sub != 0 && cat != 0 && date === 0)
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where content_Status='Accepted' and (c.cat_ID='?' and c.sub_id = '?') order by content_Date desc;`
                let get_Qry = mysql.format(qry,[cat,sub])
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
            else if(sub === 0 && cat === 0 && date === 0)
            {
                let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
                c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
                inner join tbl_cat as t on t.cat_ID = c.cat_ID
                where content_Status='Accepted'  order by content_Date desc;`
                let get_Qry = mysql.format(qry)
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
            
         else{
        let qry = `SELECT c.cat_ID, c.content_Id, c.content_Image, c.content, c.content_Title, c.content_Likes,
         c.content_Date,c.user_ID,c.content_ID, t.cat_Name, t.cat_ID FROM tbl_content as c 
         inner join tbl_cat as t on t.cat_ID = c.cat_ID
         where (c.cat_ID='?' and c.sub_id='?') and  ((Month(content_Date) = '?') and content_Status='Accepted') order by content_Date desc;`
         let get_Qry = mysql.format(qry,[cat,sub,date])
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
