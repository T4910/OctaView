import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Component() {
  const [ agree, setAgree ] = useState(false)
  const [ key, setKey ] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Plugin</CardTitle>
        <CardDescription>
          Add your own OpenAi api key for better quality generated timetables.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input 
            placeholder="Enter OpenAI key..." 
            value={key} 
            onChange={({target: {value}}) => {
              setKey(value);
              (value === "") && setAgree(false);
            }}/>
          <div className="flex items-center space-x-2">
            <Checkbox id="include" disabled={(key === "")} checked={agree} onCheckedChange={(value) => setAgree(value)}/>
            <label
              htmlFor="include"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              You're giving us permission to use your OpenAI key to generate timetables for you
            </label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button disabled={!agree}>Save</Button>
      </CardFooter>
    </Card>
  )
}
