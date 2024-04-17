import Levels from "@/components/levelSelection"
import Courses from "@/components/courseSelection"
import Days from "@/components/daysSelection"

const selections = ({ venue }) => {
  return (
    <div className="flex space-x-4">
        { venue ? <Days /> : null}
        <Levels />
        <Courses />
    </div>
  )
}
export default selections