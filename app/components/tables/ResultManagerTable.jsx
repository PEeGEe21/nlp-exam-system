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
import { formatMomentDate } from '@/app/lib/utils'

const ResultManagerTable = ({ tests = []}) => {
  return (
    <>
        <div className='shadow-lg'>
          <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
            {/* <TableContainer> */}
              <Table variant='unstyled' className=' table-bordered'>
                <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                  <Tr>
                    <Th width={10}>#</Th>
                    <Th>Exam Information</Th>
                    <Th isNumeric>&nbsp;</Th>
                  </Tr>
                </Thead>
                <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                  {tests?.length < 1 &&
                      <Tr>
                          <Td colSpan={3} className="px-2 py-4 text-base whitespace-nowrap text-center">
                              <span className="text-[#313131] text-base">
                                  No data found
                              </span>
                          </Td>
                      </Tr>
                  }
                  {tests?.length > 0 && tests?.map((test, index) => (
                      <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                          <Td className="px-2 py-4 text-base whitespace-nowrap">
                              <span className="text-[#313131] text-base">
                                  {index + 1}
                              </span>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className='flex flex-col gap-2'>
                                      <p className="text-xl font-semibold ">
                                          {test?.title}
                                      </p>
                                      <div>
                                        {formatMomentDate(test?.startDate)} - {formatMomentDate(test?.endDate)}
                                      </div>

                                      <div className='inline-flex items-center gap-2'>
                                          <p><span className='font-medium'>Duration (mins):</span> 180 </p>    
                                          <p><span className='font-medium'>Total Ques:</span> {test?.totalQuestions}</p>     
                                          <p><span className='font-medium'>Total Marks:</span> {test?.totalMarks}</p>
                                      </div>
                                    
                                      <div className='inline-flex gap-2 items-center '>
                                          <span className="bg-[#659be0] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                              2mrk(s)/ques
                                          </span>
                                          {test.isPublished === 1 ? (
                                              <span className="bg-[#4ade80] text-black max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                  Published
                                              </span>
                                          ) : (
                                              <span className="bg-[#F1C40F] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                  Not Published
                                              </span>
                                          )}
                                      </div>
                                  </div>
                                  

                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 text-sm whitespace-nowrap">
                              <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                                  <Link href={'/admin/result-manager/'+test.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                      Test Results
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

export default ResultManagerTable
