"use client";

import React from 'react'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form"
import { Button } from "@/app/components/ui/button"
import SocialLogin from './form-components/SocialsLogin';


const LoginForm = () => {
  const form = useForm()
  return (
    <>
        <div className="mb-6 pt-6 ">
          <h3 className="text-2xl font-bold text-[#000] text-center">
            Log in to <span className="underline">ExamSystem</span> to continue
            with your Projects.
          </h3>
        </div>          
        <Form {...form}>
        <form className="pt-5">
        {/* email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem
            className="mb-6 flex flex-col gap-1 relative"
            >
              <FormControl>
              <input 
              type="email" placeholder="Email"
              className="block px-2 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer border focus:border-gray-600 h-10 rounded focus:outline-0"
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
            className="mb-6 flex flex-col gap-1 relative"
            >
              <FormControl>
              <input type="password" placeholder="Password" 
              className="block px-2 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer border focus:border-gray-600 h-10 rounded focus:outline-0"
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Login</Button>

        <div className="flex items-center before:flex-1 before:border-t before:border-[#D7D7D7] before:mt-0.5 after:flex-1 after:border-t after:border-[#D7D7D7] after:mt-0.5 mt-4">
          <p className="text-center text-[#4F4F4F] text-xs mx-4 mb-0">OR</p>
        </div>

        <div className="flex items-center justify-center my-2 gap-3 flex-wrap">
          <SocialLogin/>
        </div>

        <div className="mt-3 text-xs pt-3 text-center">
          <p className='text-gray-500'>
            Our <a className='underline'>Terms</a> and <a className='underline'>Privacy Policy</a>.
          </p>
        </div>
      </form>
    </Form>
    </>
  )
}

export default LoginForm;
