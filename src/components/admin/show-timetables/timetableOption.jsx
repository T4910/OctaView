import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import Actions from "./actions"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"

  

export default function timetableOption({src, name, status, createdAt, }) {
  return (
    <TableRow>
        <TableCell className="font-medium underline" asChild>
            <Link to={src??'#'} className="flex items-center space-x-0.5">
                <span>Laser Lemonade Machine</span>
                <ExternalLink className="size-3"/>
            </Link>
            </TableCell>
        <TableCell>
            <Badge variant="outline">Draft</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
        <TableCell>
            <Actions />
        </TableCell>
    </TableRow>
  )
}