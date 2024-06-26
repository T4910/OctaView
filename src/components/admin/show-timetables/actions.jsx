import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
// import { deleteTimetable } from '@/lib/dbfunc'
import Confirm from './confirmModal';
import { deleteTimetable, makeCurrent } from '@/lib/dbfunc';


export default function actions({id, current}) {
    console.log(id, current, 223)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={true}>Merge</DropdownMenuItem>
                {current ? null : <Confirm
                    title={`Rollback to Timetable ID: ${id}`}
                    description={`This will make selected timetable current.`}
                    action={() => makeCurrent(id)}
                    refresh={true}
                >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Rollback
                    </DropdownMenuItem>
                </Confirm>}
                <Confirm
                    title={`Delete Timetable ID: ${id}`}
                    description="This action cannot be undone. This will permanently delete this timetable."
                    action={deleteTimetable}
                    redirect="/admin/"
                >
                    <DropdownMenuItem   
                        onSelect={(e) => e.preventDefault()}
                        className="bg-red-100 text-red-700 hover:bg-red-300 hover:text-red-900"
                    >
                        Delete
                    </DropdownMenuItem>
                </Confirm>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}