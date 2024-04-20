import {
    Table, TableBody, TableCaption, TableCell,
    TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import TableTop from "@/components/tableTop"
import Event from "@/components/tEvents"
import { useState } from "react"

// TODO: add the timetable view mode that shows venues instead of days and have the day as a select 
function Index({ schedule: { startDay, endDay, lectureHours, departments, mode }, venue }) {
    
    const [ level, setLevel ] = useState(100);
    const [ department, setDepartment ] = useState('csc');
   
    if(!(!!startDay)) return <p>Loading...</p>
    
    let daysOfWeek, hourRanges

    if(!!startDay){
        daysOfWeek = getDaysOfWeek(startDay, endDay);
        // parameters are in date time format.
        //! NOTE -> datetime must be in hours only without minutes
        //! i.e "2018-02-23T13:00:00" NOT "2018-02-23T13:30:00"
        hourRanges = getHourRanges(lectureHours.startHour, lectureHours.endHour); // returns an array of all hour ranges within the time specified
    }

    console.log('Sent to timetable: ',{ startDay, endDay, lectureHours, departments, mode, venue}, '\n Other computed values:', {daysOfWeek, hourRanges})


    const Loader = () => {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <TableTop mode={mode} venue={venue}/>            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-9">S/N</TableHead>
                        <TableHead>{!!venue ? 'VENUES' : 'DAYS'}</TableHead>
                        <>
                            {
                                // Iterates through hour (24h formart) ranges rep. as strings 
                                // i.e hourRanges = [..., '12-13', '13-14', ...]
                                hourRanges.map((range, index) => <TableHead key={index} className="min-w-10">{range}</TableHead>)
                            }
                        </>
                    </TableRow>
                </TableHeader>
                {(!!startDay) ? <TableBody>
                    <>
                        {
                            daysOfWeek?.map((day, index) => {   
                                console.log({day, 
                                    d: (!(!!departments[department]))
                                        ? [] 
                                        : (!(!!departments[department][level]))
                                           ? [] 
                                           : (!(!!departments[department][level][day.toLowerCase()])) 
                                              ? [] 
                                              : (departments[department][level][day.toLowerCase()])
                                }, 9328)

                                const activitiesWithTimeRange = {}, 
                                activitiesForEachHour = {}, 
                                // if no details on activities for that day, replace with an empty array - []
                                activities =  (!(!!departments[department]))
                                                ? [] 
                                                : (!(!!departments[department][level]))
                                                    ? [] 
                                                    : (!(!!departments[department][level][day.toLowerCase()])) 
                                                        ? [] 
                                                        : (departments[department][level][day.toLowerCase()]);
    
                                activities?.map(({ startTime, endTime, ...rest }) => {
                                    //  CONVERTS activities array to object
                                    //  [{startTime:..., endTime:..., ....}] -> {'startTime-endTime': {....}}

                                    const hourRange = formatHourRange(startTime, endTime);
                                    console.log(startTime, endTime, hourRange, 776688)
                                    activitiesWithTimeRange[hourRange] = rest;
                                })

                                // Start with iterating through all hour ranges and checks 
                                // with each hour range in activities of the day, then sends the
                                // results to another object which holds every hour range which
                                // holds information on the activity and meta-data for positioning 
                                // on the timetable per that hour.
                                hourRanges?.map((range) => {
                                    for (const activityRange in activitiesWithTimeRange) {
                                        // console.log(range, activityRange, 888999);
                                        if (Object.hasOwnProperty.call(activitiesWithTimeRange, activityRange)) {
                                            const index = getRangeIndex(range, activityRange);
                                            const duration = (index >= 0) ? calculateHoursInRange(activityRange) : null;
                                            const activityDetails = (index >= 0) ? activitiesWithTimeRange[activityRange] : null;

                                            if (index < 0 && activitiesForEachHour[range]) continue; // helps prevent override of information

                                            activitiesForEachHour[range] = {
                                                rangeIndex: index,
                                                spanRange: duration,
                                                activity: activityDetails
                                            }
                                        }
                                    }
                                    console.log('DAY: ', day, 'RANGE: ', range, '\n', activitiesForEachHour[range])
                                })
                                
                                
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{index+1}</TableCell>
                                        <TableCell className="capitalize">{day}</TableCell>

                                        {/* Arrangment of courses per day*/}
                                        <>
                                            {
                                                // iterates through each range of time and inputs a course if matches with time
                                                // Also expands (spans) the course if it takes more hours
                                                hourRanges?.map((range, index) => {
                                                    let properties = activitiesForEachHour[range]

                                                    let rangeIndex = -1;
                                                    let spanRange = -1;

                                                    return (
                                                        // All the logic below:
                                                        // 1. display course if in time frame
                                                        // 2. Expand cell if course spends more than 1hr - doesn't render the cells that are
                                                        //     within the time frame for accurate represenation 
                                                        // 3. If outside time frame, render cell but don't show any courses
                                                        (properties?.rangeIndex <= 0) 
                                                        ? (
                                                            <TableCell key={index} className="p-0" colSpan={(properties?.rangeIndex === 0) ? properties.spanRange??1 : 1}>
                                                                {(properties?.rangeIndex === -1) 
                                                                ? '' 
                                                                : <Event 
                                                                    name={properties?.activity?.code}
                                                                    venue={properties?.activity?.venue}
                                                                    lecturer={properties?.activity?.coordinator}
                                                                />}
                                                            </TableCell>
                                                        ) : null
                                                    )
                                                })
                                            }
                                        </>
                                    </TableRow>
                                )
                            })
                        }
                    </>
                </TableBody> : <Loader />}
            </Table>
        </div>
    )
}

