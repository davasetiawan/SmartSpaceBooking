'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Users, 
  Sparkles, 
  Calendar
} from 'lucide-react';
import { api, Ruangan } from '@/services/api';
import { SpaceCard } from '@/components/common/SpaceCard';

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
    caption: 'Sonder Grand Suite — Meeting Lounge'
  },
  {
    url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=80',
    caption: 'Urban Loft — Hot Desk Zone'
  },
  {
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
    caption: 'Executive Suite 101'
  },
  {
    url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1400&q=80',
    caption: 'Artisan Coffee Lounge'
  }
];

export default function HomePage() {
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [activeIntent, setActiveIntent] = useState<string>('all');
  const [activeCityTab, setActiveCityTab] = useState<string>('ALL');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [searchLokasi, setSearchLokasi] = useState('');
  const [searchTanggal, setSearchTanggal] = useState('');
  const [searchKapasitas, setSearchKapasitas] = useState('1');
  const router = useRouter();

  useEffect(() => {
    api.getRuangan().then((data) => setRuanganList(data));

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/ruangan?lokasi=${searchLokasi}&kapasitas=${searchKapasitas}`);
  };

  const filteredRuangan = activeCityTab === 'ALL' 
    ? ruanganList 
    : (activeCityTab === 'MEETING' 
        ? ruanganList.filter(r => r.tipe === 'MEETING_ROOM')
        : activeCityTab === 'DESK' 
        ? ruanganList.filter(r => r.tipe === 'COWORKING_DESK')
        : activeCityTab === 'OFFICE'
        ? ruanganList.filter(r => r.tipe === 'PRIVATE_OFFICE')
        : ruanganList);

  return (
    <div className="sd-home-page">
      {/* 1. SONDER HERO SECTION */}
      <section className="sd-hero-section" id="sd-hero-section">
        <div className="sd-hero-container">
          <div className="sd-hero-content">
            <div className="hs-eyebrow">
              <span className="bar"></span>
              <span className="lbl">A curated urban stay & workspace by Sonder</span>
            </div>

            <p className="sd-hero-sub-heading">
              That feeling when you sit down to work <em className="font-serif italic">after a great cup of coffee.</em>
            </p>

            <h1 className="sd-hero-heading font-serif">
              Boutique Workspaces & Urban Suites in the World's Best Locations, Curated by Sonder
            </h1>

            <div className="sd-hero-logos">
              <span className="brand-tag">BOOKING.COM</span>
              <span className="brand-dot">•</span>
              <span className="brand-tag">EXPEDIA</span>
              <span className="brand-dot">•</span>
              <span className="brand-tag">VRBO</span>
              <span className="brand-dot">•</span>
              <span className="brand-tag">TRAVELOKA</span>
              <span className="brand-dot">•</span>
              <span className="brand-tag">FORBES</span>
            </div>

            <div className="sd-hero-intent" role="group" aria-label="What are you looking for">
              <div className="sd-hero-intent-opts">
                <button 
                  type="button" 
                  className={`sd-hero-pill ${activeIntent === 'desk' ? 'on' : ''}`}
                  onClick={() => setActiveIntent('desk')}
                >
                  Hot Desks
                </button>
                <button 
                  type="button" 
                  className={`sd-hero-pill ${activeIntent === 'meeting' ? 'on' : ''}`}
                  onClick={() => setActiveIntent('meeting')}
                >
                  Meeting Rooms
                </button>
                <button 
                  type="button" 
                  className={`sd-hero-pill ${activeIntent === 'office' ? 'on' : ''}`}
                  onClick={() => setActiveIntent('office')}
                >
                  Private Suites
                </button>
                <button 
                  type="button" 
                  className={`sd-hero-pill ${activeIntent === 'all' ? 'on' : ''}`}
                  onClick={() => setActiveIntent('all')}
                >
                  Both
                </button>
              </div>
            </div>

            <div className="sd-search">
              <form onSubmit={handleSearchSubmit} className="property-search layout-horizontal-bar">
                <div className="ps-input-col">
                  <span className="ps-label"><MapPin size={13} /> Location</span>
                  <input 
                    type="text" 
                    className="autocomplete-input" 
                    placeholder="Where are you headed? (e.g. SCBD, Jakarta)"
                    value={searchLokasi}
                    onChange={(e) => setSearchLokasi(e.target.value)}
                  />
                </div>

                <div className="ps-divider"></div>

                <div className="ps-input-col">
                  <span className="ps-label"><Calendar size={13} /> Date & Time</span>
                  <input 
                    type="date" 
                    className="autocomplete-input"
                    value={searchTanggal}
                    onChange={(e) => setSearchTanggal(e.target.value)}
                  />
                </div>

                <div className="ps-divider"></div>

                <div className="ps-input-col">
                  <span className="ps-label"><Users size={13} /> Guests</span>
                  <select 
                    className="autocomplete-input select-clean"
                    value={searchKapasitas}
                    onChange={(e) => setSearchKapasitas(e.target.value)}
                  >
                    <option value="1">1 Person (Desk)</option>
                    <option value="4">4–6 Persons (Small Team)</option>
                    <option value="12">10–15 Persons (Boardroom)</option>
                    <option value="50">50+ Persons (Auditorium)</option>
                  </select>
                </div>

                <div className="btn-wrap">
                  <button type="submit" className="search-submit-btn">
                    <Search size={16} />
                    <span className="txt">Search Stays</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="sd-hero-slider">
            <div className="slider-wrapper">
              <img 
                src={HERO_SLIDES[currentSlideIndex].url} 
                alt={HERO_SLIDES[currentSlideIndex].caption} 
                className="slide-image"
              />
              <div className="slide-overlay">
                <span className="slide-badge"><Sparkles size={12} /> Featured Sonder Property</span>
                <p className="slide-caption">{HERO_SLIDES[currentSlideIndex].caption}</p>
              </div>

              <div className="slider-dots">
                {HERO_SLIDES.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`slider-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNER LOGOS MARQUEE */}
      <section className="sd-partner-logos" id="sd-partner-logos">
        <div className="sd-partner-logos-wrap">
          <span className="marquee-item">BOOKING.COM</span>
          <span className="marquee-item">EXPEDIA GROUP</span>
          <span className="marquee-item">VRBO</span>
          <span className="marquee-item">WEWORK SUITES</span>
          <span className="marquee-item">TRAVELOKA</span>
          <span className="marquee-item">FORBES TRAVEL</span>
          <span className="marquee-item">CASAI</span>
          <span className="marquee-item">HOTALA</span>
          <span className="marquee-item">BOOKING.COM</span>
          <span className="marquee-item">EXPEDIA GROUP</span>
          <span className="marquee-item">VRBO</span>
        </div>
      </section>

      {/* 3. HOT THIS WEEK / FEATURED SPACES TAB SECTION */}
      <section className="sd-home-tab" id="sd-home-tab">
        <div className="sd-container">
          <div className="why-head">
            <span className="sd-eyebrow">Hot this week</span>
            <h2 className="why-title font-serif">
              Boutique space stays worth the <em className="italic font-normal">weekend.</em>
            </h2>
          </div>

          <div className="tab-component">
            <div className="tab-container-wrap">
              <ul className="tab-opts">
                <li 
                  className={`tab-opt ${activeCityTab === 'ALL' ? 'active' : ''}`}
                  onClick={() => setActiveCityTab('ALL')}
                >
                  All Spaces
                </li>
                <li 
                  className={`tab-opt ${activeCityTab === 'MEETING' ? 'active' : ''}`}
                  onClick={() => setActiveCityTab('MEETING')}
                >
                  Meeting Rooms
                </li>
                <li 
                  className={`tab-opt ${activeCityTab === 'DESK' ? 'active' : ''}`}
                  onClick={() => setActiveCityTab('DESK')}
                >
                  Hot Desks
                </li>
                <li 
                  className={`tab-opt ${activeCityTab === 'OFFICE' ? 'active' : ''}`}
                  onClick={() => setActiveCityTab('OFFICE')}
                >
                  Private Office
                </li>
              </ul>

              <Link href="/ruangan" className="stay-viewall">
                View all stays &rarr;
              </Link>
            </div>

            <div className="tiles-wrapper-grid">
              {filteredRuangan.map((ruangan) => (
                <SpaceCard key={ruangan.id} ruangan={ruangan} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SONDER VALUE PROPOSITION EDITORIAL SECTION */}
      <section className="sd-editorial-section">
        <div className="sd-container">
          <div className="editorial-head text-center">
            <span className="sd-eyebrow">The Sonder Difference</span>
            <h2 className="font-serif section-title">Designed for Work, Crafted for Comfort</h2>
            <p className="section-sub-desc">
              Every Sonder location is hand-vetted for architectural design, high-speed fiber connectivity, and premium soundproofing.
            </p>
          </div>

          <div className="editorial-grid">
            <div className="editorial-card">
              <div className="card-media">
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" 
                  alt="Seamless Digital Check-In" 
                />
              </div>
              <div className="card-content">
                <div className="card-tag">DIGITAL ACCESS</div>
                <h3 className="font-serif card-h">Keyless Mobile Entry & QR Scanner</h3>
                <p className="card-p">
                  Bypass reception queues. Unlock doors and check in instantly using your personal E-Ticket QR Code.
                </p>
              </div>
            </div>

            <div className="editorial-card">
              <div className="card-media">
                <img 
                  src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80" 
                  alt="High-Speed Wi-Fi Uptime" 
                />
              </div>
              <div className="card-content">
                <div className="card-tag">CONNECTIVITY</div>
                <h3 className="font-serif card-h">Dedicated 500Mbps Fiber Wi-Fi</h3>
                <p className="card-p">
                  Enterprise-grade security and dual backup lines guarantee 99.9% uptime for video conferences.
                </p>
              </div>
            </div>

            <div className="editorial-card">
              <div className="card-media">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" 
                  alt="Artisan Hospitality" 
                />
              </div>
              <div className="card-content">
                <div className="card-tag">HOSPITALITY</div>
                <h3 className="font-serif card-h">Free Flow Artisan Coffee & Lounge</h3>
                <p className="card-p">
                  Enjoy complimentary single-origin espresso, herbal teas, and acoustic quiet pods throughout the day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SONDER JOURNAL / STORIES */}
      <section className="sd-journal-section">
        <div className="sd-container">
          <div className="journal-banner">
            <div className="banner-left">
              <span className="sd-eyebrow">Sonder Journal</span>
              <h2 className="font-serif banner-title">Where to Work & Stay in New York, London, and Jakarta</h2>
              <p className="banner-desc">Curated guides to the best neighborhoods, coffee spots, and workspace hidden gems.</p>
              <Link href="/ruangan" className="btn-journal">
                Explore City Guides &rarr;
              </Link>
            </div>
            <div className="banner-right">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80" 
                alt="Journal Sonder" 
                className="banner-img"
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .sd-home-page {
          background-color: #FAFAF7;
          color: #1A1A1A;
          overflow-x: hidden;
        }

        .sd-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .sd-hero-section {
          padding: 3.5rem 1.5rem 4rem 1.5rem;
          background: linear-gradient(180deg, #F5F0EB 0%, #FAFAF7 100%);
        }
        .sd-hero-container {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
          align-items: center;
        }

        .hs-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .hs-eyebrow .bar {
          width: 32px;
          height: 2px;
          background: #C9A96E;
        }
        .hs-eyebrow .lbl {
          font-size: 0.775rem;
          font-weight: 800;
          color: #C9A96E;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sd-hero-sub-heading {
          font-size: 1.2rem;
          color: #4A4A4A;
          margin-bottom: 0.5rem;
        }

        .sd-hero-heading {
          font-size: 3.1rem;
          line-height: 1.15;
          color: #1A1A2E;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .sd-hero-logos {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.7rem;
          font-weight: 800;
          color: #888888;
          letter-spacing: 0.12em;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }
        .brand-dot { color: #C9A96E; }

        .sd-hero-intent {
          margin-bottom: 1.25rem;
        }
        .sd-hero-intent-opts {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(230, 224, 215, 0.6);
          padding: 0.35rem;
          border-radius: 999px;
        }
        .sd-hero-pill {
          padding: 0.45rem 1.1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #555555;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .sd-hero-pill.on {
          background: #1A1A2E;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(26,26,46,0.2);
        }

        .sd-search {
          background: #ffffff;
          border: 1px solid #EAE6DF;
          border-radius: 20px;
          padding: 0.65rem 1rem;
          box-shadow: 0 12px 36px rgba(0,0,0,0.08);
        }
        .property-search {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ps-input-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .ps-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .autocomplete-input {
          border: none;
          outline: none;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1A1A2E;
          background: transparent;
          width: 100%;
        }
        .select-clean {
          cursor: pointer;
        }
        .ps-divider {
          width: 1px;
          height: 38px;
          background: #E8E4DF;
        }
        .search-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #1A1A2E;
          color: #ffffff;
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .search-submit-btn:hover {
          background: #C9A96E;
          color: #1A1A2E;
        }

        .sd-hero-slider {
          position: relative;
        }
        .slider-wrapper {
          position: relative;
          height: 480px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(0,0,0,0.15);
        }
        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 600ms ease;
        }
        .slide-overlay {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          background: rgba(26, 26, 46, 0.85);
          backdrop-filter: blur(12px);
          padding: 1.25rem;
          border-radius: 16px;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .slide-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 800;
          color: #C9A96E;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.25rem;
        }
        .slide-caption {
          font-size: 1rem;
          font-weight: 600;
        }
        .slider-dots {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          display: flex;
          gap: 0.4rem;
        }
        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          border: none;
          cursor: pointer;
        }
        .slider-dot.active {
          background: #C9A96E;
          width: 20px;
          border-radius: 4px;
        }

        .sd-partner-logos {
          padding: 1.75rem 0;
          background: #ffffff;
          border-top: 1px solid #EAE6DF;
          border-bottom: 1px solid #EAE6DF;
          overflow: hidden;
        }
        .sd-partner-logos-wrap {
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 3rem;
          white-space: nowrap;
        }
        .marquee-item {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #999999;
        }

        .sd-home-tab {
          padding: 5rem 0;
        }
        .why-head {
          margin-bottom: 2.5rem;
        }
        .sd-eyebrow {
          font-size: 0.75rem;
          font-weight: 800;
          color: #C9A96E;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.35rem;
        }
        .why-title {
          font-size: 2.5rem;
          color: #1A1A2E;
        }
        .tab-container-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #E5E1D8;
          padding-bottom: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .tab-opts {
          list-style: none;
          display: flex;
          gap: 1.5rem;
        }
        .tab-opt {
          font-size: 0.95rem;
          font-weight: 700;
          color: #777777;
          cursor: pointer;
          padding-bottom: 0.5rem;
          position: relative;
        }
        .tab-opt.active {
          color: #1A1A2E;
        }
        .tab-opt.active::after {
          content: '';
          position: absolute;
          bottom: -1rem;
          left: 0;
          right: 0;
          height: 2px;
          background: #1A1A2E;
        }
        .stay-viewall {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1A1A2E;
          text-decoration: none;
        }
        .stay-viewall:hover {
          color: #C9A96E;
        }

        .tiles-wrapper-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .sd-editorial-section {
          padding: 5rem 0;
          background: #F5F0EB;
        }
        .section-title {
          font-size: 2.25rem;
          color: #1A1A2E;
          margin-bottom: 0.5rem;
        }
        .section-sub-desc {
          font-size: 1.05rem;
          color: #666666;
          max-width: 640px;
          margin: 0 auto 3rem auto;
        }
        .editorial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .editorial-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #EAE6DF;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .card-media {
          height: 220px;
          overflow: hidden;
        }
        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-content {
          padding: 1.5rem;
        }
        .card-tag {
          font-size: 0.7rem;
          font-weight: 800;
          color: #C9A96E;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
        }
        .card-h {
          font-size: 1.3rem;
          color: #1A1A2E;
          margin-bottom: 0.6rem;
        }
        .card-p {
          font-size: 0.875rem;
          color: #666666;
          line-height: 1.55;
        }

        .sd-journal-section {
          padding: 5rem 0;
        }
        .journal-banner {
          background: #1A1A2E;
          border-radius: 24px;
          padding: 3.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          color: #ffffff;
        }
        .banner-title {
          font-size: 2.25rem;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.25;
        }
        .banner-desc {
          font-size: 1rem;
          color: #A0A0B8;
          margin-bottom: 2rem;
        }
        .btn-journal {
          display: inline-flex;
          align-items: center;
          padding: 0.85rem 1.75rem;
          border-radius: 999px;
          background: #C9A96E;
          color: #1A1A2E;
          font-weight: 700;
          text-decoration: none;
        }
        .banner-right {
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
        }
        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .sd-hero-container { grid-template-columns: 1fr; }
          .sd-hero-slider { display: none; }
          .tiles-wrapper-grid { grid-template-columns: repeat(2, 1fr); }
          .editorial-grid { grid-template-columns: 1fr; }
          .journal-banner { grid-template-columns: 1fr; padding: 2rem; }
          .banner-right { display: none; }
        }
        @media (max-width: 640px) {
          .tiles-wrapper-grid { grid-template-columns: 1fr; }
          .property-search { flex-direction: column; }
          .ps-divider { display: none; }
          .sd-hero-heading { font-size: 2.25rem; }
        }
      `}</style>
    </div>
  );
}
