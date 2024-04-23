import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import DepartmentSelection from "@/components/departmentSelection"
import LevelSelection from "@/components/levelSelection"
import Create from "@/components/admin/new-timetable-config/createTimetableBtn"
import { useState, useEffect, useRef } from 'react'
import Switch from "../settings/switch"




const details = ({ setSchedule }) => {
  const currentDate = new Date()
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [dates, setDates] = useState([...getAcademicYears(currentDate, -7).reverse().slice(0,-1), ...getAcademicYears(currentDate, 5)])
  
  const [name, setName] = useState(`Timtable built on ${currentDate.toLocaleString().split(',').toString().replace(',','')}`)
  const [description, setDescription] = useState('')

  const departmentState = useState("all")
  const fetchedDepartmentsState = useState([])
  const [ level, setLevel ] = useState("all")

  const [ current, setCurrent ] = useState(true);
  const [ examMode, setExamMode ] = useState(false);

  const [ interval, setInterval ] = useState('60')
  const timeStrings = getHour('2024-04-19T00:00:00.000Z', '2024-04-19T24:00:00.000Z', interval)

  const [ startTime, setStartTime ] = useState('08:00')
  const [ endTime, setEndTime ] = useState('18:00')

  const [ startDay, setStartDay ] = useState('Monday')
  const [endDay, setEndDay] = useState('Friday')

  const [ currentYear, setCurrentYear ] = useState(computeAcademicYear(currentDate))
  const [ semester, setSemester ] = useState(isAlpha() ? 'alpha' : 'omega')

  const form = {
    name, description, current, examMode, interval, startTime,
    endTime, startDay, endDay, currentYear, semester, level, 
    selectedDepartment: departmentState[0], allDepartments: fetchedDepartmentsState[0]}

  const QuerySettings = () => {
    return (
      <Card>
      <CardHeader>
          <CardTitle>
            <h3 className="text-lg">Select Department & Level</h3>
          </CardTitle>
      </CardHeader>
      <CardContent >
          <div className="flex justify-between space-x-6">
          <div className="flex-grow">
              <Label htmlFor="subcategory">Courses</Label>
              <DepartmentSelection 
                triggerClassName="min-w-full"
                contentClassName="min-w-full w-full" 
                enableSelectAll={true}
                outsideValueState={departmentState}
                outsideDepartmentsState={fetchedDepartmentsState}
              />
          </div>
          <div className="flex-grow">
              <Label htmlFor="subcategory">Level</Label>
              <LevelSelection 
                className="min-w-full" 
                value={level}
                setLevel={setLevel}
                enableSelectAll={true}/>
          </div>
          </div>
      </CardContent>
      </Card>
    )
  }

  const Timing = () => {
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
                                        <SelectItem disabled={true} value="30">30 min</SelectItem>
                                        <SelectItem value="60">1 hour</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
        </Card>
      )
    }

  return (
        <Card>
          <CardContent>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  required 
                  value={name} onChange={({ target: {value} }) => setName(value)}
                  placeholder="Timetable Name" 
                  name="name"/>
              </div>
              <div>
                <Label htmlFor="Description">Description</Label>
                <Input value={description} onChange={({ target: {value} }) => setDescription(value)} placeholder="Timetable Description" name="description"/>
              </div>
              <div className="flex justify-between space-x-6">
                <div className="flex-grow">
                    <Label htmlFor="acadyear">Academic Year</Label>
                    <Select name="acadyear" required
                        value={currentYear}
                        defaultValue={computeAcademicYear(currentDate)}
                        onValueChange={(value) => setCurrentYear(value)}
                    >
                        <SelectTrigger>
                            <SelectValue className="capitalize" placeholder="Select year..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-56">
                            <SelectGroup>
                                {dates.map(date => <SelectItem key={date} value={date}>{date}</SelectItem>)}
                                <Button     
                                    className="relative bg-transparent justify-start hover:bg-gray-100 p-0 font-normal text-black flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" 
                                    onClick={() => setDates(dates => [...dates.slice(0,-1), ...getAcademicYears(new Date(dates[dates.length - 1].split('/')[1]), 5)])}
                                ><span>Load More...</span></Button>
                            </SelectGroup>
                        </SelectContent>
                    </Select>                  
                </div>
                <div className="flex-grow">
                    <Label htmlFor="semester">Semester</Label>
                    <Select required
                        name="semester"
                        defaultValue={isAlpha() ? 'alpha' : 'omega'}
                        value={semester}
                        onValueChange={(value) => setSemester(value)}
  
                    >
                        <SelectTrigger>
                            <SelectValue className="capitalize" placeholder="Select semester..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value='alpha'>Alpha</SelectItem>
                                <SelectItem value='omega'>Omega</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>                
                </div>
              </div>
              <div className="flex space-x-7">
                <Switch 
                  checked={examMode}
                  onCheckedChange={(value) => setExamMode(value)}
                  label="Activate examination mode"/>
                <Switch 
                  checked={current || examMode}
                  disabled={examMode}
                  onCheckedChange={(value) => setCurrent(value)}
                  label="Set to Current"/>

              </div>
              <QuerySettings />
              <Timing />
            </form>

          </CardContent>
          <CardFooter className="border-t px-6 py-4 space-x-6">
            <Create setSchedule={setSchedule} details={form}/>
            <Switch label="Use AI✨" defaultChecked={true} disabled={true}/>
          </CardFooter>
        </Card>
      )
}

function computeAcademicYear(input) {
  let year;
  if (input instanceof Date) {
      year = input.getFullYear();
  } else if (typeof input === 'string') {
      year = parseInt(input);
  } else {
      throw new Error("Input must be a Date object or a string representing a year.");
  }

  // Check if the input represents the starting year of the academic year
  let startingYear;
  if (new Date(`${year}-09-01`).getTime() <= input.getTime()) {
      startingYear = year;
  } else {
      startingYear = year - 1;
  }

  // Calculate the academic year range
  const endingYear = startingYear + 1;

  return `${startingYear}/${endingYear}`;
}

function getAcademicYears(startDate, numberOfYears) {
  const academicYears = [];

  for (let i = 0; i < Math.abs(numberOfYears); i++) {
      let currentDate;
      if (numberOfYears < 0) {
          currentDate = new Date(startDate.getFullYear() - i, startDate.getMonth(), startDate.getDate());
      } else {
          currentDate = new Date(startDate.getFullYear() + i, startDate.getMonth(), startDate.getDate());
      }
      const academicYear = computeAcademicYear(currentDate);
      academicYears.push(academicYear);
  }

  return academicYears;
}

function isAlpha() {
  const date = new Date(); // Assume it's April 22, 2024
  const month = date.getMonth();
  return month >= 8 && month <= 1; // Months are 0-indexed (0: January, 1: February, ..., 8: September)
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

export default details