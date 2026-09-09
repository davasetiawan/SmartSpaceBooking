import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Star, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Ruangan } from '../../services/api';

interface SpaceCardProps {
  ruangan: Ruangan;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ ruangan }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ruangan.gambarUrl && ruangan.gambarUrl.length > 0 
    ? ruangan.gambarUrl 
    : ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getTipeLabel = (tipe: string) => {
    switch(tipe) {
      case 'MEETING_ROOM': return 'Meeting Room';
      case 'COWORKING_DESK': return 'Coworking Desk';
      case 'PRIVATE_OFFICE': return 'Private Office';
      case 'EVENT_SPACE': return 'Event Space';
      default: return tipe;
    }
  };

  return (
    <div className="sonder-card space-card-root">
      {/* Image Carousel Hero Container */}
      <div className="card-image-wrapper">
        <img 
          src={images[currentImageIndex]} 
          alt={ruangan.nama} 
          className="card-image"
          loading="lazy"
        />

        {/* Top Badges Overlay */}
        <div className="card-top-badges">
          <span className="badge-pill badge-type">{getTipeLabel(ruangan.tipe)}</span>
          {ruangan.rating && (
            <span className="badge-pill badge-rating">
              <Star size={12} fill="#C9A96E" color="#C9A96E" /> {ruangan.rating}
            </span>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button className="carousel-nav prev" onClick={prevImage} aria-label="Previous image">
              <ChevronLeft size={16} />
            </button>
            <button className="carousel-nav next" onClick={nextImage} aria-label="Next image">
              <ChevronRight size={16} />
            </button>
            <div className="carousel-dots">
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === currentImageIndex ? 'active' : ''}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <div className="card-meta">
          <span className="meta-item"><MapPin size={14} /> {ruangan.lokasi}</span>
          <span className="meta-item"><Users size={14} /> Maks {ruangan.kapasitas} Orang</span>
        </div>

        <h3 className="card-title font-serif">
          <Link to={`/ruangan/${ruangan.id}`}>{ruangan.nama}</Link>
        </h3>

        <p className="card-desc">{ruangan.deskripsi}</p>

        {/* Facilities Tags */}
        <div className="card-facilities">
          {ruangan.fasilitas.slice(0, 3).map((f, i) => (
            <span key={i} className="facility-pill">
              <CheckCircle2 size={12} className="facility-icon" /> {f}
            </span>
          ))}
          {ruangan.fasilitas.length > 3 && (
            <span className="facility-pill">+ {ruangan.fasilitas.length - 3} lainnya</span>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="card-footer">
          <div className="price-group">
            <span className="price-label">Mulai dari</span>
            <span className="price-amount font-mono">{formatRupiah(ruangan.hargaPerJam)}</span>
            <span className="price-unit">/ jam</span>
          </div>

          <Link to={`/ruangan/${ruangan.id}`} className="btn btn-primary btn-sm card-btn">
            Pesan <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        .space-card-root {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #E8E4DF;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }
        .space-card-root:hover .card-image {
          transform: scale(1.04);
        }

        .card-top-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
        }

        .badge-type {
          background: rgba(26, 26, 46, 0.85);
          color: #ffffff;
          backdrop-filter: blur(8px);
        }
        .badge-rating {
          background: rgba(255, 255, 255, 0.9);
          color: var(--text-primary);
          backdrop-filter: blur(8px);
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast), background var(--transition-fast);
          z-index: 2;
        }
        .carousel-nav.prev { left: 0.75rem; }
        .carousel-nav.next { right: 0.75rem; }
        .card-image-wrapper:hover .carousel-nav {
          opacity: 1;
        }
        .carousel-nav:hover {
          background: #ffffff;
        }

        .carousel-dots {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.35rem;
          z-index: 2;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all var(--transition-fast);
        }
        .dot.active {
          background: #ffffff;
          width: 16px;
          border-radius: 4px;
        }

        .card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .card-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }
        .card-title a {
          color: var(--text-primary);
          text-decoration: none;
        }
        .card-title a:hover {
          color: var(--color-accent-hover);
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-facilities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .facility-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.725rem;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--border-radius-pill);
        }
        .facility-icon {
          color: var(--color-accent);
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .price-group {
          display: flex;
          flex-direction: column;
        }
        .price-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .price-amount {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .price-unit {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};
