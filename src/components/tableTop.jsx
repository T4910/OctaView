import { Badge } from "@/components/ui/badge"
import Selections from "@/components/selections"
import { Skeleton } from "./ui/skeleton"
import { useEffect, useState } from 'react'

import axios from 'axios'

const serverLink = import.meta.env.VITE_SERVER_LINK


const tableTop = ({mode, showVenue, level, department, departments, setLevel, setDepartment}) => {
   // const currentSelection = ((!(!!departments[department]))
   //                            ? [] 
   //                            : (!(!!departments[department][level]))
   //                               ? [] 
   //                               : (departments[department][level]))

   const [ departmentName, setDepartmentName ] = useState("")

   useEffect(() => {
      async function fetchDepartment(){
            try {
            const response = await axios.post(`${serverLink}/department/get-department`, { code: department })
            
            // setDepartments(response?.data?.department)
            setDepartmentName(response?.data?.department[0]?.name);

            } catch (error) {
            console.log('Error fetching the department...', error)
            }
      }
   
      fetchDepartment();
      }, [department])

  const title = (!!level && !!department) ? `${level}L ${departmentName} ${mode !== 'exam' ? ' weekly ' : ' exam '} timetable` : 'Empty Timetable...'

   return (
     <div className="w-full bg-slate-300 flex p-2 px-4 justify-between items-center md:space-x-6 space-y-4 md:space-y-0 flex-col md:flex-row">
         <div className="flex flex-start w-full md:w-fit space-x-2 md:space-x-4 items-center">
            <h1 className="text-lg font-medium line-clamp-2 text-ellipsis">
               {(!!mode)
                  ? <span>{title}</span>
                  : <Skeleton className="h-8 w-36"/>}
            </h1>
            {
               (!!mode)
                  ? <Badge className="w-fit min-w-fit h-fit">{mode !== 'exam' ? 'Classes' : 'Exam'}</Badge>
                  : <Skeleton className="inline-flex px-2.5 py-0.5 rounded-full h-5 w-16"/>
            }               
         </div>
        <Selections enabled={!!mode} venue={showVenue} setLevel={setLevel} setDepartment={setDepartment}/>
     </div>
  )
}
export default tableTop