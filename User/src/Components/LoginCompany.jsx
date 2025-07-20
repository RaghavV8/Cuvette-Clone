import React from 'react'
import Navbar from './Navbar'
import Register from './RegisterStudents'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Sending Data:", data);
    try {
      const response = await fetch("http://localhost:9000/api/signin",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({...data}),
        credentials:"include",
      });

      const resData = await response.json();
      console.log("Server Response:",resData);

      if(response.ok && resData?.user?.role === 1){
        navigate("/company/home");
      }else{
        console.log(`Error: ${resData.error || "Something has gone wrong"}`);
      }
    } catch (error) {
      console.log("Error: ",error);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full flex flex-col items-center justify-center text-center'>
        <Navbar />
        <div className='  w-5/12 h-4/6 bg-white border-2 mt-20 rounded-md shadow-lg'>
          <div className='text-3xl font-semibold m-9'>Company Login</div>
          <div>
            <div className='flex flex-row'>

              <button className=' rounded-md ml-auto p-2 m-2 bg-white   text-bg-[#142683] border-2 border-[#142683]'>
                <Link to='/students/login'>Job Seeker</Link>
              </button>

              <button className='rounded-md mr-auto p-2 m-2 bg-[#142683] text-white'>
                <Link to='/company/login'>Employer</Link>
              </button>
            </div>
            <div className='m-4'>
              <div className='text-lg font-normal text-left'>Email</div>
              <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your email'
                {...register("email")} />
            </div>
            <div className='m-4'>
              <div className='text-lg font-normal text-left'>Password</div>
              <input type="password" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your password'
                {...register("password")} />
            </div>
            <div>
              Don't Have an account ?
              <Link to="/company/register" className='no-underline text-blue-700'> Signup</Link>
            </div>
            <button type='Submit' className='cursor-pointer px-8 py-2 mb-8 text-lg rounded-md bg-[#142683] text-white mt-10 hover:bg-blue-800 ease-in-out duration-100 hover:scale-105'>Login</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login
