import { Button } from "@/components/ui/button"
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

const serverLink = import.meta.env.VITE_SERVER_LINK

export default function createTimetableBtn({setSchedule, details}) {
    const [loading, setLoading] = useState(false)
    const [anerror, setAnerror] = useState(false)
    const navigate = useNavigate()
    const date = new Date()
  
    return (
        <Button 
        disabled={loading}
        onClick={async () => {
            let gptJSON, timeslotSchedule;
            console.log(details, 32939832)
            const {name, description, current, examMode, interval, startTime,
                endTime, currentYear,  startDay, endDay, semester, level, selectedDepartment, allDepartments} = details

            setAnerror(false)
            setLoading(true);

            const departmentsToBeEntered = (selectedDepartment === 'all') ? allDepartments : allDepartments.find(department => department.code === selectedDepartment)
            let coursesForAI = []

            console.log('filtering courses to be used')
            for (let index = 0; index < departmentsToBeEntered.length; index++) {
                const department = departmentsToBeEntered[index];
                
                const response = await axios.post(`${serverLink}/course/get-course`, (level === 'all') ? {departmentId: department._id} : { departmentId: department._id, level });

                coursesForAI = [...coursesForAI, ...response?.data?.courses]
            }

            const departmentRes = await axios.post(`${serverLink}/department/get-department`, {});
            const venueRes = await axios.post(`${serverLink}/venue/get-venue`, {});
            
            coursesForAI = coursesForAI.map(course => course.code)
            
            let departmentsForAI = departmentRes?.data?.department?.map(department => department.name)
            let venuesForAI = venueRes?.data?.venue?.map(venue => venue.name)
            
            
            const promptDetails = {
                courses: turnArrayDirectlyToString(coursesForAI),
                venues: turnArrayDirectlyToString(venuesForAI),
                departments: turnArrayDirectlyToString(departmentsForAI)
            }
            console.log(promptDetails, 823832)
                        
            // get courses in each department
            // setLoading(false)

            try {
                console.log('asking gpt')

                if(response?.data?.courses.length === 0) {
                    alert('No courses in database');
                    navigate('/admin/settings/')
                    return 
                }
                gptJSON = await askGPT(details, promptDetails);
                
                console.log('gpt response', gptJSON, '\npopulatin json...')
                timeslotSchedule = await convertToCleanSchedule(gptJSON);
            } catch (error) {
                console.log('Error in creating timetable: ', error)
                setLoading(false)
                setAnerror(true)
                return
            }

            // if(!(!!timeslotSchedule?.csc)){
            //     // alert('an error occured with AI, try again')
            //     console.log('an error occured')
            // setLoading(false)
            //     return
            // }

            console.log('time scheduling', timeslotSchedule, '\nfinal schedule...')
            
            const schedule = {
                id: '78654678', 
                semester, 
                startDay: startDay??'monday', 
                endDay: endDay??'friday', 
                name: name??date.toLocaleString().split(',').toString().replace(',',''), 
                description,
                year: currentYear,
                mode: examMode ? 'exam' : 'classes', // or Exam
                lectureHours: { 
                    startHour: '2010-01-01T08:00:00.000Z', 
                    endHour: '2010-01-01T18:00:00.000Z'
                },
                departments: timeslotSchedule
            
            }
            console.log('schedule that is being set: ', schedule)
            setSchedule(schedule);
            setLoading(false)
        }}>{anerror ?'Retry' : 'Create'}</Button>
    )
}

