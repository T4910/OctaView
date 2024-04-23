import { useState, useEffect, useRef } from 'react'
import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Switch from './switch'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"

import { cn } from "@/lib/utils"

export default function defaults() {
    const currentDate = new Date()
    const [dates, setDates] = useState([...getAcademicYears(currentDate, -7).reverse().slice(0,-1), ...getAcademicYears(currentDate, 5)])

    return (
        <Card>            
            <CardHeader>
                <CardTitle>Defaults</CardTitle>
                <CardDescription>
                    Set default configurations when creating new timetables
                </CardDescription>
            </CardHeader>

                <CardContent className="space-y-2">
                    <div>
                        <Label htmlFor="acadyear">Academic Year</Label>
                        <Select name="acadyear" 
                            defaultValue={computeAcademicYear(currentDate)}
                        >
                            <SelectTrigger>
                                <SelectValue className="capitalize" placeholder="Select year..." />
                            </SelectTrigger>
                            <SelectContent className="max-h-56">
                                <SelectGroup>
                                    {dates.map(date => <SelectItem key={date} value={date}>{date}</SelectItem>)}
                                    <Button     
                                        className="relative bg-transparent justify-start hover:bg-gray-100 p-0 font-normal text-black flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" 
                                        onClick={() => setDates(dates => [...dates.slice(0,-1), ...getAcademicYears(new Date(dates[dates.length - 1].split('/')[1]), 5)])}
                                    ><span>Load More...</span></Button>
                                </SelectGroup>
                            </SelectContent>
                        </Select>                  
                    </div>
                    <div>
                        <Label htmlFor="semester">Semester</Label>
                        <Select 
                            name="semester"
                            defaultValue={isAlpha() ? 'alpha' : 'omega'}    
                        >
                            <SelectTrigger>
                                <SelectValue className="capitalize" placeholder="Select semester..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value='alpha'>Alpha</SelectItem>
                                    <SelectItem value='omega'>Omega</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>                
                    </div>
                <div className="!mt-6">
                    <Switch defaultChecked={true} label="Set to Current"/>
                </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 ">
                    <Button>Save</Button>
                </CardFooter>
        </Card>
    )
}

function computeAcademicYear(input) {
    let year;
    if (input instanceof Date) {
        year = input.getFullYear();
    } else if (typeof input === 'string') {
        year = parseInt(input);
    } else {
        throw new Error("Input must be a Date object or a string representing a year.");
    }

    // Check if the input represents the starting year of the academic year
    let startingYear;
    if (new Date(`${year}-09-01`).getTime() <= input.getTime()) {
        startingYear = year;
    } else {
        startingYear = year - 1;
    }

    // Calculate the academic year range
    const endingYear = startingYear + 1;

    return `${startingYear}/${endingYear}`;
}

// // Example usage:
// // Using Date object
// const currentDate = new Date();
// console.log(computeAcademicYear(currentDate)); // Example output: "2023/2024"

// // Using string representing a year
// console.log(computeAcademicYear("2004")); // Example output: "2004/2005"

function getAcademicYears(startDate, numberOfYears) {
    const academicYears = [];

    for (let i = 0; i < Math.abs(numberOfYears); i++) {
        let currentDate;
        if (numberOfYears < 0) {
            currentDate = new Date(startDate.getFullYear() - i, startDate.getMonth(), startDate.getDate());
        } else {
            currentDate = new Date(startDate.getFullYear() + i, startDate.getMonth(), startDate.getDate());
        }
        const academicYear = computeAcademicYear(currentDate);
        academicYears.push(academicYear);
    }

    return academicYears;
}

// Example usage:
// const startDate = new Date("2020-09-01");
// const numberOfYears = 5;

function isAlpha() {
    const date = new Date(); // Assume it's April 22, 2024
    const month = date.getMonth();
    return month >= 8 && month <= 1; // Months are 0-indexed (0: January, 1: February, ..., 8: September)
}

// // Example usage:
// console.log(isAlpha(currentDate)); // Output: false

