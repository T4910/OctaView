import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import Timetable from "../../timetable"
import { ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import { useMediaQuery } from "@/lib/hooks"

const serverLink = import.meta.env.VITE_SERVER_LINK

export default function tpreview({id, disabled}) {
  const [ schedule, setSchedule ] = useState({})   
  const [ open, setOpen ] = useState(false) 
  const isNotLargeScreen = useMediaQuery('md');

  useEffect(() => {
    console.log('useEffect working...', isNotLargeScreen)
    async function fetchTimetable(){
      console.log('fetch functino working...')
      try {
          console.log('try block working...')
          const response = await axios.post(`${serverLink}/timetable/get-timetable`, { id: id })
          console.log('recieved a resonse...')
          if (response?.status === 200) {
            console.log('status was successfull...', response?.data)
            
            const { 
              _id, schedule, academicYear, semester,
              type, name, description,
              timing: {startDay, endDay, startHour, endHour} 
            } = response?.data?.timetables;

            let cleanedSchedule = convertRawSchedule(schedule)
            // schedule.forEach((timeslot) => (cleanedSchedule = {...cleanedSchedule, ...convertRawSchedule(timeslot)}));
            
            
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
            console.log('Error while fetching timetables...', error)
        }
    }

    (open && isNotLargeScreen) && fetchTimetable();
  }, [open])

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => setOpen(value)}
    >
        {
          disabled ? null : <AlertDialogTrigger asChild>
              <span className="underline inline-flex text-blue-500 text-xs  cursor-pointer items-center">preview <ExternalLink className="size-3"/></span>
          </AlertDialogTrigger>
        }
        <AlertDialogContent className="max-w-fit min-w-40">
            <AlertDialogHeader>
                <AlertDialogTitle>
                  <Link to={`/admin/timetable/${id}`}>
                    <span  className="underline flex">Timetable ID: {id} <ExternalLink className="size-5"/></span>
                  </Link>
                </AlertDialogTitle>
                <AlertDialogDescription className="hidden md:block"><Timetable schedule={schedule}/></AlertDialogDescription>
                <AlertDialogDescription className="block md:hidden">Click on the link to view</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
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
