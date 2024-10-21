import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function OTPGenerator() {
    const navigate=useNavigate();
  const [otp, setOtp] = useState('');
  const [resendTimeout, setResendTimeout] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Post request to verify OTP
      const response = await axios.post('/api/verify-otp', { otp });

      if (response.data.success) {
        alert('OTP Verified Successfully!');
        navigate('/homepage')

        // Further actions after successful verification
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP resend request
  const handleResend = async () => {
    if (resendTimeout > 0) return;

    setIsResending(true);

    try {
   
      await axios.post('/api/resend-otp');

      alert('OTP has been resent to your email.');
      setResendTimeout(30); 
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

 
  useEffect(() => {
    if (resendTimeout > 0) {
      const timer = setTimeout(() => {
        setResendTimeout((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer); 
    }
  }, [resendTimeout]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">2-Factor Verification</h1>
              <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your Email.</p>
            </header>

            <form id="otp-form" onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-3">
                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-28 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  pattern="\d*"
                  maxLength="4"
                  required
                />
              </div>
              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Account'}
                </button>
              </div>
            </form>

            <div className="text-sm text-slate-500 mt-4">
              Didn't receive code?{' '}
              <button
                onClick={handleResend}
                disabled={resendTimeout > 0 || isResending}
                className="font-medium text-indigo-500 hover:text-indigo-600"
              >
                {isResending ? 'Resending...' : resendTimeout > 0 ? `Resend in ${resendTimeout}s` : 'Resend'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OTPGenerator;
