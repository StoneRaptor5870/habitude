"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, FormEvent  } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      name,
    });

    if (result && result.error) {
      alert(result.error);
    } else if (result) {
      window.location.href = "/dashboard";
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-slate-50 p-6 md:p-12 flex flex-col justify-center items-center">
        <div className="max-w-md mx-auto w-full relative h-64 md:h-80">
          <Image
            src="/habitude.png"
            alt="Habitude"
            layout="fill"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Create an account</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"/>
            </div>
            <Button type="submit" className="w-full" variant="default">
              Sign up
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already a user?{" "}
              <Link href="/signin" className="font-medium text-slate-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
