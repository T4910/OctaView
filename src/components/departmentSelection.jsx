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

const departmentSelection = ({ contentClassName, triggerClassName, enabled, enableSelectAll, setDepartment, outsideValueState, outsideDepartmentsState }) => { 
    const [open, setOpen] = useState(false);
    const [value, setValue] = outsideValueState??useState(enableSelectAll ? "all" : "");
    const [departments, setDepartments] = outsideDepartmentsState??useState([])
    // Find a way to fix this logic so that department is disabled when everything else is loading ----> console.log(((departments?.length === 0) && (!enabled)), departments?.length === 0, !enabled, 8398238)

    useEffect(() => {
      async function fetchDepartment(){
        console.log('ftetchin...')
          try {
            const response = await axios.post(`${serverLink}/department/get-department`, {})
            
            setDepartments(response?.data?.department)

          } catch (error) {
            console.log('Error fetching the department...', error)
          }
      }
  
      (departments.length === 0) && fetchDepartment();
    }, [])

    const shownValue = value 
    ? ( value === 'all') 
      ? 'All department selected' 
      : departments?.find((department) => department.code === value)?.name  
    : "Select a department...";
    
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("max-w-48 min-w-20 flex justify-between [&>span]:line-clamp-1", triggerClassName)}
              // disabled={(departments?.length === 0)}
            >
              <span style={{pointerEvents: 'none'}}>{shownValue}</span>
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
                      {(departments?.length === 0) ? 'Loading...' : departments?.map((department) => (
                        <CommandItem
                          key={department.code}
                          value={department.code}
                          onSelect={(currentValue) => {
                            console.log(value, currentValue)
                            setValue(currentValue === value ? "" : currentValue);
                            !!setDepartment && setDepartment(currentValue === value ? "" : currentValue);
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