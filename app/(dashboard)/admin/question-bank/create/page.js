"use client";
import CreateQuestionsForm from '@/app/components/Forms/CreateQuestionsForm'
import { ArrowLeft } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreateQuestion = () => {
  const router = useRouter();

  return (
    <>
        <div>
            <div className="flex flex-row items-center justify-start gap-8 mb-8">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                  >
                    <ArrowLeft />
                  </button>

                  <div className="w-full">
                    <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Create Question</h1>
                  </div>
                </div>

            <CreateQuestionsForm />
        </div>
    </>
  )
}

export default CreateQuestion
