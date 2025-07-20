import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppliedCard from './AppliedCard';
import { useDispatch } from 'react-redux';

const StudentsHome = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

  //For search based on status of the application
  const [selectedStatus, setSelectedStatus] = useState("");

    const fetchAppliedJobs = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/applied", {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();
            if (response.ok) {
                setAppliedJobs(data.applications);
            }
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
        }
    };
    useEffect(() => {
        fetchAppliedJobs();
    }, []);

    //To Rerender whenever an application is removed
    const handleAppRemove = (applicationId) => {
        fetchAppliedJobs()
    }


    //To prevent user from going back to login page after logging out without authentication
    useEffect(() => {
        const checkAuth = async () => {
            try {   //get requests sent to backend for the cookie authentication at the /api/me endpoint of the server
                const response = await fetch("http://localhost:9000/api/me", {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) {
                    navigate("/students/login", { replace: true }); //if its true user is allowed to enter
                }
            } catch (error) {
                console.log("Error checking authentication", error);
                navigate("/students/login", { replace: true });
            }
        };
        checkAuth();
    }, []);


    // Fetch Logged-in User Details
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                {
                    const response = await fetch("http://localhost:9000/api/me", {
                        method: "GET",
                        credentials: "include", //Ensures cookies/tokens are sent
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUser(data.user);
                    } else {
                        console.log("Error fetching data", data.error);
                    }
                }
            } catch (error) {
                console.log("Error Fetching user profile", error);
            }
        };
        console.log(localStorage.getItem("token"));

        fetchUserProfile();
    }, []);

    //Logout Function
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:9000/api/logout", { method: "GET" });

            //Clear local storage to redirect to login page
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/students/login", { replace: true });
        } catch (error) {
            console.log("Logout error", error);
        }
    };

    const filteredJobs = appliedJobs.filter(({job,status})=>{
        const jobTitle = job?.title ? job.title.toLowerCase(): "";
        const jobLocation = job?.location ? job.location.toLowerCase(): "";
        const jobDescription = job?.description ? job.description.toLowerCase(): "";
        const jobSalary = job?.salary ? job.salary.toLowerCase(): "";
        const jobStatus = status ? status.toLowerCase() : "";

        const matchesSearch = 
        jobTitle.includes(searchTerm.toLowerCase()) ||
        jobLocation.includes(searchTerm.toLowerCase()) ||
        jobDescription.includes(searchTerm.toLowerCase()) ||
        jobSalary.includes(searchTerm.toLowerCase());

        const matchesStatus =  selectedStatus ? jobStatus === selectedStatus.toLowerCase() : true;

        return matchesSearch && matchesStatus;
    })


    const handleFilterChange = (event) => {
    setSelectedStatus(event.target.value)
    fetchAppliedJobs();
  };

  //5 second interval to keep on refreshing data from the api every 5 seconds
  useEffect(()=>{
    const interval = setInterval(fetchAppliedJobs, 5000);
    return ()=>clearInterval(interval);
  },[]);

    return (
        <div className='bg-white'>
            <nav className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo Section */}
                        <div className="flex items-center">
                            <a href="#" className="flex-shrink-0">
                                <img className="h-8 w-auto" src="/logo.svg" alt="Cuvette" />
                            </a>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-center">
                            <div className="ml-4 flex items-center">
                                <div className="flex items-center border border-gray-300 rounded-lg py-1 px-6">
                                    <img src="user.png" className="h-8 w-8 rounded-full" alt="Profile" />
                                    <select className='p-2 ml-4  border border-gray-300 rounded'
                                        onChange={(e) => {
                                            if (e.target.value == "logout") {
                                                handleLogout();
                                            }
                                        }}
                                    >
                                        <option value="">
                                            {user ? `${user.firstName} ${user.lastName}` : "Loading"}
                                        </option>
                                        <option value="logout">Logout</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="flex">
                <aside className='w-64 bg-white border-r border-gray-200 h-screen'>
                    <nav className='mt-5 px-2'>
                        <Link to="/students/home" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50" >
                            <svg className="mr-4 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Fulltime Jobs
                        </Link>
                        <Link to="/students/home/other-jobs" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50" >
                            <svg className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Other Jobs
                            <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                New
                            </span>
                        </Link>
                        <Link to="/students/home/applied" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-600 bg-gray-100" >
                            <svg className="mr-4 h-6 w-6 text-blue-600 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Applied
                        </Link>
                    </nav>
                </aside>

                <main className="flex-1 p-10 ">
                    <h1 className="text-2xl font-semibold">
                        Applied Jobs
                    </h1>
                    <div className="mb-5 mt-5" >
                        <input type="text" className='p-2 border border-gray-300 rounded w-full' placeholder='Search Jobs...'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map(({ _id, job, status }) => (
                            <AppliedCard
                                key={job._id}
                                applicationId={_id}
                                status={status}
                                {...job}
                                onRemove={() => handleAppRemove(_id)}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No applied jobs yet.</p>
                    )}
                </main>
                <div className="w-64 p-6 bg-white border-l border-gray-200">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <div className="flex flex-col gap-4 mt-2">
                        {/* Job Type Dropdown */}
                        <select name="Job-Type" id=""
                            className='p-2 border-2 border-black rounded bg-white'
                            value={selectedStatus}
                            onChange={handleFilterChange}
                        >
                            <option value="">All </option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>

                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentsHome
