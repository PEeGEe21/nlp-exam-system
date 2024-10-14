import React from 'react'
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
import { dateFormat } from '@/app/lib/utils'

const ResultManagerStudentTable = ({ results = []}) => {
  return (
    <>
        <div className='shadow-lg'>
          <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
            {/* <TableContainer> */}
              <Table variant='unstyled' className=' table-bordered'>
                <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                  <Tr>
                    <Th width={10}>#</Th>
                    <Th>Title</Th>
                    <Th>Attempt Date</Th>
                    <Th>Marks/Total Marks</Th>
                    <Th>Time Elapsed</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                {results?.length < 1 &&
                    <Tr>
                        <Td colSpan={6} className="px-2 py-4 text-base whitespace-nowrap text-center">
                            <span className="text-[#313131] text-base">
                                No data found
                            </span>
                        </Td>
                    </Tr>
                }
                {results?.length > 0  && results?.map((result, index) => (
                      <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                          <Td className="px-2 py-4 text-base whitespace-nowrap">
                              <span className="text-[#313131] text-base">
                                  {index + 1}
                              </span>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <p>
                                      {result?.test?.title}
                                  </p>
                              </div>
                          </Td>

                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div>
                                      {dateFormat(result.createdAt)}
                                  </div>
                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className='flex flex-col gap-2'>

                                      <div className='inline-flex items-center gap-2'>
                                          <p>
                                            <span className='font-medium'>{result?.totalScored}</span> / 
                                            <span className='font-medium'> {result?.totalMarks}</span> 
                                          </p>
                                      </div>
                                  </div>
                              
                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className=''>
                                  {result?.duration} min{result?.duration > 1 && result?.duration !== 0 ? 's' : ''}
                                  </div>
                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 text-sm whitespace-nowrap">
                              <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                  <Link href={'/student/test-results/'+result.id +'/test-details?test='+ result.testId+ '&student='+ result?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                      Details
                                  </Link>
                                  {/* <Link href={'/admin/result-manager/'+ result.id + '/test-details?test='+test_id + '&student='+ result?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                      Test Details
                                  </Link> */}
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

export default ResultManagerStudentTable
