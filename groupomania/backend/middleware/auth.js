const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {

    if (req.body.data.userID) {
        const reqUserID = req.body.data.userID
    }

    if (req.body.userID) {
        const reqUserID = req.body.userID
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const userID = decodedToken.userID;
       
        if (req.body.data.userID !== userID) {
            throw 'Invalid user ID!';
        } else {
            next();
        } 
    } catch {
        res.status(401).json({
            error: 'Invalid request'
        });
    }
}