import {
    Table, TableBody, TableCaption, TableCell,
    TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import TableTop from "@/components/tableTop"
import Event from "@/components/tEvents"

function Index({ schedule: { startDay, endDay, lectureHours, departments, mode } }) {
    if(!(!!startDay)) return <p>Loading...</p>
    const daysOfWeek = getDaysOfWeek(startDay, endDay);

    // parameters are in date time format.
    //! NOTE -> datetime must be in hours only without minutes
    //! i.e "2018-02-23T13:00:00" NOT "2018-02-23T13:30:00"
    const hourRanges = getHourRanges(lectureHours.startHour, lectureHours.endHour); // returns an array of all hour ranges within the time specified

    const selectedLevel = 100;
    const selectedDepartment = 'Computer Science';

    return (
        <div>
            <TableTop mode={mode}/>            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-9">S/N</TableHead>
                        <TableHead>DAYS</TableHead>
                        <>
                            {
                                // Iterates through hour (24h formart) ranges rep. as strings 
                                // i.e hourRanges = [..., '12-13', '13-14', ...]
                                hourRanges.map((range) => {
                                    return (
                                        <TableHead className="min-w-10">{range}</TableHead>
                                    )
                                })
                            }
                        </>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <>
                        {
                            daysOfWeek.map((day, index) => {      
                                const activitiesWithTimeRange = {}, 
                                activitiesForEachHour = {}, 
                                activities =  departments[selectedDepartment][selectedLevel][day.toLowerCase()];
    
                                activities?.map(({ startTime, endTime, ...rest }) => {
                                    //  CONVERTS activities array to object
                                    //  [{startTime:..., endTime:..., ....}] -> {'startTime-endTime': {....}}

                                    const hourRange = formatHourRange(startTime, endTime);
                                    activitiesWithTimeRange[hourRange] = rest;
                                })

                                // Start with iterating through all hour ranges and checks 
                                // with each hour range in activities of the day, then sends the
                                // results to another object which holds every hour range which
                                // holds information on the activity and meta-data for positioning 
                                // on the timetable per that hour.
                                hourRanges.map((range) => {
                                    for (const activityRange in activitiesWithTimeRange) {
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
                                })
                                
                                
                                return (
                                    <TableRow>
                                        <TableCell className="font-medium">{index+1}</TableCell>
                                        <TableCell>{day}</TableCell>

                                        {/* Arrangment of courses per day*/}
                                        <>
                                            {
                                                // iterates through each range of time and inputs a course if matches with time
                                                // Also expands (spans) the course if it takes more hours
                                                hourRanges.map((range) => {
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
                                                            <TableCell className="p-0" colSpan={(properties?.rangeIndex === 0) ? properties.spanRange??1 : 1}>
                                                                {(properties?.rangeIndex === -1) 
                                                                ? '' 
                                                                : <Event 
                                                                    name={properties?.activity?.name}
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
                </TableBody>
            </Table>
        </div>
    )
}

function getDaysOfWeek(startDay, endDay) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

function getHourRanges(startTime, endTime) {
    // Convert time strings to Date objects
    const startDate = new Date(`2000-01-01 ${startTime}`);
    const endDate = new Date(`2000-01-01 ${endTime}`);

    // Array to store hour ranges
    const hourRanges = [];

    // Loop through each hour from start time to end time
    let currentDate = startDate;
    while (currentDate < endDate) {
        const startHour = currentDate.getHours().toString().padStart(2, '0');
        currentDate.setHours(currentDate.getHours() + 1);
        const endHour = currentDate.getHours().toString().padStart(2, '0');
        hourRanges.push(`${startHour}-${endHour}`);
    }

    return hourRanges;
}

function formatHourRange(startDate, endDate) {
    // receives datetime, returns string
    // i.e if "2018-02-23T13:00:00","2018-02-23T14:00:00" returns '13-14' 

    const startHour = startDate.getHours().toString().padStart(2, '0');
    const endHour = endDate.getHours().toString().padStart(2, '0');
    return `${startHour}-${endHour}`; // returns 24h system
}

function calculateHoursInRange(hourRange) {
    // if entered '12-15' returns 3 

    const [startHour, endHour] = hourRange.split('-').map(Number);
    const hoursInRange = endHour - startHour;
    return hoursInRange > 0 ? hoursInRange : 24 + hoursInRange;
}

function getRangeIndex(smallRange, largeRange) {
    const [smallStart, smallEnd] = smallRange.split('-').map(Number);
    const [largeStart, largeEnd] = largeRange.split('-').map(Number);

    if (smallEnd - smallStart !== 1) return null;

    const index = (largeEnd >= smallEnd && largeStart <= smallStart) ? smallStart - largeStart : -1;
    return index;
}

export default Index