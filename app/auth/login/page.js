"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import A4Animation from '../../components/motion/Layout';
import { Eye, EyeSlash } from 'iconsax-react';
import { signInTexts } from '@/app/lib/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LoaderIcon } from '@/app/components/ui/IconComponent';
import toast from 'react-hot-toast';
import setAuthToken from '@/app/utils/setAuthToken';

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { push } = useRouter();

  const login = async (e) => {

    if(!email){
      toast.error('Please enter email');
      return;
    }

    if(!password){
      toast.error('Please enter password');
      return;
    }

    setLoading(true);
    e.preventDefault();

    const data = {
      email,
      password,
    };
    try {
        const response = await axios.post('http://localhost:3001/api/auth/login', data);
        // console.log(response.data.success)
        if (response.data.success){
          setError('');
          setSuccess('Login successfully!');

          // router.push('/admin/dashboard');
          let token = response?.data?.access_token;
          let user = response?.data?.user;
          // setAuthToken(token);

          // console.log(response.data, user, 'esponse.data')
          const role = response?.data?.user?.user_role;
          localStorage.setItem('access-exam-sysyem', token);
          localStorage.setItem('exam-system-user', JSON.stringify(user));

          // if(role === 'student'){
            setTimeout(() => {
              handleRedirect(role);
            }, 300);
          // } else if(role === 'admin'){
          //   setTimeout(() => {
          //     push(`/admin/dashboard`);
          //   }, 300);
          // }
          
          // console.log(response.data.success)
          toast.success(response.data.message??'Login successfully!');

        } else{
            // setError(true);
            let message = '';
            if (!response.data?.message) {
              message = 'An error occurred';
            } else {
              message = response.data?.message;
            }
            // setErrMessage(message);
            // ToasterAlert(message, 'error');
            toast.error(message);
  
        }
        setLoading(false);

    } catch (err) {
        setSuccess('');
        console.log(err.response)
        if (err.response && err.response) {
          setError('Login failed. Please check your credentials.');
        } else {
          setError('Login failed. Please try again.');
        }
        setLoading(false);

        toast.error('Login failed. Please try again.')
        // console.error(error);
    }
  };

  const handleRedirect = (role) => {
    const routes = {
        student: '/student/test-manager',
        admin: '/admin/dashboard',
    };
    push(routes[role] || '/auth/login');
  };


  return (
    <>
      <div>
        <div
            className="grid mt-10 mb-6 text-black">
            <A4Animation baseText={'Sign In...'} texts={signInTexts}/>
          </div>
          {/* <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </div> */}
          <div className="flex flex-col gap-3 text-gray-700 bg-gradient-to-b  from-bg-200  via-bg-100  to-bg-200  border-[0.5px]  border-border-100  shadow-sm  rounded-[2rem] mt-7  sm:mt-8  mx-auto  pt-5  sm:pt-6  sm:pb-9  pb-6   px-8  sm:px-12 text-sm text-text-100">
            <h2 className="font-medium tracking-tight text-center">Start using Our System for yourself or your school</h2>
              <div>
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
                        required
                        onChange={(e) => {
                          const value = e.target.value
                          setEmail(value)
                        }}
                      />
                    </div>

                    <div className="w-full">
                      <label className="flex mb-2 font-medium" htmlFor='password'>
                        Password
                      </label>

                      <div className="">
                          <div className=" relative rounded-full  items-center w-full">
                              <button type='button' onClick={()=>setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pl-3 flex items-center h-full cursor-pointer">
                                  <span className="text-[#BEBDBD] px-3">
                                  {!showPassword ?<Eye size={22} />: <EyeSlash size={22}/> }
                                  </span>
                              </button>
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                                className="block min-w-full px-3 pr-10 h-11 w-full rounded-[7px] border border-border-100/50 focus:border focus:border-border-100 bg-white py-2.5 font-sans text-sm font-normal outline outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                autoComplete="off"
                                onChange={(e) => {
                                  const value = e.target.value
                                  setPassword(value)
                                }}
                              />
                          </div>
                      </div>
                    </div>


                    <div>
                      <Link href={'/'}>Forgot Password?</Link>
                    </div>
                  
                    <div className="">
                      <button
                        className="w-full h-11 select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans font-bold text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
                        type="button" 
                        disabled={loading}
                        aria-disabled={`${loading ? 'true' : 'false'}`}
                        onClick={login}
                        >
                        {loading ? (
                          <>
                            <LoaderIcon
                              extraClass="text-white"
                              className="animate-spin"
                            />
                          </>
                        ) : (
                          'Login'
                        )}
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
