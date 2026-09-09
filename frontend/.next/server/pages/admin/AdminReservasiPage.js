"use strict";(()=>{var e={};e.id=929,e.ids=[929,660],e.modules={527:(e,a,s)=>{s.r(a),s.d(a,{config:()=>A,default:()=>f,getServerSideProps:()=>P,getStaticPaths:()=>N,getStaticProps:()=>S,reportWebVitals:()=>y,routeModule:()=>F,unstable_getServerProps:()=>D,unstable_getServerSideProps:()=>L,unstable_getStaticParams:()=>E,unstable_getStaticPaths:()=>I,unstable_getStaticProps:()=>C});var t={};s.r(t),s.d(t,{AdminReservasiPage:()=>k});var r=s(7093),l=s(5244),n=s(1323),i=s(1682),o=s.n(i),c=s(8141),d=s.n(c),u=s(997),m=s(6689),h=s(3487);let x=(0,s(1).Z)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);var p=s(2972),g=s(235),b=s(8703),j=s(9847),v=s(2028);let k=()=>{let[e,a]=(0,m.useState)([]),[s,t]=(0,m.useState)(""),[r,l]=(0,m.useState)("ALL"),[n,i]=(0,m.useState)(null),[o,c]=(0,m.useState)("");(0,m.useEffect)(()=>{j.hi.getReservasi().then(a)},[]);let d=e=>{a(a=>a.map(a=>a.id===e?{...a,status:"DISETUJUI"}:a))},k=e=>{a(a=>a.map(a=>a.id===e?{...a,status:"AKTIF",checkedInAt:new Date().toLocaleTimeString()}:a))},f=e=>{a(a=>a.map(a=>a.id===e?{...a,status:"SELESAI",checkedOutAt:new Date().toLocaleTimeString()}:a))},S=e.filter(e=>{let a="ALL"===r||e.status===r,t=!s||e.kodeBooking.toLowerCase().includes(s.toLowerCase())||(e.user?.nama||"").toLowerCase().includes(s.toLowerCase());return a&&t}),N=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e);return(0,u.jsxs)("div",{className:"admin-reservasi-root",children:[u.jsx("div",{className:"page-header",children:(0,u.jsxs)("div",{children:[u.jsx("h1",{className:"font-serif page-title",children:"Kelola & Persetujuan Reservasi"}),u.jsx("p",{className:"page-desc",children:"Verifikasi reservasi pending, setujui/tolak pesanan, dan atur check-in/out ruangan."})]})}),(0,u.jsxs)("div",{className:"filter-bar sonder-card",children:[(0,u.jsxs)("div",{className:"search-field-box",children:[u.jsx(h.Z,{size:16,className:"s-icon"}),u.jsx("input",{type:"text",placeholder:"Cari kode booking atau nama member...",value:s,onChange:e=>t(e.target.value)})]}),(0,u.jsxs)("div",{className:"filter-status-group",children:[u.jsx("label",{children:"Status:"}),(0,u.jsxs)("select",{value:r,onChange:e=>l(e.target.value),children:[u.jsx("option",{value:"ALL",children:"Semua Status"}),u.jsx("option",{value:"BELUM_DIKONFIRMASI",children:"Pending Approval"}),u.jsx("option",{value:"DISETUJUI",children:"Disetujui"}),u.jsx("option",{value:"AKTIF",children:"Sesi Aktif"}),u.jsx("option",{value:"SELESAI",children:"Selesai"}),u.jsx("option",{value:"DITOLAK",children:"Ditolak"})]})]})]}),u.jsx("div",{className:"custom-table-container",children:(0,u.jsxs)("table",{className:"custom-table",children:[u.jsx("thead",{children:(0,u.jsxs)("tr",{children:[u.jsx("th",{children:"Kode Booking"}),u.jsx("th",{children:"Pemesan / Member"}),u.jsx("th",{children:"Ruangan"}),u.jsx("th",{children:"Tanggal & Sesi"}),u.jsx("th",{children:"Total Biaya"}),u.jsx("th",{children:"Status"}),u.jsx("th",{children:"Aksi Pengelolaan Admin"})]})}),u.jsx("tbody",{children:S.map(e=>(0,u.jsxs)("tr",{children:[u.jsx("td",{className:"font-mono font-bold",children:e.kodeBooking}),u.jsx("td",{children:(0,u.jsxs)("div",{className:"user-cell",children:[u.jsx("strong",{children:e.user?.nama||"Alexander Wright"}),u.jsx("small",{children:e.user?.email||"alex@example.com"})]})}),u.jsx("td",{children:e.ruangan?.nama||"Sonder Suite"}),u.jsx("td",{children:(0,u.jsxs)("div",{className:"time-cell",children:[u.jsx("span",{children:e.tanggal}),(0,u.jsxs)("small",{className:"font-mono",children:[e.jamMulai," - ",e.jamSelesai," (",e.durasiJam," Jam)"]})]})}),u.jsx("td",{className:"font-mono",children:N(e.totalHarga)}),u.jsx("td",{children:u.jsx(v.O,{status:e.status})}),u.jsx("td",{children:(0,u.jsxs)("div",{className:"action-buttons-cell",children:["BELUM_DIKONFIRMASI"===e.status&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("button",{className:"btn-icon approve",title:"Setujui Booking",onClick:()=>d(e.id),children:[u.jsx(x,{size:16})," Setujui"]}),(0,u.jsxs)("button",{className:"btn-icon reject",title:"Tolak Booking",onClick:()=>i(e),children:[u.jsx(p.Z,{size:16})," Tolak"]})]}),"DISETUJUI"===e.status&&(0,u.jsxs)("button",{className:"btn-icon checkin",title:"Proses Check-In",onClick:()=>k(e.id),children:[u.jsx(g.Z,{size:16})," Check-In"]}),"AKTIF"===e.status&&(0,u.jsxs)("button",{className:"btn-icon checkout",title:"Proses Check-Out",onClick:()=>f(e.id),children:[u.jsx(b.Z,{size:16})," Check-Out"]}),"SELESAI"===e.status&&u.jsx("span",{className:"text-muted-sm",children:"Selesai"})]})})]},e.id))})]})}),n&&u.jsx("div",{className:"modal-overlay",onClick:()=>i(null),children:(0,u.jsxs)("div",{className:"modal-content glass-card",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)("div",{className:"modal-header",children:[u.jsx("h3",{className:"font-serif",children:"Alasan Penolakan Reservasi"}),u.jsx("button",{onClick:()=>i(null),children:u.jsx(p.Z,{size:20})})]}),(0,u.jsxs)("div",{className:"modal-body",children:[(0,u.jsxs)("p",{className:"reject-sub",children:["Kode Booking: ",u.jsx("strong",{children:n.kodeBooking})]}),(0,u.jsxs)("div",{className:"form-group",children:[u.jsx("label",{className:"form-label",children:"Tuliskan Alasan Penolakan untuk Member"}),u.jsx("textarea",{className:"form-control",rows:4,placeholder:"Contoh: Bukti pembayaran tidak valid / jadwal ruangan bentrok...",value:o,onChange:e=>c(e.target.value)})]})]}),(0,u.jsxs)("div",{className:"modal-actions",children:[u.jsx("button",{className:"btn btn-outline btn-sm",onClick:()=>i(null),children:"Batal"}),u.jsx("button",{className:"btn btn-primary btn-sm btn-danger",onClick:()=>{n&&(a(e=>e.map(e=>e.id===n.id?{...e,status:"DITOLAK",alasanPenolakan:o||"Ruangan sedang dalam perbaikan / jadwal bertabrakan"}:e)),i(null),c(""))},children:"Konfirmasi Tolak"})]})]})}),u.jsx("style",{children:`
        .admin-reservasi-root { padding-bottom: 2rem; }

        .page-header { margin-bottom: 1.5rem; }
        .page-title { font-size: 2.25rem; color: var(--color-primary); }
        .page-desc { color: var(--text-secondary); }

        .filter-bar {
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .search-field-box {
          position: relative;
          flex: 1;
        }
        .s-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); }
        .search-field-box input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color);
          outline: none;
        }

        .filter-status-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
        }
        .filter-status-group select {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-pill);
          border: 1px solid var(--border-color);
          font-weight: 600;
        }

        .user-cell, .time-cell {
          display: flex;
          flex-direction: column;
        }
        .user-cell small, .time-cell small {
          color: var(--text-secondary);
        }

        .action-buttons-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .btn-icon {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--border-radius-pill);
          font-size: 0.775rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-icon.approve { background: #D1FAE5; color: #065F46; border: none; }
        .btn-icon.reject { background: #FEE2E2; color: #991B1B; border: none; }
        .btn-icon.checkin { background: #DBEAFE; color: #1E40AF; border: none; }
        .btn-icon.checkout { background: #F3F4F6; color: #1F2937; border: none; }

        .btn-danger { background: #DC2626; border-color: #DC2626; color: #ffffff; }
        .text-muted-sm { font-size: 0.8rem; color: var(--text-tertiary); }
      `})]})},f=(0,n.l)(t,"default"),S=(0,n.l)(t,"getStaticProps"),N=(0,n.l)(t,"getStaticPaths"),P=(0,n.l)(t,"getServerSideProps"),A=(0,n.l)(t,"config"),y=(0,n.l)(t,"reportWebVitals"),C=(0,n.l)(t,"unstable_getStaticProps"),I=(0,n.l)(t,"unstable_getStaticPaths"),E=(0,n.l)(t,"unstable_getStaticParams"),D=(0,n.l)(t,"unstable_getServerProps"),L=(0,n.l)(t,"unstable_getServerSideProps"),F=new r.PagesRouteModule({definition:{kind:l.x.PAGES,page:"/admin/AdminReservasiPage",pathname:"/admin/AdminReservasiPage",bundlePath:"",filename:""},components:{App:d(),Document:o()},userland:t})},3487:(e,a,s)=>{s.d(a,{Z:()=>t});let t=(0,s(1).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},2972:(e,a,s)=>{s.d(a,{Z:()=>t});let t=(0,s(1).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),t=a.X(0,[682,791],()=>s(527));module.exports=t})();