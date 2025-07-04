import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='flex items-center justify-center space-x-10 h-screen'>
         <div>
        <Image
          src='login.svg'
          alt='Admin Login'
          width={250}
          height={500}
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
            <form>
              <div>
                <div>
                  <Label>Username</Label>
                  <Input
                    type='text'
                    placeholder='Enter your username'
                    className='mt-2 mb-4'
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    className='mt-2 mb-4'
                  />
                </div>
              </div>
              <Button className='w-full font-semibold text-xl py-2 px-4 rounded'>
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
