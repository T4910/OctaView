import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Command, CommandEmpty, CommandList,
    CommandGroup, CommandInput, CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import axios from 'axios'

const serverLink = import.meta.env.VITE_SERVER_LINK


// To be fetched from database
const department = [
  {
    value: "CSC",
    label: "Computer Science",
  },
  {
    value: "MAT",
    label: "Mathematics",
  },
  {
    value: "POS",
    label: "Political Science",
  },
  {
    value: "EIE",
    label: "Electrical & Information Engineering",
  },
  {
    value: "MCE",
    label: "Mechanical Engineering",
  },
  {
    value: "MTE",
    label: "Mechatronics Engineering",
  },
  {
    value: "BUS",
    label: "Business Studies",
  },
]

const departmentSelection = ({ contentClassName, triggerClassName, enableSelectAll, setDepartment }) => { 
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(enableSelectAll ? "all" : "");
    const [departments, setDepartments] = useState([])

    useEffect(() => {
      async function fetchDepartment(){
          try {
            const response = await axios.post(`${serverLink}/department/get-department`, {})
            
            // console.log(response?.data?.deparment,776543)
            setDepartments(response?.data?.deparment)

          } catch (error) {
            console.log('Error fetching the department...', error)
          }
      }
  
      fetchDepartment();
    }, [])

    const shownValue = value 
    ? ( value === 'all') 
      ? 'All department selected' 
      : departments.find((department) => department.code === value)?.name  
    : "Select department...";
    
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-44 justify-between", triggerClassName)}
              disabled={departments.length === 0}
            >
              {shownValue}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align={'end'} className={cn("w-fit justify-between h-72", contentClassName)}>
            <Command>
              <CommandInput placeholder="Search course..." />
              <CommandList>
                <CommandEmpty>No departments found.</CommandEmpty>
                <CommandGroup>
                { enableSelectAll ? 
                      <CommandItem
                          key='all'
                          value='all'
                          onSelect={(currentValue) => {
                            setValue(value === 'all' ? "" : 'all');
                            // setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === 'all' ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span className="font-medium">{value === 'all' ? 'Deselect All' : 'Select All'}</span>
                      </CommandItem> : null}
                    {departments.map((department) => (
                        <CommandItem
                          key={department.code}
                          value={department.code}
                          onSelect={(currentValue) => {
                            console.log(value, currentValue)
                            setValue(currentValue === value ? "" : currentValue);
                            setDepartment(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              (value === department.code || value === 'all') ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span className="capitalize">{department.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    };
    
export default departmentSelection;