import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Progress, useToast } from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import {getGeneratedPassword } from '../../lib/utils';
import { LoaderIcon } from '../ui/IconComponent';
import { Check, Danger, Eye, EyeSlash, Refresh } from 'iconsax-react';
import { hostUrl } from '@/app/lib/utils';

const EditUserForm = ({
  onClose,
  dataSource,
  currentUser,
  setDataSource,
  setCurrentUser,
  isEditingUser,
  setIsEditingUser,
  start,
  allRoles,
}) => {
  const [user, setUser] = useState(null);
  const [showRoles, setShowRoles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    fname: currentUser?.profile?.firstname??'',
    lname: currentUser?.profile?.lastname??'',
    username: currentUser?.username??'',
    email: currentUser?.email??'',
    password: '',
    cpassword: '',
    userRole: currentUser?.user_role ?? null
  });

  // console.log(inputs, currentUser?.rolesIds)
  const chakraToast = useToast();

  const [generatedPassword, setGeneratedPassword] = useState('');

  const generateRandomPassword = () => {
    setIsGenerating(true)
    let password = getGeneratedPassword();

    setInputs((prevInputs) => ({
      ...prevInputs,
      password: password,
      cpassword: password,
    }));

    chakraToast({
      title: 'Generated Password Successfully',
      description: "Success",  
      status: "success",
      duration: 2000,
      position: "top-right",
    });

    setTimeout(()=>{
      setIsGenerating(false);
    }, 200)
  };


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRoleChange = (roleKey) => {
    setInputs((prev) => ({
      ...prev,
      userRole: roleKey, // Set the default role ID
    }));
  };

  const handleValidation = () => {
    const { fname, lname, username, email } = inputs;
    if (email === '') {
      toast.error('Fill in all required fields');
      setIsSaving(false);
      return false;
    } else if (email === '') {
      toast.error('Email is required');
      setIsSaving(false);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (handleValidation()) {
      try {
        const { fname, lname, email, username, password, cpassword, userRole } = inputs;

        var payload = {
          fname,
          lname,
          email,
          username,
          password,
          cpassword,
          user_role: userRole
        }

        if(currentUser){

          const res = await axios.post(`${hostUrl}users/update-user/${currentUser?.id}`, 
            payload
          );

          if (res.data.error) {
            chakraToast({
              title: res.data.message,
              description: "Error Occured",  
              status: "error",
              duration: 2000,
              position: "top-right",
            });
          } else if (res.data.success) {
            setIsEditingUser(false);
            chakraToast({
              title: res.data.message,
              description: "Successfully Updated",
              status: "success",
              duration: 2000,
              position: "top-right",
            });
            start();

            onClose();
          }
        } else{
          const res = await axios.post(`${hostUrl}users/add-user`, 
            payload
          );
          if (res.data.error) {
            chakraToast({
              title: res.data.message,
              description: "Error Occured",  
              status: "error",
              duration: 2000,
              position: "top-right",
            });
          } else if (res.data.success) {
            start();
            chakraToast({
              title: res.data.message,
              description: "Successfully Created",
              status: "success",
              duration: 2000,
              position: "top-right",
            });
            onClose();
          }
        }
        setIsSaving(false);
      } catch (err) {
        chakraToast({
          title: err?.response?.data?.message??'An Error Occurred',
          description: "Error Occured",  
          status: "error",
          duration: 2000,
          position: "top-right",
        });
        setIsSaving(false);
      }
    }
  };

  const onCloseModal = () =>{
    onClose();
    setCurrentUser(null);
  }

  const showConfirmPassword = () =>{
    setShowCPassword(!showCPassword)
  }
  
  const showAPassword = () =>{
    setShowPassword(!showPassword)
  }

  // console.log(status, 'status')
  return (
    <>
      <ModalBody>
        <div>
          <form>
            <div className='flex w-full gap-2'>
              <div className="mb-4 flex flex-col gap-1 w-1/2">
                <label className="text-sm" htmlFor="fname">
                  First Name
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="fname"
                  id="fname"
                  required
                  placeholder="First Name"
                  value={inputs.fname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex flex-col gap-1 w-1/2">
                <label className="text-sm" htmlFor="lname">
                  Last Name
                </label>
                <input 
                  type="text"
                  className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 text-sm"
                  name="lname"
                  id="lname"
                  required
                  placeholder="Last Name"
                  value={inputs.lname}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                // readOnly={inputs.username?true:false}
                placeholder="Username"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>
            <div className='w-full gap-2 items-center'>
              {currentUser && 
                (<div className="pb-1 rounded-lg mb-2">
                    <div className="flex items-center w-full gap-1 text-red-500">
                        <span>
                            <Danger size={22} />
                        </span>
                        <p className="text-sm text-red-500">
                            Please leave empty if not updating password.
                        </p>
                    </div>
                </div>)
              }

              <div className='flex w-full gap-2 items-center'>
                <div className=" flex flex-col gap-1 w-1/2">
                  <label className="text-sm" htmlFor="password">
                    Password
                  </label>
                  <div className=" relative rounded-full  items-center w-full">
                    <button onClick={showAPassword} type="button" className="absolute inset-y-0 right-0 flex items-center h-full cursor-pointer focus:outline-none">
                      <span className="text-[#BEBDBD] px-3">
                        {showPassword ? <EyeSlash size={22}/> : <Eye size={22}/>}
                      </span>
                    </button>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className=" block min-w-full border border-gray-400 focus:border-gray-500 h-10  w-full  focus:outline-0 bg-transparent rounded px-2 pr-10 text-sm"
                      name="password"
                      id="password"
                      required
                      placeholder="Password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                  </div>
                  
                </div>

                <div className="flex flex-col gap-1 w-1/2">
                  <label className="text-sm" htmlFor="cpassword">
                    Confirm Password
                  </label>

                  <div className=" relative rounded-full  items-center w-full">
                    <button onClick={showConfirmPassword} type="button" className="absolute inset-y-0 right-0 flex items-center h-full cursor-pointer focus:outline-none">
                      <span className="text-[#BEBDBD] px-3">
                        {showCPassword ? <EyeSlash size={22}/> : <Eye size={22}/>}
                      </span>
                    </button>

                    <input 
                      type={showCPassword ? "text" : "password"}
                      className="block min-w-full border border-gray-400 focus:border-gray-500 h-10 w-full focus:outline-0 bg-transparent rounded px-2 pr-10 text-sm"
                      name="cpassword"
                      id="cpassword"
                      required
                      placeholder="Confirm Password"
                      value={inputs.cpassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-1 '>
                  <label className="text-sm" htmlFor="cpassword">
                    &nbsp;
                  </label>
                  <button type='button' onClick={generateRandomPassword} className='bg-gray-600 h-10 w-10 px-2 rounded text-white flex items-center justify-center gap-2'>
                    {isGenerating ? <LoaderIcon
                        extraClass="text-white h-5 w-5"
                        className="animate-spin "
                      />: <Refresh size={16}/>

                    }
                  </button> 
                </div>

              </div>
            </div>

            {/* {currentUser && */}
              <div className='mt-4'>
                  <div className='mb-2'>
                    <h3 className='font-semibold text-base '>Roles To Assign</h3>
                  </div>

                <div className='min-h-0'>
                    
                    {allRoles.map((level) => (
                      <div key={level.id} className="mb-2">
                        <div className="flex items-center justify-between gap-2 border px-3 rounded cursor-pointer hover:bg-[#F3F4F6] text-sm">
                          <label className='flex items-center gap-2 w-full cursor-pointer py-3 '>
                            <input
                              type="checkbox"
                              checked={inputs.userRole == level.key}
                              onChange={() => handleRoleChange(level.key)}
                            />
                            {level.name}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            {/* } */}
          </form>
        </div>
      </ModalBody>
      <ModalFooter className="space-x-3">
        <button
          onClick={onCloseModal}
          className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-red-800 text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
        >
          Cancel
        </button>
        <button
          className="h-10  w-auto whitespace-nowrap py-2 px-3 bg-[#008080] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
          onClick={handleSubmit}
          disabled={isSaving}
          aria-disabled={isSaving}
        >
          {isSaving ? (
            <>
              <LoaderIcon
                extraClass="text-white"
                className="animate-spin mr-1"
              />
              Saving..
            </>
          ) : (
           <>Save</>
          )}
        </button>
      </ModalFooter>
    </>
  );
};

export default EditUserForm;
