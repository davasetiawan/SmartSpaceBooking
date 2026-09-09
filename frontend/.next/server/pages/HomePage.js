"use strict";(()=>{var e={};e.id=544,e.ids=[544,660],e.modules={7022:(e,a,r)=>{r.r(a),r.d(a,{config:()=>M,default:()=>O,getServerSideProps:()=>z,getStaticPaths:()=>E,getStaticProps:()=>P,reportWebVitals:()=>R,routeModule:()=>I,unstable_getServerProps:()=>_,unstable_getServerSideProps:()=>D,unstable_getStaticParams:()=>C,unstable_getStaticPaths:()=>L,unstable_getStaticProps:()=>A});var t={};r.r(t),r.d(t,{HomePage:()=>S});var s=r(7093),i=r(5244),n=r(1323),l=r(1682),o=r.n(l),c=r(8141),d=r.n(c),m=r(997),p=r(6689),g=r(1);let h=(0,g.Z)("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);var u=r(6919),f=r(6286),x=r(3487),b=r(9737),v=r(6179),j=r(8742);let N=(0,g.Z)("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),y=(0,g.Z)("Coffee",[["path",{d:"M17 8h1a4 4 0 1 1 0 8h-1",key:"jx4kbh"}],["path",{d:"M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z",key:"1bxrl0"}],["line",{x1:"6",x2:"6",y1:"2",y2:"4",key:"1cr9l3"}],["line",{x1:"10",x2:"10",y1:"2",y2:"4",key:"170wym"}],["line",{x1:"14",x2:"14",y1:"2",y2:"4",key:"1c5f70"}]]);var k=r(9847),w=r(9831);!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let S=()=>{let[e,a]=(0,p.useState)([]),[r,t]=(0,p.useState)("ALL"),[s,i]=(0,p.useState)(""),[n,l]=(0,p.useState)("1"),o=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())();(0,p.useEffect)(()=>{k.hi.getRuangan().then(e=>a(e))},[]);let c="ALL"===r?e:e.filter(e=>e.tipe===r);return(0,m.jsxs)("div",{className:"homepage-root",children:[m.jsx("section",{className:"hero-split-section",children:(0,m.jsxs)("div",{className:"container hero-container",children:[(0,m.jsxs)("div",{className:"hero-text-col",children:[(0,m.jsxs)("div",{className:"hero-badge font-mono",children:[m.jsx(h,{size:14})," SONDER URBAN SPACE BOOKING"]}),m.jsx("h1",{className:"font-serif hero-heading",children:"Ruang Kerja Editorial Untuk Karya Terbaik Anda."}),m.jsx("p",{className:"hero-subheading",children:"Temukan ruang rapat privat, hot desk ergonomis, dan event space eksklusif dengan kenyamanan setara hotel bintang lima."}),(0,m.jsxs)("form",{onSubmit:e=>{e.preventDefault(),o(`/ruangan?lokasi=${s}&kapasitas=${n}`)},className:"search-bar-pill glass-card",children:[(0,m.jsxs)("div",{className:"search-field",children:[(0,m.jsxs)("label",{children:[m.jsx(u.Z,{size:14})," Lokasi"]}),m.jsx("input",{type:"text",placeholder:"Jakarta, SCBD, Bali...",value:s,onChange:e=>i(e.target.value)})]}),m.jsx("div",{className:"search-divider"}),(0,m.jsxs)("div",{className:"search-field",children:[(0,m.jsxs)("label",{children:[m.jsx(f.Z,{size:14})," Kapasitas"]}),(0,m.jsxs)("select",{value:n,onChange:e=>l(e.target.value),children:[m.jsx("option",{value:"1",children:"1 Orang (Desk)"}),m.jsx("option",{value:"4",children:"4–6 Orang (Small)"}),m.jsx("option",{value:"12",children:"10–15 Orang (Meeting)"}),m.jsx("option",{value:"50",children:"50+ Orang (Event)"})]})]}),(0,m.jsxs)("button",{type:"submit",className:"btn btn-primary search-submit-btn",children:["Cari Ruangan ",m.jsx(x.Z,{size:16})]})]}),(0,m.jsxs)("div",{className:"hero-stats",children:[(0,m.jsxs)("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-num font-mono",children:"15+"}),m.jsx("span",{className:"stat-label",children:"Lokasi Premium"})]}),(0,m.jsxs)("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-num font-mono",children:"99.9%"}),m.jsx("span",{className:"stat-label",children:"Wi-Fi Uptime"})]}),(0,m.jsxs)("div",{className:"stat-item",children:[m.jsx("span",{className:"stat-num font-mono",children:"4.9/5"}),m.jsx("span",{className:"stat-label",children:"Rating Member"})]})]})]}),m.jsx("div",{className:"hero-image-col",children:(0,m.jsxs)("div",{className:"hero-image-frame",children:[m.jsx("img",{src:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",alt:"Sonder Luxury Workspace",className:"hero-img-main"}),(0,m.jsxs)("div",{className:"hero-floating-card glass-card",children:[m.jsx(b.Z,{size:24,className:"gold-icon"}),(0,m.jsxs)("div",{children:[m.jsx("div",{className:"floating-title",children:"Verified High-Speed Wi-Fi"}),m.jsx("div",{className:"floating-sub",children:"Dedikasi kabel fiber 500Mbps & soundproof booth"})]})]})]})})]})}),m.jsx("section",{className:"marquee-section",children:(0,m.jsxs)("div",{className:"container",children:[m.jsx("p",{className:"marquee-label",children:"Dipercaya oleh tim inovatif dari berbagai industri"}),(0,m.jsxs)("div",{className:"marquee-logos",children:[m.jsx("span",{className:"partner-logo font-serif",children:"GOOGLE"}),m.jsx("span",{className:"partner-logo font-serif",children:"GOJEK"}),m.jsx("span",{className:"partner-logo font-serif",children:"TOKOPEDIA"}),m.jsx("span",{className:"partner-logo font-serif",children:"TRAVELOKA"}),m.jsx("span",{className:"partner-logo font-serif",children:"BANK MANDIRI"})]})]})}),(0,m.jsxs)("section",{className:"container catalog-preview-section",children:[(0,m.jsxs)("div",{className:"section-header",children:[(0,m.jsxs)("div",{children:[m.jsx("span",{className:"section-subtitle",children:"PILIHAN KURASI"}),m.jsx("h2",{className:"font-serif section-title",children:"Ruangan Pilihan Minggu Ini"})]}),(0,m.jsxs)("div",{className:"tab-pills-group",children:[m.jsx("button",{className:`tab-pill ${"ALL"===r?"active":""}`,onClick:()=>t("ALL"),children:"Semua Ruangan"}),m.jsx("button",{className:`tab-pill ${"MEETING_ROOM"===r?"active":""}`,onClick:()=>t("MEETING_ROOM"),children:"Meeting Room"}),m.jsx("button",{className:`tab-pill ${"COWORKING_DESK"===r?"active":""}`,onClick:()=>t("COWORKING_DESK"),children:"Hot Desk"}),m.jsx("button",{className:`tab-pill ${"PRIVATE_OFFICE"===r?"active":""}`,onClick:()=>t("PRIVATE_OFFICE"),children:"Private Office"})]})]}),m.jsx("div",{className:"cards-grid",children:c.map(e=>m.jsx(w.p,{ruangan:e},e.id))}),m.jsx("div",{className:"view-all-center",children:(0,m.jsxs)(Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}()),{to:"/ruangan",className:"btn btn-outline btn-lg",children:["Lihat Semua ",e.length," Ruangan ",m.jsx(v.Z,{size:16})]})})]}),m.jsx("section",{className:"features-section",children:(0,m.jsxs)("div",{className:"container",children:[(0,m.jsxs)("div",{className:"text-center",children:[m.jsx("span",{className:"section-subtitle",children:"MENGAPA SONDER"}),m.jsx("h2",{className:"font-serif section-title",children:"Standar Baru Ruang Kerja Modern"})]}),(0,m.jsxs)("div",{className:"features-grid",children:[(0,m.jsxs)("div",{className:"feature-card sonder-card",children:[m.jsx("div",{className:"feature-icon-wrapper",children:m.jsx(j.Z,{size:24})}),m.jsx("h3",{className:"font-serif feature-title",children:"Akses Fleksibel Per Jam"}),m.jsx("p",{className:"feature-desc",children:"Pesan mulai dari 1 jam untuk rapat singkat atau harian penuh tanpa komitmen jangka panjang."})]}),(0,m.jsxs)("div",{className:"feature-card sonder-card",children:[m.jsx("div",{className:"feature-icon-wrapper",children:m.jsx(N,{size:24})}),m.jsx("h3",{className:"font-serif feature-title",children:"Instant QR Check-In"}),m.jsx("p",{className:"feature-desc",children:"Masuk ruangan tanpa antre resepsionis. Tunjukkan E-Ticket QR Code langsung pada scanner."})]}),(0,m.jsxs)("div",{className:"feature-card sonder-card",children:[m.jsx("div",{className:"feature-icon-wrapper",children:m.jsx(y,{size:24})}),m.jsx("h3",{className:"font-serif feature-title",children:"Artisan Coffee & Lounge"}),m.jsx("p",{className:"feature-desc",children:"Nikmati racikan kopi gratis, teh herbal, dan kudapan sehat di lounge bergaya urban."})]})]})]})}),m.jsx("style",{children:`
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
      `})]})},O=(0,n.l)(t,"default"),P=(0,n.l)(t,"getStaticProps"),E=(0,n.l)(t,"getStaticPaths"),z=(0,n.l)(t,"getServerSideProps"),M=(0,n.l)(t,"config"),R=(0,n.l)(t,"reportWebVitals"),A=(0,n.l)(t,"unstable_getStaticProps"),L=(0,n.l)(t,"unstable_getStaticPaths"),C=(0,n.l)(t,"unstable_getStaticParams"),_=(0,n.l)(t,"unstable_getServerProps"),D=(0,n.l)(t,"unstable_getServerSideProps"),I=new s.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/HomePage",pathname:"/HomePage",bundlePath:"",filename:""},components:{App:d(),Document:o()},userland:t})},9737:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]])},8742:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[682,177],()=>r(7022));module.exports=t})();