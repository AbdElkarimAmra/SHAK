import {Link} from 'react-router-dom'

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
import { FormField } from '@/components/ui/form';
import { Button } from "@/components/ui/button"

export default function Homepage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to SHAK 💸</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        "Do not save what is left after spending, but spend what is left after saving." 
        – Warren Buffett
      </p>
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-gray-500">
            Sign in and start your saving journey
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
