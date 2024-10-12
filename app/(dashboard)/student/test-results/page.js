'use client'
import ResultManagerTable from '@/app/components/tables/ResultManagerTable'
import ResultManagerStudentTable from '@/app/components/tables/students/ResultManagerTable'
import { LoaderIcon } from '@/app/components/ui/IconComponent'
// import { tests } from '@/app/lib/constants'
import React, {useEffect, useState} from 'react'

const ResultManager = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);


  useEffect(()=>{
    setLoading(true);
    const getUser = async ()=>{
       // Start loading
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
      setLoading(true); // Start loading
      
      if(user){
        // setLoading(true); // Start loading
        try {
          const res = await fetch('http://localhost:3001/api/users/' + user?.id + '/results');
          if (res.ok) {
            const result = await res.json();
            setResults(result.results);
          }
        } catch (err) {
          console.error('Error fetching data:', err?.message);
        } finally {
          setTimeout(() =>{
            setLoading(false); // End loading
          }, 500)
        }
      };
    };
    

    fetchData();
  }, [user]);

  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">My Results</h1>
                </div>
              </div>

          </div>

          { !loading ?
            <div>
              <ResultManagerStudentTable results={results}/>
            </div>
            :
               <div className='text-center w-full items-center justify-center flex'><LoaderIcon extraClass='text-gray-900'/></div>
          }
        </div>

    </div>
  )
}

export default ResultManager
