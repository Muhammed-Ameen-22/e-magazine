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