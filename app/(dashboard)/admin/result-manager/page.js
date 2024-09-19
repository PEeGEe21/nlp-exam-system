'use client'
import ResultManagerTable from '@/app/components/tables/ResultManagerTable'
import { tests } from '@/app/lib/constants'
import React, {useState, useEffect} from 'react'

const ResultManager = () => {
  const [test, setTests] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/tests');
        if (res.ok) {
          const data = await res.json();
          setTests(data);
        }
      } catch (err) {
        console.error('Error fetching data:', err?.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Result Manager</h1>
                </div>
              </div>

          </div>

          <div>
            <ResultManagerTable tests={tests}/>
          </div>
        </div>

    </div>
  )
}

export default ResultManager
