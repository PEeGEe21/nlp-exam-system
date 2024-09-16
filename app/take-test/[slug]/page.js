"use client"
import FullscreenComponent from '@/app/components/FullScreenComponent';
import useCountdown from '@/app/hooks/useCountdown';
import { mainQuestions } from '@/app/lib/constants';
import { ArrowLeft, ArrowRight, Play } from 'iconsax-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const TakeTest = () => {
  const [isWelcomePage, setIsWelcomePage] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({}); // Object to store selected options per question

  const handleOptionChange = (questionId, selectedOptionId) => {
    console.log(questionId, selectedOptionId)
    setSelectedOptions({ ...selectedOptions, [questionId]: selectedOptionId });
  };

  const handleButtonClick = (index) => {
    setCurrentQuestionIndex(index);
};

const test = {
  id: 1,
  title: 'Test 1',
  start_date: '2024-12-01 00:00:00',
  end_date: '2024-12-01 23:59:59',
  questions: mainQuestions,
}

const { days, hours, minutes, seconds } = useCountdown(test?.end_date);

  const submitTest = () => {
    console.log('submitted')
    setIsFullscreen(false);
    setHasSubmitted(true);
  }

  const startTest = () => {
    setTimeout(()=>{
      // setIsFullscreen(true);
      setIsWelcomePage(false);
      toggleFullscreen();
    })
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
      }
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.keyCode == 27, event.key === "Escape", isFullscreen);
  
      // Ensure fullscreen is truly active and Escape key is pressed
      if((event.key=='Escape'||event.key=='Esc'||event.keyCode==27) && (event.target.nodeName=='BODY') && isFullscreen){
        event.preventDefault(); // Prevent exiting fullscreen
        exitTest(); // Trigger the test submission confirmation
      }
    };
    console.log(isFullscreen, 'isFullscreen status');
  
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
    }
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);
  
  const buttons = Array.from({ length: 15 }, (_, i) => i + 1); // Creates an array with 15 elements

  const handleNext = () => {
    if (currentQuestionIndex < mainQuestions.length - 1) {
        setCurrentQuestionIndex((prevStep) => prevStep + 1);
        // setNextDisabled(true);
        setNextDisabled(currentQuestionIndex + 1 >= mainQuestions.length - 1);
        setIsFinished(currentQuestionIndex + 1 >= mainQuestions.length - 1);
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

  return (
    <>
        {/* welcome  */}
        {isWelcomePage && 
          <>
            <div className='w-full max-w-5xl mx-auto p-4 md:px-12 min-h-[400px] max-h-[500px] bg-white h-full'>
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
                        <p>Udeh Praise</p>
                        <p>mailpraiseudeh@gmail.com</p>
                        <p><span>Test title: </span>Udeh Praise</p>

                      </div>
                    </div>
                  </div>
                  <div className='h-full items-end justify-end'>
                    INSTRUCTIONS
                    <hr />

                    <div>
                      <div className='flex items-center w-full'>
                        <div className=' justify-between h-full w-2/3 flex flex-col gap-4'>
                          <div>

                            <ul className='list-disc list-inside'>
                              <li>Total Mark: 39</li>
                              <li>Test Duration (Min): 30</li>
                              <li>You can start the test by clicking the start button.</li>
                            </ul>

                            
                          </div>
                            <div>
                              Duration: 30mins
                            </div>
                          <div>
                            <div>
                              Instructions:
                            </div>
                            <ul className='list-decimal list-inside'>
                              <li>Read all instructions carefully.
                              </li>
                              <li>Maintain silence and raise your hand to call the attention of the invigilator(s).
                              </li>
                              <li>Chatting with classmates and borrowing in the examination hall are NOT allowed under any circumstances.
                              </li>
                            </ul>
                          </div>
                          
                        </div>

                        <div className=' flex-1 '>

                          <div className='flex align-center justify-center flex-col text-center cursor-pointer' onClick={startTest}>
                            <span className='flex align-center justify-center w-full'>
                              <span className='bg-[#EEEEF0B8] rounded-full p-3 h-12 w-12 flex justify-center items-center text-[#6457EF]'>
                                <Play/>
                              </span>
                            </span>
                            <p>Start</p>
                          </div>

                          
                          
                        </div>
                      </div>
                    </div>
                    
                  </div>

                  <button>
                    Go back
                  </button>
                </div>
            </div>
          </>
        }


      {!isWelcomePage && 
        <div className='w-full flex flex-col gap-4  max-w-7xl mx-auto py-12'>
          {/* <button onClick={toggleFullscreen}>
            {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          </button> */}


          <div className='bg-white h-full p-6 flex items-center justify-between shadow-sm rounded-lg'>
            <div className='space-y-2'>
              <h1>
                <span className='font-semibold'>Student Name :</span> Udeh Evidence
              </h1>
              <h1>
                <span className='font-semibold'>Student Email :</span> mailpraiseudeh@gmail.com
              </h1>
              <h1>
                <span className='font-semibold'>Test Title :</span> test title
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

          <div className='bg-white h-full p-6 shadow-sm rounded-lg'>
            <p className='font-semibold'>Test Instrutions</p>
            <div>
              <ul>
                <li>instructions</li>
              </ul>  
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
                          <p className='py-3 text-base'>
                          {mainQuestions[currentQuestionIndex].question}
                          </p>
                      </div>

                      <QuestionOptions 
                        question={mainQuestions[currentQuestionIndex]}
                        selectedOption={selectedOptions[mainQuestions[currentQuestionIndex].id]} 
                        onOptionChange={handleOptionChange}                   
                      />

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

                      {isFinished && 
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
                  {mainQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={()=>handleButtonClick(index)}
                      className={`text-white font-bold text-base size-[30px] border border-black flex items-center justify-center  ${currentQuestionIndex === index ? 'bg-[#179301]' : 'bg-[#cccccc]'} `}
                    >
                      <b className="item2 part">{item?.id}</b>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

const QuestionOptions = ({ question, selectedOption, onOptionChange }) => {
  const handleChange = (event) => {
    console.log(question.id, event.target.value)
    onOptionChange(question.id, event.target.value); // Update selected option state
  };

  return (
    <ul className='list-none list-inside space-y-3 text-sm'>
      {question.options.map((option, index) => (
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
              // checked={selectedOption === option.id} // Set checked based on selected option
              onChange={handleChange} // Use handleChange function
              className='mr-2'
            />
            {option.text}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default TakeTest;
