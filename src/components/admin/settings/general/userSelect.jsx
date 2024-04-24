import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
  } from "@/components/ui/select"
  import { cn } from "@/lib/utils"
  
  
  const daysSelection = ({ className }) => {
    return (
      <Select>
          <SelectTrigger className={cn("justify-between", className)}>
              <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectItem value="4">4 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  
    )
  }

  export default daysSelection