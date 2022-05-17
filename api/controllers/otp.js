import otpGenerator from "otp-generator";
// import OTP from "../models/Otp.js";
// import User from "../models/User.js";
import { encode } from "../middlewares/crypt.js";
import nodemailer from "nodemailer";
import mysql from 'mysql';
import { verify_message, verify_subject_mail } from "../templates/email-verification.js";
// import { login_message, login_subject_mail } from "../templates/email-login.js";
import { decode } from "../middlewares/crypt.js";
import jwt from "jsonwebtoken";

export const generateOTP = async (req, res) => {


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
    try {
        db.getConnection(async (err, connection) => {
            const email = req.body.email;

            const sqlSearch = "SELECT * FROM tbl_user WHERE user_Email = ?"
        const search_query = mysql.format(sqlSearch, [email])

        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length === 0) {
                connection.release()
                console.log("No user")
                res.send({ message: "Try with registered email" });
                // res.sendStatus(409)
                
            }
        })

        
            console.log('mail', req.body.email)
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const now = new Date();
            // console.log("This is otp", otp);
            const expiration_time = AddMinutesToDate(now, 10);
            console.log("This is otp", otp);

            //Create OTP instance in DB

            // const otp_instance = await OTP.create({
            //     otp: otp,
            //     expiresAt: expiration_time
            // });
            const verify = 'false'
            let qry = `insert into tbl_otp values (0,?,?,?);`
            let get_Qry = mysql.format(qry, [otp, expiration_time, verify])
            console.log(get_Qry)


            try {
                db.query(get_Qry, async (err, data) => {
                    console.log('id', data.insertId)
                    const otp_id = data.insertId;
                    if (err) throw err;

                    var details = {
                        "timestamp": now,
                        "email": req.body.email,
                        "success": true,
                        "message": "OTP sent to user",
                        "otp_id": otp_id
                    }
                    console.log("details", details);
                    const encoded = await encode(JSON.stringify(details))
                    console.log("encoded details", encoded);




                    var email_message, email_subject;
                    const verify_subject_mail = "OTP: For Account Verification @E-Magazine"

                    email_message = verify_message(otp);
                    email_subject = verify_subject_mail;

                    // Create nodemailer transporter
                    const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: `${process.env.EMAIL_ID}`,
                            pass: `${process.env.EMAIL_PASSWORD}`
                        }
                    });

                    //Verify whether login is succesfull
                    transporter.verify((error, success) => {
                        if (error) {
                            console.log("Email validation failed");
                        }
                        else {
                            console.log("Ready to send the mails");
                        }
                    });


                    // creating the mail
                    const mailOptions = {
                        from: `"no-reply-@E-Magazine"<${process.env.EMAIL_ID}>`,
                        to: `${email}`,
                        subject: email_subject,
                        text: email_message,
                    };

                    await transporter.verify();

                    //Send Email
                    // await transporter.sendMail(mailOptions, (err, response) => {
                    //     if (err) {
                    //         return res.status(400).send({ "Status": "Failure", "Reason": err });
                    //     } else {

                    //         return res.send({ "Status": "Success", "Reason": encoded });
                    //     }
                    // });

                    return res.send({ "Status": "Success", "key": encoded });


                    //    return res.status(200).json(data);
                });


            } catch (error) {
                //    console.error(error);
                //    return res.status(500).send('internal server error');
            }
        })

    }
    
    catch (err) { }

};

function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}




