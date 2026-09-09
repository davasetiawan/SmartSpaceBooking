"use strict";exports.id=177,exports.ids=[177],exports.modules={1323:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,r){return r in a?a[r]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,r)):"function"==typeof a&&"default"===r?a:void 0}}})},1:(e,a,r)=>{r.d(a,{Z:()=>n});var t=r(6689),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),n=(e,a)=>{let r=(0,t.forwardRef)(({color:r="currentColor",size:n=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:c="",children:d,...u},m)=>(0,t.createElement)("svg",{ref:m,...i,width:n,height:n,stroke:r,strokeWidth:l?24*Number(o)/Number(n):o,className:["lucide",`lucide-${s(e)}`,c].join(" "),...u},[...a.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(d)?d:[d]]));return r.displayName=`${e}`,r}},6179:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},5489:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},6919:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},3487:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},1773:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},6286:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},8141:(e,a,r)=>{Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let t=r(167),i=r(997),s=t._(r(6689)),n=r(5782);async function o(e){let{Component:a,ctx:r}=e;return{pageProps:await (0,n.loadGetInitialProps)(a,r)}}class l extends s.default.Component{render(){let{Component:e,pageProps:a}=this.props;return(0,i.jsx)(e,{...a})}}l.origGetInitialProps=o,l.getInitialProps=o,("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)},9831:(e,a,r)=>{r.d(a,{p:()=>p});var t=r(997),i=r(6689),s=r(1773),n=r(1);let o=(0,n.Z)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]),l=(0,n.Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);var c=r(6919),d=r(6286),u=r(5489),m=r(6179);!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let p=({ruangan:e})=>{let a;let[r,n]=(0,i.useState)(0),p=e.gambarUrl&&e.gambarUrl.length>0?e.gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"];return(0,t.jsxs)("div",{className:"sonder-card space-card-root",children:[(0,t.jsxs)("div",{className:"card-image-wrapper",children:[t.jsx("img",{src:p[r],alt:e.nama,className:"card-image",loading:"lazy"}),(0,t.jsxs)("div",{className:"card-top-badges",children:[t.jsx("span",{className:"badge-pill badge-type",children:(e=>{switch(e){case"MEETING_ROOM":return"Meeting Room";case"COWORKING_DESK":return"Coworking Desk";case"PRIVATE_OFFICE":return"Private Office";case"EVENT_SPACE":return"Event Space";default:return e}})(e.tipe)}),e.rating&&(0,t.jsxs)("span",{className:"badge-pill badge-rating",children:[t.jsx(s.Z,{size:12,fill:"#C9A96E",color:"#C9A96E"})," ",e.rating]})]}),p.length>1&&(0,t.jsxs)(t.Fragment,{children:[t.jsx("button",{className:"carousel-nav prev",onClick:e=>{e.preventDefault(),e.stopPropagation(),n(e=>(e-1+p.length)%p.length)},"aria-label":"Previous image",children:t.jsx(o,{size:16})}),t.jsx("button",{className:"carousel-nav next",onClick:e=>{e.preventDefault(),e.stopPropagation(),n(e=>(e+1)%p.length)},"aria-label":"Next image",children:t.jsx(l,{size:16})}),t.jsx("div",{className:"carousel-dots",children:p.map((e,a)=>t.jsx("span",{className:`dot ${a===r?"active":""}`},a))})]})]}),(0,t.jsxs)("div",{className:"card-body",children:[(0,t.jsxs)("div",{className:"card-meta",children:[(0,t.jsxs)("span",{className:"meta-item",children:[t.jsx(c.Z,{size:14})," ",e.lokasi]}),(0,t.jsxs)("span",{className:"meta-item",children:[t.jsx(d.Z,{size:14})," Maks ",e.kapasitas," Orang"]})]}),t.jsx("h3",{className:"card-title font-serif",children:t.jsx(Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}()),{to:`/ruangan/${e.id}`,children:e.nama})}),t.jsx("p",{className:"card-desc",children:e.deskripsi}),(0,t.jsxs)("div",{className:"card-facilities",children:[e.fasilitas.slice(0,3).map((e,a)=>(0,t.jsxs)("span",{className:"facility-pill",children:[t.jsx(u.Z,{size:12,className:"facility-icon"})," ",e]},a)),e.fasilitas.length>3&&(0,t.jsxs)("span",{className:"facility-pill",children:["+ ",e.fasilitas.length-3," lainnya"]})]}),(0,t.jsxs)("div",{className:"card-footer",children:[(0,t.jsxs)("div",{className:"price-group",children:[t.jsx("span",{className:"price-label",children:"Mulai dari"}),t.jsx("span",{className:"price-amount font-mono",children:(a=e.hargaPerJam,new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(a))}),t.jsx("span",{className:"price-unit",children:"/ jam"})]}),(0,t.jsxs)(Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}()),{to:`/ruangan/${e.id}`,className:"btn btn-primary btn-sm card-btn",children:["Pesan ",t.jsx(m.Z,{size:14})]})]})]}),t.jsx("style",{children:`
        .space-card-root {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-image-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: #E8E4DF;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }
        .space-card-root:hover .card-image {
          transform: scale(1.04);
        }

        .card-top-badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 2;
        }

        .badge-type {
          background: rgba(26, 26, 46, 0.85);
          color: #ffffff;
          backdrop-filter: blur(8px);
        }
        .badge-rating {
          background: rgba(255, 255, 255, 0.9);
          color: var(--text-primary);
          backdrop-filter: blur(8px);
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-fast), background var(--transition-fast);
          z-index: 2;
        }
        .carousel-nav.prev { left: 0.75rem; }
        .carousel-nav.next { right: 0.75rem; }
        .card-image-wrapper:hover .carousel-nav {
          opacity: 1;
        }
        .carousel-nav:hover {
          background: #ffffff;
        }

        .carousel-dots {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.35rem;
          z-index: 2;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all var(--transition-fast);
        }
        .dot.active {
          background: #ffffff;
          width: 16px;
          border-radius: 4px;
        }

        .card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .card-title {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }
        .card-title a {
          color: var(--text-primary);
          text-decoration: none;
        }
        .card-title a:hover {
          color: var(--color-accent-hover);
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-facilities {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .facility-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.725rem;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--border-radius-pill);
        }
        .facility-icon {
          color: var(--color-accent);
        }

        .card-footer {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .price-group {
          display: flex;
          flex-direction: column;
        }
        .price-label {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .price-amount {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .price-unit {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `})]})}},9847:(e,a,r)=>{r.d(a,{hi:()=>d,lx:()=>n,ts:()=>s,uB:()=>i});let t=()=>localStorage.getItem("ssb_token"),i=e=>(localStorage.getItem("ssb_token"),localStorage.setItem("ssb_token",e)),s=()=>{let e=localStorage.getItem("ssb_user");if(!e)return null;try{return JSON.parse(e)}catch{return null}},n=e=>{e?localStorage.setItem("ssb_user",JSON.stringify(e)):localStorage.removeItem("ssb_user")};async function o(e,a={}){let r=t(),i={"Content-Type":"application/json",...a.headers};r&&(i.Authorization=`Bearer ${r}`);try{let r=await fetch(`/api${e}`,{...a,headers:i});if(r.ok)return await r.json()}catch(a){console.warn(`API call to ${e} failed, falling back to mock data:`,a)}return function(e,a){let r=a.method||"GET";if(e.startsWith("/ruangan")){if(e.includes("/ruang-")){let a=e.split("/")[2];return l.find(e=>e.id===a)||l[0]}return l}if(e.startsWith("/reservasi")){if("POST"===r){let e=JSON.parse(a.body||"{}"),r={id:`res-${Date.now()}`,kodeBooking:`SSB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(100+900*Math.random())}`,ruanganId:e.ruanganId||"ruang-1",ruangan:l.find(a=>a.id===e.ruanganId)||l[0],userId:s()?.id||"usr-1",user:s()||{id:"usr-1",nama:"User Member",email:"user@example.com",role:"MEMBER"},tanggal:e.tanggal||"2026-09-10",jamMulai:e.jamMulai||"10:00",jamSelesai:e.jamSelesai||"12:00",durasiJam:e.durasiJam||2,totalHarga:e.totalHarga||3e5,status:"BELUM_DIKONFIRMASI",catatan:e.catatan||"",createdAt:new Date().toISOString()};return c.unshift(r),r}return c}return e.startsWith("/admin/metrics")?{totalReservasi:128,reservasiPending:5,ruanganAktif:8,totalMember:340,totalPendapatan:485e5,tingkatOkupansi:84.5}:{}}(e,a)}let l=[{id:"ruang-1",nama:"Sonder Grand Suite — Meeting Room A",slug:"sonder-grand-suite",tipe:"MEETING_ROOM",kapasitas:12,hargaPerJam:15e4,hargaPerHari:1e6,deskripsi:"Ruang rapat eksklusif dengan pencahayaan alami, monitor 4K 65-inch, sound system premium, dan meja kayu solid ergonomis.",fasilitas:["High-speed Wi-Fi","Proyektor 4K","Whiteboard Glass","Coffee & Tea","Air Conditioner","Soundproof Wall"],gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 3 — Zone North",isAktif:!0,rating:4.9},{id:"ruang-2",nama:"Urban Loft — Coworking Hot Desk",slug:"urban-loft-hot-desk",tipe:"COWORKING_DESK",kapasitas:1,hargaPerJam:35e3,hargaPerHari:2e5,deskripsi:"Meja kerja fleksibel di area open-space yang tenang, dilengkapi power outlet dedicated dan akses lounge kopi.",fasilitas:["Wi-Fi 500Mbps","Power Outlet Dedicated","Ergonomic Mesh Chair","Free Flow Artisan Coffee"],gambarUrl:["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 1 — Main Lounge",isAktif:!0,rating:4.8},{id:"ruang-3",nama:"Executive Private Office 101",slug:"executive-office-101",tipe:"PRIVATE_OFFICE",kapasitas:6,hargaPerJam:25e4,hargaPerHari:18e5,deskripsi:"Kantor privat siap pakai untuk tim startup atau eksekutif. Privasi penuh dengan kunci pintu digital.",fasilitas:["Akses 24/7 Digital Key","Private Wi-Fi Subnet","Standing Desk","Locker Pribadi","Cleaning Service Harian"],gambarUrl:["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 2 — West Wing",isAktif:!0,rating:5},{id:"ruang-4",nama:"Grand Auditorium & Event Hall",slug:"grand-auditorium-hall",tipe:"EVENT_SPACE",kapasitas:80,hargaPerJam:75e4,hargaPerHari:5e6,deskripsi:"Aula serbaguna premium untuk workshop, seminar, peluncuran produk, dan gathering perusahaan.",fasilitas:["Stage & Lighting System","Dual Screen Projector","Wireless Microphones","Catering Station Area","VIP Holding Room"],gambarUrl:["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai Ground — Main Auditorium",isAktif:!0,rating:4.9}],c=[{id:"res-101",kodeBooking:"SSB-20260908-881",ruanganId:"ruang-1",ruangan:l[0],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-09",jamMulai:"09:00",jamSelesai:"11:00",durasiJam:2,totalHarga:3e5,status:"DISETUJUI",catatan:"Perlu kabel HDMI ekstra dan proyektor disiapkan 15 menit sebelum acara.",qrCodeUrl:"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SSB-20260908-881",createdAt:"2026-09-08 14:20:00"},{id:"res-102",kodeBooking:"SSB-20260908-412",ruanganId:"ruang-2",ruangan:l[1],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-10",jamMulai:"13:00",jamSelesai:"17:00",durasiJam:4,totalHarga:14e4,status:"BELUM_DIKONFIRMASI",createdAt:"2026-09-08 16:45:00"}],d={getRuangan:()=>o("/ruangan"),getRuanganById:e=>o(`/ruangan/${e}`),getReservasi:()=>o("/reservasi"),getReservasiById:e=>o(`/reservasi/${e}`),createReservasi:e=>o("/reservasi",{method:"POST",body:JSON.stringify(e)}),getAdminMetrics:()=>o("/admin/metrics")}},5244:(e,a)=>{var r;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))}};