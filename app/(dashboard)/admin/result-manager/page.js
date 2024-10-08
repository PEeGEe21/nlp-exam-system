'use client'
import ResultManagerTable from '@/app/components/tables/ResultManagerTable'
import { tests } from '@/app/lib/constants'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'

const ResultManager = () => {
  const [tests, setTests] = useState([])
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const reload = () => {
    setReloadKey(prev => prev + 1); // Change state to trigger useEffect
  };

  useEffect(() => {
    const fetchData = async () => {
      
      setLoading(true); // Start loading
      setSearchQuery('');
      try {
        const res = await fetch('http://localhost:3001/api/tests');
        if (res.ok) {
          const result = await res.json();
          // console.log(result)
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
  }, [reloadKey]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('https://jsonplaceholder.typicode.com/tests');
  //       if (res.ok) {
  //         const data = await res.json();
  //         setTests(data);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching data:', err?.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
