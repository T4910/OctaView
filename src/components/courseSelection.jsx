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

const courseSelection = ({ courses }) => { 
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-44 justify-between"
            >
              {value
                ? courses.find((course) => course.value === value)?.label
                : "Select course..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" w-44 p-0">
            <Command>
              <CommandInput placeholder="Search course..." />
              <CommandList>
                <CommandEmpty>No course found.</CommandEmpty>
                <CommandGroup>
                    {courses.map((course) => (
                        <CommandItem
                          key={course.value}
                          value={course.value}
                          onSelect={(currentValue) => {
                            console.log(currentValue === value ? "" : currentValue, 9999)
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === course.value ? "opacity-100" : "opacity-0"
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