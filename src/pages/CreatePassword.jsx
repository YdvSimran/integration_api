import React, { useState } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Define password validation rules
const passwordRules = {
  length: { rule: /^.{8,}$/, label: 'Minimum 8 characters' },
  upperCase: { rule: /[A-Z]/, label: 'At least one uppercase character' },
  lowerCase: { rule: /[a-z]/, label: 'At least one lowercase character' },
  numeric: { rule: /\d/, label: 'At least one numeric character' },
  specialChar: { rule: /[@$!%*?&#]/, label: 'One special character' },
};

function CreatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For navigation
  // Track password conditions
  const conditions = Object.keys(passwordRules).reduce((acc, key) => {
    acc[key] = passwordRules[key].rule.test(password);
    return acc;
  }, {});

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password matches confirm password
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // POST request to send the new password
    try {
      const response = await axios.post('https://your-api-endpoint.com/create-password', {
        password,
      });

      // Handle successful response
      if (response.status === 200) {
        // Navigate to the homepage or desired page after successful creation
        navigate('/homepage'); // Adjust the route as per your application
      }
    } catch (error) {
      // Handle error cases
      setErrorMessage('Error creating password. Please try again.');
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Password validation indicators */}
            <div className="password-conditions text-sm">
              {Object.keys(passwordRules).map((key) => (
                <div key={key} className="flex items-center">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      conditions[key] ? 'bg-green-500' : 'bg-red-500'
                    } mr-2`}
                  ></span>
                  <span
                    className={`text-sm ${
                      conditions[key] ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {passwordRules[key].label}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePassword;


// make the use of useparams and expiry
//  time if yes render only one msg else the createpassword page will be rendered 
//  this will be in forgot password as when clicked on it then redirect it to email
//  where we will have link and when clicked on that link goes to iindex file to check the expiry time 
//  then to the createpassword

