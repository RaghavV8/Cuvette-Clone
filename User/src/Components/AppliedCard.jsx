import React from 'react'
// This card is for Student's Applied Section
const AppliedCard = ({ applicationId, title, location, description, salary, createdAt,status, onRemove }) => {
    const handleRemove = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/application/${applicationId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await response.json();
            if (response.ok) {
                //For Debugging Remove function
                // console.log("onRemove function:", onRemove);
                // if (typeof onRemove !== "function") {
                //     console.error("onRemove is NOT a function! Check if it's passed correctly.");
                //     return; 
                // }
                onRemove(applicationId); // Update state in parent component
            } else {
                console.error("Error removing application", data.error);
            }
        } catch (error) {
            console.error("Error removing application", error);

        }
    }
    return (
        <div>
            <div className='border-neutral-900 border-2 mt-5'>
                <div className="title p-4">
                    <div className="flex flex-row">
                        <div className="Title-text font-bold text-xl flex-1">
                            {title}
                        </div>
                        <div className="flex flex-row items-center">
                            {status === "pending" && (<div className='flex'>
                                <box-icon type='solid' size='sm' name='hourglass-top' className='fill-orange-400' ></box-icon>
                                <div className="ml-1 text-lg text-orange-400">Pending</div>
                            </div>
                            )}
                            {status === "accepted" && (<div className='flex'>
                                <box-icon type='solid' size='sm' name='check-circle' className='fill-green-600' ></box-icon>
                                <div className="ml-1 text-lg text-green-600">Accepted</div>
                            </div>
                            )}
                            {status === "rejected" && (<div className='flex'>
                                <box-icon type='solid' size='sm' name='x-circle' className='fill-red-600' ></box-icon>
                                <div className="ml-1 text-lg text-red-600">Rejected</div>
                            </div>
                            )}
                        </div>
                    </div>
                    <p className="location text-xs text-gray-501">
                        {location}
                    </p>
                </div>
                <div className="content p-3">
                    <div className="Description text-sm">
                        {description}
                    </div>
                    <div className="tertiary-data mt-3 p-2 flex flex-row">
                        <div className="salary text-sm text-gray-601 ">
                            Salary
                            <p className='text-xs text-blue-701'>
                                {salary}
                            </p>
                        </div>
                        <div className="created ml-6">
                            <div className="heading text-sm text-gray-701">
                                Date Created
                                <p>
                                    {new Date(createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={handleRemove} className="Apply bg-red-600 text-white text-sm p-2 m-3 rounded-md hover:bg-red-800">
                    Remove
                </button>
            </div>
        </div>
    )
}

export default AppliedCard
