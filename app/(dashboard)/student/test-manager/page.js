"use client"
import ExamsListTable from '@/app/components/tables/students/ExamsListTable'
import { LoaderIcon } from '@/app/components/ui/IconComponent';
import { hostUrl } from '@/app/lib/utils';
// import { tests } from '@/app/lib/constants'
import React, {useEffect, useState} from 'react'

const TestManager = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      try {
        const res = await fetch(hostUrl + 'tests/student');
        if (res.ok) {
          const result = await res.json();
          setTests(result.data);
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
  }, []);

  return (
    <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Test List</h1>
                </div>
              </div>

          </div>


          {
            !loading ? 
          <div>
            <ExamsListTable tests={tests}/>
          </div>
          : 
          <div className='text-center w-full items-center justify-center flex'><LoaderIcon extraClass='text-gray-900'/></div>
          }

    </div>
  )
}

export default TestManager
