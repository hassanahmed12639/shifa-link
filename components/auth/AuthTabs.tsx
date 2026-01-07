"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthMethod = "email" | "phone" | "google";

interface AuthTabsProps {
  onMethodChange: (method: AuthMethod) => void;
  activeMethod: AuthMethod;
}

export function AuthTabs({ onMethodChange, activeMethod }: AuthTabsProps) {
  const methods: { id: AuthMethod; label: string; icon: React.ReactNode }[] = [
    { id: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { id: "phone", label: "Phone", icon: <Phone className="h-4 w-4" /> },
    { id: "google", label: "Google", icon: <Chrome className="h-4 w-4" /> },
  ];

  return (
    <div className="flex gap-2 border-b">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onMethodChange(method.id)}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors border-b-2 -mb-[2px]",
            activeMethod === method.id
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {method.icon}
          <span className="hidden sm:inline">{method.label}</span>
        </button>
      ))}
    </div>
  );
}

