import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {

     

    //throw error if cookie is null
    console.log('COOKIE',req.cookies);
    if (!req.cookies.token) {
        const response = { "Status": "Failure", "Reason": "Please login first" }
        return res.status(400).send(response)
    }
    try {
 console.log('COOKIE INSIDE TRY',req.cookies);
        //verify the jwt
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);  
        const { username, user_identity } = user;
        req.user = { username, user_identity };

    } catch (error) {
        const response = { "Status": "Failure", "Reason": "Bad Request" }
        return res.status(400).send(response)
    }
    next();
};