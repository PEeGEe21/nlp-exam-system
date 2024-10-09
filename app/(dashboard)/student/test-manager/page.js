"use client"
import ExamsListTable from '@/app/components/tables/students/ExamsListTable'
// import { tests } from '@/app/lib/constants'
import React, {useEffect, useState} from 'react'

const TestManager = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      try {
        const res = await fetch('http://localhost:3001/api/tests/student');
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

          <div>
            <ExamsListTable tests={tests}/>
          </div>
    </div>
  )
}

export default TestManager
