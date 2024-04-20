import { Badge } from "@/components/ui/badge"
import Selections from "@/components/selections"

const tableTop = ({mode, showVenue, setLevel, setDepartment}) => {
  return (
     <div className="w-full bg-slate-300 flex p-2 px-4 justify-between items-center md:space-x-6 space-y-4 md:space-y-0 flex-col md:flex-row">
         <div className="flex flex-start w-full md:w-fit space-x-2 md:space-x-4 items-center">
            <h1 className="text-lg font-medium">Chemical Engineering weekly timetable</h1>
            <Badge className="w-fit min-w-fit h-fit">{mode !== 'exam' ? 'Classes' : 'Exam'}</Badge>
         </div>
        <Selections venue={showVenue} setLevel={setLevel} setDepartment={setDepartment}/>
     </div>
  )
}
export default tableTop