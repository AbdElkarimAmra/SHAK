import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SignUp() {

  return (

    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <Card className="w-full max-w-sm shadow-lg border-0 bg-white rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-[#F46B2E]">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Join SHAK and start saving smarter today.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700">
                First Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                required
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-700">
                Last Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                required
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="focus:ring-2 focus:ring-[#F46B2E] focus:border-[#F46B2E]"
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            type="submit" 
            className="w-full bg-[#F46B2E] hover:bg-[#e45e23] text-white font-semibold transition-all"
          >
            Sign Up
          </Button>

          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#F46B2E] font-medium hover:underline"
            >
              Log In
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
