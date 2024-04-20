import Timetable from '../../timetable'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Button } from '@/components/ui/button';
import { Rewind } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const serverLink = import.meta.env.VITE_SERVER_LINK

export default function dispalyTimetable() {
  const { id } = useParams();
  const [ schedule, setSchedule ] = useState({})    

  useEffect(() => {
    async function fetchTimetable(){
        try {
          const response = await axios.post(`${serverLink}/timetable/get-timetable`, { id })
          if (response?.status === 200) {
            
            const { 
              _id, schedule, academicYear, semester,
              type, name, description,
              timing: {startDay, endDay, startHour, endHour} 
            } = response?.data?.timetables;

            let cleanedSchedule = {}
            schedule.forEach((timeslot) => (cleanedSchedule = {...cleanedSchedule, ...convertRawSchedule(timeslot)}));
            
            
            const timetableData = {
              id: _id, semester, startDay, 
              endDay, name, description,
              year: academicYear,
              mode: type, // or Exam
              lectureHours: { startHour, endHour },
              departments: cleanedSchedule
            };

            console.log(response, timetableData, 78645)
            setSchedule(timetableData)
            // console.log(response?.data, timetableData, 88888)
                
            } else {
                console.log(response, 342)
            }
            
        } catch (error) {
            console.log('Error while fetching timetables...')
        }
    }

    fetchTimetable();
  }, [])

  return (
    <div className='mt-6 mx-8 md:via-slate-50 lg:via-white space-y-6'>
      <div className='flex justify-between items-center space-x-3'>
        <div className="mx-auto grid w-full max-w-6xl gap-1">
            <h1 className="text-2xl font-semibold">
              {(!!schedule?.name)
              ? (schedule?.name??'Timetable Name')
              : <Skeleton className="max-w-64 h-8"/>}
            </h1>
            <div>
                <p className='font-medium text-sm text-muted-foreground'>
                {(!!schedule?.description)
                  ? (schedule?.description??'Timetable Name')
                  : <Skeleton className="w-52 h-5"/>}
                </p>
            </div>
        </div>
        <Button 
            // size="lg" 
            className="h-10 gap-2"
            variant="secondary"
            disabled={(!(!!schedule?.id))}
            onClick={() => rollback(schedule?.id)}
        >
            <Rewind className="size-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Rollback
            </span>
        </Button>
      </div>
      <Timetable schedule={schedule}/>
    </div>
  )
}

function convertRawSchedule(inputData) {
    let output = {};

    // Extracting relevant information from inputData
    let level = inputData.level;
    let departmentName = inputData.departmentId.code;
    let day = inputData.day.toLowerCase();

    // Creating a dictionary for the course
    let courseInfo = {
        code: inputData.courseId.code,
        name: inputData.courseId.title,
        startTime: inputData.startTime,
        endTime: inputData.endTime,
        event: {
          type: inputData.event,
          coordinator: inputData.coordinator
        }
    };

    // Checking if department exists in the output object
    if (!output.hasOwnProperty(departmentName)) {
        output[departmentName] = {};
        output[departmentName][level] = {};
        output[departmentName][level][day] = [courseInfo];
    } else {
        // Checking if the level exists for the department
        if (!output[departmentName].hasOwnProperty(level)) {
            output[departmentName][level] = {};
            output[departmentName][level][day] = [courseInfo];
        } else {
            // Checking if the day exists for the level
            if (!output[departmentName][level].hasOwnProperty(day)) {
                output[departmentName][level][day] = [courseInfo];
            } else {
                output[departmentName][level][day].push(courseInfo);
            }
        }
    }

    return output;
}

function rollback(id){
  console.log('Timetable ID: ', id)
}