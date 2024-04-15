import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

const levelSelection = () => {
  return (
    <Select>
        <SelectTrigger className=" w-32">
            <SelectValue placeholder="Select a level" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
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