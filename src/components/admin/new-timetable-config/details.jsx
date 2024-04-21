import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import DepartmentSelection from "@/components/departmentSelection"
import LevelSelection from "@/components/levelSelection"
import Create from "@/components/admin/new-timetable-config/createTimetableBtn"
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'



const details = ({ setSchedule }) => {
  const nameRef = useRef(null)
  const descriptionRef = useRef(null)


  return (
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  required 
                  ref={nameRef}
                  placeholder="Timetable Name" 
                  name="name"/>
              </div>
              <div>
                <Label htmlFor="Description">Description</Label>
                <Input required ref={descriptionRef} placeholder="Timetable Description" name="description"/>
              </div>
                <Card>
                <CardHeader>
                    <CardTitle>
                      <h3 className="text-lg">Settings</h3>
                    </CardTitle>
                </CardHeader>
                <CardContent >
                    <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                        <Label htmlFor="subcategory">Courses</Label>
                        <DepartmentSelection 
                          triggerClassName="w-56"
                          contentClassName="w-fit" 
                          enableSelectAll={true}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="subcategory">Level</Label>
                        <LevelSelection className="w-56" enableSelectAll={true}/>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </form>

          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Create setSchedule={setSchedule} details={{
              name: nameRef?.current?.value,
              description: descriptionRef?.current?.value
            }}/>
          </CardFooter>
        </Card>
      )
}

export default details