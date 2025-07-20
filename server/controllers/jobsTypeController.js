const jobType = require('../models/jobTypeModel');
const ErrorResponse = require('../utils/errorResponse');
// const ErrorResponse = request('../utils/errorResponse');

//create job category
exports.createJobType = async(req, res, next)=>{
    try {
        const jobT = await jobType.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id,
        });
        res.status(201).json({
            success:true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//all jobs category
exports.allJobsType = async(req, res, next)=>{
    try {
        const jobT = await jobType.find();
        res.status(200).json({
            success:true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//update job category
exports.updateJobType = async(req, res, next)=>{
    try {
        let typeId = req.params.type_id.trim();
        const jobT = await jobType.findByIdAndUpdate(typeId, req.body, {new:true});
        res.status(200).json({
            success:true,
            jobT
        })
    } catch (error) {
        next(error);
    }
}

//delete job category
exports.deleteJobType = async(req, res, next)=>{
    try {
        let typeId = req.params.type_id.trim();
        const jobT = await jobType.findByIdAndRemove(typeId, req.body, {new:true});
        res.status(200).json({
            success:true,
            message: "Job type is Deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}