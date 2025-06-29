import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/Index");
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardTitle className="text-center mt-6 text-2xl font-bold flex items-center justify-center flex-col text-gray-900 dark:text-gray-100">
                    <img src="logo-kitawise.png" alt="kitawise logo" className="w-36" />
                    <p className="text-3xl">KitaWise</p>
                </CardTitle>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Financial Dashboard for Freelancers
                </p>

                <CardContent className="mt-6 space-y-6">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Your username"
                                className="bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-100"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                className="bg-white dark:bg-gray-700 dark:placeholder-gray-400 dark:text-gray-100"
                            />
                        </div>

                        <Button type="submit" className="w-full">Login</Button>
                    </form>

                    <section className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700" />
                    </section>

                    <section className="grid gap-2">
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 dark:bg-gray-700 dark:text-gray-100">
                            <img
                                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Continue with Google</span>
                        </Button>
                        <Button variant="outline" className="w-full flex items-center justify-center gap-2 dark:bg-gray-700 dark:text-gray-100">
                            <i className="devicon-facebook-plain colored text-lg"></i>
                            <span>Continue with Facebook</span>
                        </Button>
                    </section>
                </CardContent>

                <CardFooter className="flex flex-row items-center justify-center gap-1 text-sm font-semibold">
                    <p className="text-gray-700 dark:text-gray-300">Don't have an account?</p>
                    <a href="/signup" className="text-slate-600 dark:text-slate-400">Sign Up</a>
                </CardFooter>
            </Card>
        </main>
    );
};

export default Login;
