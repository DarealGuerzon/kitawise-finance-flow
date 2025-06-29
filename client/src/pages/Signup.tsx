import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/Index");
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                
                <CardTitle className="text-center mt-6 text-2xl font-bold flex items-center justify-center flex-col">
                    <img src="kitawise-icon.png" alt="kitawise logo" className="w-36" />
                    <p className="text-3xl">KitaWise</p>
                </CardTitle>
                
                <p className="text-center text-sm text-gray-500 mt-1">Create your account</p>

                <CardContent className="mt-6 space-y-6">

                    <form className="space-y-4" onSubmit={handleSignup}>
                        <section className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="Choose a username" />
                        </section>

                        <section className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                        </section>

                        <section className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="********" />
                        </section>

                        <section className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" placeholder="********" />
                        </section>

                        <Button type="submit" className="w-full">
                        Sign Up
                        </Button>
                    </form>

                    <section className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-300" />
                            <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </section>

                    <section className="grid gap-2">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2" >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
                            <span>Sign up with Google</span>
                        </Button>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2" >
                            <i className="devicon-facebook-plain colored text-lg"></i>
                            <span>Sign up with Facebook</span>
                        </Button>
                    </section>
                    
                </CardContent>

                <CardFooter className="flex flex-row items-center justify-center gap-1 text-sm font-semibold">
                    <p>Already have an account?</p>
                    <a href="/" className="text-slate-600">Log In</a>
                </CardFooter>

            </Card>

        </main>
  );
};

export default Signup;
