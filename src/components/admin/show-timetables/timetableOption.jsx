import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import Actions from "./actions"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"

  

export default function timetableOption({id, status, createdAt, name, current}) {
    // console.log({id, name, createdAt})
  return (
    <TableRow>
        <TableCell className="font-medium underline flex" asChild>
            <Link to={`/admin/timetable/${id}`??'#'} className="flex items-center space-x-0.5">
                <span>{name??'Lorem ...'}</span>
                <ExternalLink className="size-3"/>
            </Link>
            {current ? <Badge className="scale-75">current</Badge> : null}
            </TableCell>
        <TableCell>
            <Badge variant="outline" className="capitalize">{status??'no status'}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{createdAt}</TableCell>
        <TableCell>
            <Actions id={id} current={current}/>
        </TableCell>
    </TableRow>
  )
}