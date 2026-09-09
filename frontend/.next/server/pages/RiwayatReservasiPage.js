"use strict";(()=>{var e={};e.id=701,e.ids=[701,660],e.modules={4437:(e,a,r)=>{r.r(a),r.d(a,{config:()=>C,default:()=>z,getServerSideProps:()=>q,getStaticPaths:()=>R,getStaticProps:()=>P,reportWebVitals:()=>E,routeModule:()=>B,unstable_getServerProps:()=>Z,unstable_getServerSideProps:()=>L,unstable_getStaticParams:()=>I,unstable_getStaticPaths:()=>D,unstable_getStaticProps:()=>A});var s={};r.r(s),r.d(s,{RiwayatReservasiPage:()=>M});var t=r(7093),i=r(5244),l=r(1323),o=r(1682),n=r.n(o),d=r(8141),c=r.n(d),m=r(997),p=r(6689),h=r(1);let x=(0,h.Z)("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);var g=r(2003),v=r(7871),u=r(6919),b=r(8742);let y=(0,h.Z)("QrCode",[["rect",{width:"5",height:"5",x:"3",y:"3",rx:"1",key:"1tu5fj"}],["rect",{width:"5",height:"5",x:"16",y:"3",rx:"1",key:"1v8r4q"}],["rect",{width:"5",height:"5",x:"3",y:"16",rx:"1",key:"1x03jg"}],["path",{d:"M21 16h-3a2 2 0 0 0-2 2v3",key:"177gqh"}],["path",{d:"M21 21v.01",key:"ents32"}],["path",{d:"M12 7v3a2 2 0 0 1-2 2H7",key:"8crl2c"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M12 3h.01",key:"n36tog"}],["path",{d:"M12 16v.01",key:"133mhm"}],["path",{d:"M16 12h1",key:"1slzba"}],["path",{d:"M21 12v.01",key:"1lwtk9"}],["path",{d:"M12 21v-1",key:"1880an"}]]);var j=r(268),f=r(9847),k=r(2028),N=r(2972);let S=(0,h.Z)("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]),w=({reservasi:e,onClose:a})=>e?(0,m.jsxs)("div",{className:"modal-overlay",onClick:a,children:[(0,m.jsxs)("div",{className:"modal-content glass-card",onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)("div",{className:"modal-header",children:[m.jsx("span",{className:"font-serif modal-brand",children:"SONDER E-TICKET"}),m.jsx("button",{className:"modal-close",onClick:a,"aria-label":"Close modal",children:m.jsx(N.Z,{size:20})})]}),m.jsx("div",{className:"modal-body printable-e-ticket",children:(0,m.jsxs)("div",{className:"ticket-card",children:[(0,m.jsxs)("div",{className:"ticket-top",children:[(0,m.jsxs)("div",{className:"ticket-brand-group",children:[m.jsx(v.Z,{size:24,className:"ticket-logo"}),(0,m.jsxs)("div",{children:[m.jsx("h3",{className:"font-serif ticket-title",children:"Pass Akses Ruangan"}),m.jsx("p",{className:"ticket-subtitle",children:"Sonder Smart Space Booking"})]})]}),m.jsx(k.O,{status:e.status})]}),m.jsx("div",{className:"ticket-divider"}),(0,m.jsxs)("div",{className:"qr-section",children:[m.jsx("div",{className:"qr-box",children:m.jsx("img",{src:e.qrCodeUrl||`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${e.kodeBooking}`,alt:"QR Code Pass",className:"qr-img"})}),(0,m.jsxs)("div",{className:"qr-info",children:[m.jsx("span",{className:"qr-label",children:"Kode Booking E-Ticket"}),m.jsx("span",{className:"qr-code font-mono",children:e.kodeBooking}),(0,m.jsxs)("p",{className:"qr-instruction",children:[m.jsx(y,{size:14,className:"inline-icon"})," Tunjukkan QR Code ini pada scanner kamera di pintu / meja resepsionis untuk check-in otomatis."]})]})]}),m.jsx("div",{className:"ticket-divider"}),(0,m.jsxs)("div",{className:"details-grid",children:[(0,m.jsxs)("div",{className:"detail-item",children:[m.jsx("span",{className:"detail-label",children:"Ruangan"}),m.jsx("span",{className:"detail-val font-serif",children:e.ruangan?.nama||"Ruangan Rapat"})]}),(0,m.jsxs)("div",{className:"detail-item",children:[m.jsx("span",{className:"detail-label",children:"Lokasi"}),(0,m.jsxs)("span",{className:"detail-val",children:[m.jsx(u.Z,{size:14})," ",e.ruangan?.lokasi||"Lantai 1"]})]}),(0,m.jsxs)("div",{className:"detail-item",children:[m.jsx("span",{className:"detail-label",children:"Tanggal Booking"}),(0,m.jsxs)("span",{className:"detail-val",children:[m.jsx(g.Z,{size:14})," ",e.tanggal]})]}),(0,m.jsxs)("div",{className:"detail-item",children:[m.jsx("span",{className:"detail-label",children:"Waktu / Durasi"}),(0,m.jsxs)("span",{className:"detail-val",children:[m.jsx(b.Z,{size:14})," ",e.jamMulai," - ",e.jamSelesai," (",e.durasiJam," Jam)"]})]}),(0,m.jsxs)("div",{className:"detail-item",children:[m.jsx("span",{className:"detail-label",children:"Atas Nama"}),m.jsx("span",{className:"detail-val",children:e.user?.nama||"Member Sonder"})]}),(0,m.jsxs)("div",{className:"detail-item",children:[m.jsx("span",{className:"detail-label",children:"Total Biaya"}),(0,m.jsxs)("span",{className:"detail-val font-mono price-val",children:["Rp ",e.totalHarga.toLocaleString("id-ID")]})]})]})]})}),(0,m.jsxs)("div",{className:"modal-actions",children:[m.jsx("button",{className:"btn btn-outline btn-sm",onClick:a,children:"Tutup"}),(0,m.jsxs)("button",{className:"btn btn-primary btn-sm",onClick:()=>{window.print()},children:[m.jsx(S,{size:16})," Cetak E-Ticket"]})]})]}),m.jsx("style",{children:`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-modal-overlay);
          z-index: var(--z-modal-overlay);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          width: 100%;
          max-width: 520px;
          background: var(--bg-card);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
          animation: slideUp 250ms ease-out forwards;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }
        .modal-brand {
          font-size: 1.1rem;
          color: var(--color-primary);
          letter-spacing: 0.05em;
        }
        .modal-close {
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }
        .modal-close:hover {
          color: var(--text-primary);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .ticket-card {
          background: #FFFFFF;
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
        }

        .ticket-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ticket-brand-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ticket-logo {
          color: var(--color-accent);
        }
        .ticket-title {
          font-size: 1.15rem;
          margin-bottom: 0.1rem;
        }
        .ticket-subtitle {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .ticket-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.25rem 0;
        }

        .qr-section {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .qr-box {
          width: 120px;
          height: 120px;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius-md);
          background: #ffffff;
          flex-shrink: 0;
        }
        .qr-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .qr-info {
          display: flex;
          flex-direction: column;
        }
        .qr-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        .qr-code {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .qr-instruction {
          font-size: 0.775rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .inline-icon {
          display: inline;
          vertical-align: middle;
          margin-right: 2px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .detail-label {
          font-size: 0.725rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          display: block;
        }
        .detail-val {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .price-val {
          color: var(--color-accent-hover);
        }

        .modal-actions {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]}):null;!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let M=()=>{let[e,a]=(0,p.useState)([]),[r,s]=(0,p.useState)("ALL"),[t,i]=(0,p.useState)(null);Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())(),(0,p.useEffect)(()=>{f.hi.getReservasi().then(a)},[]);let l=e=>{confirm("Apakah Anda yakin ingin membatalkan reservasi ini?")&&a(a=>a.map(a=>a.id===e?{...a,status:"DIBATALKAN"}:a))},o="ALL"===r?e:e.filter(e=>e.status===r);return(0,m.jsxs)("div",{className:"container history-page-root",children:[(0,m.jsxs)("div",{className:"history-header",children:[(0,m.jsxs)("div",{children:[m.jsx("span",{className:"section-subtitle",children:"DASHBOARD MEMBER"}),m.jsx("h1",{className:"font-serif history-title",children:"Riwayat Reservasi Anda"}),m.jsx("p",{className:"history-desc",children:"Kelola pass ruangan, cetak E-Ticket QR Code, atau batalkan jadwal booking Anda."})]}),(0,m.jsxs)(Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}()),{to:"/ruangan",className:"btn btn-primary btn-md",children:[m.jsx(x,{size:16})," Buat Reservasi Baru"]})]}),(0,m.jsxs)("div",{className:"status-tabs-row",children:[(0,m.jsxs)("button",{className:`tab-btn ${"ALL"===r?"active":""}`,onClick:()=>s("ALL"),children:["Semua (",e.length,")"]}),m.jsx("button",{className:`tab-btn ${"DISETUJUI"===r?"active":""}`,onClick:()=>s("DISETUJUI"),children:"Disetujui"}),m.jsx("button",{className:`tab-btn ${"BELUM_DIKONFIRMASI"===r?"active":""}`,onClick:()=>s("BELUM_DIKONFIRMASI"),children:"Pending"}),m.jsx("button",{className:`tab-btn ${"SELESAI"===r?"active":""}`,onClick:()=>s("SELESAI"),children:"Selesai"})]}),0===o.length?(0,m.jsxs)("div",{className:"empty-history sonder-card",children:[m.jsx(g.Z,{size:48,className:"empty-icon"}),m.jsx("h3",{className:"font-serif",children:"Belum Ada Reservasi"}),m.jsx("p",{children:"Anda belum memiliki riwayat reservasi pada kategori ini."})]}):m.jsx("div",{className:"history-list",children:o.map(e=>(0,m.jsxs)("div",{className:"sonder-card reservation-item-card",children:[(0,m.jsxs)("div",{className:"res-card-top",children:[(0,m.jsxs)("div",{className:"res-code-group",children:[m.jsx("span",{className:"res-code-label",children:"Kode Booking"}),m.jsx("span",{className:"res-code font-mono",children:e.kodeBooking})]}),m.jsx(k.O,{status:e.status})]}),(0,m.jsxs)("div",{className:"res-card-body",children:[(0,m.jsxs)("div",{className:"res-room-info",children:[m.jsx(v.Z,{size:24,className:"room-icon"}),(0,m.jsxs)("div",{children:[m.jsx("h3",{className:"font-serif room-title",children:e.ruangan?.nama||"Sonder Suite Room"}),(0,m.jsxs)("p",{className:"room-loc",children:[m.jsx(u.Z,{size:14})," ",e.ruangan?.lokasi]})]})]}),(0,m.jsxs)("div",{className:"res-timing-grid",children:[(0,m.jsxs)("div",{className:"timing-item",children:[m.jsx(g.Z,{size:14})," Tanggal: ",m.jsx("strong",{children:e.tanggal})]}),(0,m.jsxs)("div",{className:"timing-item",children:[m.jsx(b.Z,{size:14})," Waktu Sesi: ",(0,m.jsxs)("strong",{children:[e.jamMulai," - ",e.jamSelesai," (",e.durasiJam," Jam)"]})]})]}),(0,m.jsxs)("div",{className:"res-price font-mono",children:["Rp ",e.totalHarga.toLocaleString("id-ID")]})]}),(0,m.jsxs)("div",{className:"res-card-actions",children:["DISETUJUI"===e.status||"AKTIF"===e.status?(0,m.jsxs)("button",{className:"btn btn-primary btn-sm",onClick:()=>i(e),children:[m.jsx(y,{size:16})," Lihat Pass & QR E-Ticket"]}):null,"BELUM_DIKONFIRMASI"===e.status||"DISETUJUI"===e.status?(0,m.jsxs)("button",{className:"btn btn-outline btn-sm cancel-btn",onClick:()=>l(e.id),children:[m.jsx(j.Z,{size:16})," Batalkan Booking"]}):null]})]},e.id))}),m.jsx(w,{reservasi:t,onClose:()=>i(null)}),m.jsx("style",{children:`
        .history-page-root {
          padding: 3rem 1.5rem;
        }

        .history-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .history-title {
          font-size: 2.75rem;
          color: var(--color-primary);
        }
        .history-desc {
          color: var(--text-secondary);
        }

        .status-tabs-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }
        .tab-btn {
          padding: 0.5rem 1.25rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .tab-btn.active {
          background: var(--color-primary);
          color: var(--text-inverse);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .reservation-item-card {
          padding: 1.5rem;
        }
        .res-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }
        .res-code-label {
          font-size: 0.725rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          display: block;
        }
        .res-code {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .res-card-body {
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 1fr;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .res-room-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .room-icon {
          color: var(--color-accent);
        }
        .room-title {
          font-size: 1.25rem;
        }
        .room-loc {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .res-timing-grid {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .res-price {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--color-accent-hover);
          text-align: right;
        }

        .res-card-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        .cancel-btn:hover {
          background: rgba(220,38,38,0.1);
          color: #DC2626;
          border-color: #DC2626;
        }

        .empty-history {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--text-secondary);
        }
        .empty-icon {
          color: var(--color-accent);
          margin-bottom: 1rem;
        }

        @media (max-width: 900px) {
          .res-card-body { grid-template-columns: 1fr; gap: 1rem; }
          .res-price { text-align: left; }
        }
      `})]})},z=(0,l.l)(s,"default"),P=(0,l.l)(s,"getStaticProps"),R=(0,l.l)(s,"getStaticPaths"),q=(0,l.l)(s,"getServerSideProps"),C=(0,l.l)(s,"config"),E=(0,l.l)(s,"reportWebVitals"),A=(0,l.l)(s,"unstable_getStaticProps"),D=(0,l.l)(s,"unstable_getStaticPaths"),I=(0,l.l)(s,"unstable_getStaticParams"),Z=(0,l.l)(s,"unstable_getServerProps"),L=(0,l.l)(s,"unstable_getServerSideProps"),B=new t.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/RiwayatReservasiPage",pathname:"/RiwayatReservasiPage",bundlePath:"",filename:""},components:{App:c(),Document:n()},userland:s})},7871:(e,a,r)=>{r.d(a,{Z:()=>s});let s=(0,r(1).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},2003:(e,a,r)=>{r.d(a,{Z:()=>s});let s=(0,r(1).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},6919:(e,a,r)=>{r.d(a,{Z:()=>s});let s=(0,r(1).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},2972:(e,a,r)=>{r.d(a,{Z:()=>s});let s=(0,r(1).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),s=a.X(0,[682,791],()=>r(4437));module.exports=s})();