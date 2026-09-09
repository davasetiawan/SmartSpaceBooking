'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, MapPin, Star, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Heart } from 'lucide-react';
import { Ruangan } from '@/services/api';

interface SpaceCardProps {
  ruangan: Ruangan;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ ruangan }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

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

  const toggleHeart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getTipeLabel = (tipe: string) => {
    switch(tipe) {
      case 'MEETING_ROOM': return 'Meeting Suite';
      case 'COWORKING_DESK': return 'Hot Desk';
      case 'PRIVATE_OFFICE': return 'Private Office';
      case 'EVENT_SPACE': return 'Event Space';
      default: return tipe;
    }
  };

  return (
    <div className="sp-property-card sonder-card">
      {/* Image Carousel & Overlay Container */}
      <div className="image-section">
        <img 
          src={images[currentImageIndex]} 
          alt={ruangan.nama} 
          className="slides-img"
          loading="lazy"
        />

        {/* Sonder Callout Badge */}
        <div className="callout-badge">
          <span className="badge-info">Frequently Booked</span>
        </div>

        {/* Heart Bookmark Button */}
        <button 
          className={`fav-icon-btn ${isLiked ? 'liked' : ''}`}
          onClick={toggleHeart}
          aria-label="Bookmark"
        >
          <Heart size={16} fill={isLiked ? '#DC2626' : 'none'} color={isLiked ? '#DC2626' : '#ffffff'} />
        </button>

        {/* Carousel Arrows */}
        {images.length > 1 && (
          <>
            <button className="slide-arrow prev" onClick={prevImage} aria-label="Previous">
              <ChevronLeft size={16} />
            </button>
            <button className="slide-arrow next" onClick={nextImage} aria-label="Next">
              <ChevronRight size={16} />
            </button>

            <div className="carousel-dots">
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`point ${idx === currentImageIndex ? 'active' : ''}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Property Details */}
      <div className="details-box">
        <div className="info-row">
          <span className="property-type">{getTipeLabel(ruangan.tipe)}</span>
          <div className="ratings">
            <Star size={12} fill="#C9A96E" color="#C9A96E" />
            <span className="rating-score">{ruangan.rating || 4.9}</span>
          </div>
        </div>

        <h3 className="property-title font-serif">
          <Link href={`/ruangan/${ruangan.id}`}>{ruangan.nama}</Link>
        </h3>

        <div className="property-breadcrumb">
          <MapPin size={13} className="pin-ico" />
          <span className="location-txt">{ruangan.lokasi}</span>
        </div>

        <div className="reviews-row">
          <span className="review-badge">9.2</span>
          <span className="review-label">Fabulous</span>
          <span className="review-count">(128 Reviews)</span>
        </div>

        {/* Price & Action Row */}
        <div className="card-bottom">
          <div className="price-tag">
            <span className="p-from">From</span>
            <span className="p-val font-mono">{formatRupiah(ruangan.hargaPerJam)}</span>
            <span className="p-unit">/ hr</span>
          </div>

          <Link href={`/ruangan/${ruangan.id}`} className="btn-book-sonder">
            Book Stay &rarr;
          </Link>
        </div>
      </div>

      <style>{`
        .sp-property-card {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #EAE6DF;
          box-shadow: 0 4px 18px rgba(0,0,0,0.05);
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .sp-property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }

        .image-section {
          position: relative;
          height: 230px;
          overflow: hidden;
          background: #1A1A2E;
        }
        .slides-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms ease;
        }
        .sp-property-card:hover .slides-img {
          transform: scale(1.04);
        }

        .callout-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background: rgba(26, 26, 46, 0.85);
          backdrop-filter: blur(8px);
          color: #C9A96E;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          font-size: 0.675rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .fav-icon-btn {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 200ms ease;
        }
        .fav-icon-btn:hover {
          transform: scale(1.1);
        }

        .slide-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #1A1A2E;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .sp-property-card:hover .slide-arrow {
          opacity: 1;
        }
        .slide-arrow.prev { left: 0.6rem; }
        .slide-arrow.next { right: 0.6rem; }

        .carousel-dots {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.35rem;
        }
        .point {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }
        .point.active {
          background: #ffffff;
          width: 14px;
          border-radius: 4px;
        }

        .details-box {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }
        .property-type {
          font-size: 0.725rem;
          font-weight: 800;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .ratings {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .rating-score {
          font-size: 0.8rem;
          font-weight: 800;
          color: #1A1A2E;
        }

        .property-title {
          font-size: 1.25rem;
          color: #1A1A2E;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }
        .property-title a {
          color: #1A1A2E;
          text-decoration: none;
        }

        .property-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: #666666;
          margin-bottom: 0.75rem;
        }
        .pin-ico { color: #C9A96E; }

        .reviews-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .review-badge {
          background: #1A1A2E;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }
        .review-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1A1A2E;
        }
        .review-count {
          font-size: 0.775rem;
          color: #888888;
        }

        .card-bottom {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid #EAE6DF;
        }
        .price-tag {
          display: flex;
          flex-direction: column;
        }
        .p-from {
          font-size: 0.675rem;
          color: #888888;
          text-transform: uppercase;
        }
        .p-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1A1A2E;
        }
        .p-unit {
          font-size: 0.75rem;
          color: #666666;
        }

        .btn-book-sonder {
          font-size: 0.825rem;
          font-weight: 700;
          background: #1A1A2E;
          color: #ffffff;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .btn-book-sonder:hover {
          background: #C9A96E;
          color: #1A1A2E;
        }
      `}</style>
    </div>
  );
};

