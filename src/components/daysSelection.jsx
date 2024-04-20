import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
  } from "@/components/ui/select"
  import { cn } from "@/lib/utils"
  
  
  const daysSelection = ({ className }) => {
    return (
      <Select>
          <SelectTrigger className={cn("w-44 justify-between", className)}>
              <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursdy">Thursdy</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                  <SelectItem value="Saturday">Saturday</SelectItem>
                  <SelectItem value="Sunday">Sunday</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  
    )
  }

  export default daysSelection