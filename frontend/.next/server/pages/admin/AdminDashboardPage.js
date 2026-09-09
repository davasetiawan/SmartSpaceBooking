"use strict";(()=>{var e={};e.id=107,e.ids=[107,660],e.modules={551:(e,a,s)=>{s.r(a),s.d(a,{config:()=>M,default:()=>N,getServerSideProps:()=>P,getStaticPaths:()=>S,getStaticProps:()=>k,reportWebVitals:()=>w,routeModule:()=>T,unstable_getServerProps:()=>Z,unstable_getServerSideProps:()=>B,unstable_getStaticParams:()=>D,unstable_getStaticPaths:()=>z,unstable_getStaticProps:()=>R});var r={};s.r(r),s.d(r,{AdminDashboardPage:()=>y});var i=s(7093),t=s(5244),d=s(1323),l=s(1682),n=s.n(l),c=s(8141),o=s.n(c),m=s(997),h=s(6689),x=s(1);let p=(0,x.Z)("CalendarCheck",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]]),g=(0,x.Z)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);var b=s(1036),j=s(7871),v=s(6286),u=s(9847),f=s(2028);let y=()=>{let[e,a]=(0,h.useState)(null),[s,r]=(0,h.useState)([]);(0,h.useEffect)(()=>{u.hi.getAdminMetrics().then(a),u.hi.getReservasi().then(e=>r(e.slice(0,5)))},[]);let i=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e);return(0,m.jsxs)("div",{className:"admin-dashboard-root",children:[m.jsx("div",{className:"dashboard-header",children:(0,m.jsxs)("div",{children:[m.jsx("h1",{className:"font-serif dashboard-title",children:"Overview Dashboard Admin"}),m.jsx("p",{className:"dashboard-desc",children:"Ringkasan kinerja reservasi, statistik keuangan, dan aktivitas ruangan hari ini."})]})}),(0,m.jsxs)("div",{className:"metrics-grid",children:[(0,m.jsxs)("div",{className:"sonder-card metric-card",children:[m.jsx("div",{className:"metric-icon-box navy",children:m.jsx(p,{size:20})}),(0,m.jsxs)("div",{children:[m.jsx("span",{className:"metric-label",children:"Total Reservasi"}),m.jsx("div",{className:"metric-val font-mono",children:e?.totalReservasi||128}),(0,m.jsxs)("span",{className:"metric-sub text-green",children:[m.jsx(g,{size:12})," +14.2% minggu ini"]})]})]}),(0,m.jsxs)("div",{className:"sonder-card metric-card",children:[m.jsx("div",{className:"metric-icon-box gold",children:m.jsx(b.Z,{size:20})}),(0,m.jsxs)("div",{children:[m.jsx("span",{className:"metric-label",children:"Total Pendapatan"}),m.jsx("div",{className:"metric-val font-mono",children:i(e?.totalPendapatan||485e5)}),(0,m.jsxs)("span",{className:"metric-sub text-green",children:[m.jsx(g,{size:12})," +8.5% bulan ini"]})]})]}),(0,m.jsxs)("div",{className:"sonder-card metric-card",children:[m.jsx("div",{className:"metric-icon-box teal",children:m.jsx(j.Z,{size:20})}),(0,m.jsxs)("div",{children:[m.jsx("span",{className:"metric-label",children:"Tingkat Okupansi"}),(0,m.jsxs)("div",{className:"metric-val font-mono",children:[e?.tingkatOkupansi||84.5,"%"]}),m.jsx("span",{className:"metric-sub",children:"8 Ruangan Aktif"})]})]}),(0,m.jsxs)("div",{className:"sonder-card metric-card",children:[m.jsx("div",{className:"metric-icon-box gold",children:m.jsx(v.Z,{size:20})}),(0,m.jsxs)("div",{children:[m.jsx("span",{className:"metric-label",children:"Total Member"}),m.jsx("div",{className:"metric-val font-mono",children:e?.totalMember||340}),m.jsx("span",{className:"metric-sub",children:"Pengguna Terverifikasi"})]})]})]}),(0,m.jsxs)("div",{className:"charts-grid mt-2",children:[(0,m.jsxs)("div",{className:"sonder-card chart-card",children:[(0,m.jsxs)("div",{className:"card-header-bar",children:[m.jsx("h3",{className:"font-serif chart-title",children:"Tren Reservasi Harian"}),m.jsx("span",{className:"badge-pill badge-approved font-mono",children:"7 Hari Terakhir"})]}),(0,m.jsxs)("div",{className:"chart-bar-container",children:[(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar",style:{height:"60%"}}),m.jsx("span",{children:"Sen"})]}),(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar",style:{height:"80%"}}),m.jsx("span",{children:"Sel"})]}),(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar",style:{height:"45%"}}),m.jsx("span",{children:"Rab"})]}),(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar",style:{height:"95%"}}),m.jsx("span",{children:"Kam"})]}),(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar",style:{height:"70%"}}),m.jsx("span",{children:"Jum"})]}),(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar active",style:{height:"100%"}}),m.jsx("span",{children:"Sab"})]}),(0,m.jsxs)("div",{className:"bar-group",children:[m.jsx("div",{className:"bar",style:{height:"65%"}}),m.jsx("span",{children:"Ming"})]})]})]}),(0,m.jsxs)("div",{className:"sonder-card chart-card",children:[(0,m.jsxs)("div",{className:"card-header-bar",children:[m.jsx("h3",{className:"font-serif chart-title",children:"Proporsi Distribusi Ruangan"}),m.jsx("span",{className:"badge-pill badge-active font-mono",children:"Kategori"})]}),(0,m.jsxs)("div",{className:"distribution-list",children:[(0,m.jsxs)("div",{className:"dist-item",children:[m.jsx("span",{children:"Meeting Rooms (45%)"}),m.jsx("div",{className:"dist-bar",children:m.jsx("div",{className:"dist-fill",style:{width:"45%",background:"#C9A96E"}})})]}),(0,m.jsxs)("div",{className:"dist-item",children:[m.jsx("span",{children:"Hot Desks (30%)"}),m.jsx("div",{className:"dist-bar",children:m.jsx("div",{className:"dist-fill",style:{width:"30%",background:"#10B981"}})})]}),(0,m.jsxs)("div",{className:"dist-item",children:[m.jsx("span",{children:"Private Office (15%)"}),m.jsx("div",{className:"dist-bar",children:m.jsx("div",{className:"dist-fill",style:{width:"15%",background:"#3B82F6"}})})]}),(0,m.jsxs)("div",{className:"dist-item",children:[m.jsx("span",{children:"Event Space (10%)"}),m.jsx("div",{className:"dist-bar",children:m.jsx("div",{className:"dist-fill",style:{width:"10%",background:"#6B7280"}})})]})]})]})]}),(0,m.jsxs)("div",{className:"table-section mt-2",children:[m.jsx("div",{className:"card-header-bar mb-1",children:m.jsx("h3",{className:"font-serif chart-title",children:"Reservasi Terbaru Masuk"})}),m.jsx("div",{className:"custom-table-container",children:(0,m.jsxs)("table",{className:"custom-table",children:[m.jsx("thead",{children:(0,m.jsxs)("tr",{children:[m.jsx("th",{children:"Kode Booking"}),m.jsx("th",{children:"Member"}),m.jsx("th",{children:"Ruangan"}),m.jsx("th",{children:"Tanggal & Sesi"}),m.jsx("th",{children:"Total Biaya"}),m.jsx("th",{children:"Status"})]})}),m.jsx("tbody",{children:s.map(e=>(0,m.jsxs)("tr",{children:[m.jsx("td",{className:"font-mono font-bold",children:e.kodeBooking}),m.jsx("td",{children:e.user?.nama||"Alexander Wright"}),m.jsx("td",{children:e.ruangan?.nama||"Sonder Room"}),(0,m.jsxs)("td",{children:[e.tanggal," (",e.jamMulai," - ",e.jamSelesai,")"]}),m.jsx("td",{className:"font-mono",children:i(e.totalHarga)}),m.jsx("td",{children:m.jsx(f.O,{status:e.status})})]},e.id))})]})})]}),m.jsx("style",{children:`
        .admin-dashboard-root {
          padding-bottom: 2rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }
        .dashboard-title {
          font-size: 2.25rem;
          color: var(--color-primary);
        }
        .dashboard-desc {
          color: var(--text-secondary);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .metric-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .metric-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .metric-icon-box.navy { background: #EEF2FF; color: #3B82F6; }
        .metric-icon-box.gold { background: var(--color-accent-light); color: var(--color-accent-hover); }
        .metric-icon-box.teal { background: #EBF5F0; color: #10B981; }

        .metric-label {
          font-size: 0.775rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        .metric-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-primary);
        }
        .metric-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .text-green { color: #10B981; }

        .charts-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 1.5rem;
        }
        .chart-card {
          padding: 1.5rem;
        }
        .card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .chart-title {
          font-size: 1.25rem;
        }

        .chart-bar-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 180px;
          padding: 1rem 0;
        }
        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
          justify-content: flex-end;
          flex: 1;
        }
        .bar {
          width: 28px;
          background: #E8E4DF;
          border-radius: 6px;
          transition: height 500ms ease;
        }
        .bar.active {
          background: var(--color-accent);
        }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-top: 0.5rem;
        }
        .dist-item {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .dist-bar {
          height: 10px;
          background: var(--border-color);
          border-radius: 5px;
          overflow: hidden;
          margin-top: 0.35rem;
        }
        .dist-fill {
          height: 100%;
        }

        .mt-2 { margin-top: 2rem; }
        .mb-1 { margin-bottom: 1rem; }

        @media (max-width: 1024px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
          .charts-grid { grid-template-columns: 1fr; }
        }
      `})]})},N=(0,d.l)(r,"default"),k=(0,d.l)(r,"getStaticProps"),S=(0,d.l)(r,"getStaticPaths"),P=(0,d.l)(r,"getServerSideProps"),M=(0,d.l)(r,"config"),w=(0,d.l)(r,"reportWebVitals"),R=(0,d.l)(r,"unstable_getStaticProps"),z=(0,d.l)(r,"unstable_getStaticPaths"),D=(0,d.l)(r,"unstable_getStaticParams"),Z=(0,d.l)(r,"unstable_getServerProps"),B=(0,d.l)(r,"unstable_getServerSideProps"),T=new i.PagesRouteModule({definition:{kind:t.x.PAGES,page:"/admin/AdminDashboardPage",pathname:"/admin/AdminDashboardPage",bundlePath:"",filename:""},components:{App:o(),Document:n()},userland:r})},7871:(e,a,s)=>{s.d(a,{Z:()=>r});let r=(0,s(1).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},1036:(e,a,s)=>{s.d(a,{Z:()=>r});let r=(0,s(1).Z)("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]])},6286:(e,a,s)=>{s.d(a,{Z:()=>r});let r=(0,s(1).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),r=a.X(0,[682,791],()=>s(551));module.exports=r})();