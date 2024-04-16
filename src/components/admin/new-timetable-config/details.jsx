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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CourseSelection from "@/components/courseSelection"
import LevelSelection from "@/components/levelSelection"




const details = () => {
  return (
        <Card>
          <CardHeader>
            {/* <CardTitle>Store Name</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input placeholder="Timetable Name" name="name"/>
              </div>
              <div>
                <Label htmlFor="Description">Description</Label>
                <Input placeholder="Timetable Description" name="description"/>
              </div>
                <Card>
                <CardHeader>
                    <CardTitle>
                      <h3 className="text-lg">Settings</h3>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                        <Label htmlFor="subcategory">Courses</Label>
                        <CourseSelection className="w-56" enableSelectAll={true}/>
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
            <Button>Create</Button>
          </CardFooter>
        </Card>
      )
}

export default details