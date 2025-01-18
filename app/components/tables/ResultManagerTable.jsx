import React, {useState} from 'react'
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from '@chakra-ui/react'
import Link from 'next/link'
import { PenAdd, Trash } from 'iconsax-react'
import { formatMomentDate, getTotalMinutes } from '@/app/lib/utils'
import { Flex, Table } from 'antd';

const ResultManagerTable = ({ tests = []}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key:'index',
            // width: 10,
            width: '5%',
            render: (text, record, index) => (
                <span className="text-[#313131] text-base">{(currentPage - 1) * pageSize + index + 1}</span>
            ),

        },
        {
            key: '2',
            title: 'Exam Information',
            dataIndex: 'exam',
            width: 50,
            render: (text, record, index) => {
                return (
                    <div className='flex items-start justify-between text-sm'>
                        <div className='flex flex-col gap-2'>
                            <p className="text-xl font-semibold ">
                                {record?.title}
                            </p>
                            <div>
                                {formatMomentDate(record?.startDate)} - {formatMomentDate(record?.endDate)}
                            </div>

                            <div className='inline-flex items-center gap-2'>
                                <p><span className='font-medium'>Duration (mins):</span> {getTotalMinutes(record?.durationHours, record?.durationMinutes)} </p>    
                                <p><span className='font-medium'>Total Ques:</span> {record?.totalQuestions}</p>     
                                <p><span className='font-medium'>Total Marks:</span> {record?.totalMarks}</p>
                            </div>
                        
                            <div className='inline-flex gap-2 items-center '>
                                <span className="bg-[#659be0] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                    {record?.markPerQuestion}mrk(s)/ques
                                </span>
                                {record.isPublished === 1 ? (
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
                )
            },
        },
        {
            title: 'Action',
            key: '3',
            width: '20%',
            render: (_, record) => {
                return(
                    <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                        <Link href={'/admin/result-manager/'+record.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                            Test Results
                        </Link>
                    </div>
                )
            },
        },
    ];


  return (
    <>
        <div className='shadow-lg'>

            <Flex gap="middle" vertical>
                <Table
                    scroll={{ x: 'max-content' }}
                    // rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={tests} 
                    components={{
                        body: {
                                // cell: EditableCell,
                            },
                        }}
                    bordered
                    rowClassName="editable-row"
                    pagination={{
                        current: currentPage, // Current page state
                        pageSize: pageSize, // Page size state
                        pageSizeOptions: ['10', '20', '50', '100'], // Options for page size
                        showSizeChanger: true, // Enable the page size changer
                        onShowSizeChange: (current, size) => {
                            setPageSize(size); // Update page size state
                            setCurrentPage(1); // Reset to first page
                        },
                        onChange: (page) => {
                            setCurrentPage(page); // Update current page state
                        },
                    }}
                    rowKey="id"
                />
            </Flex>

          {/* <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
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
          </div> */}
        </div>
    </>
  )
}

export default ResultManagerTable
