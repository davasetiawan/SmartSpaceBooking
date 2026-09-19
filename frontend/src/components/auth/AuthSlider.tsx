"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface SpaceSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const USER_SLIDES: SpaceSlide[] = [
  {
    id: "sanctuary-suite",
    title: "The Sanctuary Suite",
    description:
      "Curated workspaces designed for clarity and deep focus, bathed in natural morning light.",
    imageUrl: "/images/slider/slide-1.jpg",
  },
  {
    id: "horizon-pavilion",
    title: "The Horizon Pavilion",
    description:
      "Double-height warm oak lounge featuring an artisanal espresso bar, fireplace, and plush bouclé seating.",
    imageUrl: "/images/slider/slide-2.jpg",
  },
  {
    id: "solitude-niche",
    title: "Solitude Niche",
    description:
      "Curved acoustic timber booth engineered for high-stakes calls, private reflection, and deep focus.",
    imageUrl: "/images/slider/slide-3.jpg",
  },
  {
    id: "botanical-conservatory",
    title: "Botanical Conservatory",
    description:
      "Sunlit glass-roof atrium with communal oak dining tables, biophilic olive trees, and rattan armchairs.",
    imageUrl: "/images/slider/slide-4.jpg",
  },
  {
    id: "oakwood-library",
    title: "The Oakwood Library",
    description:
      "Floor-to-ceiling timber bookshelves, arched windows, and Scandinavian curved couches for creative study.",
    imageUrl: "/images/slider/slide-5.jpg",
  },
];

export function AuthSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % USER_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const currentSlide = USER_SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % USER_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + USER_SLIDES.length) % USER_SLIDES.length);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] lg:min-h-screen overflow-hidden bg-[#f4f2eb] select-none text-white">
      {/* Background Image Slider (100% Bright, Natural Colors, No Dark Overlays) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls Top Right */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/30 hover:bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs text-white">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="p-1 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setIsAutoplay(!isAutoplay)}
          aria-label="Toggle Autoplay"
          className="p-1 hover:text-white transition-colors"
        >
          {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="p-1 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Overlay Showcase (Clean Text Drop Shadow, No Dark Background Box) */}
      <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col justify-end space-y-4">
        {/* Category Pill Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + "-badge"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            
          >
           
            
          </motion.div>
        </AnimatePresence>

        {/* Title (Vibrant white text with sharp drop shadow so it stands out against warm backgrounds without darkening the photo) */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentSlide.id + "-title"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-normal text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
          >
            {currentSlide.title}
          </motion.h1>
        </AnimatePresence>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide.id + "-desc"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-white max-w-md font-medium leading-relaxed drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.6)]"
          >
            {currentSlide.description}
          </motion.p>
        </AnimatePresence>

        {/* Slide Progress Indicators */}
        <div className="pt-2 flex items-center gap-2">
          {USER_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className="relative h-1.5 rounded-full transition-all duration-300 overflow-hidden bg-white/40 hover:bg-white/70 shadow-sm"
              style={{ width: idx === currentIndex ? "40px" : "12px" }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {idx === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{
                    duration: isAutoplay ? 5.5 : 0.3,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
