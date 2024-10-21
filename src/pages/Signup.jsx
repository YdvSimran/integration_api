import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import schema from '../schema/schema';
import axios from 'axios';
import CreatePassword from './CreatePassword';

function Signup() {
  const navigate = useNavigate();
  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('your-api-endpoint', {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
        });

        if (res.status === 200) {
          // Navigate to CreatePassword page upon successful submission
          navigate('/create-password', { state: { name: values.name, email: values.email, phoneNumber: values.phoneNumber } });
        }
      } catch (error) {
        console.log('Signup failed:', error);
      }
    },
  });

  function Login() {
    navigate('/');
  }

  return (
    <>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <input
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter name"
                />
                {errors.name && touched.name && <p className="text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                <input
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
                {errors.email && touched.email && <p className="text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
                <input
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="phoneNumber"
                  type="number"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && touched.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?
              <button onClick={Login} className="text-blue-600 font-semibold hover:underline ml-1">
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
