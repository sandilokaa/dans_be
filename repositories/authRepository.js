const { users } = require("../models");

class AuthRepository {

    /* ------------- Handle Get User By Username ------------- */

    static async handleGetUserByUsername({ username }) {

        const getUser = await users.findOne({
            where : { username }
        });

        return getUser;

    };

    /* ------------- End Handle Get User By Username ------------- */

};

module.exports = AuthRepository;