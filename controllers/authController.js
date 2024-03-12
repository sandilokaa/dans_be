const authService = require("../services/authService");


/* ------------- Handle Login ------------- */

const handleLogin = async ( req, res ) => {

    const { username, password } = req.body;

    const { status, status_code, message, data} = await authService.handleLogin({
        username,
        password
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------- Handle Login ------------- */

module.exports = { handleLogin };