import React from 'react'

const JobCard = ({ _id, title, location, description, salary, createdAt }) => {
    const applyForJob = async () => {
        try {
            if (!_id) { // ✅ Check if _id exists before using it
                console.error("Error: Job ID is undefined");
                return;
            }

            console.log("Job ID received:", _id);

            const response = await fetch("http://localhost:9000/api/apply", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ jobId: _id })
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Succesfully Applied !");
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error("Error applying for job:", error);
        }
    };
    return (
        <div>
            <div className='border-neutral-900 border-2 mt-5'>
                <div className="title p-3">
                    <div className="Title-text font-bold text-xl">
                        {title}
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
                <button onClick={applyForJob} className="Apply bg-blue-800 text-white text-sm p-2 m-3 rounded-md hover:bg-blue-900">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobCard;
