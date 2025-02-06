import React, { useEffect, useState, useMemo, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { hostUrl } from '@/app/lib/utils';
import { LoaderIcon } from '../ui/IconComponent';

const AddDifficultyTypeForm = ({ onClose, dataSource, start, users, loggedInUser }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    
  });  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const chakraToast = useToast();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleValidation = () => {
    const { title } = inputs;
    if (title === '') {
      toast.error('Fill in all required fields');
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
        if(!loggedInUser){
          toast.error('No Logged In User');
          setIsSaving(false);
          return false;
        }
          
        const { title, description } = inputs;

        var payload = {
          title, 
          description
        };

        const res = await axios.post(hostUrl + 'difficulty-types',
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
          chakraToast({
            title: res.data.message,
            description: "Successfully Created",
            status: "success",
            duration: 2000,
            position: "top-right",
          });
          start();
          onClose();
        }
        setIsSaving(false);
      } catch (err) {
        toast.error(err?.response?.data?.message ?? err?.response?.data?.error ?? 'An Error Occured');
        setIsSaving(false);
      }
    }
    setIsSaving(false);

  };


  return (
    <>
      <ModalBody>
        <div>
          <form>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                className="border border-gray-400 focus:border-gray-500 h-10 focus:outline-0 bg-transparent rounded mb-3 px-2 w-full"
              />
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label className="text-sm" htmlFor="status">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                rows={5}
                className="border border-gray-400 focus:border-gray-500 focus:outline-0 bg-transparent rounded mb-3 p-2 w-full"
              ></textarea>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter className="space-x-3">
        <button
          onClick={onClose}
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
            'Save'
          )}
        </button>
      </ModalFooter>
    </>
  );
};

export default AddDifficultyTypeForm;
