"use client"
import { formatDuration, formatMomentDate, hostUrl } from '@/app/lib/utils';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(0);
  const [tests, setTests] = useState(0);
  const [students, setStudents] = useState(0);
  const [activeTests, setActiveTests] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(()=>{
      const getUser = async ()=>{
          try{
              if (localStorage.getItem('exam-system-user')){
                  const data = await JSON.parse(
                      localStorage.getItem("exam-system-user")
                  );
                  setUser(data)
                  
              }else{
                  router.push("/auth/login")
              }
                  

          }catch(err){}
      };
      getUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      
      if(user){
        setLoading(true); // Start loading
        try {
          const res = await fetch(hostUrl + 'users/admin-dashboard/'+user?.id);
          if (res.ok) {
            const result = await res.json();
            // console.log(result)
            setQuestions(result.total_questions);
            setTests(result.total_tests);
            setStudents(result.total_students);
            setActiveTests(result.active_tests);
            setTotalUsers(result.total_users);
            setResults(result.results);
          }
        } catch (err) {
          console.error('Error fetching data:', err?.message);
        } finally {
          setTimeout(() =>{
            setLoading(false); // End loading
          }, 500)
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Dashboard</h1>
                </div>
              </div>

          </div>

          <div className='space-y-12'>
            <div className='grid grid-cols-1 md:grid:cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>

                  <div className='text-sm text-[#71767B] font-medium '>
                    My Questions
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {questions}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] font-medium '>
                  Tests Created
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {tests}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] flex items-center gap-1 font-medium '>
                    <GraduationCap/>
                    Total Students
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {students}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] font-medium '>
                  Active Tests
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {activeTests}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] font-medium '>
                  Total Users
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {totalUsers}
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-[#F9FAFC] border border-[#E7E8EA] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]'>
              <div className='px-5 pt-5' >
                <div className='text-sm text-[#71767B] font-medium '>
                  Latest Results
                </div>
              </div>
              <div className="overflow-x-auto md:overflow-x-auto p-5 text-[#313131] scrollbar-change rounded-md">
                {/* <TableContainer> */}
                  <Table variant='unstyled' className='py-3 table-bordered'>
                    <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                      <Tr>
                        <Th width={10}>#</Th>
                        <Th>Email</Th>
                        <Th>Name</Th>
                        <Th>Date</Th>
                        <Th>Marks</Th>
                        <Th>Time Elapsed</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                    {results.length < 1 && 
                      <Tr>
                        <Td colSpan={8} alignContent={'center'} className="text-center">No data found</Td>  
                      </Tr>
                    }

                    {results && results.length > 0 && results?.map((result, index) => (
                          <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                      {index + 1}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                      {result?.student?.user?.email}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {result?.student?.user?.name}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {formatMomentDate(result?.createdAt)}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {result?.totalScored}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {formatDuration(result?.startDate, result?.endDate)}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {result?.status}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                  <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                                      <Link href={'/admin/result-manager/'+ result.id + '/test-details?test='+result?.testId + '&student='+ result?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                          Test Details
                                      </Link>
                                  </div>
                              </Td>

                          </Tr>
                      ))} 
                    </Tbody>
                  </Table>
                {/* </TableContainer> */}
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Dashboard
