import Add from './addRecordModal'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import Departmnets from '@/components/departmentSelection'
import { useState } from 'react'

const newRecord = ({ name }) => {
  const formToShow = {
    courses: courseForm(),
    departments: departmentForm()
  };

  if(!(!!formToShow)) return null;

  return (
      <Add 
        name={name}
        title={`Add the following to ${name}`}
      >
        <form action="">{formToShow[name]}</form>
      </Add>
  );
}

const courseForm = () => {
  const departmentState = useState('')

  return (
    <div>
      <Label htmlFor="name">Course Title</Label>
      <Input type="text" name="name"/>
      <Label htmlFor="code">Course Code</Label>
      <Input type="text" name="code"/>
      <Label htmlFor="department">Department</Label>
      <Departmnets outsideValueState={departmentState}/>
    </div>
  );
};

const departmentForm = () => {
  return (
    <div>
      <Label htmlFor="name">Department Name</Label>
      <Input type="text" name="name"/>
      <Label htmlFor="code">Department Code</Label>
      <Input type="text" name="code"/>
    </div>
  );
};

export default newRecord;