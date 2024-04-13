import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Error from "@/components/login/_components/error"
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

const serverLink = import.meta.env.VITE_SERVER_LINK

function Login() {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post(`${serverLink}/login`, { email, password })
            if (response?.status === 200) {
                console.log(response, email, password, 34231);
                if (response.data.role === 'faculty') {
                    navigate('/faculty-timetable')
                } else if (response.data.role === 'admin') {
                    navigate('/admin')
                }
            } else {
                setError(response.data.message || response)
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }

        setIsLoading(false);
    }

    /*
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
*/
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    {error ? <Error error={error} /> : null}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            ref={emailRef}
                            id="email" 
                            type="email" 
                            placeholder="firstname.lastname@lmu.edu.ng" 
                            required 
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            ref={passwordRef}
                            id="password" 
                            type="password" 
                            placeholder="********" 
                            required 
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="w-full"
                        disabled={isLoading}
                    >Sign in</Button>
                </CardFooter>
            </form>
        </Card>
  )
}

export default Login