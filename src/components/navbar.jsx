import { Link } from "react-router-dom"

const navbar = () => {
  return (
    <div className="flex justify-between p-2 px-4">
        <h1 className="text-xl font-semibold">Landmark University Timetable</h1>
        <nav className="flex flex-end">
            <Link className=" underline hover:text-green-900" to='/login'>Login as Faculty/Staff</Link>
        </nav>
    </div>
  )
}
export default navbar