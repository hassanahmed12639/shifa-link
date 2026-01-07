"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { EmailLogin } from "@/components/auth/EmailLogin";
import { PhoneLogin } from "@/components/auth/PhoneLogin";
import { GoogleLogin } from "@/components/auth/GoogleLogin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

type AuthMethod = "email" | "phone" | "google";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [activeMethod, setActiveMethod] = useState<AuthMethod>("email");
  const [error, setError] = useState<string>("");

  const handleEmailLogin = (email: string, password: string) => {
    setError("");
    // Mock authentication - in production, this would call an API
    if (email && password) {
      login({
        id: "1",
        name: email.split("@")[0],
        email,
        method: "email",
      });
      router.push("/");
    } else {
      setError("Please enter email and password");
    }
  };

  const handlePhoneLogin = (phone: string, method: "sms" | "call") => {
    setError("");
    // Mock authentication - in production, this would send OTP
    if (phone) {
      login({
        id: "2",
        name: "User",
        phone,
        method: "phone",
      });
      router.push("/");
    } else {
      setError("Please enter a valid phone number");
    }
  };

  const handleGoogleLogin = () => {
    setError("");
    // Mock Google OAuth - in production, this would use Google OAuth
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
          <p className="text-muted-foreground">Sign in to access emergency services</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                <EmailLogin onSubmit={handleEmailLogin} isLoading={isLoading} />
              )}

              {activeMethod === "phone" && (
                <PhoneLogin onSubmit={handlePhoneLogin} isLoading={isLoading} />
              )}

              {activeMethod === "google" && (
                <GoogleLogin onClick={handleGoogleLogin} isLoading={isLoading} />
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}

