"use client"
import React, {useEffect, useState} from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(0);
  const [tests, setTests] = useState(0);
  const [students, setStudents] = useState(0);
  const [activeTests, setActiveTests] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(()=>{
      const getUser = async ()=>{
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

  useEffect(() => {
    const fetchData = async () => {
      
      if(user){
        setLoading(true); // Start loading
        try {
          const res = await fetch('http://localhost:3001/api/users/dashboard/'+user?.id);
          if (res.ok) {
            const result = await res.json();
            // console.log(result)
            setQuestions(result.total_questions);
            setTests(result.total_tests);
            setStudents(result.total_students);
            setActiveTests(result.active_tests);
            setResults(result.results);
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
  }, [user]);

  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Dashboard</h1>
                </div>
              </div>

          </div>

          <div>
            <div className='grid grid-cols-1 md:grid:cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>

                  <div className='text-sm'>
                    My Questions
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {questions}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm'>
                  Tests Created
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {tests}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm'>
                  Total Students
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {students}
                  </div>
                </div>
              </div>
              <div className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm'>
                  Active Tests
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {activeTests}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Dashboard
