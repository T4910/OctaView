import { useEffect, useState } from 'react'
import TimeTable from '../components/timetable'
import NavBar from "@/components/navbar"
import axios from 'axios'

// TODO: Fetch timetables directly from database - with pagination
// TODO: Add a loading sign for the timetable
// TODO: Beautify

const serverLink = import.meta.env.VITE_SERVER_LINK


export default function Root() {
  const [ schedule, setSchedule ] = useState({});
  
  useEffect(() => {
    async function fetchTimetable(){
      console.log('fetchTimetable is working... Using server: ', serverLink);
      try {
        console.log('tryblock is working...')
        const response = await axios.post(`${serverLink}/timetable/get-timetable`, { current: true });
        console.log('sent message to server...')
        // console.log('view timetable', response, 20);
        
        if (response?.status === 200) {
            console.log('got a positive response...', response?.data?.timetables)
            
            const { 
              schedule, academicYear, semester,
              type, name, description,
              timing: {startDay, endDay, startHour, endHour} 
            } = response?.data?.timetables[0];
            
            console.log('broke response down...', { schedule })
            
            let cleanedSchedule = {}
            schedule.forEach((timeslot) => (cleanedSchedule = {...cleanedSchedule, ...convertRawSchedule(timeslot)}));
            
            console.log('cleaned schedule...', { cleanedSchedule })
            
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
            console.log('Error while fetching timetables...', error)
        }
    }

    console.log('useEffect working...')
    fetchTimetable();
  }, [])

  return (
      <div className='bg-att'>
          <NavBar />
          <TimeTable schedule={schedule}/>
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
