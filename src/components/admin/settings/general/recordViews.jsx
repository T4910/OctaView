import { Input } from "@/components/ui/input"
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddRecord from "./addNewRecords"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'

const serverLink = import.meta.env.VITE_SERVER_LINK

const views = [ 'Courses', 'Departments' ]

// const courses = [
//   {
//     'id': '0001',
//     'code': 'AGS1',
//     'title': 'AGS',
//   },
//   {
//     'id': '0002',
//     'code': 'AGS2',
//     'title': 'AGS',
//   },
//   {
//     'id': '0003',
//     'code': 'AGS3',
//     'title': 'AGS',
//   },
// ]

// const department = [
//   {
//     'id': '0001',
//     'code': 'IUY1',
//     'title': 'IUY',
//   },
//   {
//     'id': '0002',
//     'code': 'IUY2',
//     'title': 'IUY',
//   },
//   {
//     'id': '0003',
//     'code': 'IUY3',
//     'title': 'IUY',
//   },
// ]

// const fetchDoc = (items) => views2.map((item) => {
//   // Assuming each item is an object with a 'text' property
//   // console.log(item.courses.text)
// });

const cresponse = await axios.post(`${serverLink}/course/get-course`, {})
const dresponse = await axios.post(`${serverLink}/department/get-department`, {})
const vresponse = await axios.post(`${serverLink}/venue/get-venue`, {})

let viewsGotten = {
  coursesData: parseCourses(cresponse?.data?.courses),
  departmentsData: parseDepartments(dresponse?.data?.department),
  venuesData: vresponse?.data?.venue,
}



const coursesData = viewsGotten?.coursesData??[]
const departmentsData = viewsGotten?.departmentsData??[]
// const coursesData = [
//   {
//     id: "m5gr84i9",
//     code: 'CSC 222',
//     title: "Computer Hardware",
//     department: "Computer Science",
//   },
//   {
//     id: "3u1reuv4",
//     code: 'CSC 224',
//     title: "Database",
//     department: "Computer Science",
//   },
//   {
//     id: "derv1ws0",
//     code: 'CSC 221',
//     title: "OOP C#",
//     department: "Computer Science",
//   },
//   {
//     id: "5kma53ae",
//     code: 'MOS 221',
//     title: "Microsoft Office",
//     department: "Mathematics",
//   },
//   {
//     id: "bhqecj4p",
//     code: 'GST 221',
//     title: "Peace & Conflict",
//     department: "University Wide",
//   },
// ]

// const departmentsData = [
//   {
//     id: "m5gr84i9",
//     years: 4,
//     name: "Computer Science",
//     code: 'CSC',
//   },
//   {
//     id: "3u1reuv4",
//     years: 4,
//     name: "Mathematics",
//     code: "MAT",
//   },
//   {
//     id: "derv1ws0",
//     years: 5,
//     name: "Electrical Engineering",
//     code: "EIE",
//   },
//   {
//     id: "5kma53ae",
//     years: 4,
//     name: "Mass Communication",
//     code: "MCM",
//   },
//   {
//     id: "bhqecj4p",
//     years: 4,
//     name: "International Relations",
//     code: "IRL",
//   },
// ]

export const coursesColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("department")}</div>,
  },
  {
    // accessorKey: "code",
    // header: () => <div className="text-right">code</div>,
    // cell: ({ row }) => {
    //   const code = parseFloat(row.getValue("code"))

    //   // Format the code as a dollar code
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(code)

    //   return <div className="text-right font-medium">{formatted}</div>
    // },
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Code
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update course</DropdownMenuItem>
            <DropdownMenuItem>Delete course</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export const departmentsColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
  },
  {
    // accessorKey: "code",
    // header: () => <div className="text-right">code</div>,
    // cell: ({ row }) => {
    //   const code = parseFloat(row.getValue("code"))

    //   // Format the code as a dollar code
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(code)

    //   return <div className="text-right font-medium">{formatted}</div>
    // },
    accessorKey: "years",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Course Years
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("years")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update department</DropdownMenuItem>
            <DropdownMenuItem>Delete department</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

console.log(viewsGotten, 2222222222)

export default function DataTableDemo() {
  const [select, setSelect] = React.useState('Courses')
  const [data, setData] = React.useState([])
  const [columns, setColumns] = React.useState([])
  React.useEffect(() => {
    if (select === 'Courses') {
      setData(coursesData)
      setColumns(coursesColumns)
    } else if (select === 'Departments') {
      setData(departmentsData)
      setColumns(departmentsColumns)
    }
  }, [select])
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // console.log('ain slecet', select)

  return (
    <div className="w-full">
      <div className="flex justify-between space-x-6 items-center py-4">
        <Input
          placeholder={`Filter ${select}...`}
          value={(table.getColumn(select === 'Courses' ? "title" : "name")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn(select === 'Courses' ? "title" : "name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex space-x-4">
          <AddRecord name={select.toLowerCase()} />
          <Select
          value={select}
          onValueChange={setSelect}
        >
          <SelectTrigger className="">
            <SelectValue
              className="capitalize"
              placeholder="Select a record..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {views
                .map((items, index) => {
                  return (
                    <SelectItem
                      key={index}
                      className="capitalize"
                      value={items}
                    >
                      {items}
                    </SelectItem>
                  )
                })}
              {/* <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem> */}
            </SelectGroup>
          </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


function parseCourses(response) {
  const parsedData = response.map(course => {
    return {
      id: Math.random().toString(36).substring(2, 8), // Generate random ID
      code: course.code,
      title: course.title,
      department: course.departmentId.name
    };
  });

  return parsedData;
}

function parseDepartments(response) {
  const parsedData = response.map(department => {
    return {
      id: Math.random().toString(36).substring(2, 8), // Generate random ID
      years: department.years || 4, // Assuming default years is 4
      name: department.name,
      code: department.code.toUpperCase() // Convert code to uppercase
    };
  });

  return parsedData;
}
