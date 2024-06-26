import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"


const levelSelection = ({ className, enabled, enableSelectAll, value, setLevel }) => {
  console.log('levelselect:', enabled)
  return (
    <Select 
      defaultValue={enableSelectAll ? "all" : ""}
      value={value}
      onValueChange={(level) => setLevel(level)}  
    >
        <SelectTrigger 
          className={cn("w-44 justify-between", className)} 
          // disabled={!(!!enabled)}
        >
            <SelectValue placeholder="Select a level" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {enableSelectAll ? <SelectItem value="all"><span className="font-medium">All Levels</span></SelectItem> : null}
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