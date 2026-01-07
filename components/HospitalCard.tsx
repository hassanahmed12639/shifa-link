"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hospital } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Navigation, Clock } from "lucide-react";
import { DoctorList } from "@/components/DoctorList";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HospitalCardProps {
  hospital: Hospital;
  onCall?: () => void;
  onNavigate?: () => void;
}

export function HospitalCard({ hospital, onCall, onNavigate }: HospitalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const availabilityPercentage = Math.round(
    (hospital.beds.available / hospital.beds.total) * 100
  );

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    
    // Set initial state - ensure card is visible
    gsap.set(card, { opacity: 1, y: 0 });
    
    // Simple fade-in animation without ScrollTrigger for initial load
    // If already in viewport, show immediately
    const rect = card.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isInViewport) {
      // Only animate if not in viewport
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Progress bar animation
    if (progressBarRef.current) {
      const progressBar = progressBarRef.current;
      const finalWidth = `${availabilityPercentage}%`;
      
      if (!isInViewport) {
        gsap.fromTo(progressBar,
          { width: 0 },
          {
            width: finalWidth,
            duration: 1,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        // If in viewport, set width immediately
        gsap.set(progressBar, { width: finalWidth });
      }
    }

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [availabilityPercentage]);

  return (
    <div ref={cardRef}>
      <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-h3 sm:text-h2 font-bold text-foreground mb-1 truncate">
                {hospital.name}
              </h3>
              <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{hospital.area}</span>
              </div>
            </div>
            <StatusBadge status={hospital.status} className="flex-shrink-0" />
          </div>

          {/* Bed Availability */}
          <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-body-sm font-semibold text-foreground">
                Beds Available
              </span>
              <span className="text-h3 font-bold text-primary">
                {hospital.beds.available} / {hospital.beds.total}
              </span>
            </div>
            <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className={`h-full ${
                  hospital.status === "available"
                    ? "bg-success"
                    : hospital.status === "limited"
                    ? "bg-warning"
                    : "bg-danger"
                }`}
                style={{ width: `${availabilityPercentage}%` }}
              />
            </div>
          </div>

          {/* Distance & Last Updated */}
          <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5" />
              <span>{hospital.distance} km</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Updated now</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="text-xs px-2 py-1 bg-secondary rounded-md text-muted-foreground"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Doctors */}
          {hospital.doctors && hospital.doctors.length > 0 && (
            <div className="mb-4">
              <DoctorList doctors={hospital.doctors} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              size="lg"
              className="flex-1 h-12 text-base font-semibold"
              onClick={onCall}
              aria-label={`Call ${hospital.name}`}
            >
              <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
              Call Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 h-12 text-base font-semibold"
              onClick={onNavigate}
              aria-label={`Get directions to ${hospital.name}`}
            >
              <Navigation className="h-5 w-5 mr-2" aria-hidden="true" />
              Directions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

