const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// ------------------------- Import Pattern ------------------------- //

const authController = require("./controllers/authController");
const jobController = require("./controllers/jobController")

// ------------------------- End Import Pattern ------------------------- //


// ------------------------- Import middlewares ------------------------- //

const middleware = require("./middlewares/auth");

// ------------------------- End Import middlewares ------------------------- //


// ------------------------- Define Routes ------------------------- //

// ------ Login ------ //

app.post('/v1/api/login', authController.handleLogin);

// ------ End Login ------ //

// ------ Job ------ //

app.get('/v1/api/jobs', middleware.authenticate, jobController.handleGetJobList);
app.get('/v1/api/jobs/:id', middleware.authenticate, jobController.handleGetJobById);

// ------ End Job ------ //

// ------------------------- End Define Routes ------------------------- //


// ------------------------- Server Listen ------------------------- //

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT http://localhost:${PORT}`);
});

// ------------------------- End Server Listen ------------------------- //

module.exports = app;