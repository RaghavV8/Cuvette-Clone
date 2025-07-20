const express = require('express');
const { createJob, singleJob, updateJob, showJobs, showJobsByUser, DeleteJob} = require("../controllers/jobsController")
const { isAuthenticated, isAdmin, isEmployer } = require('../middleware/auth')

const router = express.Router();

//job routes

// /api/job/create
router.post('/job/create', isAuthenticated, isEmployer, createJob);


// /api/job/id
router.get('/job/:id', singleJob);

// /api/job/update/job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);

// /api/job/show
router.get('/jobs/show', showJobs);

// /api/jobs/myjobs
router.get('/jobs/myjobs', isAuthenticated,showJobsByUser);

// /api/delete/:job_id
router.delete('/job/delete/:job_id',isAuthenticated, DeleteJob);

module.exports = router;
