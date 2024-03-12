const jobService = require("../services/jobService");


/* ------------- Handle Get Job List ------------- */

const handleGetJobList = async ( req, res, next ) => {

    const { description, location, full_time } = req.query;

    const { status, status_code, message, data} = await jobService.handleGetJobList({
        description,
        location,
        full_time
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------- End Handle Get Job List ------------- */


/* ------------- Handle Get Job By Id ------------- */

const handleGetJobById = async ( req, res, next ) => {

    const { id } = req.params;

    const { status, status_code, message, data} = await jobService.handleGetJobById({ id });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });

};

/* ------------- End Handle Get Job By Id ------------- */


module.exports = { handleGetJobList, handleGetJobById };