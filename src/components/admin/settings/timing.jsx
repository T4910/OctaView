import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import { useState } from 'react'

// !Fix interval problem

export default function timing() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [ interval, setInterval ] = useState('60')
    const timeStrings = getHour('2024-04-19T00:00:00.000Z', '2024-04-19T24:00:00.000Z', interval)

    const [ startTime, setStartTime ] = useState('08:00')
    const [ endTime, setEndTime ] = useState('18:00')

    const [ startDay, setStartDay ] = useState('Monday')
    const [endDay, setEndDay] = useState('Friday')

    return (
        <Card>
            <CardHeader>
                <CardTitle>Timing</CardTitle>
                <CardDescription>
                Adjust the timing for any new timetable you create - set defaults when creating timetables 
                </CardDescription>
            </CardHeader>
                <CardContent className="">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                            <Label htmlFor="startday">Start Day</Label>
                            <Select 
                                name="startday"
                                defaultValue={startDay}
                                value={startDay}
                                onValueChange={(value) => setStartDay(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue className="capitalize" placeholder="Select starting day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {daysOfWeek.map(day => (endDay !== day) ? <SelectItem key={day} value={day} className="capitalize">{day}</SelectItem> : null)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="endday">End Day</Label>
                            <Select 
                                name="endday" 
                                defaultValue={endDay} 
                                value={endDay} 
                                onValueChange={(value) => setEndDay(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select ending day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {daysOfWeek.map(day => (startDay !== day) ? <SelectItem key={day} value={day} className="capitalize">{day}</SelectItem> : null)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="starthour">Start Hour</Label>
                            <Select name="starthour"
                                defaultValue={startTime}
                                value={startTime}
                                onValueChange={(value) => setStartTime(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select starting time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="max-h-64">
                                        {timeStrings.map(time => (endTime !== time) ? <SelectItem key={time} value={time} className="capitalize">{time}</SelectItem> : null)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="endhour">End Hour</Label>
                            <Select name="endhour"
                                defaultValue={endTime}
                                value={endTime}
                                onValueChange={(value) => setEndTime(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select ending time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="max-h-64">
                                        {timeStrings.map(time => (startTime !== time) ? <SelectItem key={time} value={time} className="capitalize">{time}</SelectItem> : null)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="interval">Interval</Label>
                            <Select 
                                name="interval"
                                defaultValue={interval}
                                value={interval}
                                onValueChange={(val) => setInterval(val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Interval" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="30">30 min</SelectItem>
                                        <SelectItem value="60">1 hour</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
        </Card>
    )
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

function getHour(startTime, endTime, interval=30) {
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

    // Array to store hour 
    const hour = [];

    // Loop through each hour with the specified interval
    let currentDate = startDate;
    while (currentDate < endDate) {
        const startHour = currentDate.getHours().toString().padStart(2, '0');
        const startMinute = currentDate.getMinutes().toString().padStart(2, '0');

        currentDate.setHours(currentDate.getHours(), currentDate.getMinutes() + interval);

        const endHour = currentDate.getHours().toString().padStart(2, '0');
        const endMinute = currentDate.getMinutes().toString().padStart(2, '0');

        hour.push(`${startHour}:${startMinute}`);
    }

    // console.log({startTime, endTime, startDate, endDate}, 444)

    // console.log(6346, startTime, endTime, hour)
    return hour;
}