import { Link } from 'react-router-dom'

export default function Component() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground p-8 px-10"
    >
      <Link to="#" className="font-semibold text-primary">
        General
      </Link>
      <Link to="#">Timetable</Link>
      <Link to="#">AI key</Link>
     
    </nav>
  )
}
