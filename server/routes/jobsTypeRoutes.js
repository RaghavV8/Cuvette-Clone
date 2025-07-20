const express = require('express');
const { isAuthenticated, isAdmin } = require('../middleware/auth')
const { createJobType ,allJobsType, updateJobType, deleteJobType} = require('../controllers/jobsTypeController');
const router = express.Router();

//user routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createJobType );
// /api/type/create
router.get('/type/jobs', allJobsType );
//api/type/update/:type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType);
// /api/type/create
router.put('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType);




module.exports = router;