const jobRepository = require("../repositories/jobRepository");

class JobService {

    /* ------------- Handle Get Job List ------------- */

    static async handleGetJobList({ description, location, full_time }) {

        try {

            const getedJobList = await jobRepository.handleGetJobList({ description, location, full_time });

            return {
                status: true,
                status_code: 201,
                message: "Job data displayed successfully(:",
                data: {
                    handleGetJobList: getedJobList,
                },
            }; 
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    handleGetJobList: null,
                },
            };

        }

    };

    /* ------------- End Handle Get Job List ------------- */


    /* ------------- Handle Get Job By Id ------------- */

    static async handleGetJobById({ id }) {

        try {

            const getedJobById = await jobRepository.handleGetJobById({ id });

            return {
                status: true,
                status_code: 201,
                message: "Job detail data displayed successfully(:",
                data: {
                    handleGetJobById: getedJobById,
                },
            }; 
            
        } catch (err) {
            
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    handleGetJobById: null,
                },
            };

        }

    };

    /* ------------- End Handle Get Job By Id ------------- */

};

module.exports = JobService;