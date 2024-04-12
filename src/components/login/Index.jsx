import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

//! import css
import styles from './Index.module.css'

const serverLink = import.meta.env.VITE_SERVER_LINK

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${serverLink}/login`, { email, password })
            if (response) {
                if (response.status === 200) {
                    if (response.data.role === 'faculty') {
                        navigate('/faculty-timetable')
                    } else if (response.data.role === 'staff') {
                        navigate('/staff-timetable')
                    }
                } else {
                    setError(response.data.message || response)
                }
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            setError(error?.response?.data?.message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit" id={isLoading ? styles.submit : ''} disabled={isLoading}>Login</button>
                {error && <div id={styles.error}>{error}</div>}
            </form>
        </div>
    )
}

export default Login