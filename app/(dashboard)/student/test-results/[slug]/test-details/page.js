// "use client"

// import React from 'react'
// import { ArrowLeft, Check } from 'iconsax-react'
// import { useRouter } from 'next/navigation'
// import {
//     Table,
//     Thead,
//     Tbody,
//     Tfoot,
//     Tr,
//     Th,
//     Td,
//     TableCaption,
//     TableContainer,
//   } from '@chakra-ui/react'
// import { CheckIcon, CrossIcon } from 'lucide-react'
// import { questions, scoredQuestions } from '@/app/lib/constants'
// import { CloseIcon } from '@/app/components/ui/IconComponent'

// const StudentTestDetail = () => {
//     const router = useRouter();
//     const status = "In Progress"
//     return (
//         <div>
//             <div className='space-y-5'>
//                 <div className="flex flex-row items-center justify-start gap-8 mb-8">
//                     <button
//                         type="button"
//                         onClick={() => router.back()}
//                         className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
//                     >
//                         <ArrowLeft />
//                     </button>

//                     <div className="w-full">
//                         <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Social Studies Test</h1>
//                     </div>
//                 </div>

                
//                 <div className='shadow-lg'>
//                     <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
//                         <div>
//                             <TableContainer>
//                                 <Table size='sm' variant={'unstyled'} className='table-bordered border border-[#ddd] border-collapse'>
//                                     <Tbody>
//                                         <Tr>
//                                             <Td>Email</Td>
//                                             <Td>mailpraiseudeh@gmail.com</Td>
//                                             <Td>Name</Td>
//                                             <Td>Praise</Td>
//                                         </Tr>
//                                         <Tr>
//                                             <Td>Title</Td>
//                                             <Td>Sample test</Td>
//                                             <Td>Test Duration(min)	</Td>
//                                             <Td>30</Td>
//                                         </Tr>
//                                         <Tr>
//                                             <Td>Start Date</Td>
//                                             <Td>6-Mar-2024 12:00 PM	</Td>
//                                             <Td>End Date</Td>
//                                             <Td>6-Mar-2024 12:00 PM	</Td>
//                                         </Tr>
//                                         <Tr>
//                                             <Td>Attempt Date</Td>
//                                             <Td>6-Mar-2024 12:00 PM	</Td>
//                                             <Td>Mark Per Question</Td>
//                                             <Td>100</Td>
//                                         </Tr>
//                                         <Tr>
//                                             <Td>Marks / Total Marks	</Td>
//                                             <Td>40</Td>
//                                             <Td>Percentage Mark	</Td>
//                                             <Td>10/100</Td>
//                                         </Tr>
//                                     </Tbody>
//                                 </Table>
//                             </TableContainer>
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <div className='p-4 shadow-lg'>
//                         <h3>Questions and Answers</h3>
//                     </div>
                    
//                     <div>
//                         {scoredQuestions.map((_itx, index)=>(
//                             <div className='shadow-lg' key={index}>
//                                 <div>
//                                     <div className="border-b border-black mb-2 p-4">
//                                         <div className="">
//                                             <div className="p-0.5 inline-block text-left q-boxes">
//                                                 <div className="">
//                                                     Q{_itx.id}
//                                                 </div>
//                                             </div>

//                                             <div className=" ">
//                                                 <div className="flex relative gap-2">
//                                                     <div className="clearfix flex-auto">
//                                                         <div className="question mb-3">
//                                                             <div 
//                                                             dangerouslySetInnerHTML={{
//                                                                 __html: _itx.question
//                                                             }}>
//                                                             </div>
//                                                         </div>
//                                                         <hr/>
//                                                         <div className="">
//                                                             <table id="user" className="table table-bordered border border-[#ddd] border-collapse w-full">
//                                                                 <tbody className=''>
//                                                                     <tr>
//                                                                         <td className='w-[30%]'>
//                                                                             Your Answer
//                                                                         </td>
//                                                                         <td className="w-[70%]">
//                                                                             <span>{_itx.answer}</span>
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className='w-[30%]'>
//                                                                             Correct Answer
//                                                                         </td>
//                                                                         <td className='w-[30%]'>
//                                                                             <span className="">{_itx.correctAnswer}</span>
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td className='w-[30%]'>
//                                                                             Mark Obtained
//                                                                         </td>
//                                                                         <td className='w-[30%]'>
//                                                                             <span className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center ${_itx.isCorrect ? 'bg-[#179301]' : 'bg-[#fa1301]'}`}>
//                                                                                 <b className="item2 part">{_itx.score}</b>
//                                                                             </span>
//                                                                         </td>
//                                                                     </tr>
//                                                                     <tr>
//                                                                         <td>
//                                                                             Question Difficulty
//                                                                         </td>
//                                                                         <td>
//                                                                             <div className='w-full flex items-center justify-between'>

