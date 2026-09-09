"use strict";(()=>{var e={};e.id=910,e.ids=[910,660],e.modules={1323:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,r){return r in a?a[r]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,r)):"function"==typeof a&&"default"===r?a:void 0}}})},6999:(e,a,r)=>{r.r(a),r.d(a,{config:()=>O,default:()=>M,getServerSideProps:()=>E,getStaticPaths:()=>A,getStaticProps:()=>I,reportWebVitals:()=>_,routeModule:()=>B,unstable_getServerProps:()=>R,unstable_getServerSideProps:()=>Z,unstable_getStaticParams:()=>z,unstable_getStaticPaths:()=>D,unstable_getStaticProps:()=>C});var t={};r.r(t),r.d(t,{DetailRuanganPage:()=>w});var i=r(7093),s=r(5244),n=r(1323),l=r(1682),o=r.n(l),c=r(8141),d=r.n(c),m=r(997),g=r(6689),u=r(1);let p=(0,u.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var h=r(1773),f=r(6919);let x=(0,u.Z)("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]),b=(0,u.Z)("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);var v=r(6286),y=r(8742),j=r(4326),k=r(5489);let N=(0,u.Z)("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);var S=r(2003),P=r(9847);!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let w=()=>{let{id:e}=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())(),a=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())(),[r,t]=(0,g.useState)(null),[i,s]=(0,g.useState)(!0),[n,l]=(0,g.useState)(new Date().toISOString().slice(0,10)),[o,c]=(0,g.useState)("09:00"),[d,u]=(0,g.useState)(2);if((0,g.useEffect)(()=>{e&&P.hi.getRuanganById(e).then(e=>{t(e),s(!1)})},[e]),i||!r)return m.jsx("div",{className:"container detail-loading",children:m.jsx("p",{className:"font-serif",children:"Memuat Detail Ruangan Sonder..."})});let w=e=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(e),M=r.hargaPerJam*d;return(0,m.jsxs)("div",{className:"container detail-page-root",children:[m.jsx("div",{className:"back-bar",children:(0,m.jsxs)(Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}()),{to:"/ruangan",className:"btn-back",children:[m.jsx(p,{size:16})," Kembali ke Katalog Ruangan"]})}),(0,m.jsxs)("div",{className:"detail-header-row",children:[(0,m.jsxs)("div",{children:[(0,m.jsxs)("div",{className:"detail-badges",children:[m.jsx("span",{className:"badge-pill badge-type",children:r.tipe}),r.rating&&(0,m.jsxs)("span",{className:"badge-pill badge-rating",children:[m.jsx(h.Z,{size:12,fill:"#C9A96E",color:"#C9A96E"})," ",r.rating," (Rating Member)"]})]}),m.jsx("h1",{className:"font-serif detail-title",children:r.nama}),(0,m.jsxs)("p",{className:"detail-location",children:[m.jsx(f.Z,{size:16})," ",r.lokasi]})]}),(0,m.jsxs)("div",{className:"detail-header-actions",children:[m.jsx("button",{className:"btn btn-outline btn-sm",title:"Bagikan",children:m.jsx(x,{size:16})}),m.jsx("button",{className:"btn btn-outline btn-sm",title:"Simpan Wishlist",children:m.jsx(b,{size:16})})]})]}),(0,m.jsxs)("div",{className:"gallery-grid",children:[m.jsx("div",{className:"gallery-main",children:m.jsx("img",{src:r.gambarUrl[0],alt:r.nama})}),(0,m.jsxs)("div",{className:"gallery-side",children:[m.jsx("img",{src:r.gambarUrl[1]||r.gambarUrl[0],alt:r.nama}),(0,m.jsxs)("div",{className:"gallery-more",children:[m.jsx("img",{src:r.gambarUrl[0],alt:r.nama}),m.jsx("div",{className:"more-overlay",children:"+ Lihat Semua Galeri (6)"})]})]})]}),(0,m.jsxs)("div",{className:"detail-body-grid",children:[(0,m.jsxs)("div",{className:"info-col",children:[(0,m.jsxs)("div",{className:"spec-cards-row",children:[(0,m.jsxs)("div",{className:"spec-card sonder-card",children:[m.jsx(v.Z,{size:20,className:"spec-icon"}),(0,m.jsxs)("div",{children:[m.jsx("div",{className:"spec-label",children:"Kapasitas Maks"}),(0,m.jsxs)("div",{className:"spec-val font-mono",children:[r.kapasitas," Orang"]})]})]}),(0,m.jsxs)("div",{className:"spec-card sonder-card",children:[m.jsx(y.Z,{size:20,className:"spec-icon"}),(0,m.jsxs)("div",{children:[m.jsx("div",{className:"spec-label",children:"Sewa Fleksibel"}),m.jsx("div",{className:"spec-val",children:"Per Jam / Per Hari"})]})]}),(0,m.jsxs)("div",{className:"spec-card sonder-card",children:[m.jsx(j.Z,{size:20,className:"spec-icon"}),(0,m.jsxs)("div",{children:[m.jsx("div",{className:"spec-label",children:"Keamanan"}),m.jsx("div",{className:"spec-val",children:"Pass QR Instant"})]})]})]}),(0,m.jsxs)("div",{className:"section-block",children:[m.jsx("h3",{className:"font-serif block-title",children:"Deskripsi Ruangan"}),m.jsx("p",{className:"block-text",children:r.deskripsi})]}),(0,m.jsxs)("div",{className:"section-block",children:[m.jsx("h3",{className:"font-serif block-title",children:"Fasilitas Standar Sonder"}),m.jsx("div",{className:"facilities-grid",children:r.fasilitas.map((e,a)=>(0,m.jsxs)("div",{className:"facility-item",children:[m.jsx(k.Z,{size:16,className:"facility-check"}),m.jsx("span",{children:e})]},a))})]}),(0,m.jsxs)("div",{className:"section-block info-banner sonder-card",children:[m.jsx(N,{size:20,className:"info-icon"}),(0,m.jsxs)("div",{children:[m.jsx("strong",{children:"Kebijakan Pembatalan Sonder"}),m.jsx("p",{children:"Pembatalan gratis hingga 2 jam sebelum waktu sesi dimulai. Kredit reservasi akan langsung dikembalikan ke dompet member."})]})]})]}),m.jsx("div",{className:"booking-col",children:(0,m.jsxs)("div",{className:"booking-widget sonder-card glass-card",children:[(0,m.jsxs)("div",{className:"widget-header",children:[m.jsx("span",{className:"price-label",children:"Tarif Sewa"}),(0,m.jsxs)("div",{className:"widget-price",children:[m.jsx("span",{className:"amount font-mono",children:w(r.hargaPerJam)}),m.jsx("span",{className:"unit",children:"/ jam"})]})]}),(0,m.jsxs)("form",{onSubmit:e=>{e.preventDefault(),a("/reservasi/baru",{state:{ruanganId:r.id,tanggal:n,jamMulai:o,durasiJam:d,totalHarga:M}})},className:"booking-form",children:[(0,m.jsxs)("div",{className:"form-group",children:[(0,m.jsxs)("label",{className:"form-label",children:[m.jsx(S.Z,{size:14})," Pilih Tanggal Booking"]}),m.jsx("input",{type:"date",className:"form-control",value:n,onChange:e=>l(e.target.value),required:!0})]}),(0,m.jsxs)("div",{className:"form-row-2",children:[(0,m.jsxs)("div",{className:"form-group",children:[(0,m.jsxs)("label",{className:"form-label",children:[m.jsx(y.Z,{size:14})," Jam Mulai"]}),(0,m.jsxs)("select",{className:"form-control",value:o,onChange:e=>c(e.target.value),children:[m.jsx("option",{value:"08:00",children:"08:00 WIB"}),m.jsx("option",{value:"09:00",children:"09:00 WIB"}),m.jsx("option",{value:"10:00",children:"10:00 WIB"}),m.jsx("option",{value:"11:00",children:"11:00 WIB"}),m.jsx("option",{value:"13:00",children:"13:00 WIB"}),m.jsx("option",{value:"14:00",children:"14:00 WIB"}),m.jsx("option",{value:"15:00",children:"15:00 WIB"})]})]}),(0,m.jsxs)("div",{className:"form-group",children:[m.jsx("label",{className:"form-label",children:"Durasi (Jam)"}),(0,m.jsxs)("select",{className:"form-control",value:d,onChange:e=>u(parseInt(e.target.value,10)),children:[m.jsx("option",{value:1,children:"1 Jam"}),m.jsx("option",{value:2,children:"2 Jam"}),m.jsx("option",{value:3,children:"3 Jam"}),m.jsx("option",{value:4,children:"4 Jam"}),m.jsx("option",{value:8,children:"Full Day (8 Jam)"})]})]})]}),(0,m.jsxs)("div",{className:"price-summary-box",children:[(0,m.jsxs)("div",{className:"summary-row",children:[(0,m.jsxs)("span",{children:[w(r.hargaPerJam)," x ",d," Jam"]}),m.jsx("span",{className:"font-mono",children:w(M)})]}),(0,m.jsxs)("div",{className:"summary-row",children:[m.jsx("span",{children:"Pajak & Service Charge"}),m.jsx("span",{className:"font-mono",children:"Termasuk"})]}),m.jsx("div",{className:"summary-divider"}),(0,m.jsxs)("div",{className:"summary-row total-row",children:[m.jsx("span",{children:"Total Estimasi Biaya"}),m.jsx("span",{className:"font-mono total-amount",children:w(M)})]})]}),m.jsx("button",{type:"submit",className:"btn btn-primary btn-full btn-lg",children:"Lanjutkan Ke Pemesanan →"})]})]})})]}),m.jsx("style",{children:`
        .detail-page-root {
          padding: 2.5rem 1.5rem;
        }

        .detail-loading {
          padding: 6rem 0;
          text-align: center;
          font-size: 1.5rem;
        }

        .back-bar {
          margin-bottom: 1.5rem;
        }
        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .detail-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .detail-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .detail-title {
          font-size: 2.75rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .detail-location {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.95rem;
        }

        .detail-header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1rem;
          height: 420px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          margin-bottom: 3rem;
        }
        .gallery-main img, .gallery-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gallery-side {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
        }
        .gallery-more {
          position: relative;
          height: 100%;
        }
        .more-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          cursor: pointer;
        }

        .detail-body-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
        }

        .spec-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .spec-card {
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .spec-icon {
          color: var(--color-accent);
        }
        .spec-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }
        .spec-val {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .section-block {
          margin-bottom: 2.5rem;
        }
        .block-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }
        .block-text {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .facility-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .facility-check {
          color: var(--color-accent);
        }

        .info-banner {
          padding: 1.25rem;
          display: flex;
          gap: 1rem;
          background: var(--color-accent-light);
          border-color: var(--color-accent);
          color: var(--text-primary);
        }
        .info-icon {
          color: var(--color-accent-hover);
          flex-shrink: 0;
        }

        .booking-widget {
          padding: 1.75rem;
          position: sticky;
          top: 100px;
        }
        .widget-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .amount {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-primary);
        }
        .unit {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .price-summary-box {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: var(--border-radius-md);
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }
        .summary-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.25rem 0;
        }
        .total-row {
          font-weight: 700;
          color: var(--text-primary);
        }
        .total-amount {
          font-size: 1.1rem;
          color: var(--color-accent-hover);
        }

        @media (max-width: 900px) {
          .detail-body-grid { grid-template-columns: 1fr; }
          .gallery-grid { grid-template-columns: 1fr; height: 280px; }
          .gallery-side { display: none; }
        }
      `})]})},M=(0,n.l)(t,"default"),I=(0,n.l)(t,"getStaticProps"),A=(0,n.l)(t,"getStaticPaths"),E=(0,n.l)(t,"getServerSideProps"),O=(0,n.l)(t,"config"),_=(0,n.l)(t,"reportWebVitals"),C=(0,n.l)(t,"unstable_getStaticProps"),D=(0,n.l)(t,"unstable_getStaticPaths"),z=(0,n.l)(t,"unstable_getStaticParams"),R=(0,n.l)(t,"unstable_getServerProps"),Z=(0,n.l)(t,"unstable_getServerSideProps"),B=new i.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/DetailRuanganPage",pathname:"/DetailRuanganPage",bundlePath:"",filename:""},components:{App:d(),Document:o()},userland:t})},1:(e,a,r)=>{r.d(a,{Z:()=>n});var t=r(6689),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),n=(e,a)=>{let r=(0,t.forwardRef)(({color:r="currentColor",size:n=24,strokeWidth:l=2,absoluteStrokeWidth:o,className:c="",children:d,...m},g)=>(0,t.createElement)("svg",{ref:g,...i,width:n,height:n,stroke:r,strokeWidth:o?24*Number(l)/Number(n):l,className:["lucide",`lucide-${s(e)}`,c].join(" "),...m},[...a.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(d)?d:[d]]));return r.displayName=`${e}`,r}},2003:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},5489:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8742:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},6919:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]])},4326:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},1773:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},6286:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},8141:(e,a,r)=>{Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return o}});let t=r(167),i=r(997),s=t._(r(6689)),n=r(5782);async function l(e){let{Component:a,ctx:r}=e;return{pageProps:await (0,n.loadGetInitialProps)(a,r)}}class o extends s.default.Component{render(){let{Component:e,pageProps:a}=this.props;return(0,i.jsx)(e,{...a})}}o.origGetInitialProps=l,o.getInitialProps=l,("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)},9847:(e,a,r)=>{r.d(a,{hi:()=>d,lx:()=>n,ts:()=>s,uB:()=>i});let t=()=>localStorage.getItem("ssb_token"),i=e=>(localStorage.getItem("ssb_token"),localStorage.setItem("ssb_token",e)),s=()=>{let e=localStorage.getItem("ssb_user");if(!e)return null;try{return JSON.parse(e)}catch{return null}},n=e=>{e?localStorage.setItem("ssb_user",JSON.stringify(e)):localStorage.removeItem("ssb_user")};async function l(e,a={}){let r=t(),i={"Content-Type":"application/json",...a.headers};r&&(i.Authorization=`Bearer ${r}`);try{let r=await fetch(`/api${e}`,{...a,headers:i});if(r.ok)return await r.json()}catch(a){console.warn(`API call to ${e} failed, falling back to mock data:`,a)}return function(e,a){let r=a.method||"GET";if(e.startsWith("/ruangan")){if(e.includes("/ruang-")){let a=e.split("/")[2];return o.find(e=>e.id===a)||o[0]}return o}if(e.startsWith("/reservasi")){if("POST"===r){let e=JSON.parse(a.body||"{}"),r={id:`res-${Date.now()}`,kodeBooking:`SSB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(100+900*Math.random())}`,ruanganId:e.ruanganId||"ruang-1",ruangan:o.find(a=>a.id===e.ruanganId)||o[0],userId:s()?.id||"usr-1",user:s()||{id:"usr-1",nama:"User Member",email:"user@example.com",role:"MEMBER"},tanggal:e.tanggal||"2026-09-10",jamMulai:e.jamMulai||"10:00",jamSelesai:e.jamSelesai||"12:00",durasiJam:e.durasiJam||2,totalHarga:e.totalHarga||3e5,status:"BELUM_DIKONFIRMASI",catatan:e.catatan||"",createdAt:new Date().toISOString()};return c.unshift(r),r}return c}return e.startsWith("/admin/metrics")?{totalReservasi:128,reservasiPending:5,ruanganAktif:8,totalMember:340,totalPendapatan:485e5,tingkatOkupansi:84.5}:{}}(e,a)}let o=[{id:"ruang-1",nama:"Sonder Grand Suite — Meeting Room A",slug:"sonder-grand-suite",tipe:"MEETING_ROOM",kapasitas:12,hargaPerJam:15e4,hargaPerHari:1e6,deskripsi:"Ruang rapat eksklusif dengan pencahayaan alami, monitor 4K 65-inch, sound system premium, dan meja kayu solid ergonomis.",fasilitas:["High-speed Wi-Fi","Proyektor 4K","Whiteboard Glass","Coffee & Tea","Air Conditioner","Soundproof Wall"],gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 3 — Zone North",isAktif:!0,rating:4.9},{id:"ruang-2",nama:"Urban Loft — Coworking Hot Desk",slug:"urban-loft-hot-desk",tipe:"COWORKING_DESK",kapasitas:1,hargaPerJam:35e3,hargaPerHari:2e5,deskripsi:"Meja kerja fleksibel di area open-space yang tenang, dilengkapi power outlet dedicated dan akses lounge kopi.",fasilitas:["Wi-Fi 500Mbps","Power Outlet Dedicated","Ergonomic Mesh Chair","Free Flow Artisan Coffee"],gambarUrl:["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 1 — Main Lounge",isAktif:!0,rating:4.8},{id:"ruang-3",nama:"Executive Private Office 101",slug:"executive-office-101",tipe:"PRIVATE_OFFICE",kapasitas:6,hargaPerJam:25e4,hargaPerHari:18e5,deskripsi:"Kantor privat siap pakai untuk tim startup atau eksekutif. Privasi penuh dengan kunci pintu digital.",fasilitas:["Akses 24/7 Digital Key","Private Wi-Fi Subnet","Standing Desk","Locker Pribadi","Cleaning Service Harian"],gambarUrl:["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 2 — West Wing",isAktif:!0,rating:5},{id:"ruang-4",nama:"Grand Auditorium & Event Hall",slug:"grand-auditorium-hall",tipe:"EVENT_SPACE",kapasitas:80,hargaPerJam:75e4,hargaPerHari:5e6,deskripsi:"Aula serbaguna premium untuk workshop, seminar, peluncuran produk, dan gathering perusahaan.",fasilitas:["Stage & Lighting System","Dual Screen Projector","Wireless Microphones","Catering Station Area","VIP Holding Room"],gambarUrl:["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai Ground — Main Auditorium",isAktif:!0,rating:4.9}],c=[{id:"res-101",kodeBooking:"SSB-20260908-881",ruanganId:"ruang-1",ruangan:o[0],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-09",jamMulai:"09:00",jamSelesai:"11:00",durasiJam:2,totalHarga:3e5,status:"DISETUJUI",catatan:"Perlu kabel HDMI ekstra dan proyektor disiapkan 15 menit sebelum acara.",qrCodeUrl:"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SSB-20260908-881",createdAt:"2026-09-08 14:20:00"},{id:"res-102",kodeBooking:"SSB-20260908-412",ruanganId:"ruang-2",ruangan:o[1],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-10",jamMulai:"13:00",jamSelesai:"17:00",durasiJam:4,totalHarga:14e4,status:"BELUM_DIKONFIRMASI",createdAt:"2026-09-08 16:45:00"}],d={getRuangan:()=>l("/ruangan"),getRuanganById:e=>l(`/ruangan/${e}`),getReservasi:()=>l("/reservasi"),getReservasiById:e=>l(`/reservasi/${e}`),createReservasi:e=>l("/reservasi",{method:"POST",body:JSON.stringify(e)}),getAdminMetrics:()=>l("/admin/metrics")}},5244:(e,a)=>{var r;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[682],()=>r(6999));module.exports=t})();