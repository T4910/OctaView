import { useState, useEffect } from 'react'
import TimeTable from '../timetable'
import Navbar from '@/components/admin/navbar'

const serverLink = import.meta.env.VITE_SERVER_LINK
// to be fetched from backend server
const selectedSchedule = {
  semester: 1,
  year: '2023/2024',
  type: 'Weekly', // or Exam
  startDay: 'Monday',
  endDay: 'Saturday',
  lectureHours: {
      startHour: '8:00 AM',
      endHour: '6:00 PM'
  },
  departments: {
      'Computer Science': {
          100: {
              monday: [
                  {
                    id: 1,
                    name: "TMC 222",
                    type: "lecture",
                    startTime: new Date("2018-02-23T08:00:00"),
                    endTime: new Date("2018-02-23T09:00:00"),
                  },
                  {
                    id: 1,
                    name: "CSC 222",
                    type: "lecture",
                    startTime: new Date("2018-02-23T11:00:00"),
                    endTime: new Date("2018-02-23T12:00:00"),
                  },
                ],
              tuesday: [],
              wednesday : [
                  {
                    id: 1,
                    name: "CSC 212",
                    type: "lecture",
                    startTime: new Date("2018-02-23T13:00:00"),
                    endTime: new Date("2018-02-23T15:00:00"),
                  },
                  {
                    id: 2,
                    name: "CSC 217",
                    type: "lecture",
                    startTime: new Date("2018-02-23T15:00:00"),
                    endTime: new Date("2018-02-23T16:00:00"),
                  },
                ],
              thursday: [],
              friday: [],
              saturday: [],
          },
          200: {
              monday: [
                  {
                    id: 1,
                    name: "CSC 222",
                    type: "lecture",
                    startTime: new Date("2018-02-23T11:30:00"),
                    endTime: new Date("2018-02-23T13:30:00"),
                  },
                ],
          },
          300: {
              monday: [
                  {
                    id: 1,
                    name: "CSC 222",
                    type: "lecture",
                    startTime: new Date("2018-02-23T11:30:00"),
                    endTime: new Date("2018-02-23T13:30:00"),
                  },
                ],
          },
          400: {
              monday: [
                  {
                    id: 1,
                    name: "CSC 222",
                    type: "lecture",
                    startTime: new Date("2018-02-23T11:30:00"),
                    endTime: new Date("2018-02-23T13:30:00"),
                  },
                ],
          },
      }
  }
}

function Index() {
  const [schedule, setSchedule] = useState({ startDay: null, endDay: null, lectureHours: null, departments: null, mode: null });

  useEffect(() => {
    async function getTimetable(){
      const response = await axios.post(`${serverLink}/schedule`, { level, department })

      setSchedule(response?.data.schedule??selectedSchedule);
    }

    getTimetable();
  }, [])

  return (
    <div>
      <h1>Landmark University Timetable</h1>
      <Navbar />
      <TimeTable schedule={schedule}/>
    </div>
  )
}

export default Index