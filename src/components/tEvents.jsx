



const tCourses = ({name, venue, lecturer}) => {
  return (
    <div className="flex flex-col bg-red-100 p-2 size-full ">
      <h1 className="font-semibold">{name}</h1>
      <p className="text-sm">{venue??" "}</p>
      <p>{lecturer??" "}</p>
    </div>
  )
}
export default tCourses