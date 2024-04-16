import { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Error from "@/components/login/error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"

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
            const response = await axios.post(`${serverLink}/user/login`, { email, password })
            if (response?.status === 200) {
                console.log(response, email, password, 34231);
                if (response.data.role === 'faculty') {
                    navigate('/faculty')
                } else if (response.data.role === 'admin') {
                    navigate('/admin')
                } else if (response.data.role === 'student') {
                    navigate('/')
                }
            } else {
                setError(response.data.message || response)
            }
        } catch (error) {
            setError(error?.response?.data?.message);
        }

        setIsLoading(false);
    }

    return (
        <Card className="max-w-sm mx-auto mt-32">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                Enter your school email below to login.
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