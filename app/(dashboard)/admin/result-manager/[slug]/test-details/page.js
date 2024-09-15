"use client"

import React from 'react'
import { ArrowLeft } from 'iconsax-react'
import { useRouter } from 'next/navigation'
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

const StudentTestDetail = () => {
  const router = useRouter();

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
                    <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Test Detail</h1>
                </div>
            </div>

            
            <div className='shadow-lg'>
                <div className="overflow-x-auto md:overflow-x-auto p-4 text-[#313131] scrollbar-change rounded-md">
                    <div>
                        <TableContainer>
                            <Table size='sm' variant={'striped'}>
                                <Tbody>
                                    <Tr>
                                        <Td>Email</Td>
                                        <Td>mailpraiseudeh@gmail.com</Td>
                                        <Td>Name</Td>
                                        <Td>Praise</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Title</Td>
                                        <Td>Sample test</Td>
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
                                        <Td>Attempt Date</Td>
                                        <Td>6-Mar-2024 12:00 PM	</Td>
                                        <Td>Mark Per Question</Td>
                                        <Td>100</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Marks / Total Marks	</Td>
                                        <Td>40</Td>
                                        <Td>Percentage Mark	</Td>
                                        <Td>10/100</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            <div className='shadow-lg'>
                <div>
                    <div style={{borderbottom: '1px solid black' , marginBottom: '7px'}} className="content ng-scope p-4">
                        <div className="">
                            <div className="">
                                <div className="text-left q-boxes">

                                    <div style={{padding: '2px', margin: '0', display: 'inline-block'}} className="q-box mb-2">
                                        <div className="item2 ng-binding">Q2
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" ng-scope">
                                <div className="row" style={{display: 'flex', marginRight: '0'}}>
                                    <div className="clearfix" style={{flex: '1 1 auto'}}>
                                        <div className="question ng-binding"><p style={{marginBottom:'13px'}}><span style={{fontSize: '11pt'}}><span style={{lineHeight: '115%'}}><span style={{fontFamily: 'Calibri,sans-serif'}}><span style={{fontSize: '14.0pt'}}><span style={{lineHeight: '115%'}}><span style={{fontFamily: 'Times New Roman,serif'}}>The ……. is all mine; I am really happy to meet you.</span></span></span></span></span></span></p></div>
                                        <hr/>
                                        <div className="col-md-12">
                                            <table id="user" className="table table-bordered">
                                                <tbody>
                                                <tr>
                                                    <td style={{width: '30%'}}>
                                                        Your Answer
                                                    </td>
                                                    <td style={{width:'70%'}} className="colorBack">
                                                        <span className="ng-binding">priviledge</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Correct Answer
                                                    </td>
                                                    <td>
                                                        <span className="">privilege</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Mark Obtained
                                                    </td>
                                                    <td>
                                                        <span className="text-danger q-box mb-2"><b className="item2 rd ng-binding part">0</b></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Question Difficulty
                                                    </td>
                                                    <td>
                                                        <span className="label label-success ng-binding">MEDIUM</span> <b className="pull-right  ng-binding" style={{color: 'red'}}>Max Mrk: 2</b>
                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* <div className="clearfix" style="flex: 0 1 auto;align-self: center">
                                        <img style="width: 50px;height:50px;color: black;background: white;position: relative;margin-top: 80%" ng-src="assets/modules/cbt/img/bad.png" src="assets/modules/cbt/img/bad.png"> 
                                    </div>*/}
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default StudentTestDetail
