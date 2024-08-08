"use client";

import React from 'react'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const LoginForm = () => {
  const form = useForm()
  return (
    <>        
        <div className="mb-6 pt-6 ">
          <h3 className="text-2xl text-center font-bold text-[#000]">
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
              <Input 
              type="email" placeholder="Email"
              className="block px-2 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer border focus:border-gray-600 h-10 rounded focus:outline-0"
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
              <Input type="password" placeholder="Password" 
                    className="block px-2 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer border focus:border-gray-600 h-10 rounded focus:outline-0"
              />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Button</Button>
      </form>
    </Form>
    </>
  )
}

export default LoginForm;
