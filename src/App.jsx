import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const initialFetch = async () => {
      const response = await axios.post('http://localhost:8080/')
      setData(response)
    }

    initialFetch()
  })

  if (!data) {
    return <div>loading</div>
  }

  return (
    <>
      <div>HOMEPAGE</div>
      <div>{data && <p>data</p>}</div>
    </>
  )
}

export default App
