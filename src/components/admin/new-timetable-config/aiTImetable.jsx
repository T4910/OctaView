import Timetable from '../../timetable'
import { Skeleton } from '@/components/ui/skeleton';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


export default function dispalyAITimetable({ schedule }) {

  return (
    <Card className='mt-6 md:via-slate-50 lg:via-white space-y-6'>
      <CardHeader className='flex justify-between items-center space-x-3'>
        <div className="mx-auto grid w-full max-w-6xl gap-1">
            <h1 className="text-2xl font-semibold">
              {(!!schedule?.name)
              ? (schedule?.name??'Timetable Name')
              : <Skeleton className="max-w-64 h-8"/>}
            </h1>
            <div>
                <p className='font-medium text-sm text-muted-foreground'>
                {(!!schedule?.description)
                  ? (schedule?.description??'Timetable Name')
                  : (schedule?.description === "") ? null : <Skeleton className="w-52 h-5"/>}
                </p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Timetable schedule={schedule}/>
      </CardContent>
    </Card>
  )
}
