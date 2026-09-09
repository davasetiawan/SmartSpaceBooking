"use strict";(()=>{var e={};e.id=37,e.ids=[37,660],e.modules={6445:(e,a,r)=>{r.r(a),r.d(a,{config:()=>N,default:()=>j,getServerSideProps:()=>S,getStaticPaths:()=>k,getStaticProps:()=>y,reportWebVitals:()=>P,routeModule:()=>M,unstable_getServerProps:()=>_,unstable_getServerSideProps:()=>C,unstable_getStaticParams:()=>E,unstable_getStaticPaths:()=>O,unstable_getStaticProps:()=>w});var t={};r.r(t),r.d(t,{KatalogPage:()=>b});var i=r(7093),s=r(5244),l=r(1323),n=r(1682),o=r.n(n),d=r(8141),c=r.n(d),p=r(997),u=r(6689),g=r(3487),m=r(7871),h=r(6286);let x=(0,r(1).Z)("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);var f=r(9847),v=r(9831);!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let b=()=>{let[e,a]=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())(),[r,t]=(0,u.useState)([]),[i,s]=(0,u.useState)(!0),[l,n]=(0,u.useState)(e.get("tipe")||"ALL"),[o,d]=(0,u.useState)(e.get("lokasi")||""),[c,b]=(0,u.useState)(e.get("kapasitas")||"0");(0,u.useEffect)(()=>{f.hi.getRuangan().then(e=>{t(e),s(!1)})},[]);let j=r.filter(e=>{let a="ALL"===l||e.tipe===l,r=!o||e.lokasi.toLowerCase().includes(o.toLowerCase())||e.nama.toLowerCase().includes(o.toLowerCase()),t=e.kapasitas>=parseInt(c||"0",10);return a&&r&&t});return(0,p.jsxs)("div",{className:"container catalog-page-root",children:[(0,p.jsxs)("div",{className:"catalog-header",children:[p.jsx("span",{className:"section-subtitle",children:"PORTOFOLIO RUANGAN"}),p.jsx("h1",{className:"font-serif catalog-title",children:"Jelajahi Koleksi Ruang Kerja Sonder"}),p.jsx("p",{className:"catalog-desc",children:"Pilih ruangan kerja, ruang rapat, atau hall privat yang dirancang untuk mendukung fokus, kolaborasi, dan impresi profesional."})]}),(0,p.jsxs)("div",{className:"filter-toolbar sonder-card",children:[(0,p.jsxs)("div",{className:"search-input-wrapper",children:[p.jsx(g.Z,{size:18,className:"search-icon"}),p.jsx("input",{type:"text",placeholder:"Cari nama ruangan, lokasi, atau fasilitas...",value:o,onChange:e=>d(e.target.value),className:"search-input-field"})]}),(0,p.jsxs)("div",{className:"filter-pills-row",children:[(0,p.jsxs)("div",{className:"filter-group",children:[(0,p.jsxs)("label",{children:[p.jsx(m.Z,{size:14})," Tipe Ruangan:"]}),(0,p.jsxs)("select",{value:l,onChange:e=>n(e.target.value),className:"filter-select",children:[p.jsx("option",{value:"ALL",children:"Semua Tipe"}),p.jsx("option",{value:"MEETING_ROOM",children:"Meeting Room"}),p.jsx("option",{value:"COWORKING_DESK",children:"Hot Desk"}),p.jsx("option",{value:"PRIVATE_OFFICE",children:"Private Office"}),p.jsx("option",{value:"EVENT_SPACE",children:"Event Hall"})]})]}),(0,p.jsxs)("div",{className:"filter-group",children:[(0,p.jsxs)("label",{children:[p.jsx(h.Z,{size:14})," Min Kapasitas:"]}),(0,p.jsxs)("select",{value:c,onChange:e=>b(e.target.value),className:"filter-select",children:[p.jsx("option",{value:"0",children:"Bebas"}),p.jsx("option",{value:"1",children:"≥ 1 Orang"}),p.jsx("option",{value:"5",children:"≥ 5 Orang"}),p.jsx("option",{value:"10",children:"≥ 10 Orang"}),p.jsx("option",{value:"50",children:"≥ 50 Orang"})]})]})]})]}),p.jsx("div",{className:"results-meta",children:(0,p.jsxs)("span",{children:["Menampilkan ",p.jsx("strong",{children:j.length})," ruangan kerja yang tersedia"]})}),i?p.jsx("div",{className:"loading-grid",children:[1,2,3].map(e=>p.jsx("div",{className:"skeleton-card sonder-card"},e))}):0===j.length?(0,p.jsxs)("div",{className:"no-results sonder-card",children:[p.jsx(x,{size:48,className:"no-icon"}),p.jsx("h3",{className:"font-serif",children:"Tidak Ada Ruangan yang Sesuai"}),p.jsx("p",{children:"Coba ubah kata kunci pencarian atau reset filter tipe ruangan Anda."}),p.jsx("button",{className:"btn btn-outline btn-sm mt-2",onClick:()=>{n("ALL"),d(""),b("0")},children:"Reset Semua Filter"})]}):p.jsx("div",{className:"cards-grid",children:j.map(e=>p.jsx(v.p,{ruangan:e},e.id))}),p.jsx("style",{children:`
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
      `})]})},j=(0,l.l)(t,"default"),y=(0,l.l)(t,"getStaticProps"),k=(0,l.l)(t,"getStaticPaths"),S=(0,l.l)(t,"getServerSideProps"),N=(0,l.l)(t,"config"),P=(0,l.l)(t,"reportWebVitals"),w=(0,l.l)(t,"unstable_getStaticProps"),O=(0,l.l)(t,"unstable_getStaticPaths"),E=(0,l.l)(t,"unstable_getStaticParams"),_=(0,l.l)(t,"unstable_getServerProps"),C=(0,l.l)(t,"unstable_getServerSideProps"),M=new i.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/KatalogPage",pathname:"/KatalogPage",bundlePath:"",filename:""},components:{App:c(),Document:o()},userland:t})},7871:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[682,177],()=>r(6445));module.exports=t})();