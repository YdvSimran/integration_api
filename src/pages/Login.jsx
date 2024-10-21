import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import schema from '../schema/schema'
import axios from 'axios'

function Login() {
  const navigate=useNavigate()
  const [intialFromValues, setIntialFromValues]=useState({
     email:'',
     password:'',
  })
  const {values,errors, touched, handleBlur , handleChange , handleSubmit}=useFormik({
    initialValues:intialFromValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        console.log('Submitting form:', values); // Log form values
        const res = await axios.post("https://api.example.com/login", {
          email: values.email,
          password: values.password,
        });
        
        console.log('Response:', res); // Log the response
    
        // Only navigate if the login is successful
        if (res.status === 200) {
          console.log('Login successful, navigating to homepage');
          navigate('/otp-generator'); // Navigate to homepage on success
        } else {
          console.log('Login failed with status:', res.status); // Log non-200 status
        }
      } catch (error) {
        console.error('Error during login:', error.message); // Catch and log errors
      }
    }
    
    
   
    
    // onSubmit: async (values)=>{
    //   try{
    //     const res= await axios.post("https://api.example.com/login",{
    //       email:values.email,
    //       password:values.password,
    //     })
        
        
    //     // if (res.status === 200) {
    //     //   console.log('Success:', response.data);
            
    //     //   // On success, navigate to the dashboard or another route
    //     //   navigate('/homepage'); // Change to your desired route
    //     // }
       
    //   }catch(error){
    //     console.log(error.message)
    //   }
    // }

  })
  

   function forgetpassword(){
      navigate('/forgot-password')
   }
   function signup(){
    navigate('/signup')
 }

  return (
    
   <>
     <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input 
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          // className={errors.email && touched.email ? 'input-error' : ''}
          id="email"
           name='email'
            type="email" 
            autocomplete="email" 
            required 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
       

        </div>
       
      </div>
      {/* {errors.email && touched.email && (<p>{errors.email}</p>)} */}

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <button onClick={forgetpassword} class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password? </button>
          </div>
        </div>
        <div class="mt-2">
          <input 
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          id="password"
           name="password" 
           type="password" 
           autocomplete="current-password" 
           required 
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
      </div>

      <p class="text-gray-800 text-sm mt-6 text-center">Don't have an account? 
            <button onClick={signup} class="text-blue-600 font-semibold hover:underline ml-1"> Signup here</button>
            </p>
    </form>

   
  </div>
</div>
   
   </>

  )
}

export default Login