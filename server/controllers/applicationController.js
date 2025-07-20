const Application = require("../models/applicatonModel");
const Job = require("../models/jobModel");

//Apply for a job
exports.applyForJob = async ( req,res,next)=>{
    try {
        const { jobId }= req.body;

        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: "User not authenticated" });
        }

        //check if Job Exists
        const job = await Job.findById(jobId);
        if(!job) return res.status(404).json({
            success:false,
            error: "Job not found"
        });

        const existingApplication = await Application.findOne({user: req.user.id, job: jobId});
        if(existingApplication) return res.status(400).json({success: false,error: "Already applied to this job"});

        //Create application
        const application = await Application.create({
            user: req.user.id,
            job: jobId
        });

        res.status(201).json({success: true, application});
    } catch (error) {
        next(error);
    }
}

// To get Applied Jobs for the USer to show which jobs he/she has applied for
exports.getAppliedJobs = async( req,res,next) =>{
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, error: "User not authenticated" });
        }

        //Fetch applications and populate job details   
        const applications = await Application.find({user: req.user.id}).populate("job");

         if (!applications || applications.length === 0) {
            return res.status(200).json({ success: true, message: "No applied jobs found", applications: [] });
        }

        res.status(200).json({success:true, applications});
    } catch (error) {
        console.error("Error in getAppliedJobs:", error); 
       next(error); 
    }
};

//To Delete application from users page
exports.removeApplication = async (req,res,next) =>{
    try {
        const { applicationId }= req.params;

        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({status: false, error: "Application not found"});
        }
        await Application.findByIdAndDelete(applicationId);

        res.status(200).json({succes:true, message:"Application removed succesfully"});
    } catch (error) {
        next(error);
    }
};

//To send Applicants details to employer
exports.getCompanyApplicants = async (req,res,next) =>{
    try {
        const applications = await Application.find({})
        .populate("user", "firstName lastName email")
        .populate("job", "title location description salary");

        res.status(200).json({success:true, applications});
    } catch (error) {
        console.error("Error fetching applicants:",error);
        res.status(500).json({success:false, error:"Internal server Error"});s
    }
};

//To Updated the status of applicants
exports.changeStatus= async(req,res,next)=>{
    try {
        const { status } = req.body;
        console.log(`Received status update request: ${status}`);

        // Validate status input
        if (!["accepted", "rejected", "pending"].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const application = await Application.findByIdAndUpdate(req.params.id, {status},{new:true});
        
        if(!application){
            return res.status(404).json({error: "Application not found"});
        }

        res.json({message: "Status Updated",application});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"});
    }
};