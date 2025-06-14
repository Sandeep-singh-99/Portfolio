import img1 from '../assets/img.jpg';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface FormDataProps {
  username: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormDataProps>({ username: '', password: '' });
  const { login, user } = useAuthStore()
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
       login(formData);
       console.log("Login successful:", user);
       
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
 
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center space-x-8">
        {/* Image Section */}
        <img src={img1} alt="Login" className="w-96 h-96 object-cover rounded-lg" />

        {/* Login Form Section */}
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {/* Email Field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}