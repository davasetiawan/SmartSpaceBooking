(()=>{var e={};e.id=628,e.ids=[628],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5137:(e,r,a)=>{"use strict";a.r(r),a.d(r,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c}),a(1421),a(4861),a(5866),a(1506);var t=a(3191),s=a(8716),i=a(7922),n=a.n(i),o=a(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);a.d(r,l);let c=["",{children:["(member)",{children:["ruangan",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,1421)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\ruangan\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],d=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\ruangan\\page.tsx"],p="/(member)/ruangan/page",m={require:a,loadChunk:()=>Promise.resolve()},u=new t.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(member)/ruangan/page",pathname:"/ruangan",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},6674:(e,r,a)=>{Promise.resolve().then(a.bind(a,1219))},1219:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>p});var t=a(326),s=a(7577),i=a(5047),n=a(8307),o=a(9734),l=a(4061);let c=(0,a(6557).Z)("SlidersHorizontal",[["line",{x1:"21",x2:"14",y1:"4",y2:"4",key:"obuewd"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4",key:"1q6298"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12",key:"1iu8h1"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12",key:"ntss68"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20",key:"14d8ph"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20",key:"m0wm8r"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6",key:"14e1ph"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22",key:"1lctlv"}]]);a(2374);var d=a(321);function p(){let e=(0,i.useSearchParams)(),[r,a]=(0,s.useState)([]),[p,m]=(0,s.useState)(!0),[u,g]=(0,s.useState)(e?.get("tipe")||"ALL"),[x,f]=(0,s.useState)(e?.get("lokasi")||""),[h,b]=(0,s.useState)(e?.get("kapasitas")||"0"),y=r.filter(e=>{let r="ALL"===u||e.tipe===u,a=!x||e.lokasi.toLowerCase().includes(x.toLowerCase())||e.nama.toLowerCase().includes(x.toLowerCase()),t=e.kapasitas>=parseInt(h||"0",10);return r&&a&&t});return(0,t.jsxs)("div",{className:"container catalog-page-root",children:[(0,t.jsxs)("div",{className:"catalog-header",children:[t.jsx("span",{className:"section-subtitle",children:"PORTOFOLIO RUANGAN"}),t.jsx("h1",{className:"font-serif catalog-title",children:"Jelajahi Koleksi Ruang Kerja Sonder"}),t.jsx("p",{className:"catalog-desc",children:"Pilih ruangan kerja, ruang rapat, atau hall privat yang dirancang untuk mendukung fokus, kolaborasi, dan impresi profesional."})]}),(0,t.jsxs)("div",{className:"filter-toolbar sonder-card",children:[(0,t.jsxs)("div",{className:"search-input-wrapper",children:[t.jsx(n.Z,{size:18,className:"search-icon"}),t.jsx("input",{type:"text",placeholder:"Cari nama ruangan, lokasi, atau fasilitas...",value:x,onChange:e=>f(e.target.value),className:"search-input-field"})]}),(0,t.jsxs)("div",{className:"filter-pills-row",children:[(0,t.jsxs)("div",{className:"filter-group",children:[(0,t.jsxs)("label",{children:[t.jsx(o.Z,{size:14})," Tipe Ruangan:"]}),(0,t.jsxs)("select",{value:u,onChange:e=>g(e.target.value),className:"filter-select",children:[t.jsx("option",{value:"ALL",children:"Semua Tipe"}),t.jsx("option",{value:"MEETING_ROOM",children:"Meeting Room"}),t.jsx("option",{value:"COWORKING_DESK",children:"Hot Desk"}),t.jsx("option",{value:"PRIVATE_OFFICE",children:"Private Office"}),t.jsx("option",{value:"EVENT_SPACE",children:"Event Hall"})]})]}),(0,t.jsxs)("div",{className:"filter-group",children:[(0,t.jsxs)("label",{children:[t.jsx(l.Z,{size:14})," Min Kapasitas:"]}),(0,t.jsxs)("select",{value:h,onChange:e=>b(e.target.value),className:"filter-select",children:[t.jsx("option",{value:"0",children:"Bebas"}),t.jsx("option",{value:"1",children:"≥ 1 Orang"}),t.jsx("option",{value:"5",children:"≥ 5 Orang"}),t.jsx("option",{value:"10",children:"≥ 10 Orang"}),t.jsx("option",{value:"50",children:"≥ 50 Orang"})]})]})]})]}),t.jsx("div",{className:"results-meta",children:(0,t.jsxs)("span",{children:["Menampilkan ",t.jsx("strong",{children:y.length})," ruangan kerja yang tersedia"]})}),p?t.jsx("div",{className:"loading-grid",children:[1,2,3].map(e=>t.jsx("div",{className:"skeleton-card sonder-card"},e))}):0===y.length?(0,t.jsxs)("div",{className:"no-results sonder-card",children:[t.jsx(c,{size:48,className:"no-icon"}),t.jsx("h3",{className:"font-serif",children:"Tidak Ada Ruangan yang Sesuai"}),t.jsx("p",{children:"Coba ubah kata kunci pencarian atau reset filter tipe ruangan Anda."}),t.jsx("button",{className:"btn btn-outline btn-sm mt-2",onClick:()=>{g("ALL"),f(""),b("0")},children:"Reset Semua Filter"})]}):t.jsx("div",{className:"cards-grid",children:y.map(e=>t.jsx(d.p,{ruangan:e},e.id))}),t.jsx("style",{children:`
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
        }

        .no-results {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .mt-2 { margin-top: 1rem; }

        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
          .filter-toolbar { flex-direction: column; align-items: stretch; }
        }
      `})]})}},321:(e,r,a)=>{"use strict";a.d(r,{p:()=>p});var t=a(326),s=a(7577),i=a(434),n=a(7427);let o=(0,a(6557).Z)("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);var l=a(9183),c=a(3734),d=a(7636);let p=({ruangan:e})=>{let r;let[a,p]=(0,s.useState)(0),[m,u]=(0,s.useState)(!1),g=e.gambarUrl&&e.gambarUrl.length>0?e.gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"];return(0,t.jsxs)("div",{className:"sp-property-card sonder-card",children:[(0,t.jsxs)("div",{className:"image-section",children:[t.jsx("img",{src:g[a],alt:e.nama,className:"slides-img",loading:"lazy"}),t.jsx("div",{className:"callout-badge",children:t.jsx("span",{className:"badge-info",children:"Frequently Booked"})}),t.jsx("button",{className:`fav-icon-btn ${m?"liked":""}`,onClick:e=>{e.preventDefault(),e.stopPropagation(),u(!m)},"aria-label":"Bookmark",children:t.jsx(n.Z,{size:16,fill:m?"#DC2626":"none",color:m?"#DC2626":"#ffffff"})}),g.length>1&&(0,t.jsxs)(t.Fragment,{children:[t.jsx("button",{className:"slide-arrow prev",onClick:e=>{e.preventDefault(),e.stopPropagation(),p(e=>(e-1+g.length)%g.length)},"aria-label":"Previous",children:t.jsx(o,{size:16})}),t.jsx("button",{className:"slide-arrow next",onClick:e=>{e.preventDefault(),e.stopPropagation(),p(e=>(e+1)%g.length)},"aria-label":"Next",children:t.jsx(l.Z,{size:16})}),t.jsx("div",{className:"carousel-dots",children:g.map((e,r)=>t.jsx("span",{className:`point ${r===a?"active":""}`},r))})]})]}),(0,t.jsxs)("div",{className:"details-box",children:[(0,t.jsxs)("div",{className:"info-row",children:[t.jsx("span",{className:"property-type",children:(e=>{switch(e){case"MEETING_ROOM":return"Meeting Suite";case"COWORKING_DESK":return"Hot Desk";case"PRIVATE_OFFICE":return"Private Office";case"EVENT_SPACE":return"Event Space";default:return e}})(e.tipe)}),(0,t.jsxs)("div",{className:"ratings",children:[t.jsx(c.Z,{size:12,fill:"#C9A96E",color:"#C9A96E"}),t.jsx("span",{className:"rating-score",children:e.rating||4.9})]})]}),t.jsx("h3",{className:"property-title font-serif",children:t.jsx(i.default,{href:`/ruangan/${e.id}`,children:e.nama})}),(0,t.jsxs)("div",{className:"property-breadcrumb",children:[t.jsx(d.Z,{size:13,className:"pin-ico"}),t.jsx("span",{className:"location-txt",children:e.lokasi})]}),(0,t.jsxs)("div",{className:"reviews-row",children:[t.jsx("span",{className:"review-badge",children:"9.2"}),t.jsx("span",{className:"review-label",children:"Fabulous"}),t.jsx("span",{className:"review-count",children:"(128 Reviews)"})]}),(0,t.jsxs)("div",{className:"card-bottom",children:[(0,t.jsxs)("div",{className:"price-tag",children:[t.jsx("span",{className:"p-from",children:"From"}),t.jsx("span",{className:"p-val font-mono",children:(r=e.hargaPerJam,new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(r))}),t.jsx("span",{className:"p-unit",children:"/ hr"})]}),t.jsx(i.default,{href:`/ruangan/${e.id}`,className:"btn-book-sonder",children:"Book Stay →"})]})]}),t.jsx("style",{children:`
        .sp-property-card {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #EAE6DF;
          box-shadow: 0 4px 18px rgba(0,0,0,0.05);
          transition: transform 300ms ease, box-shadow 300ms ease;
        }
        .sp-property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }

        .image-section {
          position: relative;
          height: 230px;
          overflow: hidden;
          background: #1A1A2E;
        }
        .slides-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 600ms ease;
        }
        .sp-property-card:hover .slides-img {
          transform: scale(1.04);
        }

        .callout-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background: rgba(26, 26, 46, 0.85);
          backdrop-filter: blur(8px);
          color: #C9A96E;
          padding: 0.25rem 0.65rem;
          border-radius: 999px;
          font-size: 0.675rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .fav-icon-btn {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 200ms ease;
        }
        .fav-icon-btn:hover {
          transform: scale(1.1);
        }

        .slide-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: #1A1A2E;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .sp-property-card:hover .slide-arrow {
          opacity: 1;
        }
        .slide-arrow.prev { left: 0.6rem; }
        .slide-arrow.next { right: 0.6rem; }

        .carousel-dots {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.35rem;
        }
        .point {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }
        .point.active {
          background: #ffffff;
          width: 14px;
          border-radius: 4px;
        }

        .details-box {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.35rem;
        }
        .property-type {
          font-size: 0.725rem;
          font-weight: 800;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .ratings {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .rating-score {
          font-size: 0.8rem;
          font-weight: 800;
          color: #1A1A2E;
        }

        .property-title {
          font-size: 1.25rem;
          color: #1A1A2E;
          margin-bottom: 0.4rem;
          line-height: 1.3;
        }
        .property-title a {
          color: #1A1A2E;
          text-decoration: none;
        }

        .property-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: #666666;
          margin-bottom: 0.75rem;
        }
        .pin-ico { color: #C9A96E; }

        .reviews-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }
        .review-badge {
          background: #1A1A2E;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }
        .review-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1A1A2E;
        }
        .review-count {
          font-size: 0.775rem;
          color: #888888;
        }

        .card-bottom {
          margin-top: auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid #EAE6DF;
        }
        .price-tag {
          display: flex;
          flex-direction: column;
        }
        .p-from {
          font-size: 0.675rem;
          color: #888888;
          text-transform: uppercase;
        }
        .p-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #1A1A2E;
        }
        .p-unit {
          font-size: 0.75rem;
          color: #666666;
        }

        .btn-book-sonder {
          font-size: 0.825rem;
          font-weight: 700;
          background: #1A1A2E;
          color: #ffffff;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          text-decoration: none;
          transition: background 200ms ease;
        }
        .btn-book-sonder:hover {
          background: #C9A96E;
          color: #1A1A2E;
        }
      `})]})}},2179:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});let t=(0,a(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},9183:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});let t=(0,a(6557).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},7636:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});let t=(0,a(6557).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},8307:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});let t=(0,a(6557).Z)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]])},3734:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});let t=(0,a(6557).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},4061:(e,r,a)=>{"use strict";a.d(r,{Z:()=>t});let t=(0,a(6557).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},1421:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>t});let t=(0,a(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\ruangan\page.tsx#default`)}};var r=require("../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[278,752,336],()=>a(5137));module.exports=t})();