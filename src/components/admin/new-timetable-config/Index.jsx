import TimeTable from '@/components/timetable'
import DisplayAI from "./aiTImetable"
import Details from '@/components/admin/new-timetable-config/details'
import { useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

// TODO: 
// Cool loading component that covers the timetable form creator 

const Index = () => {
    const [schedule, setSchedule] = useState({});

    return (
        <Card className="max-w-[60rem] mt-10 mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Create new timetable</CardTitle>
                <CardDescription>
                    <p>Timetable is created by a scheduling algorithm which uses all the saved courses and priority.</p>
                    <p>Want to start from an existing timetable template? <span className='underline text-blue-500'>Import previous timetables</span></p>
                </CardDescription>
            </CardHeader>
            <CardContent className="min-h-fit">
            {!!schedule?.startDay ? <DisplayAI schedule={schedule}/> : <Details setSchedule={setSchedule}/>}    
                {/* <Details setSchedule={setSchedule}/> */}
            </CardContent>
        </Card>
    )
};

export default Index;