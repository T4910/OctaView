import {
    Table, TableBody, TableCaption, TableCell,
    TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import TableTop from "@/components/tableTop"

function Index({ schedule: { startDay, endDay, lectureHours, departments } }) {
    const daysOfWeek = getDaysOfWeek(startDay, endDay);

    // parameters are in date time format.
    //! NOTE -> datetime must be in hours only without minutes
    //! i.e "2018-02-23T13:00:00" NOT "2018-02-23T13:30:00"
    const hourRanges = getHourRanges(lectureHours.startHour, lectureHours.endHour); // returns an array of all hour ranges within the time specified

    const selectedLevel = 100;
    const selectedDepartment = 'Computer Science';

    return (
        <>
            {/* <div>
                <table id="data_Table" class="display dataTable no-footer" cellspacing="0" width="100%" role="grid" aria-describedby="data_Table_info">
                    <thead>
                        <tr bgcolor="#C2CBD0" role="row"><td colspan="12" align="center" rowspan="1">Weekly Lecture Timetable</td></tr>
                        <tr bgcolor="#C2CBD0" role="row"><td class="sorting_asc" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-sort="ascending" aria-label="SN: activate to sort column ascending">SN</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="DAYS: activate to sort column ascending">DAYS</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="08-09: activate to sort column ascending">08-09</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="09-10: activate to sort column ascending">09-10</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="10-11: activate to sort column ascending">10-11</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="11-12: activate to sort column ascending">11-12</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="12-01: activate to sort column ascending">12-01</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="01-02: activate to sort column ascending">01-02</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="02-03: activate to sort column ascending">02-03</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="03-04: activate to sort column ascending">03-04</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="04-05: activate to sort column ascending">04-05</td><td class="sorting" tabindex="0" aria-controls="data_Table" rowspan="1" colspan="1" aria-label="05-06: activate to sort column ascending">05-06</td></tr>
                    </thead>
                    <tbody>
                        <tr role="row" class="odd"><td class="sorting_1">1</td><td>Monday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="even"><td class="sorting_1">2</td><td>Tuesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="odd"><td class="sorting_1">3</td><td>Wednesday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="even"><td class="sorting_1">4</td><td>Thursday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="odd"><td class="sorting_1">5</td><td>Friday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr role="row" class="even"><td class="sorting_1">6</td><td>Saturday</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody>

                </table>
            </div> */}

            <Table>
                <TableHeader>
                    {/* <TableTop />             */}
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
                                    activities = departments[selectedDepartment][selectedLevel][day.toLowerCase()];

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

                                console.log('\nCURRENT DAY: ', day, activitiesForEachHour);




                                return (
                                    <TableRow>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
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
                                                                <TableCell className="p-0" colSpan={(properties?.rangeIndex === 0) ? properties.spanRange ?? 1 : 1} asChild>
                                                                    {(properties?.rangeIndex === -1) ? '' : <p className="bg-red-200 text-center">{properties?.activity?.name}</p>}
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

        </>
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