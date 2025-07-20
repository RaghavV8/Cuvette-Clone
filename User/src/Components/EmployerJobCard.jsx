import React from 'react';
import "boxicons";
import { useNavigate } from 'react-router-dom';

const JobCard = ({ _id, title, location, description, salary, createdAt, onDelete, status }) => {
    const navigate = useNavigate();

    const deleteJob = async () => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        console.log(`Deleting job with ID: ${_id}`);


        console.log(`Sending DELETE request to: http://localhost:9000/api/job/delete/${_id}`);

        try {
            const response = await fetch(`http://localhost:9000/api/job/delete/${_id}`, {
                method: "DELETE",
                credentials: "include",
            });

            console.log("Response status:", response.status);  // Check if it's 404
            const result = await response.json();
            console.log("Delete API response", result);

            if (response.ok) {
                alert("Job Deleted succesfully !");
                if (onDelete) onDelete(_id); // Remove Job from UI
            } else {
                alert("Error deleting job: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Something went wrong while deleting the job.");
        }
    }
    return (
        <div>
            <div className='border-neutral-900 border-2 mt-5'>
                <div className="title p-3">
                    <div className='flex flex-row'>
                        <div className="Title-text font-bold text-xl flex-1">
                            {title}
                        </div>
                        <div className="cursor-pointer flex flex-row ">
                            <div onClick={() => navigate(`/company/home/editjob/${_id}`)}>
                                <box-icon name='edit-alt' className='transition-colors duration-200 hover:fill-green-700' size='sm'></box-icon>
                            </div>
                            <div onClick={deleteJob}>
                                <box-icon type='solid' name='trash-alt' className='transition-colors duration-200 hover:fill-red-700' size='sm'></box-icon>
                            </div>
                        </div>
                    </div>
                    <p className="location text-xs text-gray-500">
                        {location}
                    </p>
                </div>
                <div className="content p-2">
                    <div className="Description text-sm">
                        {description}
                    </div>
                    <div className="tertiary-data mt-2 p-2 flex flex-row">
                        <div className="salary text-sm text-gray-600 ">
                            Salary
                            <p className='text-xs text-blue-700'>
                                {salary}
                            </p>
                        </div>
                        <div className="created ml-5">
                            <div className="heading text-sm text-gray-700">
                                Date Created
                                <p>
                                    {new Date(createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
