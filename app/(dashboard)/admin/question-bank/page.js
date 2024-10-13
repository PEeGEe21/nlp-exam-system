"use client"
import QuestionsListTable from '@/app/components/tables/QuestionsListTable'
import { ArrowLeft, Filter, FilterSearch, SearchNormal1 } from 'iconsax-react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'
import { questions } from '@/app/lib/constants';
import { hostUrl } from '@/app/lib/utils';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([])
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(hostUrl + 'questions');
        if (res.ok) {
          const result = await res.json();
          setQuestions(result.data);
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
          <div>
              <div className="flex flex-row items-center justify-between mb-8">
                  <div className="flex flex-row items-center justify-start gap-8">
                    <div className="w-full">
                      <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Question Bank</h1>
                    </div>
                  </div>

                  <div className="text-md  flex flex-row items-center justify-end gap-6  w-full  mt-3 md:mt-0 flex-wrap md:flex-nowrap ">
                      <Link
                          href={"/admin/question-bank/create"}
                          className="w-auto whitespace-nowrap py-2 md:py-3 px-3 md:px-5 bg-[#313131] text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-md rounded flex items-center justify-center gap-2 "
                      >
                          <p className="">Create a Question</p>
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
                      // value={searchQuery}
                      onChange={(event) => {
                        const value = event.target.value;
                        // setSearchQuery(value);
                      }}
                      className="border border-[#3B3939] py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none bg-transparent text-[#000000de]"
                      placeholder="Search"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <select
                    name="status"
                    id="status"
                    defaultValue={0}
                    className="border border-[#3B3939] py-2 px-4 text-sm block rounded-md h-full focus:outline-none bg-transparent text-[#212121] selection:bg-black"
                  >
                    <option value={0}>All Questions</option>
                    <option>My Questions</option>
                  </select>
                  <button
                    className={` border border-[#303132] hover:text-[#EA6A32] p-2 rounded-md text-[#303132] text-[#EA6A32] h-10 w-10 flex items-center justify-center`}
                  >
                    <FilterSearch size={16} className="text-[#303132]"  />
                  </button>
                </div>
              </div>
            </div>
            <div className="py-6">
                <QuestionsListTable questions={questions} setQuestions={setQuestions}/>
            </div>
        </div>
    </>
  )
}

export default QuestionBank
