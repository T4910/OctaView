import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import Actions from "./actions"
  

export default function timetableOption({ name, status, createdAt, }) {
  return (
    <TableRow>
        <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
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