"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Grid,
  ArrowRight,
  ArrowUpRight,
  VolumeX,
  Sun,
  Headphones,
  Check,
} from "lucide-react";
import { cn, formatCurrency, SPACE_TYPES } from "@/lib/utils";
import { api, mediaUrl, Space } from "@/lib/api";

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "desk", label: "Personal Desk" },
  { id: "meeting_room", label: "Meeting Room" },
  { id: "private_office", label: "Private Office" },
];

const LOCATIONS = [
  {
    id: "Jakarta",
    tag: "CAPITAL & FINANCIAL HUB",
    city: "Jakarta",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "Bali",
    tag: "CANGGU & SEMINYAK",
    city: "Bali",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "Bandung",
    tag: "DAGO & HERITAGE HILLS",
    city: "Bandung",
    count: 5,
    image:
      "https://images.unsplash.com/photo-1584278860011-6893e4306356?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "Surabaya",
    tag: "WEST SURABAYA & DARMO",
    city: "Surabaya",
    count: 4,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function CatalogPage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  // Availability Engine State
  const [bookingDate, setBookingDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [startTime, setStartTime] = useState<string>("09:00");
  const [durationHours, setDurationHours] = useState<number>(4);

  useEffect(() => {
    api
      .getSpaces()
      .then(setSpaces)
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const matchCity =
        selectedCity === "all" ||
        (space.kota || "").toLowerCase() === selectedCity.toLowerCase();
      const matchType =
        selectedType === "all" ||
        space.tipe.toLowerCase() === selectedType.toLowerCase();
      return matchCity && matchType;
    });
  }, [spaces, selectedCity, selectedType]);

  const selectCityAndScroll = (city: string) => {
    setSelectedCity(city);
    const el = document.getElementById("explore-spaces");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] font-sans text-[#121212] flex flex-col w-full">
      <main className="flex-grow w-full">
        {/* Hero Editorial Intro & Minimal Availability Engine */}
        <section className="pt-12 md:pt-20 pb-12 px-6 md:px-12 lg:px-16 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-10 md:mb-14"
          >
            <span className="inline-block text-xs uppercase tracking-widest text-[#666666] font-semibold mb-3">
              Curated Architectural Hospitality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-[#121212] mb-4 leading-tight font-bold">
              Spaces designed for deep work &amp; seamless focus
            </h1>
            <p className="text-base md:text-lg text-[#666666] max-w-2xl mx-auto font-sans leading-relaxed">
              Boutique workspaces, private studios, and meeting sanctuaries
              designed with architectural calm.
            </p>
          </motion.div>

          {/* Availability Engine Pill Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white border border-[#EBE7DF] rounded-3xl md:rounded-full p-3 md:p-2 shadow-[0_8px_30px_rgba(18,18,18,0.04)] max-w-5xl mx-auto transition-all duration-300 hover:shadow-[0_12px_40px_rgba(18,18,18,0.07)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#EBE7DF] items-center">
              {/* Datepicker */}
              <div className="lg:col-span-3 px-4 py-3 md:py-2 text-left hover:bg-[#f5f3ef]/50 rounded-2xl md:rounded-l-full transition-colors cursor-pointer">
                <div className="flex items-center gap-2 text-[#666666] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666]">
                    Select Date
                  </span>
                </div>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[#121212] border-none p-0 focus:outline-none w-full cursor-pointer"
                />
              </div>

              {/* Start Time */}
              <div className="lg:col-span-3 px-4 py-3 md:py-2 text-left hover:bg-[#f5f3ef]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 text-[#666666] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666]">
                    Start Time
                  </span>
                </div>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-[#121212] border-none p-0 focus:outline-none w-full cursor-pointer"
                />
              </div>

              {/* Duration */}
              <div className="lg:col-span-2 px-4 py-3 md:py-2 text-left hover:bg-[#f5f3ef]/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 text-[#666666] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666]">
                    Duration
                  </span>
                </div>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="bg-transparent text-sm font-semibold text-[#121212] border-none p-0 focus:outline-none w-full cursor-pointer"
                >
                  <option value={1}>1 Hour</option>
                  <option value={2}>2 Hours</option>
                  <option value={4}>4 Hours</option>
                  <option value={8}>8 Hours</option>
                </select>
              </div>

              {/* Category & CTA Button */}
              <div className="lg:col-span-4 pl-4 pr-1 py-3 md:py-1 flex items-center justify-between gap-3">
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5 text-[#666666] mb-1">
                    <Grid className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#666666]">
                      Category
                    </span>
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-[#121212] border-none p-0 focus:outline-none truncate max-w-[130px] cursor-pointer"
                  >
                    <option value="all">All Sanctuaries</option>
                    <option value="desk">Personal Desk</option>
                    <option value="meeting_room">Meeting Room</option>
                    <option value="private_office">Private Office</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById("explore-spaces");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-[#121212] text-white hover:bg-[#121212]/90 px-6 py-3.5 rounded-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Category Filters & Counter */}
        <section
          id="explore-spaces"
          className="px-6 md:px-12 lg:px-16 w-full mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE7DF] pb-6">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const active = selectedType === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedType(cat.id)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap",
                      active
                        ? "bg-[#121212] text-white shadow-sm"
                        : "bg-transparent border border-[#EBE7DF] text-[#666666] hover:border-[#121212] hover:text-[#121212]",
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Counter */}
            <div className="flex items-center gap-2 text-[#666666] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
              <span>
                Showing {filteredSpaces.length} curated sanctuaries in{" "}
                {selectedCity === "all" ? "Indonesia" : selectedCity}
              </span>
            </div>
          </div>
        </section>

        {/* Catalog Space Grid (Full Viewport Width 3 Columns) */}
        <section className="px-6 md:px-12 lg:px-16 w-full pb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-[#EBE7DF] rounded-2xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : filteredSpaces.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#EBE7DF] rounded-2xl">
              <p className="text-[#666666] text-lg font-serif">
                Belum ada ruangan yang tersedia untuk kategori atau kota ini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpaces.map((space, idx) => (
                <motion.article
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="group bg-white border border-[#EBE7DF] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_10px_30px_rgba(18,18,18,0.06)]"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#efeeea]">
                    <img
                      alt={space.nama_space}
                      src={
                        mediaUrl(space.foto) ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFhzl3cx7M7P6cGIf8VEvsWIbCR85lk4lvreVdB8xBnYjM5MkPtT-ZE3p8MPM03gpIEQ-0SBTQj12d3zsvmBQcEXvVLDVuU8B9aDKWpJuKZuAanm6uM5v8fGSABsQsEC-uuTJhHM_avnnp9NQpzQHJWenROzIEFYtIBYKe_ZkFkx3h9KmQ5dmSFBdn2lTtBnaEajbaTjf_eb1X-kAJitfd_-wE-TJIvGCC2pvpQn0dOIiZJQSlSDYhqA"
                      }
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-white/95 backdrop-blur-sm text-[#121212] border border-[#EBE7DF]">
                        {SPACE_TYPES[space.tipe]} • UP TO {space.kapasitas}{" "}
                        PEOPLE
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Availability Tag */}
                      <div className="mb-2.5 flex items-center">
                        <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-[#4A6B5D] bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D] animate-pulse" />
                          Available
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-serif font-semibold text-[#121212] mb-2 group-hover:text-[#666666] transition-colors">
                        {space.nama_space}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#666666] mb-4 leading-relaxed line-clamp-2">
                        {space.deskripsi}
                      </p>

                      {/* Features Bullet */}
                      <div className="text-xs text-[#666666] mb-6 flex flex-wrap items-center gap-1.5">
                        <span>High-speed WiFi</span>
                        <span>•</span>
                        <span>Ergonomic Chair</span>
                        <span>•</span>
                        <span>Barista Coffee</span>
                      </div>
                    </div>

                    {/* Price & Reserve CTA */}
                    <div className="pt-4 border-t border-[#EBE7DF] flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-bold text-[#121212] font-mono">
                          {formatCurrency(space.harga_per_jam)}
                        </span>
                        <span className="text-xs text-[#666666]"> / jam</span>
                      </div>
                      <button
                        onClick={() => router.push(`/spaces/${space.id}`)}
                        className="bg-[#121212] hover:bg-[#121212]/90 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-transform duration-150 active:scale-95 shadow-sm"
                      >
                        Reserve Space
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>

        {/* EXPLORE LOCATIONS SECTION (Sonder City Grid) */}
        <section
          id="explore-locations"
          className="px-6 md:px-12 lg:px-16 w-full py-16 border-t border-[#EBE7DF]"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#666666] mb-2 block">
                EXPLORE LOCATIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#121212]">
                Find your sanctuary across Indonesia's major hubs
              </h2>
              <p className="text-sm text-[#666666] mt-2">
                Select a city to filter curated sanctuaries and check instant desk &amp; office availability in real-time.
              </p>
            </div>
            <p className="text-xs text-[#666666] flex items-center gap-1 font-medium">
              Click a destination to filter catalogue
            </p>
          </div>

          {/* 4 City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                onClick={() => selectCityAndScroll(loc.city)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#121212] cursor-pointer shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/90 text-[#121212]">
                    {loc.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-2xl font-serif font-bold">{loc.city}</h3>
                    <p className="text-xs text-white/80 mt-0.5">
                      {loc.count} Sanctuaries Available
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#121212] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURAL PRINCIPLES SECTION (3 Columns) */}
        <section className="px-6 md:px-12 lg:px-16 w-full py-16 border-t border-[#EBE7DF]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#efeeea] flex items-center justify-center text-[#121212] shrink-0">
                <VolumeX className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-[#121212] mb-1">
                  Acoustic Precision
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Calibrated architectural absorption panels ensure seamless video calls and uninterrupted deep state focus.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#efeeea] flex items-center justify-center text-[#121212] shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-[#121212] mb-1">
                  Circadian Illumination
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Natural light orientation complemented by warm dimmable 2700K task lighting prevents screen fatigue.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#efeeea] flex items-center justify-center text-[#121212] shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-[#121212] mb-1">
                  On-Demand Concierge
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Instant host assistance via encrypted messaging for specialty dip brews, printing, and presentation gear.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FULL STITCH FOOTER */}
      <footer id="concierge" className="bg-[#FAF8F5] border-t border-[#EBE7DF] py-8 px-6 md:px-12 lg:px-16 text-xs text-[#666666]">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-lg text-[#121212]">
              SMART SPACE
            </span>
            <span>© 2025 WorkMates Hospitality Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <a href="#" className="hover:text-[#121212] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#121212] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#121212] transition-colors">
              Architectural Standards
            </a>
            <a href="#" className="hover:text-[#121212] transition-colors">
              Support
            </a>
            <span className="font-mono text-[#121212] font-semibold">
              +62 811-2345-6789
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}