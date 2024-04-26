import Add from './addRecordModal'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import Departmnets from '@/components/departmentSelection'
import Levels from '@/components/levelSelection'
import { useState } from 'react'
import axios from 'axios'
import details from '../../new-timetable-config/details'

const serverLink = import.meta.env.VITE_SERVER_LINK

const newRecord = ({ name }) => {
  let details = {};

  const [ courseTitle, setCourseTitle ] = useState("")
  const [ courseCode, setCourseCode ] = useState("")
  const [ courseDescription, setCourseDescription ] = useState("")
  const [ courseLevel, setCourseLevel ] = useState('')
  const [ courseInstructor, setCourseInstructor ] = useState("Mr. Shaba")
  const departmentState = useState("")
  const levelState = useState("")

  const [ departmentTitle, setDepartmentTitle ] = useState("")
  const [ departmentCode, setDepartmentCode ] = useState("")
  const [ departmentLocation, setDepartmentLocation ] = useState("")
  const [ departmentYear, setDepartmentYear ] = useState(4)

  const formToShow = {
    courses: <CourseForm 
      levelState={levelState}
      departmentState={departmentState} 
      title={courseTitle} 
      setTitle={setCourseTitle} 
      code={courseCode} 
      setCode={setCourseCode}
      description={courseDescription} 
      setDescription={setCourseDescription}
      level={courseLevel} 
      setLevel={setCourseLevel}
      instructor={courseInstructor} 
      setInstructor={setCourseInstructor}
    />,
    departments: <DepartmentForm 
      title={departmentTitle} 
      setTitle={setDepartmentTitle} 
      code={departmentCode}
      setCode={setDepartmentCode} 
      location={departmentLocation} 
      setLocation={setDepartmentLocation}
      year={departmentYear}
      setYear={setDepartmentYear}
    />
  };

  async function addRecord(record){
   switch (record) {
     case 'courses':
       details = {
        title: courseTitle, 
        code: courseCode,
        level: levelState[0],
        description: courseDescription,
        instructorId: courseInstructor,
        departmentId: departmentState[0]
      }
       break;
 
     case 'departments':
       details = {
        name: departmentTitle, 
        code: departmentCode,
        location: departmentLocation,
        years: departmentYear
      }
       break;
   
     default:
       break;
   }

    console.log(details, 329278)
    // alert(details)
    // if(record === 'courses'){
    //   if(!(!!details?.title) || !(!!details?.code) || !(!!details?.level) || !(!!details?.instructorId) || !(!!details?.departmentId)) return

    // } else {

    //   if(!(!!details?.code) || !(!!details?.name) || !(!!details?.years)) return
    // }
    const response = await axios.post(`${serverLink}/${record.slice(0, -1)}/add-${record.slice(0, -1)}`, details)

    console.log(response?.data[record])
  }

  if(!(!!formToShow[name])) return null;

  return (
      <Add 
        name={name}
        title={`Add the following to ${name}`}
        action={() => addRecord(name)}
      >
        <div>{formToShow[name]}</div>
      </Add>
  );
}

const CourseForm = ({ departmentState, className, title, setTitle, code, setCode, levelState: [level, setLevel] }) => {
  return (
    <div>
      <Label htmlFor="name">Course Title</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="name" placeholder="Object Oriented Programming"/>
      <Label htmlFor="code">Course Code</Label>
      <Input value={code} onChange={(e) => setCode(e.target.value)} type="text" name="code" placeholder="CSC 211"/>
      <Label htmlFor="department">Department</Label>
      <Departmnets outsideValueState={departmentState}/>
      <Label htmlFor="level">Level</Label>
      <Levels value={level} setLevel={setLevel}/>
    </div>
  );
};

const DepartmentForm = ({ title, setTitle, code, setCode, location, setLocation, year, setYear }) => {
  return (
    <div>
      <Label htmlFor="name">Department Name</Label>
      <Input type="text" name="name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Biochemistry"/>
      <Label htmlFor="code">Department Code</Label>
      <Input type="text" name="code"  value={code} onChange={(e) => setCode(e.target.value)} placeholder="bch"/>
      <Label htmlFor="year">Department Year</Label>
      <Select name="year"
              value={year}
              onValueChange={(value) => setYear(value)}  
      >
          <SelectTrigger className={cn("justify-between")}>
              <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectItem value="4">4 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
      <Label htmlFor="location">Department Location</Label>
      <Input value={location} onChange={(e) => setLocation(e.target.value)} type="text" name="location"/>

    </div>
  );
};

export default newRecord;