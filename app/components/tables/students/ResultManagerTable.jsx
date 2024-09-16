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

const ResultManagerStudentTable = ({ tests = []}) => {
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

                {tests?.map((test, index) => (
                      <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                          <Td className="px-2 py-4 text-base whitespace-nowrap">
                              <span className="text-[#313131] text-base">
                                  {index + 1}
                              </span>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <p>
                                      {test.title}
                                  </p>
                              </div>
                          </Td>

                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div>
                                      Apr 17th, 2024
                                  </div>
                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className='flex flex-col gap-2'>

                                      <div className='inline-flex items-center gap-2'>
                                          <p>
                                            <span className='font-medium'>31</span> / 
                                            <span className='font-medium'> 100</span> 
                                          </p>
                                      </div>
                                  </div>
                              
                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className=''>
                                          3 mins
                                  </div>
                              </div>
                              
                          </Td>
                          <Td className="px-2 py-4 text-sm whitespace-nowrap">
                              <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                  <Link href={'/student/test-results/'+test.id +'/test-details'} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                      Details
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

export default ResultManagerStudentTable
