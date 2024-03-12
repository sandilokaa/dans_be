const jwt = require("jsonwebtoken");
const { JWT } = require("../libs/jwtSecurity");
const authRepository = require('../repositories/authRepository');

const authenticate = async (req, res, next) => {
    
    const authHeader = req.get("Authorization");
    
    let token = "";

    if(authHeader && authHeader.startsWith("Bearer")) {
        
        token = authHeader.split(" ")[1];

    } else {

        return res.status(401).send({
            status: false,
            message: "You must be logged in to access this resource!",
            data: null,
        });

    }

    try {

        const { username } = jwt.verify(token, JWT.SECRET);

        const getUserByUsername = await authRepository.handleGetUserByUsername({ username });

        req.user = getUserByUsername;

        next();

    } catch(err) {

        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({
                status: false,
                message: "The session has expired, please log in again!",
                data: null,
            });
        } else {
            console.error('JWT Verification Error:', err);
            return res.status(401).send({
                status: false,
                message: "Invalid token",
                data: null,
            });
        }

    } 

};

module.exports ={ authenticate };