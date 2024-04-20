import { CircleUser, Menu, Package2 } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import Search from '@/components/admin/searchBox'
import NewTimetable from '@/components/admin/newTimetable'
import { cn } from "@/lib/utils"

const links = [
  { 
    href: '',
    url: ['/admin/timetable', '/admin/'],
    value: 'Timetables',
  },
  { 
    href: 'settings',
    value: 'Configurations'
  },
  { 
    href: '#',
    value: 'Issues',
    disabled: true
  },
  { 
    href: '#',
    value: 'History',
    disabled: true
  },
]

const navbar = () => {
    const name = 'Taiwo Emmanuel';
    const location = useLocation()
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {
            links.map(({ href, value, disabled, url }, index) => <Link
              to={`/admin/${href}`}
              key={index}
              children={value}
              className={cn(
                "text-muted-foreground transition-colors hover:text-foreground",
                ((!!location.pathname.includes(href) && href !== '') || url?.includes(location.pathname)) && 'text-foreground',
                disabled && 'opacity-50 hover:text-muted-foreground'
              )}
            />)
          }
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Octagon</span>
              </Link>
              {
                links.map(({ href, value, disabled, url }, index) => <SheetClose asChild><Link
                  to={`/admin/${href}`}
                  key={index}
                  children={value}
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    ((!!location.pathname.includes(href) && href !== '') || url?.includes(location.pathname)) && 'text-foreground',
                    disabled && 'opacity-50 hover:text-muted-foreground'
                  )}
                /></SheetClose>)
              }
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-3 lg:gap-6">
          <Search/>
          <NewTimetable />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Welcome {name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  )
}
export default navbar