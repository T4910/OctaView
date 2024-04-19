import {
    Table, TableBody,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import Options from "./timetableOption"
import { useEffect, useState } from "react"
import axios from "axios"
import details from "../new-timetable-config/details"


// const timetables = [1,2,3,4,5]
const serverLink = import.meta.env.VITE_SERVER_LINK

export default function list() {
    const [ timetables, setTimetables ] = useState([])

    useEffect(() => {
        async function fetchInitTimetables(){
            try {
                const response = await axios.get(`${serverLink}/timetable/get-timetable`, {
                    level: 100,
                    department: 'Computer Science'
                })

                console.log(response)
                if (response?.status === 200) {
                    
                    const cleanedResponse = response?.data?.timetables?.map(({createdAt, type, _id, }) => ({createdAt, type, _id, }))
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

    const Loader = () => {
        return <p>Loading...</p>
    }

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
        <>
        {
            timetables.length > 0 
            ?  (<TableBody>
                    {timetables.map((details, index) => {
                        const date = new Date(details?.createdAt);

                        const parsedDate = date?.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        return <Options 
                            key={index} 
                            id={details?._id}
                            name={details?.name}
                            status={details?.status}
                            createdAt={parsedDate}
                        />})}
                </TableBody>)
            : <Loader />
        }
        </>
    </Table>
  )
}