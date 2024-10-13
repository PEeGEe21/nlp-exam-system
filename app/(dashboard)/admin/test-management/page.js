"use client"
import ExamsListTable from '@/app/components/tables/ExamsListTable';
import QuestionsListTable from '@/app/components/tables/QuestionsListTable'
import { tests } from '@/app/lib/constants';
import { hostUrl } from '@/app/lib/utils';
import { ArrowLeft, FilterSearch, Refresh, SearchNormal1 } from 'iconsax-react';
import { FolderSync } from 'lucide-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, {useState, useEffect, useMemo} from 'react'

const TestManagement = () => {
  const [tests, setTests] = useState([]);
  const [reloadKey, setReloadKey] = useState(0); // State to trigger reload
  const [loading, setLoading] = useState(false); // State for loading
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const reload = () => {
    setReloadKey(prev => prev + 1); // Change state to trigger useEffect
  };

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      setSearchQuery('');
      try {
        const res = await fetch(hostUrl + 'tests');
        if (res.ok) {
          const result = await res.json();
          setTests(result.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err?.message);
      } finally {
        setTimeout(() =>{
          setLoading(false); // End loading
        }, 500)
      }
    };

    fetchData();
  }, [reloadKey]);

    // const filteredAllExams = useMemo(() => {
    //   if (searchQuery && tests?.length > 0) {
    //     const filtered = tests.filter((launch) =>
    //       launch?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    //     );
    //     return filtered;
    //   }
    //   return tests;
    // }, [searchQuery, tests]);

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

            <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-nowrap">
                <div className="flex items-center w-full gap-2">
                  <div className=" relative rounded-full  items-center w-full max-w-[563px] h-10 ">
                    <div className="absolute inset-y-0 left-0 flex items-center h-full pl-1 pointer-events-none">
                      <span className="px-3 text-gray-500">
                        <SearchNormal1 size={22} />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchQuery}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchQuery(value);
                      }}
                      className="border border-[#3B3939] py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none bg-transparent text-[#000000de]"
                      placeholder="Search"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button 
                    onClick={reload}
                    className={` border border-[#303132] hover:text-white hover:bg-[#303132] p-2 rounded-md text-[#303132] h-10 w-10 flex items-center justify-center`}
                  >
                    <Refresh size={16} className={`${loading ? 'animate-rotate' : ''}`} />

                    {/* {`${loading ? 'animate-rotate' :  ''}`} */}
                 </button>
                </div>
              </div>

            <div className="py-6">
                <ExamsListTable tests={tests} setTests={setTests}/>
            </div>
        </div>
    </>
  )
}

export default TestManagement
