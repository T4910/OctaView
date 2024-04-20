import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import Options from "./timetableOption"
import { useEffect, useState } from "react"
import axios from "axios"
import {Vortex, Triangle} from 'react-loader-spinner'


// const timetables = [1,2,3,4,5]
const serverLink = import.meta.env.VITE_SERVER_LINK

export default function list() {
    const [ timetables, setTimetables ] = useState([])

    useEffect(() => {
        async function fetchInitTimetables(){
            (async () => {
                let response = await gpt.ask("Explain variables in javascript");
                console.log(response); // you got it!
              })();
              
            try {
                const response = await axios.post(`${serverLink}/timetable/get-timetable`, {})

                // console.log(response, 444)
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
        return (
            <div 

                className="w-full p-5 grid place-content-center place-items-center"
            >
                <Triangle
                    visible={true}
                    height="80"
                    width="80"
                    color="#000000"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
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
            : <TableBody>
                <TableRow>
                        <TableCell className="font-medium underline" asChild colSpan={4}>
                            <Loader />
                        </TableCell>

                </TableRow>
            </TableBody>
        }
        </>
    </Table>
  )
}