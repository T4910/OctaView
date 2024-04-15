import Levels from "@/components/levelSelection"
import Courses from "@/components/courseSelection"

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

const selections = () => {
  return (
    <div className="flex space-x-4">
        <Levels />
        <Courses courses={courses}/>
    </div>
  )
}
export default selections