"use client";

import { Button } from "@/components/ui/button";
import { Phone, AlertTriangle } from "lucide-react";

export function EmergencyCTA() {
  const handleEmergencyCall = () => {
    // In production, this would trigger a call
    window.location.href = "tel:1122";
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:right-4 sm:w-auto sm:max-w-sm">
      <Button
        variant="emergency"
        size="lg"
        className="w-full h-16 text-lg font-bold shadow-2xl shadow-danger/50 animate-pulse"
        onClick={handleEmergencyCall}
        aria-label="Emergency call button - Call 1122"
      >
        <AlertTriangle className="h-6 w-6 mr-2" aria-hidden="true" />
        <span>EMERGENCY: Call 1122</span>
        <Phone className="h-6 w-6 ml-2" aria-hidden="true" />
      </Button>
    </div>
  );
}