function getDaysOfWeek(startDay, endDay) {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const startIndex = daysOfWeek.indexOf(startDay);
    const endIndex = daysOfWeek.indexOf(endDay);

    if (startIndex === -1 || endIndex === -1) {
        console.error('Invalid start or end day specified.');
        return [];
    }

    if (startIndex <= endIndex) {
        return daysOfWeek.slice(startIndex, endIndex + 1);
    } else {
        const firstPart = daysOfWeek.slice(startIndex);
        const secondPart = daysOfWeek.slice(0, endIndex + 1);
        return firstPart.concat(secondPart);
    }
}

function roundTimeToInterval(timeString, interval) {
    const time = new Date(timeString);
    const minutes = time.getMinutes();
    const remainder = minutes % interval;

    // console.log('Before: ', {timeString, interval, time, ret: time.toISOString(), minutes, remainder})
    if (remainder === 0)  return time.toISOString();

    // Round the time to the nearest interval
    if (remainder < interval / 2) {
        time.setMinutes(minutes - remainder);
    } else {
        time.setMinutes(minutes + (interval - remainder));
    }

    // console.log('After: ', {timeString, interval, time, ret: time.toISOString(), minutes, remainder})
    return time.toISOString();
}

function removeTimeZone(time){
    // console.log('Before: ', time)
    const offset = time.getTimezoneOffset();
    const serialTime = time.getTime();

    // refactors the currrent time in case of timezone difference since it doesn't 
    // matter what timezone one is on at setting up timetable
    // console.log('Before: ', time)
    time.setTime(serialTime + offset*(60000))
    // console.log('AFter: ', time)

    // console.log('After: ', time)
    return time
}

function getHourRanges(startTime, endTime, interval=60) {
    // Round start time and end time to nearest interval
    startTime = roundTimeToInterval(startTime, interval);
    endTime = roundTimeToInterval(endTime, interval);

    // Convert time strings to Date objects
    let endDate = new Date(`${endTime}`);
    let startDate = new Date(`${startTime}`);

    // console.log(startDate, 323)
    // refactors the currrent time in case of timezone difference since it doesn't 
    // matter what timezone one is on at setting up timetable
    endDate = removeTimeZone(endDate)
    startDate = removeTimeZone(startDate)

    // Array to store hour ranges
    const hourRanges = [];

    // Loop through each hour with the specified interval
    let currentDate = startDate;
    while (currentDate < endDate) {
        const startHour = currentDate.getHours().toString().padStart(2, '0');
        const startMinute = currentDate.getMinutes().toString().padStart(2, '0');

        currentDate.setHours(currentDate.getHours(), currentDate.getMinutes() + interval);

        const endHour = currentDate.getHours().toString().padStart(2, '0');
        const endMinute = currentDate.getMinutes().toString().padStart(2, '0');

        hourRanges.push(`${startHour}:${startMinute}-${endHour}:${endMinute}`);
    }

    // console.log({startTime, endTime, startDate, endDate}, 444)

    // console.log(6346, startTime, endTime, hourRanges)
    return hourRanges;
}

// // Example usage
// const startTime = '2024-04-19T08:20:00';
// const endTime = '2024-04-19T17:50:00';
// const interval = 30; // Specify the interval in minutes
// const ranges = getHourRanges(startTime, endTime, interval);
// console.log(ranges);


function formatHourRange(start, end) {
    // receives datetime, returns string
    // i.e if "2018-02-23T13:00:00","2018-02-23T14:00:00" returns '13:00-14:00'
    start = removeTimeZone(new Date(start))
    end = removeTimeZone(new Date(end))

    const startHour = start.getHours().toString().padStart(2, '0');
    const startMinute = start.getMinutes().toString().padStart(2, '0');
    const endHour = end.getHours().toString().padStart(2, '0');
    const endMinute = end.getMinutes().toString().padStart(2, '0');

    return `${startHour}:${startMinute}-${endHour}:${endMinute}`; // returns 24h system with minutes
}

function calculateHoursInRange(hourRange) {
    // if entered '12-15' returns 3 

    const [startHour, endHour] = hourRange.split('-').map(str => str.replace(':','.')).map(Number);
    const hoursInRange = endHour - startHour;
    return hoursInRange > 0 ? hoursInRange : 24 + hoursInRange;
}

function getRangeIndex(smallRange, largeRange) {
    const [smallStart, smallEnd] = smallRange.split('-').map(str => str.replace(':','.')).map(Number);
    const [largeStart, largeEnd] = largeRange.split('-').map(str => str.replace(':','.')).map(Number);

    if (smallEnd - smallStart !== 1) return null;

    const index = (largeEnd >= smallEnd && largeStart <= smallStart) ? smallStart - largeStart : -1;
    return index;
}

export default Index