import TimeTable from '@/components/timetable'
import Details from '@/components/admin/new-timetable-config/details'
import { useState } from 'react';

// TODO: 
// Cool loading component that covers the timetable form creator 

const Index = () => {
    const [schedule, setSchedule] = useState({ startDay: null, endDay: null, lectureHours: null, departments: null, mode: null });
    (async () => {
        let  prompt = `
        As a long-stayed and experienced member and chairman on the timetable committee in a prestigious schoool which have many different classes, courses, events and venues done at various different times on the day, I need your help to form a timetable for my school.

        ####
        I will enter a list of courses in an array, departments in an array, venues in an array and the time contraints i.e the time to start inputting the activites of the day usually by 8:00 unless specified something else, time to end the activites of the day usually by 18:00 unless specified something else, time for a break, and the interval to which you'll be working with
        
        ####  
        Once you are done with your scheduling, I want you to only return your answer in a string format that can be parsed to JSON and output as your response just the JSON, nothing else, following this pattern:
        
        [
        {
         course: 'the name of the course given',
         day: 'the day of the week'
         startTime: 'what time the course should begin in date format - javascript'
         endTime: 'what time the course should end in date format - javascript'
         venue: 'what venue are you allocating to the course'
        }
        ... 
        ]
        
        
        #####
        Courses: ['CSC 222', 'CSC 227', 'CSC 212'],
        Departments: ['Computer Science', 'Mathematics'],
        venue: ['LT1', 'LT2', 'B01'],
        startTime: 8:00
        endTime: 18:00
        interval: 60minutes
        break: 14:00-15:00

        ####
        STRICT RULES TO FOLLOW:
        - only output the string JSON-like string as your response, NOTHING ELSE
        - Avoid time & venue clashes
        `
        let response = await gpt.ask(prompt);

        const cleanedJSON = parseAndRemoveJsonTags(response)
        console.log('GPTs response: ', cleanedJSON); // you got it!
      })();


    return (
        <div className='mx-auto p-8 mt-10 md:via-slate-50 lg:via-white sm: max-w-[50rem] space-y-4'>
            <div className="mx-auto grid w-full max-w-6xl gap-1">
                <h1 className="text-xl font-semibold">Create new timetable</h1>
                <div>
                    <p>Timetable is created by a scheduling algorithm which uses all the saved courses and priority.</p>
                    <p>Want to start from an existing timetable template? <span className='underline text-blue-500'>Import previous timetables</span></p>
                </div>
            </div>
            {!!schedule.startDay ? <TimeTable schedule={schedule}/> : <Details />}
        </div>
    )
};

function parseAndRemoveJsonTags(str) {
    // Remove ```json at the beginning and ``` at the end of the string
    const jsonString = str.slice(8, -3);
    // Parse the JSON string into an array or object
    const parsedJson = JSON.parse(jsonString);
    return parsedJson;
}

export default Index;