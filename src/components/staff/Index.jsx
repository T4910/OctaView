import { useState, useEffect } from 'react'
import axios from 'axios'
import TimeTable from '../timetable'

const serverLink = import.meta.env.VITE_SERVER_LINK

function Index() {
  const [schedule, setSchedule] = useState({ startDay: null, endDay: null, lectureHours: null, departments: null, mode: null });

  useEffect(() => {
    console.log( 2343)
    async function getTimetable(){
      const response = await axios.get(`${serverLink}/schedule`, { level, department })

      setSchedule(response?.data.schedule);
    }

    getTimetable();
  }, [])

  return (
    <div>
      <h1>Landmark University Timetable</h1>
      <TimeTable schedule={schedule}/>
    </div>
  )
}

export default Index