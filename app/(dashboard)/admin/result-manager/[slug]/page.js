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
import { formatMomentDate, getTotalMinutes } from '@/app/lib/utils'

const TestResult = () => {
  const [test, setTest] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const { slug: id } = params;
  
  const [studentsResult, setStudentsResult] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      try {
        const res = await fetch('http://localhost:3001/api/tests/'+id);
        if (res.ok) {
          const result = await res.json();
          setTest(result.test);
          // test = result.data.find(t => t.id === Number(id));
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
  }, [id]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('https://jsonplaceholder.typicode.com/studentresult');
  //       if (res.ok) {
  //         const data = await res.json();
  //         setStudentsResult(data);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching data:', err?.message);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

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
                    <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">{test?.title}</h1>
                </div>
            </div>

            
            {test && <div className='shadow-lg'>
                <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
                    <div>
                        <TableContainer>
                            <Table size='sm' className='table-bordered'>
                                <Tbody>
                                    <Tr>
                                        <Td>Title</Td>
                                        <Td>{test?.title}</Td>
                                        <Td>Test Duration(min)	</Td>
                                        <Td>{getTotalMinutes(test?.durationHours, test?.durationMinutes)}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Start Date</Td>
                                        <Td>{formatMomentDate(test?.startDate)}</Td>
                                        <Td>End Date</Td>
                                        <Td>{formatMomentDate(test?.endDate)}	</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Total Questions</Td>
                                        <Td>{test?.totalQuestions}</Td>
                                        <Td>Mark Per Question</Td>
                                        <Td>{test?.totalMarks}   </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>}
            <div>
              {test ? <StudentsResultManagerTable test_id={test?.id}/> : ''}
            </div>
    </div>
  )
}

export default TestResult
