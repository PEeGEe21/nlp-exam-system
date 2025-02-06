"use client"
import FullscreenComponent from '@/app/components/FullScreenComponent';
import useCountdown from '@/app/hooks/useCountdown';
import { mainQuestions } from '@/app/lib/constants';
import { ArrowLeft, ArrowRight, Play } from 'iconsax-react';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2';
import { useRouter, useParams } from 'next/navigation'
import { getTotalMinutes,formattedDateString, calculateDuration, hostUrl } from '@/app/lib/utils';
import { LoaderIcon } from '@/app/components/ui/IconComponent';
import axios from 'axios';
import { closeTestWindow } from '@/app/lib/windowref';


const TakeTest = () => {
  const [loading, setLoading] = useState(true);
  const [isWelcomePage, setIsWelcomePage] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [test, setTest] = useState(null);
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questionStatus, setQuestionStatus] = useState([]);
  const [startExamDateTime, setStartExamDateTime] = useState(null);
  const [endExamDateTime, setEndExamDateTime] = useState(null);
  const params = useParams();
  const { slug: id } = params;


  const router = useRouter();
  useEffect(()=>{
    const getUser = async ()=>{
      // setLoading(true); // Start loading
        try{
            if (localStorage.getItem('exam-system-user')){
                const data = await JSON.parse(
                    localStorage.getItem("exam-system-user")
                );
                setUser(data)
                
            }else{
                router.push("/auth/login")
            }
                

        }catch(err){}
    };
    getUser()
  }, [])

  // Effect to initialize question status when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && questionStatus.length !== questions.length) {
      setQuestionStatus(prevStatus => {
        const newStatus = [...prevStatus];
        for (let i = prevStatus.length; i < questions.length; i++) {
          newStatus.push('Not Attended');
        }
        return newStatus;
      });
    }
  }, [questions]); // This effect runs when questions are loaded

  const handleViewStatusUpdate = (index) => {
    if (questionStatus[index] === 'Not Attended') {
      updateQuestionStatus(index, 'Viewed');
    }
  };
  
  useEffect(() => {
    handleViewStatusUpdate(currentQuestionIndex);
  }, [currentQuestionIndex]);

  // useEffect(() => {
  //   // Update status to 'Viewed' when a question is navigated to
  //   updateQuestionStatus(currentQuestionIndex, 'Viewed');
  // }, [currentQuestionIndex]);

  // const handleOptionChange = (questionId, optionId) => {
  //   setSelectedOptions((prev) => ({
  //     ...prev,
  //     [questionId]: optionId,
  //   }));
  //   updateQuestionStatus(currentQuestionIndex, 'Attended');
  // };



  // const handleOptionChange = (questionId, answerId) => {
  //   setSelectedOptions((prevSelectedOptions) => ({
  //     ...prevSelectedOptions,
  //     [questionId]: answerId,
  //   }));
  // };

  // const handleOptionChange = (questionId, optionId) => {
  //   setSelectedOptions((prev) => ({
  //     ...prev,
  //     [questionId]: optionId,
  //   }));
  // };

  const handleOptionChange = (question, questionId, selectedValue) => {
    // console.log(questionId, selectedOptionId)

    if (question.optionAnswerTypeId === 1) {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [questionId]: selectedValue,
      }));
    }

    if (question.optionAnswerTypeId === 3) {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [questionId]: selectedValue,
      }));
    }

    // console.log(questionId)
    const questionIndex = questions.findIndex(q => q.id === question.id);

    if (questionIndex !== -1) {
      // console.log(questionIndex, 'questionIndex');
      updateQuestionStatus(questionIndex, 'Attended'); // Mark question as 'Attended'
    } else {
      // console.warn("Question with ID", question.id, "not found in the questions array");
    }

    // console.log(selectedOptions, 'selectedOptions')
  };


  const updateQuestionStatus = (index, status) => {
    setQuestionStatus((prev) => {
      const updatedStatus = [...prev];
      // Only update to 'Viewed' if it hasn't been 'Attended' yet
      if (status === 'Viewed' && updatedStatus[index] === 'Not Attended') {
        updatedStatus[index] = status;
      }

      console.log(status, index, 'hereee')
      if (status === 'Attended') {
        updatedStatus[index] = 'Attended';
      console.log(updatedStatus, status, index, 'hereee')
      }
      return updatedStatus;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if(id){
        try {
          const res = await fetch(hostUrl + 'tests/'+id);
          if (res.ok) {
            const result = await res.json();
                
            if(result.success){
                setTest(result.test);
            } else{
                toast.error('Test not found')
            }
            setTimeout(() =>{
              setLoading(false); // End loading
            }, 500)
          }
        } catch (err) {
          console.error('Error fetching data:', err?.message);
        } finally {
          setTimeout(() =>{
            setLoading(false); // End loading
          }, 500)
        }
      }
    };

    fetchData();
  }, [user, id]);


