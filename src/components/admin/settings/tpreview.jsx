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
