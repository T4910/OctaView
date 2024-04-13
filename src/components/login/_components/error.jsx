import { Button } from "@/components/ui/button"
import { useState } from "react"

const Error = ({ error }) => {
    const [hide, setHidden] = useState(false)
    return (
        !hide ? <div className={`bg-red-500 flex rounded-md p-2 px-4 w-full text-xs`}>
            <p className="flex-grow">{error}</p>
            <Button 
                className="px-1 py-0 flex-shrink"
                onClick={() => setHidden(true)}
            >X</Button>
        </div> : null
    )
}
export default Error