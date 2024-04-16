import { useState, useEffect } from 'react'
import TimeTable from '../timetable'

const serverLink = import.meta.env.VITE_SERVER_LINK

function Index() {
  const [schedule, setSchedule] = useState({ startDay: null, endDay: null, lectureHours: null, departments: null, mode: null });

  useEffect(() => {
    async function getTimetable(){
      const response = await axios.post(`${serverLink}/schedule`, { level, department })

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