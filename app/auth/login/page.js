"use client";

import React from 'react'
import LoginForm from "@/app/components/Forms/LoginForm"

const LoginPage = () => {
  return (
    <div className='bg-gray-400 h-screen flex items-center justify-center'>
      <div>
        <div className='w-[450px] h-auto bg-white p-7 rounded-2xl'>    
          <LoginForm/>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm">
              Dont have an account?<a className='underline'>Sign Up</a>
            </p>
            <a href="" className="underline text-sm">
              Forgot Password?
            </a>
          </div>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
