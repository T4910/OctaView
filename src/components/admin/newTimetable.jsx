import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"


const newTimetable = () => {
  return (
    <Link to="/admin/new-timetable">
        <Button 
            // size="lg" 
            className="h-10 gap-2"
            variant="outline"
        >
            <PlusCircle className="size-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                New Timetable
            </span>
        </Button>
    </Link>
  )
}
export default newTimetable