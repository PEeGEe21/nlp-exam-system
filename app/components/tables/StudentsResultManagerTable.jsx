import React, { useEffect, useState } from 'react'
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
import Link from 'next/link'
import { PenAdd, Trash } from 'iconsax-react'
import { calculateCompletionPercentage, DisplayDuration, formatDuration, formatMomentDate } from '@/app/lib/utils'

const StudentsResultManagerTable = ({ test_id}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      try {
        const res = await fetch('http://localhost:3001/api/results/test/'+test_id);
        
        if (res.ok) {
          const result = await res.json();
          setStudents(result.results);
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
  }, [test_id]);

  return (
    <>
        <div className='shadow-lg'>
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

                {students.length < 1 && 
                  <Tr>
                    <Td colSpan={8} alignContent={'center'} className="text-center">No data found</Td>  
                  </Tr>
                }

                {students.length > 0 && students?.map((result, index) => (
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
                                {/* {result?.startDate} {result?.endDate} */}
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
                                  <Link href={'/admin/result-manager/'+ result.id + '/test-details?test='+test_id + '&student='+ result?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
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
    </>
  )
}

export default StudentsResultManagerTable
