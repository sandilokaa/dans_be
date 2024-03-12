const authRepository = require("../repositories/authRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const { JWT } = require("../libs/jwtSecurity");

class AuthService {

    /* ------------- Handle Login ------------- */

    static async handleLogin({ username, password }) {

        try {
            
            const getUserByUsername = await authRepository.handleGetUserByUsername({ username });

            if (!getUserByUsername) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Username not found ):",
                    data: {
                        handleLogin: null,
                    },
                };

            } else {

                const isPassword = getUserByUsername.password;

                if (isPassword == password) {

                    const token = jwt.sign({
                        id: getUserByUsername.id,
                        username: getUserByUsername.username,
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    return {
                        status: true,
                        status_code: 201,
                        message: "User login successfully!",
                        data: {
                            token,
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Your username or password is incorrect!",
                        data: {
                            handleLogin: null,
                        },
                    };

                }
            }

        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    handleLogin: null,
                },
            };

        }

    };

    /* ------------- End Handle Login ------------- */

};

module.exports = AuthService;