'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Send, CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="sd-footer">
      <div className="sd-container">
        {/* Top Newsletter & Brand Section */}
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <Building2 size={24} className="logo-gold" />
              <span className="font-serif footer-title">Sonder</span>
              <span className="footer-sub font-mono">WORKSPACES</span>
            </div>
            <p className="footer-tagline">
              Boutique hotels and apartment-style stays in cities worldwide, each vetted for design, location, and quality. Find your stay.
            </p>
            <div className="system-status">
              <span className="status-dot"></span>
              <span className="status-text">All Systems Operational &bull; 99.9% Fiber Wi-Fi Uptime</span>
            </div>
          </div>

          <div className="newsletter-col">
            <h4 className="newsletter-title font-serif">Stay in the Loop with Sonder Journal</h4>
            <p className="newsletter-desc">Subscribe to receive exclusive space drops, city guides, and member discounts.</p>
            
            {subscribed ? (
              <div className="subscribed-success">
                <CheckCircle2 size={18} /> Thank you! You've been subscribed to Sonder Journal.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn-subscribe">
                  Subscribe &rarr;
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          <div className="footer-col">
            <h5 className="col-heading">Spaces</h5>
            <ul className="footer-links">
              <li><Link href="/ruangan?tipe=COWORKING_DESK">Hot Desks & Lounges</Link></li>
              <li><Link href="/ruangan?tipe=MEETING_ROOM">Executive Meeting Suites</Link></li>
              <li><Link href="/ruangan?tipe=PRIVATE_OFFICE">Private Office Suites</Link></li>
              <li><Link href="/ruangan?tipe=EVENT_SPACE">Event Halls & Auditoriums</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">Cities</h5>
            <ul className="footer-links">
              <li><Link href="/ruangan?lokasi=Jakarta">Jakarta & SCBD</Link></li>
              <li><Link href="/ruangan?lokasi=Surabaya">Surabaya Center</Link></li>
              <li><Link href="/ruangan?lokasi=Bandung">Bandung Dago Hub</Link></li>
              <li><Link href="/ruangan?lokasi=Bali">Bali Canggu Workspace</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">Support</h5>
            <ul className="footer-links">
              <li><Link href="/scanner">Sonder QR Scanner (BETA)</Link></li>
              <li><Link href="/reservasi">My Trips & Bookings</Link></li>
              <li><a href="#faq">FAQ & Help Center</a></li>
              <li><a href="#contact">Contact Us 24/7</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">Sonder Guarantee</h5>
            <div className="security-badge-box">
              <ShieldCheck size={26} className="shield-ico" />
              <div>
                <div className="sec-title">Encrypted Digital Entry</div>
                <div className="sec-desc">Instant E-Ticket QR Code verification for seamless keyless access.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Sonder Workspaces. TravelAI acquires Sonder brand. All rights reserved.
          </p>
          <div className="footer-extra-links">
            <a href="#privacy">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms">Terms of Service</a>
            <span>&bull;</span>
            <span className="made-with">Crafted with <Heart size={12} className="heart-icon" /> for work & life</span>
          </div>
        </div>
      </div>

      <style>{`
        .sd-footer {
          background-color: #1A1A2E;
          color: #ffffff;
          padding: 4.5rem 0 2rem 0;
          border-top: 1px solid #2E2E4A;
          font-family: var(--font-sans);
        }

        .sd-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid #2E2E4A;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .logo-gold { color: #C9A96E; }
        .footer-title {
          font-size: 1.85rem;
          color: #ffffff;
        }
        .footer-sub {
          font-size: 0.6rem;
          color: #C9A96E;
          letter-spacing: 0.2em;
          margin-left: 0.2rem;
        }
        .footer-tagline {
          color: #A0A0B8;
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 460px;
          margin-bottom: 1.5rem;
        }

        .system-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.05);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }
        .status-text {
          font-size: 0.775rem;
          color: #D1D5DB;
        }

        .newsletter-title {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .newsletter-desc {
          color: #A0A0B8;
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
        }
        .newsletter-form {
          display: flex;
          gap: 0.6rem;
        }
        .newsletter-input {
          flex: 1;
          padding: 0.75rem 1.1rem;
          border-radius: 999px;
          border: 1px solid #3A3A5E;
          background: rgba(255,255,255,0.06);
          color: #ffffff;
          outline: none;
          font-size: 0.875rem;
        }
        .btn-subscribe {
          padding: 0.75rem 1.4rem;
          border-radius: 999px;
          background: #C9A96E;
          color: #1A1A2E;
          font-weight: 700;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          padding: 3.5rem 0;
          border-bottom: 1px solid #2E2E4A;
        }

        .col-heading {
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links a {
          color: #A0A0B8;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-links a:hover {
          color: #C9A96E;
        }

        .security-badge-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(255,255,255,0.04);
          padding: 1rem;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .shield-ico { color: #C9A96E; }
        .sec-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }
        .sec-desc {
          font-size: 0.75rem;
          color: #A0A0B8;
          line-height: 1.45;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          font-size: 0.825rem;
          color: #A0A0B8;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-extra-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-extra-links a {
          color: #A0A0B8;
          text-decoration: none;
        }
        .heart-icon { color: #DC2626; display: inline; }

        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

