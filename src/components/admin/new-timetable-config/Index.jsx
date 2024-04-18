import TimeTable from '@/components/timetable'
import Details from '@/components/admin/new-timetable-config/details'
import { useState } from 'react';

// TODO: 
// Cool loading component that covers the timetable form creator 

const Index = () => {
    const [schedule, setSchedule] = useState({ startDay: null, endDay: null, lectureHours: null, departments: null, mode: null });

    return (
        <div className='min-w-fit mx-auto mt-10 md:via-slate-50 lg:via-white sm: max-w-[50rem] space-y-4'>
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

export default Index;