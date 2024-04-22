import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
  
  import Header from "./header"
  import List from './list'
  
  export default function Component() {
    return (
      <Card className="border-none shadow-none rounded-none">
          <Header />
          <CardContent>
              <List />
          </CardContent>
          <CardFooter>
            {/* pagination property */}
              <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
              Load more...
          </CardFooter>
      </Card>
    )
  }
  