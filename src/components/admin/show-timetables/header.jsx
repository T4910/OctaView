import {
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"


export default function header() {
  return (
    <CardHeader>
        <CardTitle>Timetables</CardTitle>
        <CardDescription>View & manage timetables here.</CardDescription>
    </CardHeader>
  )
}