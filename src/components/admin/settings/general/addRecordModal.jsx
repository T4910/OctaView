import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

  
  export default function AddRecords({children, title, action, name}) {

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button 
            // size="lg" 
            className="h-10 gap-2"
            variant="outline"
        >
            {/***** CHANGE THE ICON ******/}
            <PlusCircle className="size-4" /> 
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add {name}
            </span>
        </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{children}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              // disabled={true}
              onClick={() => {
                !!action && action();
                // reload the page to add the record to the list in the table
                window.location.reload(); 
              }}
            >Add {name}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  