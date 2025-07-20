const express = require("express");
const { isAuthenticated } = require("../middleware/auth")
const { applyForJob ,getAppliedJobs, removeApplication, getCompanyApplicants, changeStatus} = require("../controllers/applicationController");

const router= express.Router();

router.post("/apply", isAuthenticated, applyForJob);
router.get("/applied", isAuthenticated, getAppliedJobs);

//Delete Application route
router.delete("/application/:applicationId",isAuthenticated, removeApplication);

//To Get Company Applicants
router.get("/company/applicants", getCompanyApplicants);

//To Change the status of the Application
router.put(`/application/:id/status`,isAuthenticated, changeStatus);

module.exports = router;