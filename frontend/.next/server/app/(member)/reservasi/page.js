(()=>{var e={};e.id=440,e.ids=[440],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1946:(e,a,s)=>{"use strict";s.r(a),s.d(a,{GlobalError:()=>l.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>x,tree:()=>o}),s(9194),s(4861),s(5866),s(1506);var r=s(3191),i=s(8716),t=s(7922),l=s.n(t),n=s(5231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);s.d(a,d);let o=["",{children:["(member)",{children:["reservasi",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9194)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\reservasi\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\reservasi\\page.tsx"],m="/(member)/reservasi/page",p={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(member)/reservasi/page",pathname:"/reservasi",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},7589:(e,a,s)=>{Promise.resolve().then(s.bind(s,3286))},3286:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>v});var r=s(326),i=s(7577),t=s(434),l=s(6557);let n=(0,l.Z)("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);var d=s(7358),o=s(9734),c=s(7636),m=s(8998),p=s(2447),x=s(1470);s(2374);var h=s(6135),u=s(4019);let g=(0,l.Z)("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]),b=({reservasi:e,onClose:a})=>e?(0,r.jsxs)("div",{className:"modal-overlay",onClick:a,children:[(0,r.jsxs)("div",{className:"modal-content glass-card",onClick:e=>e.stopPropagation(),children:[(0,r.jsxs)("div",{className:"modal-header",children:[r.jsx("span",{className:"font-serif modal-brand",children:"SONDER E-TICKET"}),r.jsx("button",{className:"modal-close",onClick:a,"aria-label":"Close modal",children:r.jsx(u.Z,{size:20})})]}),r.jsx("div",{className:"modal-body printable-e-ticket",children:(0,r.jsxs)("div",{className:"ticket-card",children:[(0,r.jsxs)("div",{className:"ticket-top",children:[(0,r.jsxs)("div",{className:"ticket-brand-group",children:[r.jsx(o.Z,{size:24,className:"ticket-logo"}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"font-serif ticket-title",children:"Pass Akses Ruangan"}),r.jsx("p",{className:"ticket-subtitle",children:"Sonder Smart Space Booking"})]})]}),r.jsx(h.O,{status:e.status})]}),r.jsx("div",{className:"ticket-divider"}),(0,r.jsxs)("div",{className:"qr-section",children:[r.jsx("div",{className:"qr-box",children:r.jsx("img",{src:e.qrCodeUrl||`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${e.kodeBooking}`,alt:"QR Code Pass",className:"qr-img"})}),(0,r.jsxs)("div",{className:"qr-info",children:[r.jsx("span",{className:"qr-label",children:"Kode Booking E-Ticket"}),r.jsx("span",{className:"qr-code font-mono",children:e.kodeBooking}),(0,r.jsxs)("p",{className:"qr-instruction",children:[r.jsx(p.Z,{size:14,className:"inline-icon"})," Tunjukkan QR Code ini pada scanner kamera di pintu / meja resepsionis untuk check-in otomatis."]})]})]}),r.jsx("div",{className:"ticket-divider"}),(0,r.jsxs)("div",{className:"details-grid",children:[(0,r.jsxs)("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-label",children:"Ruangan"}),r.jsx("span",{className:"detail-val font-serif",children:e.ruangan?.nama||"Ruangan Rapat"})]}),(0,r.jsxs)("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-label",children:"Lokasi"}),(0,r.jsxs)("span",{className:"detail-val",children:[r.jsx(c.Z,{size:14})," ",e.ruangan?.lokasi||"Lantai 1"]})]}),(0,r.jsxs)("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-label",children:"Tanggal Booking"}),(0,r.jsxs)("span",{className:"detail-val",children:[r.jsx(d.Z,{size:14})," ",e.tanggal]})]}),(0,r.jsxs)("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-label",children:"Waktu / Durasi"}),(0,r.jsxs)("span",{className:"detail-val",children:[r.jsx(m.Z,{size:14})," ",e.jamMulai," - ",e.jamSelesai," (",e.durasiJam," Jam)"]})]}),(0,r.jsxs)("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-label",children:"Atas Nama"}),r.jsx("span",{className:"detail-val",children:e.user?.nama||"Member Sonder"})]}),(0,r.jsxs)("div",{className:"detail-item",children:[r.jsx("span",{className:"detail-label",children:"Total Biaya"}),(0,r.jsxs)("span",{className:"detail-val font-mono price-val",children:["Rp ",e.totalHarga.toLocaleString("id-ID")]})]})]})]})}),(0,r.jsxs)("div",{className:"modal-actions",children:[r.jsx("button",{className:"btn btn-outline btn-sm",onClick:a,children:"Tutup"}),(0,r.jsxs)("button",{className:"btn btn-primary btn-sm",onClick:()=>{window.print()},children:[r.jsx(g,{size:16})," Cetak E-Ticket"]})]})]}),r.jsx("style",{children:`
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

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
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
      `})]}):null;function v(){let[e,a]=(0,i.useState)([]),[s,l]=(0,i.useState)("ALL"),[u,g]=(0,i.useState)(null),v=e=>{confirm("Apakah Anda yakin ingin membatalkan reservasi ini?")&&a(a=>a.map(a=>a.id===e?{...a,status:"DIBATALKAN"}:a))},j="ALL"===s?e:e.filter(e=>e.status===s);return(0,r.jsxs)("div",{className:"container history-page-root",children:[(0,r.jsxs)("div",{className:"history-header",children:[(0,r.jsxs)("div",{children:[r.jsx("span",{className:"section-subtitle",children:"DASHBOARD MEMBER"}),r.jsx("h1",{className:"font-serif history-title",children:"Riwayat Reservasi Anda"}),r.jsx("p",{className:"history-desc",children:"Kelola pass ruangan, cetak E-Ticket QR Code, atau batalkan jadwal booking Anda."})]}),(0,r.jsxs)(t.default,{href:"/ruangan",className:"btn btn-primary btn-md",children:[r.jsx(n,{size:16})," Buat Reservasi Baru"]})]}),(0,r.jsxs)("div",{className:"status-tabs-row",children:[(0,r.jsxs)("button",{className:`tab-btn ${"ALL"===s?"active":""}`,onClick:()=>l("ALL"),children:["Semua (",e.length,")"]}),r.jsx("button",{className:`tab-btn ${"DISETUJUI"===s?"active":""}`,onClick:()=>l("DISETUJUI"),children:"Disetujui"}),r.jsx("button",{className:`tab-btn ${"BELUM_DIKONFIRMASI"===s?"active":""}`,onClick:()=>l("BELUM_DIKONFIRMASI"),children:"Pending"}),r.jsx("button",{className:`tab-btn ${"SELESAI"===s?"active":""}`,onClick:()=>l("SELESAI"),children:"Selesai"})]}),0===j.length?(0,r.jsxs)("div",{className:"empty-history sonder-card",children:[r.jsx(d.Z,{size:48,className:"empty-icon"}),r.jsx("h3",{className:"font-serif",children:"Belum Ada Reservasi"}),r.jsx("p",{children:"Anda belum memiliki riwayat reservasi pada kategori ini."})]}):r.jsx("div",{className:"history-list",children:j.map(e=>(0,r.jsxs)("div",{className:"sonder-card reservation-item-card",children:[(0,r.jsxs)("div",{className:"res-card-top",children:[(0,r.jsxs)("div",{className:"res-code-group",children:[r.jsx("span",{className:"res-code-label",children:"Kode Booking"}),r.jsx("span",{className:"res-code font-mono",children:e.kodeBooking})]}),r.jsx(h.O,{status:e.status})]}),(0,r.jsxs)("div",{className:"res-card-body",children:[(0,r.jsxs)("div",{className:"res-room-info",children:[r.jsx(o.Z,{size:24,className:"room-icon"}),(0,r.jsxs)("div",{children:[r.jsx("h3",{className:"font-serif room-title",children:e.ruangan?.nama||"Sonder Suite Room"}),(0,r.jsxs)("p",{className:"room-loc",children:[r.jsx(c.Z,{size:14})," ",e.ruangan?.lokasi]})]})]}),(0,r.jsxs)("div",{className:"res-timing-grid",children:[(0,r.jsxs)("div",{className:"timing-item",children:[r.jsx(d.Z,{size:14})," Tanggal: ",r.jsx("strong",{children:e.tanggal})]}),(0,r.jsxs)("div",{className:"timing-item",children:[r.jsx(m.Z,{size:14})," Waktu Sesi: ",(0,r.jsxs)("strong",{children:[e.jamMulai," - ",e.jamSelesai," (",e.durasiJam," Jam)"]})]})]}),(0,r.jsxs)("div",{className:"res-price font-mono",children:["Rp ",e.totalHarga.toLocaleString("id-ID")]})]}),(0,r.jsxs)("div",{className:"res-card-actions",children:["DISETUJUI"===e.status||"AKTIF"===e.status?(0,r.jsxs)("button",{className:"btn btn-primary btn-sm",onClick:()=>g(e),children:[r.jsx(p.Z,{size:16})," Lihat Pass & QR E-Ticket"]}):null,"BELUM_DIKONFIRMASI"===e.status||"DISETUJUI"===e.status?(0,r.jsxs)("button",{className:"btn btn-outline btn-sm cancel-btn",onClick:()=>v(e.id),children:[r.jsx(x.Z,{size:16})," Batalkan Booking"]}):null]})]},e.id))}),r.jsx(b,{reservasi:u,onClose:()=>g(null)}),r.jsx("style",{children:`
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

        .empty-history {
          padding: 4rem 2rem;
          text-align: center;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .res-card-body { grid-template-columns: 1fr; gap: 1rem; }
          .res-price { text-align: left; }
        }
      `})]})}},6135:(e,a,s)=>{"use strict";s.d(a,{O:()=>c});var r=s(326);s(7577);var i=s(8998),t=s(2179),l=s(6234),n=s(7211),d=s(1470);let o=(0,s(6557).Z)("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),c=({status:e})=>{let a=(()=>{switch(e){case"BELUM_DIKONFIRMASI":return{label:"Menunggu Konfirmasi",className:"badge-pending",icon:r.jsx(i.Z,{size:12})};case"DISETUJUI":return{label:"Disetujui",className:"badge-approved",icon:r.jsx(t.Z,{size:12})};case"AKTIF":return{label:"Sesi Aktif",className:"badge-active",icon:r.jsx(l.Z,{size:12})};case"SELESAI":return{label:"Selesai",className:"badge-completed",icon:r.jsx(n.Z,{size:12})};case"DITOLAK":return{label:"Ditolak",className:"badge-rejected",icon:r.jsx(d.Z,{size:12})};case"DIBATALKAN":return{label:"Dibatalkan",className:"badge-rejected",icon:r.jsx(o,{size:12})};default:return{label:e,className:"badge-completed",icon:null}}})();return(0,r.jsxs)("span",{className:`badge-pill ${a.className}`,children:[a.icon,a.label]})}},7358:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},7211:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]])},2179:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8998:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},7636:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},6234:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("PlayCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]])},1470:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]])},9194:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\reservasi\page.tsx#default`)}};var a=require("../../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),r=a.X(0,[278,752,336],()=>s(1946));module.exports=r})();