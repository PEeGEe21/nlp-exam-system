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
import Swal from 'sweetalert2';
import Link from 'next/link'
import { PenAdd, Trash } from 'iconsax-react'
import { useRouter } from 'next/navigation';
import { formatMomentDate, getTotalMinutes } from '@/app/lib/utils';
import { openTestWindow } from '@/app/lib/windowref';

const ExamsListTable = ({ tests = []}) => {

  const router = useRouter();
  const takeTest = (id) => {
    router.prefetch('/take-test/' + id)
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to start a test!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed',
        allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            // router.push('/take-test/' + id);
            // openTestWindow(id)
            window.open(`/take-test/${id}`, '_blank');

        },
    }).then((result) => {
      
    });
  };

  return (
    <>
        <div className='shadow-lg'>
          <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
            {/* <TableContainer> */}
              <Table variant='unstyled' className=' table-bordered'>
                <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                  <Tr>
                    <Th width={10}>#</Th>
                    <Th width={'30%'}>Title</Th>
                    <Th>Start Date</Th>
                    <Th>End Date</Th>
                    <Th>Duration (Min)</Th>
                    <Th>Total Questions</Th>
                    <Th>Total Marks</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                {tests?.length < 1 &&
                    <Tr>
                        <Td colSpan={8} className="px-2 py-4 text-base whitespace-nowrap text-center">
                            <span className="text-[#313131] text-base">
                                No data found
                            </span>
                        </Td>
                    </Tr>
                }

                {tests?.length > 0 && tests?.map((test, index) => {
                    const now = Date.now();
                    const start_date = new Date(test?.startDate);
                    const end_date = new Date(test?.endDate);

                    const status = (() => {
                        if (start_date.getTime() <= now && now <= end_date.getTime()) {
                            return "In Progress";
                        }
                        if (now > end_date.getTime()) {
                            return "Ended";
                        }
                        return "Upcoming";
                    })();

                    return (
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
                                  {formatMomentDate(test?.startDate)}
                                  </div>
                              </div>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div>
                                  {formatMomentDate(test?.endDate)}
                                  </div>
                              </div>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className=''>
                                  {getTotalMinutes(test?.durationHours, test?.durationMinutes)}
                                  </div>
                              </div>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className=''>
                                    {test?.totalQuestions}
                                  </div>
                              </div>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className=''>
                                    {test?.totalMarks}
                                  </div>
                              </div>
                          </Td>
                          <Td className="px-2 py-4 whitespace-nowrap">
                              <div className='flex items-start justify-between text-sm'>
                                  <div className=''>
                                    <span className={`px-2 py-1 rounded text-xs ${status === 'In Progress' ? 'bg-green-500 text-white' : status === 'Ended' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                          {status}
                                      </span>
                                  </div>
                              </div>
                          </Td>
                          <Td className="px-2 py-4 text-sm whitespace-nowrap">
                              <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                                {/* && status === 'In Progress'  */}
                                {(test?.totalQuestions > 0 ) && (status === 'In Progress') ?
                                  <button onClick={()=>takeTest(test?.id)} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                      Take Test
                                  </button>
                                  : <></>
                                }
                              </div>
                          </Td>

                      </Tr>
                  )})}
                </Tbody>
              </Table>
            {/* </TableContainer> */}
          </div>
        </div>
    </>
  )
}

export default ExamsListTable
