"use client";

import React from 'react'
import SignupForm from '@/app/components/Forms/SignupForm';

const LoginPage = () => {
  return (
<div className="h-screen flex items-center justify-center bg-[linear-gradient(45deg,_#a5b4fc_0%,_#f5f3ff_35%,_#f5f3ff_65%,_#a5b4fc_100%)]">
    <div>
        <div className='w-[450px] h-auto bg-white p-7 rounded-2xl'>   
          <SignupForm/> 
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm">
              Already have an account? <a className='underline'>Sign In</a>
            </p>
          </div>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
