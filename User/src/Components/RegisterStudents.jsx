import React , {useState} from 'react'
import Navbar from './Navbar';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const { 
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

      const navigate = useNavigate(); // For Navigation to a different route after a particular logical result in a webpage
      const [successMessage, setSuccessMessage] = useState(false);
      const [repeat, setRepeat] = useState(false); // For displaying message if the Email or User is already Registered 
      const [errorMessage, setErrorMessage] = useState("")

      const onSubmit = async (data) => {
        console.log("Sending Data:", data); //debugging log
    
        try {
         const response = await fetch("http://localhost:9000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({...data,role: 0}),
          //Below is the example of the abstraction ...data does and what it actually does for better understanding
          // body: JSON.stringify({
          //       firstName: data.firstName,
          //       lastName: data.lastName,  // ✅ Ensure "lastName" is correct, not "Lastname"
          //       email: data.email,
          //       password: data.password,
          //       role: 0  // ✅ Assign default role
          //   })
         }); 

         const resData = await response.json();
         console.log("Server Response: ",resData);

         if (response.ok) {
          setSuccessMessage(true);
          // alert("Registration Successfull !");
          setTimeout(() => setSuccessMessage(false), 30000);
         } else {
          // alert(`Error: ${resData.error|| "Something went wrong"}`)
          setRepeat(true);
          setTimeout(()=> setRepeat(false),30000)
        }
      } catch (error) {
          console.log("Error:",error);
         setErrorMessage("An error occured please try again !");
        }
      }

  return (
    <form onSubmit={handleSubmit(onSubmit)}> 
    <div className='w-full flex flex-col items-center justify-center text-center'>
      <Navbar /> 
      <div className='  w-5/12 h-4/6 bg-white border-2 mt-20 rounded-md shadow-lg'>
        <div className='text-3xl font-semibold m-9'>Register Students</div>
        <div>
            <div className='flex flex-row'>
              <button className=' rounded-md ml-auto p-2 m-2 bg-[#142683]   text-white border-2 '>
                <Link to='/students/register' > Job Seeker</Link>
              </button>
              <button className='rounded-md mr-auto p-2 m-2 bg-white   text-bg-[#142683] border-2 border-[#142683]'>
                <Link to='/company/register'>Employer</Link>
              </button>
              </div>
      {successMessage && (
          <div className=" text-green-600 text-md p-3">
            Registration Succesfull !
          </div>
       )} 
       {repeat && (
       <div className="text-red-600">
        User Already Exists 
       </div>
       )}
          <div className='m-4'>
            <div className='text-lg font-normal text-left'>First </div>
            <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your First Name' 
            {...register("firstName")}/>
          </div>
          <div className='m-4'>
            <div className='text-lg font-normal text-left'>Last Name</div>
            <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your Last Name' 
            {...register("lastName")}/>
          </div>
          <div className='m-4'>
            <div className='text-lg font-normal text-left'>Email</div>
            <input type="text" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your email' 
            {...register("email")}/>
          </div>
          <div className='m-4'>
            <div className='text-lg font-normal text-left'>Password</div>
            <input type="password" className='w-full border-2 border-black rounded-xl p-3' placeholder='Enter your password' 
            {...register("password")}
            />
          </div>
          <div>
            Already have an account ?
            <Link to="/students/login" className='no-underline text-blue-700'> Login</Link>
          </div>
          <button type='submit' className='cursor-pointer px-8 py-2 mb-8 text-lg rounded-md bg-[#142683] text-white mt-10 hover:bg-blue-800 ease-in-out duration-100 hover:scale-105'>Register</button>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Register
