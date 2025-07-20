import React from 'react'
import 'boxicons';

const JobApplicantCards = ({ applicationId, applicantName, email, title, location, description, salary, createdAt, status, onStatusChange, fetchApplicants }) => {
    const updateStatus = async (status) => {
        try {
            console.log(`Sending request to update status to '${status}' for applicationId: ${applicationId}`);

            const response = await fetch(`http://localhost:9000/api/application/${applicationId}/status`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            });

            console.log(`Response received for applicationId: ${applicationId}, Status Code: ${response.status}`);


            const data = await response.json();
            if (response.ok) {
                console.log(`Application ${applicationId} successfully updated to '${status}'`);
                // Update UI immediately
                onStatusChange(applicationId, status);

                // Re-fetch from backend to ensure consistency
                fetchApplicants();
            }
        } catch (error) {
            console.error("Error updating application status", error);
        }
    }
    return (
        <div>
            <div>
                <div className='border-neutral-900 border-2 mt-5'>
                    <div className="title pl-4 p-2">
                        <div className="text-xl font-semibold mt-2 flex">
                            <div className="text-neutral-800 m-1 flex-1">Applicant Name: {applicantName}</div>
                            <div className='div m-1 '>
                                <div className="text-neutral-700 text-base">Mail: {email}</div>
                            </div>
                        </div>
                        <div className="Title-text  text-md ml-1">
                            <span className="font-bold">
                                {title} |
                            </span>
                            <span className="location text-md text-gray-501 ml-2 ">
                                {location}
                            </span>
                        </div>
                    </div>
                    <div className="content p-1 pl-4">
                        <div className="Description text-sm ml-1">
                            {description}
                        </div>
                        <div className="tertiary-data mt-3 p-2 flex flex-row">
                            <div className="salary text-sm text-gray-601 ml-1 ">
                                Salary
                                <p className='text-xs text-blue-701'>
                                    {salary}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex  flex-1">
                            <button onClick={() => updateStatus("accepted")}
                                className="Apply bg-blue-800 text-white text-sm p-2 m-3 rounded-md hover:bg-blue-900">
                                Accept
                            </button>
                            <button onClick={() => updateStatus("rejected")}
                                className="Apply bg-red-600 text-white text-sm p-2 m-3 rounded-md hover:bg-red-800">
                                Reject
                            </button>
                            <button onClick={() => updateStatus("pending")}
                                className="Apply bg-orange-400 text-white text-sm p-2 m-3 rounded-md hover:bg-orange-500">
                                Pending
                            </button>
                        </div>
                        {status === "pending" && (<div className='flex mr-4'>
                            <box-icon type='solid' size='sm' name='hourglass-top' className='fill-orange-400 mt-3' ></box-icon>
                            <div className="ml-1 text-lg text-orange-400 pt-3">Pending</div>
                        </div>
                        )}
                        {status === "accepted" && (<div className='flex mr-4'>
                            <box-icon type='solid' size='sm' name='check-circle' className='fill-green-600 mt-3' ></box-icon>
                            <div className="ml-1 text-lg text-green-600 pt-3">Accepted</div>
                        </div>
                        )}
                        {status === "rejected" && (<div className='flex mr-4'>
                            <box-icon type='solid' size='sm' name='x-circle' className='fill-red-600 mt-3' ></box-icon>
                            <div className="ml-1 text-lg text-red-600 pt-3">Rejected</div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobApplicantCards

