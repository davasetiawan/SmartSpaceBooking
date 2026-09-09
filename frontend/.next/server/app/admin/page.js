(()=>{var e={};e.id=3,e.ids=[3],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7177:(e,s,a)=>{"use strict";a.r(s),a.d(s,{GlobalError:()=>l.a,__next_app__:()=>h,originalPathname:()=>m,pages:()=>o,routeModule:()=>x,tree:()=>c}),a(8748),a(596),a(1506),a(5866);var r=a(3191),i=a(8716),t=a(7922),l=a.n(t),n=a(5231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);a.d(s,d);let c=["",{children:["admin",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,8748)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\admin\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,596)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\admin\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],o=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\admin\\page.tsx"],m="/admin/page",h={require:a,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/admin/page",pathname:"/admin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},9502:(e,s,a)=>{Promise.resolve().then(a.bind(a,1650))},1650:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>m});var r=a(326),i=a(7577),t=a(1292);let l=(0,a(6557).Z)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);var n=a(1821),d=a(9734),c=a(4061);a(2374);var o=a(6135);function m(){let[e,s]=(0,i.useState)(null),[a,m]=(0,i.useState)([]),h=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e);return(0,r.jsxs)("div",{className:"admin-dashboard-root",children:[r.jsx("div",{className:"dashboard-header",children:(0,r.jsxs)("div",{children:[r.jsx("h1",{className:"font-serif dashboard-title",children:"Overview Dashboard Admin"}),r.jsx("p",{className:"dashboard-desc",children:"Ringkasan kinerja reservasi, statistik keuangan, dan aktivitas ruangan hari ini."})]})}),(0,r.jsxs)("div",{className:"metrics-grid",children:[(0,r.jsxs)("div",{className:"sonder-card metric-card",children:[r.jsx("div",{className:"metric-icon-box navy",children:r.jsx(t.Z,{size:20})}),(0,r.jsxs)("div",{children:[r.jsx("span",{className:"metric-label",children:"Total Reservasi"}),r.jsx("div",{className:"metric-val font-mono",children:e?.totalReservasi||128}),(0,r.jsxs)("span",{className:"metric-sub text-green",children:[r.jsx(l,{size:12})," +14.2% minggu ini"]})]})]}),(0,r.jsxs)("div",{className:"sonder-card metric-card",children:[r.jsx("div",{className:"metric-icon-box gold",children:r.jsx(n.Z,{size:20})}),(0,r.jsxs)("div",{children:[r.jsx("span",{className:"metric-label",children:"Total Pendapatan"}),r.jsx("div",{className:"metric-val font-mono",children:h(e?.totalPendapatan||485e5)}),(0,r.jsxs)("span",{className:"metric-sub text-green",children:[r.jsx(l,{size:12})," +8.5% bulan ini"]})]})]}),(0,r.jsxs)("div",{className:"sonder-card metric-card",children:[r.jsx("div",{className:"metric-icon-box teal",children:r.jsx(d.Z,{size:20})}),(0,r.jsxs)("div",{children:[r.jsx("span",{className:"metric-label",children:"Tingkat Okupansi"}),(0,r.jsxs)("div",{className:"metric-val font-mono",children:[e?.tingkatOkupansi||84.5,"%"]}),r.jsx("span",{className:"metric-sub",children:"8 Ruangan Aktif"})]})]}),(0,r.jsxs)("div",{className:"sonder-card metric-card",children:[r.jsx("div",{className:"metric-icon-box gold",children:r.jsx(c.Z,{size:20})}),(0,r.jsxs)("div",{children:[r.jsx("span",{className:"metric-label",children:"Total Member"}),r.jsx("div",{className:"metric-val font-mono",children:e?.totalMember||340}),r.jsx("span",{className:"metric-sub",children:"Pengguna Terverifikasi"})]})]})]}),(0,r.jsxs)("div",{className:"charts-grid mt-2",children:[(0,r.jsxs)("div",{className:"sonder-card chart-card",children:[(0,r.jsxs)("div",{className:"card-header-bar",children:[r.jsx("h3",{className:"font-serif chart-title",children:"Tren Reservasi Harian"}),r.jsx("span",{className:"badge-pill badge-approved font-mono",children:"7 Hari Terakhir"})]}),(0,r.jsxs)("div",{className:"chart-bar-container",children:[(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar",style:{height:"60%"}}),r.jsx("span",{children:"Sen"})]}),(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar",style:{height:"80%"}}),r.jsx("span",{children:"Sel"})]}),(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar",style:{height:"45%"}}),r.jsx("span",{children:"Rab"})]}),(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar",style:{height:"95%"}}),r.jsx("span",{children:"Kam"})]}),(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar",style:{height:"70%"}}),r.jsx("span",{children:"Jum"})]}),(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar active",style:{height:"100%"}}),r.jsx("span",{children:"Sab"})]}),(0,r.jsxs)("div",{className:"bar-group",children:[r.jsx("div",{className:"bar",style:{height:"65%"}}),r.jsx("span",{children:"Ming"})]})]})]}),(0,r.jsxs)("div",{className:"sonder-card chart-card",children:[(0,r.jsxs)("div",{className:"card-header-bar",children:[r.jsx("h3",{className:"font-serif chart-title",children:"Proporsi Distribusi Ruangan"}),r.jsx("span",{className:"badge-pill badge-active font-mono",children:"Kategori"})]}),(0,r.jsxs)("div",{className:"distribution-list",children:[(0,r.jsxs)("div",{className:"dist-item",children:[r.jsx("span",{children:"Meeting Rooms (45%)"}),r.jsx("div",{className:"dist-bar",children:r.jsx("div",{className:"dist-fill",style:{width:"45%",background:"#C9A96E"}})})]}),(0,r.jsxs)("div",{className:"dist-item",children:[r.jsx("span",{children:"Hot Desks (30%)"}),r.jsx("div",{className:"dist-bar",children:r.jsx("div",{className:"dist-fill",style:{width:"30%",background:"#10B981"}})})]}),(0,r.jsxs)("div",{className:"dist-item",children:[r.jsx("span",{children:"Private Office (15%)"}),r.jsx("div",{className:"dist-bar",children:r.jsx("div",{className:"dist-fill",style:{width:"15%",background:"#3B82F6"}})})]}),(0,r.jsxs)("div",{className:"dist-item",children:[r.jsx("span",{children:"Event Space (10%)"}),r.jsx("div",{className:"dist-bar",children:r.jsx("div",{className:"dist-fill",style:{width:"10%",background:"#6B7280"}})})]})]})]})]}),(0,r.jsxs)("div",{className:"table-section mt-2",children:[r.jsx("div",{className:"card-header-bar mb-1",children:r.jsx("h3",{className:"font-serif chart-title",children:"Reservasi Terbaru Masuk"})}),r.jsx("div",{className:"custom-table-container",children:(0,r.jsxs)("table",{className:"custom-table",children:[r.jsx("thead",{children:(0,r.jsxs)("tr",{children:[r.jsx("th",{children:"Kode Booking"}),r.jsx("th",{children:"Member"}),r.jsx("th",{children:"Ruangan"}),r.jsx("th",{children:"Tanggal & Sesi"}),r.jsx("th",{children:"Total Biaya"}),r.jsx("th",{children:"Status"})]})}),r.jsx("tbody",{children:a.map(e=>(0,r.jsxs)("tr",{children:[r.jsx("td",{className:"font-mono font-bold",children:e.kodeBooking}),r.jsx("td",{children:e.user?.nama||"Alexander Wright"}),r.jsx("td",{children:e.ruangan?.nama||"Sonder Room"}),(0,r.jsxs)("td",{children:[e.tanggal," (",e.jamMulai," - ",e.jamSelesai,")"]}),r.jsx("td",{className:"font-mono",children:h(e.totalHarga)}),r.jsx("td",{children:r.jsx(o.O,{status:e.status})})]},e.id))})]})})]}),r.jsx("style",{children:`
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
      `})]})}},6135:(e,s,a)=>{"use strict";a.d(s,{O:()=>o});var r=a(326);a(7577);var i=a(8998),t=a(2179),l=a(6234),n=a(7211),d=a(1470);let c=(0,a(6557).Z)("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),o=({status:e})=>{let s=(()=>{switch(e){case"BELUM_DIKONFIRMASI":return{label:"Menunggu Konfirmasi",className:"badge-pending",icon:r.jsx(i.Z,{size:12})};case"DISETUJUI":return{label:"Disetujui",className:"badge-approved",icon:r.jsx(t.Z,{size:12})};case"AKTIF":return{label:"Sesi Aktif",className:"badge-active",icon:r.jsx(l.Z,{size:12})};case"SELESAI":return{label:"Selesai",className:"badge-completed",icon:r.jsx(n.Z,{size:12})};case"DITOLAK":return{label:"Ditolak",className:"badge-rejected",icon:r.jsx(d.Z,{size:12})};case"DIBATALKAN":return{label:"Dibatalkan",className:"badge-rejected",icon:r.jsx(c,{size:12})};default:return{label:e,className:"badge-completed",icon:null}}})();return(0,r.jsxs)("span",{className:`badge-pill ${s.className}`,children:[s.icon,s.label]})}},7211:(e,s,a)=>{"use strict";a.d(s,{Z:()=>r});let r=(0,a(6557).Z)("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]])},2179:(e,s,a)=>{"use strict";a.d(s,{Z:()=>r});let r=(0,a(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8998:(e,s,a)=>{"use strict";a.d(s,{Z:()=>r});let r=(0,a(6557).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},1821:(e,s,a)=>{"use strict";a.d(s,{Z:()=>r});let r=(0,a(6557).Z)("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]])},6234:(e,s,a)=>{"use strict";a.d(s,{Z:()=>r});let r=(0,a(6557).Z)("PlayCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]])},1470:(e,s,a)=>{"use strict";a.d(s,{Z:()=>r});let r=(0,a(6557).Z)("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]])},8748:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>r});let r=(0,a(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\admin\page.tsx#default`)}};var s=require("../../webpack-runtime.js");s.C(e);var a=e=>s(s.s=e),r=s.X(0,[278,752,540],()=>a(7177));module.exports=r})();