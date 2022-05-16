import otpGenerator from "otp-generator";
// import OTP from "../models/Otp.js";
// import User from "../models/User.js";
import { encode } from "../middlewares/crypt.js";
import nodemailer from "nodemailer";
import mysql from 'mysql';
import { verify_message, verify_subject_mail } from "../templates/email-verification.js";
// import { login_message, login_subject_mail } from "../templates/email-login.js";


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
    try{
    db.getConnection(async (err, connection) => {
        const email=req.body.email;
console.log('mail',req.body.email)
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

let qry = `insert into tbl_otp values (0,?,?);`
let get_Qry = mysql.format(qry,[otp,expiration_time])
console.log(get_Qry)


try {
   db.query(get_Qry, (err, data) => {
       if (err) throw err;

    //    return res.status(200).json(data);
   });
} catch (error) {
//    console.error(error);
//    return res.status(500).send('internal server error');
}
var details = {
    "timestamp": now,
    "email": req.body.email,
    "success": true,
    "message": "OTP sent to user",
    // "otp_id": otp_instance.id
}
console.log("details", details);
const encoded = await encode(JSON.stringify(details))
console.log("encoded details", encoded);




var email_message, email_subject;
const verify_subject_mail = "OTP: For Account Verification @SocialMedia"

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
})
    }
catch (err)
{}

};

function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

