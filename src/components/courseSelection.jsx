import { useState } from "react"
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

// To be fetched from database
const courses = [
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

const courseSelection = ({ contentClassName, triggerClassName, enableSelectAll }) => { 
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(enableSelectAll ? "all" : "");

    const shownValue = value 
    ? ( value === 'all') 
      ? 'All courses selected' 
      : courses.find((course) => course.value === value)?.label  
    : "Select course...";
    
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-44 justify-between", triggerClassName)}
            >
              {shownValue}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align={'start'} className={cn("w-fit justify-between h-72", contentClassName)}>
            <Command>
              <CommandInput placeholder="Search course..." />
              <CommandList>
                <CommandEmpty>No course found.</CommandEmpty>
                <CommandGroup>
                { enableSelectAll ? 
                      <CommandItem
                          key='all'
                          value='all'
                          onSelect={(currentValue) => {
                            setValue(value === 'all' ? '' : 'all');
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
                    {courses.map((course) => (
                        <CommandItem
                          key={course.value}
                          value={course.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              (value === course.value || value === 'all') ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {course.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    };
    
export default courseSelection;