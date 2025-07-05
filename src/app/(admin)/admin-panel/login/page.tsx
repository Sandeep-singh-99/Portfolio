"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React, {useState} from 'react'
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {toast} from "sonner";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false
    });

    if (result?.error) {
      toast.error("Login failed!");
    } else {
      toast.success("Login successful!");
      router.push("/dashboard/intro");
    }
  }



  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='flex items-center justify-center space-x-10 h-screen'>
         <div>
        <Image
          src='/login.svg'
          alt='Admin Login'
          width={250}
          height={500}
          priority
          className='mx-auto mt-10'
        />
      </div>

      <div>
        <Card className='w-[400px] h-[350px]'>
          <CardHeader className=''>
            <CardTitle className='text-4xl font-bold gradient-title'>Admin Login</CardTitle>
            <CardDescription>
              Please enter your credentials to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <Label>Username</Label>
                  <Input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter your username'
                    className='mt-2 mb-4'
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='mt-2 mb-4'
                  />
                </div>
              </div>
              <Button type={"submit"} variant={"destructive"} className='w-full font-semibold text-lg py-2 px-4 rounded'>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
