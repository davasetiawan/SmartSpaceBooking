import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Coffee, 
  CheckCircle2, 
  Building2,
  Award,
  Zap
} from 'lucide-react';
import { api, Ruangan } from '../services/api';
import { SpaceCard } from '../components/common/SpaceCard';

export const HomePage: React.FC = () => {
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchLokasi, setSearchLokasi] = useState('');
  const [searchKapasitas, setSearchKapasitas] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
    api.getRuangan().then((data) => setRuanganList(data));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/ruangan?lokasi=${searchLokasi}&kapasitas=${searchKapasitas}`);
  };

  const filteredRuangan = activeTab === 'ALL' 
    ? ruanganList 
    : ruanganList.filter(r => r.tipe === activeTab);

  return (
    <div className="homepage-root">
      {/* 1. SONDER SPLIT HERO SECTION */}
      <section className="hero-split-section">
        <div className="container hero-container">
          <div className="hero-text-col">
            <div className="hero-badge font-mono">
              <Sparkles size={14} /> SONDER URBAN SPACE BOOKING
            </div>
            <h1 className="font-serif hero-heading">
              Ruang Kerja Editorial Untuk Karya Terbaik Anda.
            </h1>
            <p className="hero-subheading">
              Temukan ruang rapat privat, hot desk ergonomis, dan event space eksklusif dengan kenyamanan setara hotel bintang lima.
            </p>

            {/* Quick Search Bar Sonder Style */}
            <form onSubmit={handleSearchSubmit} className="search-bar-pill glass-card">
              <div className="search-field">
                <label><MapPin size={14} /> Lokasi</label>
                <input 
                  type="text" 
                  placeholder="Jakarta, SCBD, Bali..." 
                  value={searchLokasi}
                  onChange={(e) => setSearchLokasi(e.target.value)}
                />
              </div>
              <div className="search-divider"></div>
              <div className="search-field">
                <label><Users size={14} /> Kapasitas</label>
                <select 
                  value={searchKapasitas} 
                  onChange={(e) => setSearchKapasitas(e.target.value)}
                >
                  <option value="1">1 Orang (Desk)</option>
                  <option value="4">4–6 Orang (Small)</option>
                  <option value="12">10–15 Orang (Meeting)</option>
                  <option value="50">50+ Orang (Event)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary search-submit-btn">
                Cari Ruangan <Search size={16} />
              </button>
            </form>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num font-mono">15+</span>
                <span className="stat-label">Lokasi Premium</span>
              </div>
              <div className="stat-item">
                <span className="stat-num font-mono">99.9%</span>
                <span className="stat-label">Wi-Fi Uptime</span>
              </div>
              <div className="stat-item">
                <span className="stat-num font-mono">4.9/5</span>
                <span className="stat-label">Rating Member</span>
              </div>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="hero-image-frame">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" 
                alt="Sonder Luxury Workspace" 
                className="hero-img-main"
              />
              <div className="hero-floating-card glass-card">
                <Award size={24} className="gold-icon" />
                <div>
                  <div className="floating-title">Verified High-Speed Wi-Fi</div>
                  <div className="floating-sub">Dedikasi kabel fiber 500Mbps & soundproof booth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNER LOGO MARQUEE */}
      <section className="marquee-section">
        <div className="container">
          <p className="marquee-label">Dipercaya oleh tim inovatif dari berbagai industri</p>
          <div className="marquee-logos">
            <span className="partner-logo font-serif">GOOGLE</span>
            <span className="partner-logo font-serif">GOJEK</span>
            <span className="partner-logo font-serif">TOKOPEDIA</span>
            <span className="partner-logo font-serif">TRAVELOKA</span>
            <span className="partner-logo font-serif">BANK MANDIRI</span>
          </div>
        </div>
      </section>

      {/* 3. CATALOGUE PREVIEW WITH TAB FILTER */}
      <section className="container catalog-preview-section">
        <div className="section-header">
          <div>
            <span className="section-subtitle">PILIHAN KURASI</span>
            <h2 className="font-serif section-title">Ruangan Pilihan Minggu Ini</h2>
          </div>

          {/* Sonder Tab Filter Pills */}
          <div className="tab-pills-group">
            <button 
              className={`tab-pill ${activeTab === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveTab('ALL')}
            >
              Semua Ruangan
            </button>
            <button 
              className={`tab-pill ${activeTab === 'MEETING_ROOM' ? 'active' : ''}`}
              onClick={() => setActiveTab('MEETING_ROOM')}
            >
              Meeting Room
            </button>
            <button 
              className={`tab-pill ${activeTab === 'COWORKING_DESK' ? 'active' : ''}`}
              onClick={() => setActiveTab('COWORKING_DESK')}
            >
              Hot Desk
            </button>
            <button 
              className={`tab-pill ${activeTab === 'PRIVATE_OFFICE' ? 'active' : ''}`}
              onClick={() => setActiveTab('PRIVATE_OFFICE')}
            >
              Private Office
            </button>
          </div>
        </div>

        {/* Space Cards Grid */}
        <div className="cards-grid">
          {filteredRuangan.map((ruangan) => (
            <SpaceCard key={ruangan.id} ruangan={ruangan} />
          ))}
        </div>

        <div className="view-all-center">
          <Link to="/ruangan" className="btn btn-outline btn-lg">
            Lihat Semua {ruanganList.length} Ruangan <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. SONDER FEATURES VALUE PROP */}
      <section className="features-section">
        <div className="container">
          <div className="text-center">
            <span className="section-subtitle">MENGAPA SONDER</span>
            <h2 className="font-serif section-title">Standar Baru Ruang Kerja Modern</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card sonder-card">
              <div className="feature-icon-wrapper"><Clock size={24} /></div>
              <h3 className="font-serif feature-title">Akses Fleksibel Per Jam</h3>
              <p className="feature-desc">Pesan mulai dari 1 jam untuk rapat singkat atau harian penuh tanpa komitmen jangka panjang.</p>
            </div>

            <div className="feature-card sonder-card">
              <div className="feature-icon-wrapper"><Zap size={24} /></div>
              <h3 className="font-serif feature-title">Instant QR Check-In</h3>
              <p className="feature-desc">Masuk ruangan tanpa antre resepsionis. Tunjukkan E-Ticket QR Code langsung pada scanner.</p>
            </div>

            <div className="feature-card sonder-card">
              <div className="feature-icon-wrapper"><Coffee size={24} /></div>
              <h3 className="font-serif feature-title">Artisan Coffee & Lounge</h3>
              <p className="feature-desc">Nikmati racikan kopi gratis, teh herbal, dan kudapan sehat di lounge bergaya urban.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .homepage-root {
          padding-bottom: 2rem;
        }

        .hero-split-section {
          padding: 4rem 0;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-accent-light);
          color: var(--color-accent-hover);
          padding: 0.35rem 0.85rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
        }

        .hero-heading {
          font-size: 3.25rem;
          line-height: 1.15;
          color: var(--color-primary);
          margin-bottom: 1.25rem;
        }

        .hero-subheading {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 540px;
        }

        .search-bar-pill {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: var(--border-radius-pill);
          background: #ffffff;
          box-shadow: var(--shadow-md);
          margin-bottom: 2.5rem;
        }
        .search-field {
          flex: 1;
          padding: 0.5rem 1rem;
          display: flex;
          flex-direction: column;
        }
        .search-field label {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.1rem;
        }
        .search-field input, .search-field select {
          border: none;
          background: transparent;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          outline: none;
        }
        .search-divider {
          width: 1px;
          height: 36px;
          background: var(--border-color);
        }
        .search-submit-btn {
          border-radius: var(--border-radius-pill);
          padding: 0.85rem 1.75rem;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 3rem;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-num {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--color-primary);
        }
        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .hero-image-frame {
          position: relative;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          height: 480px;
        }
        .hero-img-main {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-floating-card {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.9);
        }
        .gold-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .floating-title {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }
        .floating-sub {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .marquee-section {
          padding: 2rem 0;
          border-y: 1px solid var(--border-color);
          background: #ffffff;
          text-align: center;
        }
        .marquee-label {
          font-size: 0.775rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .marquee-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3.5rem;
          flex-wrap: wrap;
          opacity: 0.6;
        }
        .partner-logo {
          font-size: 1.25rem;
          letter-spacing: 0.15em;
          color: var(--text-primary);
        }

        .catalog-preview-section {
          padding: 5rem 0 3rem 0;
        }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .section-subtitle {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-accent-hover);
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.35rem;
        }
        .section-title {
          font-size: 2.25rem;
          color: var(--color-primary);
        }

        .tab-pills-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-secondary);
          padding: 0.35rem;
          border-radius: var(--border-radius-pill);
        }
        .tab-pill {
          padding: 0.5rem 1.25rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .tab-pill.active {
          background: #ffffff;
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .view-all-center {
          text-align: center;
        }

        .features-section {
          padding: 5rem 0;
          background: var(--bg-secondary);
          margin-top: 4rem;
        }
        .text-center { text-align: center; margin-bottom: 3rem; }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .feature-card {
          padding: 2rem;
          text-align: center;
        }
        .feature-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-accent-light);
          color: var(--color-accent-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }
        .feature-title {
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
        }
        .feature-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .hero-container { grid-template-columns: 1fr; }
          .hero-image-col { display: none; }
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
          .search-bar-pill { flex-direction: column; border-radius: var(--border-radius-lg); }
          .search-divider { display: none; }
          .hero-heading { font-size: 2.25rem; }
        }
      `}</style>
    </div>
  );
};
