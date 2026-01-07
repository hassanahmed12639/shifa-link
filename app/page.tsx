"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hospital, BedStatus, mockHospitals } from "@/lib/mock-data";
import { HospitalCard } from "@/components/HospitalCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { MapPin, User, LogOut, LogIn } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BedStatus | "all">("all");
  const headerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation - ensure it starts visible
    if (headerRef.current) {
      gsap.set(headerRef.current.children, { opacity: 1, y: 0 });
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }

    // Stats animation - ensure it starts visible
    if (statsRef.current) {
      gsap.set(statsRef.current.children, { opacity: 1, scale: 1 });
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
          stagger: 0.1,
          delay: 0.2,
        }
      );
    }

    // Search bar animation - ensure it starts visible
    if (searchRef.current) {
      gsap.set(searchRef.current, { opacity: 1, y: 0 });
      gsap.fromTo(searchRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  const filteredHospitals = useMemo(() => {
    return mockHospitals.filter((hospital) => {
      const matchesSearch =
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || hospital.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const handleCall = (hospital: Hospital) => {
    window.location.href = `tel:${hospital.phone.replace(/\s/g, "")}`;
  };

  const handleNavigate = (hospital: Hospital) => {
    // In production, this would open maps
    const query = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  // Sort by: available first, then by distance
  const sortedHospitals = useMemo(() => {
    return [...filteredHospitals].sort((a, b) => {
      if (a.status === "available" && b.status !== "available") return -1;
      if (a.status !== "available" && b.status === "available") return 1;
      if (a.status === "limited" && b.status === "full") return -1;
      if (a.status === "full" && b.status === "limited") return 1;
      return a.distance - b.distance;
    });
  }, [filteredHospitals]);

  const availableCount = mockHospitals.filter(
    (h) => h.status === "available"
  ).length;
  const limitedCount = mockHospitals.filter((h) => h.status === "limited").length;
  const fullCount = mockHospitals.filter((h) => h.status === "full").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header ref={headerRef} className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="SHIFA LINK Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-h2 sm:text-h1 text-foreground">
                  SHIFA LINK
                </h1>
                <p className="text-body-sm sm:text-body text-muted-foreground">
                  Emergency Bed Availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium hidden sm:inline">Karachi</span>
              </div>
              <ThemeToggle />
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-primary hidden sm:inline">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-6" role="main">
        {/* Stats Bar */}
        <div ref={statsRef} className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-success/10 border-2 border-success/20 rounded-lg p-4 text-center">
            <div className="text-h2 font-bold text-success">{availableCount}</div>
            <div className="text-caption text-muted-foreground mt-1">Available</div>
          </div>
          <div className="bg-warning/10 border-2 border-warning/20 rounded-lg p-4 text-center">
            <div className="text-h2 font-bold text-warning">{limitedCount}</div>
            <div className="text-caption text-muted-foreground mt-1">Limited</div>
          </div>
          <div className="bg-danger/10 border-2 border-danger/20 rounded-lg p-4 text-center">
            <div className="text-h2 font-bold text-danger">{fullCount}</div>
            <div className="text-caption text-muted-foreground mt-1">Full</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div ref={searchRef} className="space-y-4 mb-6">
          <SearchBar onSearch={setSearchQuery} />
          <FilterBar
            selectedStatus={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {sortedHospitals.length === 0
              ? "No hospitals found"
              : `Found ${sortedHospitals.length} hospital${
                  sortedHospitals.length !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        {/* Hospital List */}
        <div className="space-y-4">
          {sortedHospitals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No hospitals match your search criteria
              </p>
            </div>
          ) : (
            sortedHospitals.map((hospital) => (
              <div key={hospital.id}>
                <HospitalCard
                  hospital={hospital}
                  onCall={() => handleCall(hospital)}
                  onNavigate={() => handleNavigate(hospital)}
                />
              </div>
            ))
          )}
        </div>
      </main>


      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 mt-12 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong className="text-foreground">SHIFA LINK</strong> - Pakistan&#39;s first real-time emergency hospital bed availability platform
          </p>
          <p className="text-xs">
            This is a UI/UX prototype. Data is for demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}

