const axios = require("axios");

class JobRepository {

    /* ------------- Handle Get Job List ------------- */

    static async handleGetJobList({ description, location, page = 1, limit = 5 }) {

        try {

            const getResponseJobList = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions.json`);

            const getjobList = getResponseJobList.data;

            let filteredJobList = getjobList.filter(job => {

                const isDescriptionMatch = !description || job.description.toLowerCase().includes(description.toLowerCase());
                
                const isLocationMatch = !location || job.location.toLowerCase().includes(location.toLowerCase());

                return isDescriptionMatch && isLocationMatch;
            });

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const totalPages = (Math.ceil(filteredJobList.length / limit));
            filteredJobList = filteredJobList.slice(startIndex, endIndex);

            return {
                totalItems: filteredJobList.length,
                totalPages: totalPages,
                currentPage: page,
                limit: limit,
                jobs: filteredJobList
            }
            
        } catch (err) {

            console.error('Error:', err.message);
            throw err;
            
        }

    };

    /* ------------- End Handle Get Job List ------------- */


    /* ------------- Handle Get Job By Id ------------- */

    static async handleGetJobById({ id }) {

        try {

            const getResponseJobList = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions.json`);

            const getjobList = getResponseJobList.data;

            const filteredJobById = getjobList.filter(job => {

                if (job.id == id) return job 

            });

            return filteredJobById;
            
        } catch (err) {
            
            console.error('Error:', err.message);
            throw err;

        }

    };

    /* ------------- End Handle Get Job By Id ------------- */

};

module.exports = JobRepository;