async function askGPT({ courses, departments, venues, startTime, endTime, interval, breakTime }, promptDetails){
        let  prompt = `
        Before you start reading the prompt, be FLEXIBLE with the format of details given!!!, DO NOT return the details given as a response, unless you state the problem and reason & any response you submit MUST be in a JSON format!!!!
        The instructions are simple and possiblefor you to do

        ####
        As a long-stayed and experienced member and chairman on the timetable committee in a prestigious schoool which have many different classes, courses, events and venues done at various different times on the day, I need your help to form a timetable for my school.
        
        ####
        I will enter a list of courses in an array, departments in an array, venues in an array and the time contraints i.e the time to start inputting the activites of the day usually by 8:00 unless specified something else, time to end the activites of the day usually by 18:00 unless specified something else, time for a break, and the interval to which you'll be working with
        
        ####  
        Once you are done with your scheduling, I want you to only return your SCHEDULED answer in a JSON format and output as your response just the JSON, nothing else, following this pattern:
        Your response should only be on what you have scheduled
        
        [
        {
         course: the name of the course given,
         day: the day of the week
         startTime: what time the course should begin. Return ina JavaScript date string format
         endTime: what time the course should end. Return ina JavaScript date string format
         venue: what venue are you allocating to the course
        }
        ... 
        ]
        
        
        #####
        const courses = ${promptDetails.courses};
        const departments = ${promptDetails.departments};
        const venues = ${promptDetails.venues};
        const startTime = '8:00';
        const endTime = '18:00';
        const interval = 60; // in minutes
        const breakTime = '14:00-15:00';

        ####
        STRICT RULES TO FOLLOW:
        - Do not be too strict with how the details are entered, be FLEXIBLE when receiving details
        - if you have an err, return your output in JSON in the following manmer --> {err: state your error here}
        - Avoid time & venue clashes
        - Courses can only repeat once in the schedule
        - AND MOST IMPORTANT RULE OF ALL: output ONLY JSON as your response, NOTHING ELSE!!!
        `
        
        console.log(prompt)
        let response = await gpt.ask(prompt);
        console.log('gpt response:', response)
        const cleanedJSON = parseAndRemoveJsonTags(response)
        return cleanedJSON;
}

function parseAndRemoveJsonTags(str) {
    // Remove ```json at the beginning and ``` at the end of the string
    const jsonString = str.slice(8, -3);
    // Parse the JSON string into an array or object
    const parsedJson = JSON.parse(jsonString);
    return parsedJson;
}

async function convertToCleanSchedule(input) {
    const output = {};

    try{
        for (const course of input) {
            // const code = course.course.split(' ')[0].toLowerCase();
            
            const response = await axios.post(`${serverLink}/course/get-course`, { code: course.course });
            const department = response?.data?.courses[0]?.departmentId?.code;
            
            console.log('Original departmental code: ', response?.data?.courses[0]?.departmentId?.code, 1111122222111)
            const courseNumber = course.course.split(' ')[1];
            const departmentNumber = Math.floor(parseInt(courseNumber) / 100) * 100;
    
            if (!output[department]) {
                output[department] = {};
            }
    
            if (!output[department][departmentNumber]) {
                output[department][departmentNumber] = {};
            }
    
            const day = course.day.toLowerCase();
            const startTime = course.startTime;
            const endTime = course.endTime;
    
            if (!output[department][departmentNumber][day]) {
                output[department][departmentNumber][day] = [];
            }
    
            output[department][departmentNumber][day].push({
                code: course.course,
                name: "Course Name",
                startTime: startTime,
                endTime: endTime,
                event: {
                    type: "lecture",
                    coordinator: 'Emmanuel Taiwo'
                }
            });
        }
    } catch (e) {
        console.log('Error from parsing gpt response', e)
        return {}
    }

    return output;
}

function turnArrayDirectlyToString(array){
    const stringWithSingleQuotes = JSON.stringify(array, (key, value) => {
        if (typeof value === 'string') {
          return `'${value}'`;
        }
        return value;
      });

      return stringWithSingleQuotes;
}

// // Example usage:
// const input = [
//     {
//         "course": "CSC 222",
//         "day": "Monday",
//         "startTime": "2024-04-22T08:00:00",
//         "endTime": "2024-04-22T09:00:00",
//         "venue": "B12"
//     },
//     {
//         "course": "CSC 241",
//         "day": "Monday",
//         "startTime": "2024-04-22T09:00:00",
//         "endTime": "2024-04-22T10:00:00",
//         "venue": "B13"
//     },
//     {
//         "course": "CSC 141",
//         "day": "Monday",
//         "startTime": "2024-04-22T09:00:00",
//         "endTime": "2024-04-22T10:00:00",
//         "venue": "B12"
//     },
// ];

// const output = async () => await convertToCleanSchedule(input);
// console.log(JSON.stringify(output(), null, 2), 8787); // To print the output JSON with indentation
