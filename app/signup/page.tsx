"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { EmailSignup } from "@/components/auth/EmailSignup";
import { PhoneLogin } from "@/components/auth/PhoneLogin";
import { GoogleLogin } from "@/components/auth/GoogleLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

type AuthMethod = "email" | "phone" | "google";

export default function SignupPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [activeMethod, setActiveMethod] = useState<AuthMethod>("email");
  const [name, setName] = useState("");
  const [error, setError] = useState<string>("");

  const handleEmailSignup = (email: string, password: string) => {
    setError("");
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (email && password) {
      login({
        id: "1",
        name,
        email,
        method: "email",
      });
      router.push("/");
    } else {
      setError("Please fill all fields");
    }
  };

  const handlePhoneSignup = (phone: string, method: "sms" | "call") => {
    setError("");
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (phone) {
      login({
        id: "2",
        name,
        phone,
        method: "phone",
      });
      router.push("/");
    } else {
      setError("Please enter a valid phone number");
    }
  };

  const handleGoogleSignup = () => {
    setError("");
    login({
      id: "3",
      name: "Google User",
      email: "user@gmail.com",
      method: "google",
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 overflow-hidden">
              <Image
                src="/logo.png"
                alt="SHIFA LINK Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">SHIFA LINK</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Choose your preferred sign-up method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 h-12"
                  required
                />
              </div>
            </div>

            <AuthTabs
              activeMethod={activeMethod}
              onMethodChange={setActiveMethod}
            />

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {activeMethod === "email" && (
                <EmailSignup onSubmit={handleEmailSignup} isLoading={isLoading} />
              )}

              {activeMethod === "phone" && (
                <PhoneLogin onSubmit={handlePhoneSignup} isLoading={isLoading} />
              )}

              {activeMethod === "google" && (
                <GoogleLogin onClick={handleGoogleSignup} isLoading={isLoading} />
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}

