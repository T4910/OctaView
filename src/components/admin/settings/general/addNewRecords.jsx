import Add from './addRecordModal'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'

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
  return (
    <div>
      <Label htmlFor="name">Course Name</Label>
      <Input type="text" name="name"/>
    </div>
  );
};

const departmentForm = () => {
  return (
    <div>
      <Label htmlFor="name">Department Name</Label>
      <Input type="text" name="name"/>
    </div>
  );
};

export default newRecord;