import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import Actions from "./actions"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"

  

export default function timetableOption({id, status, createdAt, name}) {
    console.log({id, name, createdAt})
  return (
    <TableRow>
        <TableCell className="font-medium underline" asChild>
            <Link to={`/timetable?=${id}`??'#'} className="flex items-center space-x-0.5">
                <span>{name??'Lorem ...'}</span>
                <ExternalLink className="size-3"/>
            </Link>
            </TableCell>
        <TableCell>
            <Badge variant="outline" className="capitalize">{status??'no status'}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{createdAt}</TableCell>
        <TableCell>
            <Actions />
        </TableCell>
    </TableRow>
  )
}