//                                                                                 <span className="label label-success ng-binding">{_itx.difficulty}</span> 
                                                                                
//                                                                                 <b className="pull-right text-deep-orange-900">Max Mrk: {_itx.mark}</b>
//                                                                             </div>

//                                                                         </td>
//                                                                     </tr>

//                                                                 </tbody>
//                                                             </table>
//                                                         </div>
//                                                     </div>
//                                                     {/* <div className="clearfix" style="flex: 0 1 auto;align-self: center">
//                                                         <img style="width: 50px;height:50px;color: black;background: white;position: relative;margin-top: 80%" ng-src="assets/modules/cbt/img/bad.png" src="assets/modules/cbt/img/bad.png"> 
//                                                     </div>*/}
//                                                     <div className="clearfix flex-initial self-center">
//                                                             {_itx.isCorrect ? (
//                                                                 <div className=" text-[#FFF] border bg-[#0e573cda] max-w-fit px-3 py-1 rounded-lg text-xs inline-flex items-center gap-2  top-0 min-h-10">
//                                                                     <CheckIcon/>
//                                                                 </div>
//                                                             ) : (
//                                                                 <div className=" text-[#FFF] border bg-[#fa1301] max-w-fit px-3 py-1 rounded-lg text-xs inline-flex items-center gap-2  top-0 min-h-10">
//                                                                     <CloseIcon color={'#fff'} size='30'/>
//                                                                 </div>
//                                                             )}
//                                                     </div>
//                                                 </div>
//                                             </div>


//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default StudentTestDetail

"use client"

import React, {useState, useEffect} from 'react'
import { ArrowLeft, Check } from 'iconsax-react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
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
import { CheckIcon, CrossIcon } from 'lucide-react'
import { questions, scoredQuestions } from '@/app/lib/constants'
import { CloseIcon } from '@/app/components/ui/IconComponent'
import toast from 'react-hot-toast'
import { formatMomentDate, getTotalMinutes, hostUrl } from '@/app/lib/utils'

