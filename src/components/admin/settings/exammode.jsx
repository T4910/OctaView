import Switch from './switch'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { ExternalLink } from "lucide-react"
  import {Button} from "@/components/ui/button"

  import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import PreviewTimetable from "./tpreview"
import { useState, useEffect } from 'react'
import axios from 'axios'

const serverLink = import.meta.env.VITE_SERVER_LINK

export default function exammode() {
    const [ timetableID, setTimetableID ] = useState('')
    const [ timetables, setTimetables ] = useState([])

    useEffect(() => {
        async function fetchInitTimetables(){
            try {
                const response = await axios.post(`${serverLink}/timetable/get-timetable`, {})

                if (response?.status === 200) {
                    
                    const cleanedResponse = response?.data?.timetables?.map(({createdAt, type, _id, name, status, current}) => ({createdAt, type, _id, name, status, current}))
                    // console.log(cleanedResponse, 342)
                    setTimetables(cleanedResponse);
                } else {
                    console.log(response, 342)
                }
                
            } catch (error) {
                
            }
        }

        fetchInitTimetables();
    }, [])

  return (
    <Card>            
        <CardHeader>
            <CardTitle>Exam mode</CardTitle>
            <CardDescription>Enable examination mode for a table and set it as the current.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <Label htmlFor="timetables"className="mb-4">Timetables <PreviewTimetable id={timetableID} disabled={!(!!timetableID)}/></Label>
                {/***** Turn this SELECT component to a COMBOBOX *****/}
                <Select 
                    name="timetables"
                    value={timetableID}
                    onValueChange={(value) => setTimetableID(value)}
                >
                    <SelectTrigger disabled={timetables?.length === 0}>
                        <SelectValue className="capitalize" placeholder="Select timetables..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {timetables?.map(day => {
                                const date = new Date(day.createdAt);
                                return <SelectItem key={day._id} value={day._id} className="">
                                    <span>{`${day.name} created on ${date.toLocaleString()}`}</span>
                                </SelectItem>
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Switch label="Activate examination mode"/>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
        </CardFooter>   
    </Card>
  )
}