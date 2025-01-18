import React, { useEffect, useState } from 'react'
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
import { calculateCompletionPercentage, DisplayDuration, formatDuration, formatMomentDate, hostUrl } from '@/app/lib/utils'
import { Flex, Table } from 'antd';

const StudentsResultManagerTable = ({ test_id}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      try {
        const res = await fetch(hostUrl + 'results/test/'+test_id);
        
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

  const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key:'index',
        // width: 10,
        width: '2%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">{(currentPage - 1) * pageSize + index + 1}</span>
        ),
    },
    {
        key:'1',
        title: 'Email',
        dataIndex: 'email',
        width: '10%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">{record?.student?.user?.email}</span>
        ),
    },
    {
        key:'2',
        title: 'Name',
        dataIndex: 'name',
        width: '10%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">{record?.student?.user?.name}</span>
        ),
    },
    {
        key:'3',
        title: 'Date',
        dataIndex: 'date',
        width: '10%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">
              {formatMomentDate(record?.createdAt)}
            </span>
        ),
    },
    {
        key:'4',
        title: 'Marks',
        dataIndex: 'marks',
        width: '5%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">
              {record?.totalScored}
            </span>
        ),
    },
    {
        key:'5',
        title: 'Time Elapsed',
        dataIndex: 'time_elapsed',
        width: '5%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">
              {formatDuration(record?.startDate, record?.endDate)}
            </span>
        ),
    },
    {
        key:'6',
        title: 'Status',
        dataIndex: 'status',
        width: '5%',
        render: (text, record, index) => (
            <span className="text-[#313131] text-base">
              {record?.status}
            </span>
        ),
    },
    {
        key: '7',
        title: '',
        width: '5%',
        render: (_, record) => {
            return(
              <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                  <Link href={'/admin/result-manager/'+ record.id + '/test-details?test='+test_id + '&student='+ record?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                      Test Details
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
                  dataSource={students} 
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

          {/* <div className="overflow-x-auto md:overflow-x-auto p-5 text-[#313131] scrollbar-change rounded-md">
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
          </div> */}
        </div>
    </>
  )
}

export default StudentsResultManagerTable
