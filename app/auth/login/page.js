"use client";

import React from 'react'

const LoginPage = () => {
  return (
        <div class="flex flex-col text-gray-700 bg-white">
          <div
            class="grid mt-10 mb-6 overflow-hidden text-black h-14">
            <h3 class="font-sans text-5xl font-normal">
              Sign in
            </h3>
          </div>
          <button
              class="block w-full h-12 select-none text-xl rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              Continue with Google
            </button>
            <div className="flex items-center before:flex-1 before:border-t before:border-[#D7D7D7] before:mt-0.5 after:flex-1 after:border-t after:border-[#D7D7D7] after:mt-0.5 mt-6">
              <p className="text-center text-black text-l mx-4 mb-0">or</p>
            </div>
          <div class="flex flex-col gap-4 pt-6">
            <div class="w-full">
                <label class="flex h-full w-full select-none text-xl font-normal text-blue-gray-400">
                  Email
                </label>
                <input
                  class="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  type="email"
                  name="email"
                />
                
              </div>

              <div class="w-full">
              <label class="flex h-full w-full select-none text-xl font-normal text-blue-gray-400">
                  Password
                </label>
                <input
                  class="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  type="password"
                  name="password"
                />
                
              </div>
            
          </div>
          <div class="pt-6">
            <button
              class="w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button">
              Login
            </button>
            <p class="flex justify-center mt-6 font-sans text-sm font-light">
              Don't have an account?
              <a href="#signup"
                class="block ml-1 font-sans text-sm font-bold text-blue-gray-900">
                Login
              </a>
            </p>
          </div>
        </div>
  )
}

export default LoginPage
