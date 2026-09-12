import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Building2, MapPin, Users } from 'lucide-react';
import { api, Ruangan } from '../services/api';
import { SpaceCard } from '../components/common/SpaceCard';

export const KatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ruanganList, setRuanganList] = useState<Ruangan[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [tipeFilter, setTipeFilter] = useState(searchParams.get('tipe') || 'ALL');
  const [lokasiQuery, setLokasiQuery] = useState(searchParams.get('lokasi') || '');
  const [kapasitasMin, setKapasitasMin] = useState(searchParams.get('kapasitas') || '0');

  useEffect(() => {
    api.getRuangan().then((data) => {
      setRuanganList(data);
      setLoading(false);
    });
  }, []);

  const filteredList = ruanganList.filter((r) => {
    const matchTipe = tipeFilter === 'ALL' || r.tipe === tipeFilter;
    const matchLokasi = !lokasiQuery || r.lokasi.toLowerCase().includes(lokasiQuery.toLowerCase()) || r.nama.toLowerCase().includes(lokasiQuery.toLowerCase());
    const matchKapasitas = r.kapasitas >= parseInt(kapasitasMin || '0', 10);
    return matchTipe && matchLokasi && matchKapasitas;
  });

  return (
    <div className="container catalog-page-root">
      {/* Editorial Header */}
      <div className="catalog-header">
        <span className="section-subtitle">PORTOFOLIO RUANGAN</span>
        <h1 className="font-serif catalog-title">Jelajahi Koleksi Ruang Kerja WorkMates</h1>
        <p className="catalog-desc">
          Pilih ruangan kerja, ruang rapat, atau hall privat yang dirancang untuk mendukung fokus, kolaborasi, dan impresi profesional.
        </p>
      </div>

      {/* Filter Toolbar Sonder Style */}
      <div className="filter-toolbar sonder-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Cari nama ruangan, lokasi, atau fasilitas..."
            value={lokasiQuery}
            onChange={(e) => setLokasiQuery(e.target.value)}
            className="search-input-field"
          />
        </div>

        <div className="filter-pills-row">
          <div className="filter-group">
            <label><Building2 size={14} /> Tipe Ruangan:</label>
            <select 
              value={tipeFilter} 
              onChange={(e) => setTipeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="ALL">Semua Tipe</option>
              <option value="MEETING_ROOM">Meeting Room</option>
              <option value="COWORKING_DESK">Hot Desk</option>
              <option value="PRIVATE_OFFICE">Private Office</option>
              <option value="EVENT_SPACE">Event Hall</option>
            </select>
          </div>

          <div className="filter-group">
            <label><Users size={14} /> Min Kapasitas:</label>
            <select 
              value={kapasitasMin} 
              onChange={(e) => setKapasitasMin(e.target.value)}
              className="filter-select"
            >
              <option value="0">Bebas</option>
              <option value="1">&ge; 1 Orang</option>
              <option value="5">&ge; 5 Orang</option>
              <option value="10">&ge; 10 Orang</option>
              <option value="50">&ge; 50 Orang</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-meta">
        <span>Menampilkan <strong>{filteredList.length}</strong> ruangan kerja yang tersedia</span>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card sonder-card"></div>
          ))}
        </div>
      ) : filteredList.length === 0 ? (
        <div className="no-results sonder-card">
          <SlidersHorizontal size={48} className="no-icon" />
          <h3 className="font-serif">Tidak Ada Ruangan yang Sesuai</h3>
          <p>Coba ubah kata kunci pencarian atau reset filter tipe ruangan Anda.</p>
          <button className="btn btn-outline btn-sm mt-2" onClick={() => { setTipeFilter('ALL'); setLokasiQuery(''); setKapasitasMin('0'); }}>
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {filteredList.map((ruangan) => (
            <SpaceCard key={ruangan.id} ruangan={ruangan} />
          ))}
        </div>
      )}

      <style>{`
        .catalog-page-root {
          padding: 3rem 1.5rem;
        }

        .catalog-header {
          margin-bottom: 2.5rem;
        }
        .catalog-title {
          font-size: 2.75rem;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
        }
        .catalog-desc {
          color: var(--text-secondary);
          max-width: 680px;
          font-size: 1.05rem;
        }

        .filter-toolbar {
          padding: 1.25rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }
        .search-input-field {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-pill);
          background: var(--bg-primary);
          outline: none;
        }
        .search-input-field:focus {
          border-color: var(--color-accent);
          background: #ffffff;
        }

        .filter-pills-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .filter-select {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color);
          background: #ffffff;
          font-weight: 600;
          outline: none;
        }

        .results-meta {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .skeleton-card {
          height: 380px;
          background: linear-gradient(90deg, #E8E4DF 25%, #F5F0EB 50%, #E8E4DF 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        .no-results {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .no-icon {
          color: var(--color-accent);
        }
        .mt-2 { margin-top: 1rem; }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
          .filter-toolbar { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </div>
  );
};
