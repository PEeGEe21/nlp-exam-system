"use client"
import StudentsResultManagerTable from '@/app/components/tables/StudentsResultManagerTable'
import { ArrowLeft } from 'iconsax-react'
import React, {useState, useEffect} from 'react'
import { useRouter, useParams } from 'next/navigation'
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
import { demostudents } from '@/app/lib/constants'

const TestResult = () => {
  const router = useRouter();
  const params = useParams();
  const { slug: id } = params;
  
  const [studentsResult, setStudentsResult] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/studentresult');
        if (res.ok) {
          const data = await res.json();
          setStudentsResult(data);
        }
      } catch (err) {
        console.error('Error fetching data:', err?.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='space-y-5'>
           <div className="flex flex-row items-center justify-start gap-8 mb-8">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                  >
                    <ArrowLeft />
                  </button>

                <div className="w-full">
                    <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Social Studies Test</h1>
                </div>
            </div>

            
            <div className='shadow-lg'>
                <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
                    <div>
                        <TableContainer>
                            <Table size='sm' className='table-bordered'>
                                <Tbody>
                                    <Tr>
                                        <Td>Title</Td>
                                        <Td>Social Studies Test</Td>
                                        <Td>Test Duration(min)	</Td>
                                        <Td>30</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Start Date</Td>
                                        <Td>6-Mar-2024 12:00 PM	</Td>
                                        <Td>End Date</Td>
                                        <Td>6-Mar-2024 12:00 PM	</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total Questions</Td>
                                        <Td>1</Td>
                                        <Td>Mark Per Question</Td>
                                        <Td>100   </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div>
                <StudentsResultManagerTable students={demostudents}/>
            </div>
    </div>
  )
}

export default TestResult
