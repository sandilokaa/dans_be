const axios = require("axios");

class JobRepository {

    /* ------------- Handle Get Job List ------------- */

    static async handleGetJobList({ description, location, full_time = true, page = 1, itemsPerPage = 5 }) {

        try {

            const pageParams = `?page=${page}&itemsPerPage=${itemsPerPage}&full_time=${full_time}`

            const getResponseJobList = await axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions.json${pageParams}`);

            const getjobList = getResponseJobList.data;

            const filteredJobList = getjobList.filter(job => {

                const isDescriptionMatch = !description || job.description.toLowerCase().includes(description.toLowerCase());
                
                const isLocationMatch = !location || job.location.toLowerCase().includes(location.toLowerCase());

                return isDescriptionMatch && isLocationMatch;
            });

            return filteredJobList;
            
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