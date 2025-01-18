'use client'
import ResultManagerTable from '@/app/components/tables/ResultManagerTable'
import ResultManagerStudentTable from '@/app/components/tables/students/ResultManagerTable'
import { LoaderIcon } from '@/app/components/ui/IconComponent'
import { hostUrl } from '@/app/lib/utils'
import { getFullName } from '@/app/utils/common'
import { ArrowLeft } from 'iconsax-react'
import { useParams, useRouter } from 'next/navigation'
// import { tests } from '@/app/lib/constants'
import React, {useEffect, useState} from 'react'

const StudentResultManager = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const params = useParams();
  const { userId } = params;    
  const router = useRouter();

//   const id = id;

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
      
      if(userId){
        // setLoading(true); // Start loading
        try {
          const res = await fetch(hostUrl + 'users/' + userId + '/results');
          if (res.ok) {
            const result = await res.json();
            setResults(result.results);
            setStudent(result.user);
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
          <div className="flex flex-row items-center justify-start gap-8 mb-8">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
              >
                <ArrowLeft />
              </button>

              <div className="w-full">
                <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl capitalize">{getFullName(student)??student?.email??student?.username} Results</h1>
              </div>
            </div>

          { !loading ?
            <div>
              <ResultManagerStudentTable results={results} isAdmin={true}/>
            </div>
            :
               <div className='text-center w-full items-center justify-center flex'><LoaderIcon extraClass='text-gray-900'/></div>
          }
        </div>

    </div>
  )
}

export default StudentResultManager
