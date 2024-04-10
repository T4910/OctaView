import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'

const serverLink = import.meta.env.VITE_SERVER_LINK

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const initialFetch = async () => {
      const response = await axios.get(`${serverLink}/`)
      setData(response?.data)
    }

    initialFetch()
  }, [])

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <>
      <div>HOMEPAGE</div>
      <div>{data && <p>{data.message}</p>}</div>
    </>
  )
}

export default App
