import Timetable from '../../timetable'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { Button } from '@/components/ui/button';
import { Rewind, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Confirm from './confirmModal';
import { deleteTimetable } from '@/lib/dbfunc';

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
              type, name, description, current,
              timing: {startDay, endDay, startHour, endHour} 
            } = response?.data?.timetables;

            let cleanedSchedule = convertRawSchedule(schedule)
            // schedule.forEach((timeslot) => (cleanedSchedule = {...cleanedSchedule, ...convertRawSchedule(timeslot)}));
            
            
            const timetableData = {
              id: _id, semester, startDay, 
              endDay, name, description, current,
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
        {(schedule?.current??true) ? null : <Confirm
              title={`Rollback to Timetable ID: ${schedule?.id}`}
              description={`This will make selected timetable current.`}
              action={() => makeCurrent(id)}
              refresh={true}
        >
          <Button 
              // size="lg" 
              className="h-10 gap-2"
              variant="secondary"
              disabled={(!(!!schedule?.id))}
          >
              <Rewind className="size-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Rollback
              </span>
          </Button>
        </Confirm>}
        <Confirm
            title={`Delete Timetable ID: ${schedule?.id}`}
            description="This action cannot be undone. This will permanently delete this timetable."
          action={deleteTimetable}
          redirect="/admin/"
        >
          <Button 
              // size="lg" 
              className="h-10 gap-2"
              variant="secondary"
              disabled={(!(!!schedule?.id))}
          >
              <Trash2 className="size-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Delete
              </span>
          </Button>
        </Confirm>
      </div>
      <Timetable schedule={schedule}/>
    </div>
  )
}

function convertRawSchedule(inputData) {
  let output = {};

  inputData.forEach(entry => {
      let level = entry.level;
      let departmentCode = entry.departmentId.code;
      let day = entry.day.toLowerCase();

      // Creating a dictionary for the course
      let courseInfo = {
          code: entry.courseId.code,
          name: entry.courseId.title,
          startTime: entry.startTime,
          endTime: entry.endTime,
          event: {
              type: entry.event,
              coordinator: entry.coordinator
          }
      };

      // If department code doesn't exist in output, initialize it
      if (!output.hasOwnProperty(departmentCode)) {
          output[departmentCode] = {};
      }

      // If level doesn't exist in output, initialize it
      if (!output[departmentCode].hasOwnProperty(level)) {
          output[departmentCode][level] = {};
      }

      // If day doesn't exist for the level, initialize it
      if (!output[departmentCode][level].hasOwnProperty(day)) {
          output[departmentCode][level][day] = [];
      }

      // Push course info into output
      output[departmentCode][level][day].push(courseInfo);
  });

  return output;
}