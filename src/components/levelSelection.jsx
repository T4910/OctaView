import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"


const levelSelection = ({ className, enableSelectAll }) => {
  return (
    <Select defaultValue={enableSelectAll ? "all" : ""}>
        <SelectTrigger className={cn("w-44 justify-between", className)}>
            <SelectValue placeholder="Select a level" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {enableSelectAll ? <SelectItem value="all">All Levels</SelectItem> : null}
                <SelectItem value="100">100 Level</SelectItem>
                <SelectItem value="200">200 Level</SelectItem>
                <SelectItem value="300">300 Level</SelectItem>
                <SelectItem value="400">400 Level</SelectItem>
                <SelectItem value="500">500 Level</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>

  )
}
export default levelSelection