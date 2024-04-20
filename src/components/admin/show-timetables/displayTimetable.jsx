import Timetable from '../../timetable'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"

const serverLink = import.meta.env.VITE_SERVER_LINK

export default function dispalyTimetable() {
  const { id } = useParams();
  const [ schedule, setSchedule ] = useState({startDay: null})    

  useEffect(() => {
    async function fetchTimetable(){
        try {
          const response = await axios.post(`${serverLink}/timetable/get-timetable`, { id })
          if (response?.status === 200) {
            
            const { 
              schedule, academicYear, semester,
              type, name, description,
              timing: {startDay, endDay, startHour, endHour} 
            } = response?.data?.timetables;

            let cleanedSchedule = {}
            schedule.forEach((timeslot) => (cleanedSchedule = {...cleanedSchedule, ...convertRawSchedule(timeslot)}));
            
            
            const timetableData = {
              semester,
              year: academicYear,
              mode: type, // or Exam
              startDay,
              endDay,
              name, description,
              lectureHours: { startHour, endHour },
              departments: cleanedSchedule
            };

            setSchedule(timetableData)
            console.log(response?.data, timetableData, 88888)
                
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
    <div className='mt-10 mx-12 md:via-slate-50 lg:via-white'>
      <div className="mx-auto grid w-full max-w-6xl gap-1">
          <h1 className="text-2xl font-semibold">{schedule?.name??'Timetabale Name'}</h1>
          <div>
              <p className='font-medium text-sm text-muted-foreground'>{schedule?.description??'Timetable Description'}</p>
          </div>
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