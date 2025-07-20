import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_RESET, JOB_LOAD_SUCCESS } from "../constants/jobconstant"

export const loadJobReducer =  (state={jobs:[]}, action) =>{
    //  console.log("Redux Action Received:", action);
    switch (action.type) {
        case JOB_LOAD_REQUEST:
            return {loading:true, jobs: []};
        case JOB_LOAD_SUCCESS:
            return {
                loading: false, 
                success: action.payload.success,
                page: action.payload.page,
                pages: action.payload.pages,
                count: action.payload.count,
                setUniqueLocation: action.payload.setUniqueLocation,
                jobs: action.payload.jobs || []
            };
        case JOB_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload,
                jobs: []
            };
        case JOB_LOAD_RESET:
            return {jobs: []};
    
        default:
            return state;
    }
}