// useEffect(() => {
//   const fetchData = async () => {
//     if(id){
//       setLoading(true); // Start loading
//       try {
//         const res = await fetch(hostUrl + 'tests/'+id+'/questions');
//         if (res.ok) {
//           const result = await res.json();
              
//           if(result.success){
//               setTest(result.test);
//           } else{
//               toast.error('Test not found')
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err?.message);
//       } finally {
//         setTimeout(() =>{
//           setLoading(false); // End loading
//         }, 500)
//       }
//     }
//   };

//   fetchData();
// }, [id]);

// const test = {
//   id: 1,
//   title: 'Test 1',
//   start_date: '2024-12-01 00:00:00',
//   end_date: '2024-12-01 23:59:59',
//   questions: mainQuestions,
// }

const formStart = formattedDateString(test?.startDate);
const formEnd = formattedDateString(test?.endDate);

// const { days, hours, minutes, seconds } = useCountdown(test?.startDate, test?.endDate);



  const submitTest = async () => {
    if(selectedOptions){
      try{
        // setEndExamDateTime(new Date());
        // console.log(selectedOptions, 'here')
        var payload = {}
        payload.user_id = Number(user.id);
        payload.answers = JSON.stringify({ selectedOptions });
        payload.endExamDateTime = new Date();
        payload.startExamDateTime = startExamDateTime;


        if(payload.startExamDateTime && payload.endExamDateTime){
          payload.duration = calculateDuration(payload.startExamDateTime, payload.endExamDateTime)
        }

        const response = await axios.post(hostUrl + 'tests/'+id+'/submit', payload);

        if (response.data.success){
            setHasSubmitted(true);

            Swal.fire('Submitted Successfully', 'Your answers have been submitted successfully','success')
            .then(() => {
              // Actions to perform after user clicks "OK" on the success dialog
              setIsFullscreen(false);
            });
            finishTest();
            // setIsFinished(true);
            // setIsFullscreen(false);

            // setTimeout(()=>{
            //   finishTest();
            // }, 5000)

        } else {
          Swal.fire('Error', 'An error occurred while submitting your answers','error');
        }
  
      } catch(err){
        console.error(err)
        Swal.fire('Error', 'An error occurred while submitting your answers','error');
      }
    }


    // console.log('submitted')
    // setIsFullscreen(false);
    // setHasSubmitted(true);
  }

  const { days, hours, minutes, seconds } = useCountdown(test?.startDate, test?.endDate, submitTest, isWelcomePage);


  const startTest = async () => {
    setIsWelcomePage(false);
    setLoading(true); // Start loading
    try {
      const res = await fetch(hostUrl + 'tests/'+id+'/questions');
      if (res.ok) {
        const result = await res.json();
            
        if(result.success){
            setQuestions(result.data);
            console.log(questions, 'questions')
            setTimeout(()=>{
              // setIsFullscreen(true);
              toggleFullscreen();

              setStartExamDateTime(new Date());
              
            }, 300);
            setLoading(false); // Start loading

        } else{
            toast.error('Test not found')
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err?.message);
    } finally {
      setTimeout(() =>{
        setLoading(false); // End loading
      }, 500)
    }
  
  }
  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    const elem = document.documentElement; // Fullscreen the entire page or a specific div if needed

    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        // Firefox
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE/Edge
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      exitTest();
      // if (document.exitFullscreen) {
      //   document.exitFullscreen();
      // } else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen();
      // } else if (document.webkitExitFullscreen) {
      //   document.webkitExitFullscreen();
      // } else if (document.msExitFullscreen) {
      //   document.msExitFullscreen();
      // }

    }
  };

  const exitTest = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to submit the test!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Submit',
        allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            // router.push('/take-test/' + id);
            submitTest();
        },
    }).then((result) => {
      if (result.isConfirmed) {
        // Check if the document is currently in fullscreen mode
        if (document.fullscreenElement) {
          // User confirmed submission, exit fullscreen
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          setIsFullscreen(false);
        }

        // finishTest();
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // console.log(event.keyCode == 27, event.key === "Escape", isFullscreen);
  
      // Ensure fullscreen is truly active and Escape key is pressed
      if((event.key=='Escape'||event.key=='Esc'||event.keyCode==27) && (event.target.nodeName=='BODY') && isFullscreen){
        event.preventDefault(); // Prevent exiting fullscreen
        exitTest(); // Trigger the test submission confirmation
      }
    };
    // console.log(isFullscreen, 'isFullscreen status');
  
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    }
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);
  
  const buttons = Array.from({ length: 15 }, (_, i) => i + 1); // Creates an array with 15 elements

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevStep) => prevStep + 1);
        // setNextDisabled(true);
        setNextDisabled(currentQuestionIndex + 1 >= questions.length - 1);
        setIsFinished(currentQuestionIndex + 1 >= questions.length - 1);
        // Enable the "Previous" button
        setPrevDisabled(false);
      }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prevStep) => prevStep - 1);
        // setNextDisabled(true);
        setPrevDisabled(currentQuestionIndex - 1 <= 0);
        // Enable the "Next" button
        setNextDisabled(false);
      }
  };

  const handleButtonClick = (index) => {
    setCurrentQuestionIndex(index);

    setNextDisabled(index >= questions.length - 1);
    setPrevDisabled(index <= 0);
  };

  // In the opened window (e.g., /take-test)
  const finishTest = () => {
    // window.close(); // Close the window
    router.push('/student/test-results'); // Redirect if needed
  };

  const now = Date.now();
  const start_date = new Date(test?.startDate);
  const end_date = new Date(test?.endDate);

  const status = useMemo(() => {
    if (start_date.getTime() <= now && now <= end_date.getTime()) {
      return "In Progress";
    }
    if (now > end_date.getTime()) {
      return "Ended";
    }
    return "Upcoming";
  }, [test?.startDate, test?.endDate]);


  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAttendedLastQuestion = questionStatus[currentQuestionIndex] === 'Attended';
  const hasViewedLastQuestion = questionStatus[currentQuestionIndex] === 'Viewed';

  return (
    <>
      {hasSubmitted &&
        <div className={`fixed w-full h-full z-[2] bg-blue-gray-900 bg-opacity-50 backdrop-blur-sm pointer-events-none`}></div>
      }
        {/* welcome  */}
        {isWelcomePage && 
          <>
            <div className='w-full max-w-5xl mx-auto p-4 md:px-12 min-h-[400px] max-h-[500px] bg-white h-full'>
              {!loading ? 

                <div className='flex flex-col h-full gap-5'>
                  <div className="flex items-start justify-between gap-2 h-auto">
                    <Image
                      src={'/images/navbar-img/avatar-1.png'}
                      alt=""
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <div>
                      <div>
                        <p>{user?.username??''}</p>
                        <p>{user?.email}</p>
                        <p><span>Test title: </span>{test?.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className='h-full items-end justify-end'>
                    <div><b>INSTRUCTIONS</b></div>
                    <hr />

                    <div>
                      <div className='flex items-center w-full'>
                        <div className=' justify-between h-full w-2/3 flex flex-col gap-4'>
                          <div>
                            <ul className='list-disc list-inside'>
                              <li>Total Mark: {test?.totalMarks}</li>
                              <li>Test Duration (Min): {getTotalMinutes(test?.durationHours, test?.durationMinutes)}</li>
                              <li>You can start the test by clicking the start button.</li>
                            </ul>
                          </div>
                            <div>
                              Duration: {getTotalMinutes(test?.durationHours, test?.durationMinutes)}mins
                            </div>
                          <div>
                            <div>
                              Instructions:
                            </div>
                            <ul className='list-decimal list-inside'>
                              <li>Read all instructions carefully.
                              </li>
                            </ul>
                          </div>
                          
                        </div>

                        <div className=' flex-1 '>
                          {test && user && (status === 'In Progress') ? 
                            <div className='flex align-center justify-center flex-col text-center cursor-pointer'>
                              <span className='flex align-center justify-center w-full'>
                                <button  type="button" onClick={startTest}  className='bg-[#6457EF] rounded-full p-3 h-12 w-12 flex justify-center items-center text-[#EEEEF0B8] animate-pulse'>
                                  <Play variant='Bulk' color='#fff'/>
                                </button>
                              </span>
                              <p>Start</p>
                            </div>
                            : ""}
                        </div>
                      </div>
                    </div>
                    
                  </div>

                  <div className='w-full flex items-center justify-center'>

                    <button onClick={finishTest} className='bg-red-500 text-white px-3 py-2 text-sm flex items-center gap-1'>
                      <ArrowLeft size={17} /> Go back
                    </button>
                  </div>
                </div>
            : <div className='text-center w-full items-center justify-center flex'><LoaderIcon extraClass='text-gray-900'/></div>}

            </div>

          </>
          
        }


      {!isWelcomePage && 
        <div className={`w-full flex flex-col gap-4  max-w-7xl mx-auto py-12 h-full ${hasSubmitted ? '!pointer-events-none' : ''}`}>
          {/* <button onClick={toggleFullscreen}>
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </button> */}

          {!loading ? 
            <>
              <div className='bg-white h-full p-6 flex items-center justify-between shadow-sm rounded-lg max-h-32'>
                <div className='space-y-2'>
                {user?.username ? 
                  <h1>
                    <span className='font-semibold'>Student Name :</span> {user?.username}
                  </h1>
                  : ''}
                  <h1>
                    <span className='font-semibold'>Student Email :</span> {user?.email}
                  </h1>
                  <h1>
                    <span className='font-semibold'>Test Title :</span> {test?.title}
                  </h1>
                </div>

                <div>
                    <div className="flex justify-center flex-wrap gap-2.5 md:gap-4">
                        <div className="text-center">
                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                                {days}
                            </div>
                            <p className="text-xs text-GreyCloud md:text-sm">Day</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                                {hours}
                            </div>
                            <p className="text-xs text-GreyCloud md:text-sm">Hr</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                                {minutes}
                            </div>
                            <p className="text-xs text-GreyCloud md:text-sm">Min</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-[#EA6A32] size-12 rounded-lg flex justify-center items-center text-Iridium text-xl md:text-[1.375rem] font-semibold mb-2.5">
                                {seconds}
                            </div>
                            <p className="text-xs text-GreyCloud md:text-sm">Sec</p>
                        </div>
                    </div> 
                </div>
              </div>

              <div className='bg-white h-full p-6 shadow-sm rounded-lg max-h-[200px]'>
                <div className='flex items-center justify-between'>

                  <div className='flex-1'>
                    <p className='font-semibold'>Test Instrutions</p>
                    <div className=''>
                      <ul>
                        <li>
                          <div dangerouslySetInnerHTML={{
                                                        __html: test?.instructions,
                                                    }}>
                                                      </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className='inline-flex gap-2 flex-1 justify-end'>
                        <div className='flex flex-col items-center gap-1'>
                            <span>selected</span>
                            <button
                                className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center bg-[#f893a6]`}
                              >
                            </button>
                        </div>

                        <div className='flex flex-col items-center gap-1'>
                          <span>attended</span>
                          <button
                            className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center bg-[#179301] `}
                          >
                          </button>
                        </div>
                        
                        <div className='flex flex-col items-center gap-1'>
                          <span>viewed</span>
                          <button
                            className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center bg-[#ff9214]`}
                          >
                          </button>
                        </div>

                        <div className='flex flex-col items-center gap-1'>
                          <span>not opened</span>
                          <button
                              className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center bg-[#41546d]`}
                          >
                          </button>
                        </div>
                  </div>
                </div>

              </div>

              <div className='flex gap-4'>
                <div className='w-7/12 bg-white p-6 rounded-lg'>

                  
                    <div className=' min-h-96 flex flex-col justify-between h-full'>
                        
                        <div>
                          <div>
                              <h2 className='font-bold'>
                                Question  {currentQuestionIndex + 1}
                              </h2>
                              <div className='py-3 text-base' dangerouslySetInnerHTML={{
                                                    __html: questions[currentQuestionIndex].questionRelation.question,
                                                }}>
                                                  </div>
                                {/* {questions[currentQuestionIndex].questionRelation.question} */}
                          </div>
                          {test?.showHints == 1 && questions[currentQuestionIndex].questionRelation.optionTypeId === 3 && questions[currentQuestionIndex].questionRelation.showHints == 1  ? 
                            <>
                              <div className='mb-3'> 
                                <h5 className='text-[14px] underline'>Hints</h5>
                                <div>
                                  <ul className=' list-inside list-disc text-xs'>
                                      {questions[currentQuestionIndex].questionRelation?.hints && questions[currentQuestionIndex]?.questionRelation?.hints.map((hint, index)=>(
                                          <li key={index}>
                                              {hint.content}
                                          </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </> 
                          : ''}

                          {questions[currentQuestionIndex].questionRelation.optionTypeId === 1 &&
                            <div>
                              <QuestionOptions 
                                question={questions[currentQuestionIndex]}
                                selectedOption={selectedOptions[questions[currentQuestionIndex].id]} 

                                onOptionChange={handleOptionChange}                   
                              />
                            </div>
                          }

                          {questions[currentQuestionIndex].questionRelation.optionTypeId === 3 &&
                              <div>
                              <QuestionTextarea
                                question={questions[currentQuestionIndex]}
                                answer={selectedOptions[questions[currentQuestionIndex].id] || ''}
                                onAnswerChange={handleOptionChange}
                              />
                            </div>
                          }

                        </div>

                        <div className='flex items-center justify-between'>
                          <button 
                            onClick={handlePrev}
                            disabled={prevDisabled}
                            className='bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                    transition-all duration-75 border-none px-5 
                                    font-medium p-3 text-base text-white flex items-center justify-center gap-4 '>
                                      <ArrowLeft/>
                            Previous
                          </button>

                          {(isFinished || hasViewedLastQuestion || hasAttendedLastQuestion )&& 
                            <button 
                            onClick={exitTest}
                            className='bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                      disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                      transition-all duration-75 border-none px-5 
                                      font-medium p-3 text-base text-white flex items-center justify-center gap-4'>
                              Submit
                            </button>
                          }

                        
                          <button 
                          onClick={handleNext}
                          disabled={nextDisabled}
                          className='bg-[#DA5921] hover:bg-[#DA5921] min-w-[200px] whitespace-nowrap w-full md:w-auto
                                    disabled:opacity-50 disabled:cursor-not-allowed rounded-lg 
                                    transition-all duration-75 border-none px-5 
                                    font-medium p-3 text-base text-white flex items-center justify-center gap-4'>
                            Next
                            <ArrowRight/>
                          </button>

                          
                        </div>
                    </div>
                </div>  
                <div className='w-5/12 '>
                  <div className='max-w-sm bg-white w-full h-full ml-auto rounded-lg p-4'>
                    <div className='grid grid-cols-10 gap-1'>
                      {/* ${_itx.isCorrect ? 'bg-[#179301]' : 'bg-[#fa1301]'} */}
                      {/* {questions.map((item, index) => (
                        <button
                          key={index}
                          onClick={()=>handleButtonClick(index)}
                          className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center  ${currentQuestionIndex === index ? 'bg-[#179301]' : 'bg-[#cccccc]'} `}
                        >
                          <b className="item2 part">{index + 1}</b>
                        </button>
                      ))} */}
                      {questions.map((item, index) => {
                        // console.log(questionStatus[index])
                        return(
                        <button
                          key={index}
                          onClick={() => handleButtonClick(index)}
                          className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center ${
                            currentQuestionIndex === index
                              ? 'bg-[#f893a6]' // Highlight current question
                              : questionStatus[index] === 'Attended'
                              ? 'bg-[#179301]' // Orange for attended
                              : questionStatus[index] === 'Viewed'
                              ? 'bg-[#ff9214]' // Light gray for viewed
                              : 'bg-[#41546d]' // Darker gray for not attended
                          }`}
                        >
                          <b className="item2 part">{index + 1}</b>
                        </button>
                      )})}
                    </div>
                  </div>
                </div>
              </div>
            </>
            : <><LoaderIcon/></>}

        </div>
      }
    </>
  )
}

const QuestionOptions = ({ question, selectedOption, onOptionChange }) => {
  // const handleChange = (event) => {
  //   console.log(question.id, event.target.value)
  //   onOptionChange(question.id, event.target.value); // Update selected option state
  // };

  const handleChange = (event) => {
    console.log(question.questionRelation.id, event.target.value);

    console.log(selectedOption)
    onOptionChange(question, question.id, event.target.value); // Update selected option state
  };
  return (
    <ul className='list-none list-inside space-y-1 text-sm'>
      {question.questionRelation.answers.map((option) => {
        // console.log(selectedOption === option.id, selectedOption, option.id)
        return (

          <li key={option.id} className='w-full hover:bg-[#ccc]'>
            <label 
              htmlFor={`question_${question.id}_${option.id}`} 
              className='w-full block cursor-pointer  py-2 px-1'
            >
              <input 
                type="radio" 
                id={`question_${question.id}_${option.id}`} 
                name={`question_${question.id}`} 
                value={option.id}
                checked={selectedOption == option.id} // Ensure the checked state reflects the selected option
                onChange={handleChange}
                className='mr-2'
              />
              {option.content}
            </label>
          </li>
      )})}
      {/* {question.questionRelation.answers.map((option, index) => (
        <li key={option.id} className='w-full'>
          <label 
            htmlFor={`question_${question.id}_${option.id}`} 
            className='w-full block cursor-pointer'
          >
            <input 
              type="radio" 
              id={`question_${question.id}_${option.id}`} 
              name={`question_${question.id}`} 
              value={option.id}
              checked={selectedOption === option.id}
              onChange={handleChange}
              className='mr-2'
            />

            // {/* <input 
            //   type="radio" 
            //   id={`question_${question.id}_${option.id}`} 
            //   name={`question_${question.id}`} 
            //   value={option.id}
            //   // checked={selectedOption === option.id} // Set checked based on selected option
            //   onChange={handleChange} // Use handleChange function
            //   className='mr-2'
            // /> 
            {option.content}
          </label>
        </li>
      ))} */}
    </ul>
  );
};

const QuestionTextarea = ({ question, answer, onAnswerChange }) => {
  const handleTextareaChange = (event) => {
    onAnswerChange(question, question.id, event.target.value); // Update the answer state
  };

  return (
    <div className='text-sm'>
      <label htmlFor={`question_${question.id}`} className='block mb-2'>
        {question.questionRelation.content}
      </label>
      <textarea
        id={`question_${question.id}`}
        name={`question_${question.id}`}
        value={answer}
        onChange={handleTextareaChange}
        rows={5}
        className='w-full p-2 border border-gray-300 rounded focus:border-gray-700 focus:outline-none'
        placeholder='Enter your answer here...'
      />
    </div>
  );
};

export default TakeTest;
