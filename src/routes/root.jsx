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
            
            let cleanedSchedule = convertRawSchedule(schedule)
            
            console.log('cleaned schedule...', { cleanedSchedule })
            // console.log(, 11111111);
            
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

// // Example usage:
// const inputData = [
//   // Input data here
// ];
