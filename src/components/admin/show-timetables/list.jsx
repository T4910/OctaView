import {
    Table, TableBody,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import Options from "./timetableOption"


const timetables = [1,2,3,4,5]

export default function list() {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {timetables.map(() => <Options />)}
        </TableBody>
    </Table>
  )
}