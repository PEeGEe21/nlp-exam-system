"use client";

import React from 'react'
import Link from 'next/link';

const LoginPage = () => {
  return (
    <>
      <div>
        <div
            className="grid mt-10 mb-6 overflow-hidden text-black h-14">
            <h3 className="font-michroma text-5xl font-normal text-center">
              Sign in
            </h3>
          </div>
          <div className="flex flex-col gap-3 text-gray-700 bg-gradient-to-b  from-bg-200  via-bg-100  to-bg-200  border-[0.5px]  border-border-300  shadow-sm  rounded-[2rem] mt-7  sm:mt-8  mx-auto  pt-5  sm:pt-6  sm:pb-9  pb-6   px-8  sm:px-12 text-sm text-text-100">
            <h2 className="font-tiempos font-medium tracking-tight text-center">Start using Our System for yourself or your school</h2>
              <div>
                  {/* <button
                      className="block w-full h-12 select-none text-xl rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button">
                      Continue with Google
                  </button>
                  <div className="flex items-center before:flex-1 before:border-t before:border-[#D7D7D7] before:mt-0.5 after:flex-1 after:border-t after:border-[#D7D7D7] after:mt-0.5 mt-6">
                    <p className="text-center text-black text-l mx-4 mb-0">or</p>
                  </div> */}
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                          <label className="flex mb-2 font-medium" htmlFor='email'>
                            Email
                          </label>
                          <input
                            id="email"
                            className="h-11 w-full rounded-[7px] border border-border-100/50 focus:border focus:border-border-100 bg-white px-3 py-2.5 font-sans text-sm font-normal outline outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            type="email"
                            name="email"
                          />
                    </div>

                    <div className="w-full">
                      <label className="flex mb-2 font-medium" htmlFor='password'>
                        Password
                      </label>
                      <input 
                        id="password"
                        className="h-11 w-full rounded-[7px] border border-border-100/50 focus:border focus:border-border-100 bg-white px-3 py-2.5 font-sans text-sm font-normal outline outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        type="password"
                        name="password"
                      />
                    </div>

                    <div>
                      <Link href={'/admin/dashboard'}>Forgot Password?</Link>
                    </div>
                  
                    <div className="">
                      <button
                        className="w-full h-11 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Login
                      </button>
                      <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                        Don&lsquo;t have an account?
                        <Link href="/auth/signup"
                          className="block ml-1 font-sans text-sm font-bold text-blue-gray-900">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                  
              </div>
          </div>
        </div>
    </>
  )
}

export default LoginPage
