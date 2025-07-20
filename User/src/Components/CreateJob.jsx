import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const CreateJob = () => {
    const { register, handleSubmit } = useForm();
    const [jobTypes, setJobTypes] = useState([]);
    const navigate = useNavigate();
    const [selectedJobType, setSelectedJobType] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    //Fetch Job Types from the Database
    useEffect(() => {
        const fetchJobTypes = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/type/jobs')
                const data = await response.json();

                console.log("Job Types Array:", data.jobT);

                if (Array.isArray(data.jobT)) {
                    setJobTypes(data.jobT);
                } else {
                    console.log("Unexepected API response format:", data);
                    setJobTypes([]);
                }
            } catch (error) {
                console.log("Error fetching job types:", error);
                setJobTypes([]);
            }
        };

        fetchJobTypes();
    }, []);

    //Handles form Submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const jobdata = {
                ...data,
                jobType: selectedJobType,
                available: true,
            };

            console.log("Submitting Job Data:", jobdata);


            const response = await fetch("http://localhost:9000/api/job/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(jobdata),
            });

            const result = await response.json();

            console.log("API Response:", result);

            if (response.ok) {
                setMessage("Job Created successfully");
                navigate("/company/home");
                return;
            } else {
                setMessage("Error" + result.error);
            }
        } catch (error) {
            console.log("Error submmitting form:", error);
            setMessage("Something went wrong, Please try again");
        } finally {
            setIsLoading(false);
        }
    };

    const testNavigate = () => {
        console.log("Testing Navigation...");
        navigate("/company/home");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Navbar />
            <div className='w-full justify-center text-center m-4 text-2xl'> Job Creation Form </div>
            {message && <p className='text-center text-red-600'>{message}</p>}
            <div className=" h-screen  flex w-full items-center justify-center ">
                <div className='w-2/3 '>
                    <div className='m-4'>
                        <div className='text-lg font-normal text-left'>Job Title</div>
                        <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter the Job Title'
                            {...register("title", { required: true })} />
                    </div>

                    <div className=" m-4 w-64 border-1">
                        <h2 className='text-lg front-medium'>Job Types</h2>
                        <select name="Job-Type" id="" value={selectedJobType}
                            className='p-2 border-2 border-black rounded bg-white'
                            onChange={(e) => setSelectedJobType(e.target.value)}
                            required
                        >
                            <option value="">Select Job Type</option>
                            {
                                jobTypes.map((job) => (
                                    <option value={job._id} key={job._id}>
                                        {job.jobTypeName}
                                    </option>
                                ))}
                            {/* <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="DevOps">DevOps</option>
                            <option value="DevOps">SysAdmin</option> */}
                        </select>
                    </div>

                    <div className='m-4'>
                        <div className='text-lg font-normal text-left'>Job Description</div>
                        <textarea className='w-full border-2 border-black rounded-xl p-3  h-32 resize-none' placeholder='Enter the Job Description'
                            {...register("description")} />
                    </div>
                    <div className='m-4'>
                        <div className='text-lg font-normal text-left'>Salary</div>
                        <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter the Salary'
                            {...register("salary", { required: true })} />
                    </div>
                    <div className='m-4'>
                        <div className='text-lg font-normal text-left'>Location</div>
                        <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter the Job location'
                            {...register("location", { required: true })} />
                    </div>
                    <button type="submit" className='bg-blue-800 text-white py-2 px-3 m-5 ml-6 rounded-md hover:bg-blue-900'
                        disabled={isLoading}>
                        Submit
                    </button>
                    {/* <button
                        type="button"
                        onClick={testNavigate}
                        className='bg-gray-500 text-white py-2 px-3 m-5 rounded-md hover:bg-gray-600'
                    >
                        Test Navigation
                    </button> */}
                </div>
            </div>
        </form>
    )
}

export default CreateJob

