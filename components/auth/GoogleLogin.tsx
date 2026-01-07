"use client";

import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

interface GoogleLoginProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function GoogleLogin({ onClick, isLoading = false }: GoogleLoginProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full h-12 text-base font-semibold border-2 hover:bg-secondary"
      onClick={onClick}
      disabled={isLoading}
    >
      <Chrome className="h-5 w-5 mr-2" />
      {isLoading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}