const MyTestDetail = () => {
    const [test, setTest] = useState(null);
    const [student, setStudent] = useState(null);
    const [result, setResult] = useState(null);
    const [scores, setScores] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [totalScored, setTotalScored] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultDetails, setResultDetails] = useState({})

    const router = useRouter();
    const params = useParams();
    const { slug: id } = params;
    const searchParams = useSearchParams();
    const test_id = searchParams.get('test');
    const student_id = searchParams.get('student');

    // console.log(id, test_id, student_id)
    const status = "In Progress"


    useEffect(() => {
        const fetchData = async () => {
          if(test_id){
            setLoading(true); // Start loading
            setSearchQuery('');
            try {
              const res = await fetch(hostUrl + 'results/scores/'+id + '/' + test_id + '/' + student_id);
            //   console.log(res)
              if (res.ok) {
                const result = await res.json();
                
                if(result.success){
                    // console.log(result)
                    setTest(result.test);
                    setStudent(result.student);
                    setResult(result.result);
                    setScores(result.result?.scores);
                    setPercentage(result.percentage);
                    setTotalScored(result.totalScored);
                    setTotalMarks(result.totalMarks);
                    // console.log(result)
                } else{
                    toast.error('Test not found')
                    router.push('/result-manager')
                }
                
              }
            } catch (err) {
                console.log(err)
              console.error('Error fetching data:', err?.message);
            } finally {
              setTimeout(() =>{
                setLoading(false); // End loading
              }, 500)
            }
          }
        };
    
        fetchData();
      }, [id, test_id, student_id]);

    return (
        <div>
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

                
               {test &&  <div className='shadow-lg'>
                    <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
                        <div>
                            <TableContainer>
                                <Table size='sm' variant={'unstyled'} className='table-bordered border border-[#ddd] border-collapse'>
                                    <Tbody>
                                        <Tr>
                                            <Td>Email</Td>
                                            <Td>{student?.user?.email}</Td>
                                            <Td>Name</Td>
                                            <Td>{student?.user?.username??'' }</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Title</Td>
                                            <Td>{test?.title}</Td>
                                            <Td>Test Duration(min)</Td>
                                            <Td>{getTotalMinutes(test?.durationHours, test?.durationMinutes)}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Start Date</Td>
                                            <Td>{formatMomentDate(test?.startDate)}	</Td>
                                            <Td>End Date</Td>
                                            <Td>{formatMomentDate(test?.endDate)}	</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Attempt Date</Td>
                                            <Td>{formatMomentDate(result?.createdAt)}</Td>
                                            <Td>Mark Per Question</Td>
                                            <Td>{totalMarks}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Marks / Total Marks	</Td>
                                            <Td>{totalScored}</Td>
                                            <Td>Percentage Mark	</Td>
                                            <Td>{percentage}/100</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                    </div>
                }
                <div>
                    <div className='p-4 shadow-lg'>
                        <h3>Questions and Answers</h3>
                    </div>
                    
                    <div>
                        {scores && scores.map((_itx, index)=>(
                            <div className='shadow-lg' key={index}>
                                <div>
                                    <div className="border-b border-black mb-2 p-4">
                                        <div className="">
                                            <div className="p-0.5 inline-block text-left q-boxes">
                                                <div className="">
                                                    Q{index + 1}
                                                </div>
                                            </div>

                                            <div className=" ">
                                                <div className="flex relative gap-2">
                                                    <div className="clearfix flex-auto">
                                                        <div className="question mb-3">
                                                            <div 
                                                            dangerouslySetInnerHTML={{
                                                                __html: _itx.question?.questionPlain ? _itx.question?.questionPlain : _itx.question?.question
                                                            }}>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="">
                                                            <table id="user" className="table table-bordered border border-[#ddd] border-collapse w-full">
                                                                <tbody className=''>
                                                                    <tr>
                                                                        <td className='w-[30%]'>
                                                                            Your Answer
                                                                        </td>
                                                                        <td className="w-[70%]">
                                                                            <span>{_itx.studentAnswer}</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className='w-[30%]'>
                                                                            Correct Answer
                                                                        </td>
                                                                        <td className='w-[30%]'>
                                                                            <span className="">{_itx.correctAnswer}</span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className='w-[30%]'>
                                                                            Mark Obtained
                                                                        </td>
                                                                        <td className='w-[30%]'>
                                                                            <span className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center ${_itx.isCorrect ? 'bg-[#179301]' : 'bg-[#fa1301]'}`}>
                                                                                <b className="item2 rd ng-binding part">{_itx.score}</b>
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            Question Difficulty
                                                                        </td>
                                                                        <td>
                                                                            <div className='w-full flex items-center justify-between'>

                                                                                <span className="label label-success ng-binding">{_itx.question.difficulty.title}</span> 
                                                                                
                                                                                <b className="pull-right text-deep-orange-900">Max Mrk: {_itx.questionTest.mark}</b>
                                                                            </div>

                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/* <div className="clearfix" style="flex: 0 1 auto;align-self: center">
                                                        <img style="width: 50px;height:50px;color: black;background: white;position: relative;margin-top: 80%" ng-src="assets/modules/cbt/img/bad.png" src="assets/modules/cbt/img/bad.png"> 
                                                    </div>*/}
                                                    <div className="clearfix flex-initial self-center">
                                                            {_itx.isCorrect ? (
                                                                <div className=" text-[#FFF] border bg-[#0e573cda] max-w-fit px-3 py-1 rounded-lg text-xs inline-flex items-center gap-2  top-0 min-h-10">
                                                                    <CheckIcon/>
                                                                </div>
                                                            ) : (
                                                                <div className=" text-[#FFF] border bg-[#fa1301] max-w-fit px-3 py-1 rounded-lg text-xs inline-flex items-center gap-2  top-0 min-h-10">
                                                                    <CloseIcon color={'#fff'} size='30'/>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MyTestDetail