export const validateOTP = async (req, res) => {
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


    try {
        db.getConnection(async (err, connection) => {
            // try {
            console.log('req body', req.body)
            var currentdate = new Date();
            // const { verification_key, otp, email } = req.body;
            const verification_key = req.body.key;
            const otp = req.body.otp;
            const email = req.body.email;
            console.log('VERIFICATION', verification_key)
            console.log('VERIFICATION', otp)
            console.log('VERIFICATION', email)
            if (!verification_key) {
                const response = { "Status": "Failure", "Reason": "Verification key cannot be blank" }
                return res.status(400).send(response)
            }
            if (!otp) {
                const response = { "Status": "Failure", "Reason": "OTP cannot be blank" }
                return res.status(400).send(response)
            }
            if (!email) {
                const response = { "Status": "Failure", "Reason": "Email cannot be blank" }
                return res.status(400).send(response)
            }

            let decoded;

            //Get the decoded verification_key
            try {
                decoded = await decode(verification_key)
                console.log('decoded', decoded)
            }
            catch (err) {
                const response = { "Status": "Failure", "Reason": "Bad Request", err }
                return res.status(400).send(response)
            }

            //obj will contain the decoded informations
            var obj = JSON.parse(decoded)
            const email_obj = obj.email

            // compare email
            if (email_obj != email) {
                const response = { "Status": "Failure", "Reason": "Use the correct otp associated with this mail" }
                return res.status(400).send(response)
            }

            //finding the otp from the db using id
            console.log('decoded Id', obj.otp_id)
            const otp_id = obj.otp_id;
            console.log('otp_id', otp_id)
            const FromDB = 'Select * from tbl_otp where id=?'
            let otpFromDB;
            let otpFetchquery = mysql.format(FromDB, [otp_id])
            // console.log(otpFromDB)

            try {
                db.query(otpFetchquery, (err, data) => {

                    otpFromDB = data[0];
                    console.log('otp from db inside query', otpFromDB.exp_date)



                    //check if user is present in Database

                    console.log('otp from db inside if', otpFromDB);
                    //Check if OTP is present in the Database
                    if (otpFromDB != null) {
                        console.log('hi')
                        //Check if OTP is already verified
                        if (otpFromDB.isVerified != true) {
                            console.log('hi')
                            //Check if OTP is expired 
                            if (compareDates(otpFromDB.exp_date, currentdate) == 1) {
                                console.log('hi')
                                //comparing both the otps
                  
                                if (otp == otpFromDB.otp) {
                                    console.log('Reached comparing')

                                    const update='update tbl_otp set isVerified=true where id=?';
                                    let update_Qry = mysql.format(update, [otpFromDB.id])
                                    try {
                                        db.query(update_Qry, (err, data) => {

                                        }
                                        )
                                    }
                                    catch(err){}

                                    const response = { "Status": "Success", "Reason": "OTP verified succesfully" }
                                    return res.status(200).send(response)
                                }
                                else {
                                    const response = { "Status": "Failure", "Reason": "OTP not matched" }
                                    return res.status(200).send(response)
                                }

                            }
                            else {
                                const response = { "Status": "Failure", "Reason": "OTP Expired! Please request new OTP" }
                                return res.status(200).send(response)
                            }
                        }
                        else {
                            const response = { "Status": "Failure", "Reason": "OTP already used! Please request new OTP" };
                            return res.status(200).send(response)
                        }
                    }
                    else {
                        const response = { "Status": "Failure", "Reason": "Bad Request" }
                        return res.status(200).send(response)
                    }





                    //    console.log('id',data.insertId)
                    // const otp_id=data.insertId;
                    if (err) throw err;

                    //    return res.status(200).json(data);
                });
            } catch (error) {
                //    console.error(error);
                //    return res.status(500).send('internal server error');
            }

            // //finding the user from the db using email
            // const userFrom = "Select * from tbl_user where user_Email= ?"

            // let userFromDB = mysql.format(userFrom, [email_obj])
            // console.log(userFromDB)

            // try {
            //     db.query(userFromDB, (err, data) => {
            //         //    console.log('id',data.insertId)
            //         // const otp_id=data.insertId;
            //         userFromDB = data[0];
            //         if (err) throw err;

            //         //    return res.status(200).json(data);
            //     });
            // } catch (error) {
            //     //    console.error(error);
            //     //    return res.status(500).send('internal server error');
            // }




            // }
            // catch (err) {
            //     const response = { "Status": "Failure", "Reason": err.message }
            //     return res.status(400).send(response)
            // }

        })

    }
    catch (err) {
        console.log('eRROR OCCURED')
    }
}

// returns 1 if first date is greater than second
function compareDates(d1, d2) {
    console.log('d1', d1, 'd2', d2)
    if (d1 > d2)
        return 1;

    else
        return 0;

}