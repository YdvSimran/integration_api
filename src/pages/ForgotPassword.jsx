import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import schema from '../schema/schema'
import axios from 'axios'

function ForgotPassword() {
  const navigate=useNavigate()
  const [intialFromValues, setIntialFromValues]=useState({
     email:'',
     
  })
  const {values,errors, touched, handleBlur , handleChange , handleSubmit}=useFormik({
    initialValues:intialFromValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        console.log('Submitting form:', values); // Log form values
        const res = await axios.post("https://api.example.com/login", {
          email: values.email,
         
        });
        
        console.log('Response:', res); // Log the response
    
        // Only navigate if the login is successful
        if (res.status === 200) {
          console.log('Login successful, navigating to create-password');
          // Navigate to homepage on success
        } else {
          console.log('Login failed with status:', res.status); // Log non-200 status
        }
      } catch (error) {
        console.error('Error during login:', error.message); // Catch and log errors
      }
    }
  })

  return (
    <>
              <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
      

      <div>
        <div class="flex items-center justify-between">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Enter Your Email</label>
         
        </div>
        <div class="mt-2">
          <input 
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          id="email"
           name="email"
            type="email" 
            autocomplete="email" 
            required 
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        </div>

        <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Enter
              </button>
            </div>
        </form>
      </div>
      </div>
     
    
    </>
  )
}

export default ForgotPassword