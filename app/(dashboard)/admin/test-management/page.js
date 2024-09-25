"use client"
import ExamsListTable from '@/app/components/tables/ExamsListTable';
import QuestionsListTable from '@/app/components/tables/QuestionsListTable'
import { tests } from '@/app/lib/constants';
import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, {useState, useEffect} from 'react'

const TestManagement = () => {
  const [tests, setTests] = useState([])
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/tests');
        if (res.ok) {
          const result = await res.json();
          setTests(result.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err?.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
        <div>
            <div className="flex flex-row items-center justify-between mb-8">
                <div className="flex flex-row items-center justify-start gap-8">
                  <div className="w-full">
                    <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Tests</h1>
                  </div>
                </div>

                <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
                    <Link
                        href={"/admin/test-management/create"}
                        className="w-auto whitespace-nowrap py-2 md:py-3 px-3 md:px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                    >
                        <p className="">Create a Test</p>
                    </Link>
                </div>
            </div>

            <div className="py-6">
                <ExamsListTable tests={tests}/>
            </div>
        </div>
    </>
  )
}

export default TestManagement
