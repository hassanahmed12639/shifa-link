"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

interface PhoneLoginProps {
  onSubmit: (phone: string, method: "sms" | "call") => void;
  isLoading?: boolean;
}

export function PhoneLogin({ onSubmit, isLoading = false }: PhoneLoginProps) {
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"sms" | "call">("sms");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone) {
      onSubmit(phone, method);
    }
  };

  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Format as +92 XXX XXXXXXX
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `+92 ${digits.slice(2)}`;
    if (digits.length <= 12)
      return `+92 ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return `+92 ${digits.slice(2, 5)} ${digits.slice(5, 12)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    setPhone(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+92 300 1234567"
            value={phone}
            onChange={handlePhoneChange}
            className="pl-12 h-12"
            required
            disabled={isLoading}
            maxLength={15}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter your phone number with country code
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Verification Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMethod("sms")}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
              method === "sms"
                ? "border-primary bg-primary/10 text-primary"
                : "border-input hover:border-primary/50"
            }`}
            disabled={isLoading}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium">SMS Code</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod("call")}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
              method === "call"
                ? "border-primary bg-primary/10 text-primary"
                : "border-input hover:border-primary/50"
            }`}
            disabled={isLoading}
          >
            <Phone className="h-5 w-5" />
            <span className="font-medium">Phone Call</span>
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold"
        disabled={isLoading || !phone || phone.length < 10}
      >
        {isLoading
          ? "Sending code..."
          : method === "sms"
          ? "Send SMS Code"
          : "Call Me"}
      </Button>
    </form>
  );
}

