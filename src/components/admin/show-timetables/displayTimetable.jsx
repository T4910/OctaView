import Timetable from '../../timetable'
import { useState } from 'react'

export default function dispalyTimetable() {
  const [ schedule, setSchedule ] = useState({
    startDay: null
  })

  return (
    <div>
        <Timetable schedule={schedule}/>
    </div>
  )
}