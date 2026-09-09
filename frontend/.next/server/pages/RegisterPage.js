"use strict";(()=>{var e={};e.id=923,e.ids=[923,660],e.modules={1323:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,t){return t in a?a[t]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,t)):"function"==typeof a&&"default"===t?a:void 0}}})},348:(e,a,t)=>{t.r(a),t.d(a,{config:()=>A,default:()=>P,getServerSideProps:()=>M,getStaticPaths:()=>w,getStaticProps:()=>N,reportWebVitals:()=>E,routeModule:()=>C,unstable_getServerProps:()=>D,unstable_getServerSideProps:()=>R,unstable_getStaticParams:()=>I,unstable_getStaticPaths:()=>_,unstable_getStaticProps:()=>O});var r={};t.r(r),t.d(r,{RegisterPage:()=>j});var i=t(7093),n=t(5244),s=t(1323),o=t(1682),l=t.n(o),u=t(8141),d=t.n(u),c=t(997),m=t(6689),g=t(7871),p=t(1);let h=(0,p.Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var f=t(3656);let b=(0,p.Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);var k=t(4132),x=t(2922),v=t(9972),y=t(6179),S=t(9847);!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let j=()=>{let[e,a]=(0,m.useState)(""),[t,r]=(0,m.useState)(""),[i,n]=(0,m.useState)(""),[s,o]=(0,m.useState)(""),[l,u]=(0,m.useState)(!1),[d,p]=(0,m.useState)(!1),j=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())();return(0,c.jsxs)("div",{className:"auth-split-layout",children:[(0,c.jsxs)("div",{className:"auth-banner-col",children:[c.jsx("div",{className:"auth-banner-overlay",children:(0,c.jsxs)("div",{className:"banner-content",children:[c.jsx("span",{className:"banner-badge font-mono",children:"JOIN SONDER CLUB"}),c.jsx("h1",{className:"font-serif banner-title",children:"Nikmati Pengalaman Kerja Tanpa Batas."}),c.jsx("p",{className:"banner-desc",children:"Daftar hari ini untuk mendapatkan bonus kuota 2 jam gratis pertama Anda di Sonder Suite."})]})}),c.jsx("img",{src:"https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",alt:"Sonder Space Lounge",className:"auth-bg-img"})]}),c.jsx("div",{className:"auth-form-col",children:(0,c.jsxs)("div",{className:"auth-form-wrapper",children:[(0,c.jsxs)("div",{className:"auth-brand-logo",children:[c.jsx(g.Z,{size:24,className:"brand-icon"}),c.jsx("span",{className:"font-serif brand-text",children:"SONDER"})]}),c.jsx("h2",{className:"font-serif auth-heading",children:"Buat Akun Member"}),c.jsx("p",{className:"auth-subheading",children:"Lengkapi formulir registrasi singkat di bawah ini."}),(0,c.jsxs)("form",{onSubmit:a=>{a.preventDefault(),p(!0),setTimeout(()=>{let a={id:`usr-${Date.now()}`,nama:e||"Member Baru",email:t,role:"MEMBER",telepon:i};(0,S.uB)("demo-jwt-token-new-user"),(0,S.lx)(a),p(!1),j("/"),window.location.reload()},600)},className:"auth-form",children:[(0,c.jsxs)("div",{className:"form-group",children:[c.jsx("label",{className:"form-label",children:"Nama Lengkap"}),(0,c.jsxs)("div",{className:"input-icon-group",children:[c.jsx(h,{size:16,className:"input-icon"}),c.jsx("input",{type:"text",className:"form-control with-icon",placeholder:"Contoh: Alexander Wright",value:e,onChange:e=>a(e.target.value),required:!0})]})]}),(0,c.jsxs)("div",{className:"form-group",children:[c.jsx("label",{className:"form-label",children:"Alamat Email"}),(0,c.jsxs)("div",{className:"input-icon-group",children:[c.jsx(f.Z,{size:16,className:"input-icon"}),c.jsx("input",{type:"email",className:"form-control with-icon",placeholder:"nama@email.com",value:t,onChange:e=>r(e.target.value),required:!0})]})]}),(0,c.jsxs)("div",{className:"form-group",children:[c.jsx("label",{className:"form-label",children:"Nomor Telepon / WhatsApp"}),(0,c.jsxs)("div",{className:"input-icon-group",children:[c.jsx(b,{size:16,className:"input-icon"}),c.jsx("input",{type:"tel",className:"form-control with-icon",placeholder:"+62 812-xxxx-xxxx",value:i,onChange:e=>n(e.target.value),required:!0})]})]}),(0,c.jsxs)("div",{className:"form-group",children:[c.jsx("label",{className:"form-label",children:"Kata Sandi (Min 8 Karakter)"}),(0,c.jsxs)("div",{className:"input-icon-group",children:[c.jsx(k.Z,{size:16,className:"input-icon"}),c.jsx("input",{type:l?"text":"password",className:"form-control with-icon",placeholder:"••••••••",value:s,onChange:e=>o(e.target.value),required:!0,minLength:8}),c.jsx("button",{type:"button",className:"toggle-eye",onClick:()=>u(!l),children:l?c.jsx(x.Z,{size:16}):c.jsx(v.Z,{size:16})})]})]}),(0,c.jsxs)("button",{type:"submit",className:"btn btn-primary btn-full btn-lg mt-1",disabled:d,children:[d?"Membuat Akun...":"Daftar Sekarang"," ",c.jsx(y.Z,{size:16})]})]}),(0,c.jsxs)("div",{className:"auth-footer-text",children:["Sudah memiliki akun Sonder? ",c.jsx(Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}()),{to:"/login",className:"auth-link",children:"Masuk Di Sini →"})]})]})}),c.jsx("style",{children:`
        .auth-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 120px);
        }

        .auth-banner-col {
          position: relative;
          background: var(--bg-hero);
          overflow: hidden;
        }
        .auth-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
        }
        .auth-banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          padding: 4rem;
          background: linear-gradient(180deg, rgba(26,26,46,0.1) 0%, rgba(26,26,46,0.9) 100%);
        }
        .banner-badge {
          background: var(--color-accent-light);
          color: var(--color-accent-hover);
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius-pill);
          font-weight: 700;
          font-size: 0.75rem;
          margin-bottom: 1rem;
          display: inline-block;
        }
        .banner-title {
          font-size: 2.75rem;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .banner-desc {
          color: #D1D5DB;
          font-size: 1rem;
          max-width: 480px;
        }

        .auth-form-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: var(--bg-primary);
        }
        .auth-form-wrapper {
          width: 100%;
          max-width: 420px;
        }
        .auth-brand-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .brand-icon { color: var(--color-accent); }
        .brand-text { font-size: 1.5rem; letter-spacing: 0.08em; }

        .auth-heading {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .auth-subheading {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .input-icon-group {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }
        .with-icon {
          padding-left: 2.75rem;
        }
        .toggle-eye {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .auth-footer-text {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .auth-link {
          font-weight: 700;
          color: var(--color-primary);
        }

        @media (max-width: 900px) {
          .auth-split-layout { grid-template-columns: 1fr; }
          .auth-banner-col { display: none; }
        }
      `})]})},P=(0,s.l)(r,"default"),N=(0,s.l)(r,"getStaticProps"),w=(0,s.l)(r,"getStaticPaths"),M=(0,s.l)(r,"getServerSideProps"),A=(0,s.l)(r,"config"),E=(0,s.l)(r,"reportWebVitals"),O=(0,s.l)(r,"unstable_getStaticProps"),_=(0,s.l)(r,"unstable_getStaticPaths"),I=(0,s.l)(r,"unstable_getStaticParams"),D=(0,s.l)(r,"unstable_getServerProps"),R=(0,s.l)(r,"unstable_getServerSideProps"),C=new i.PagesRouteModule({definition:{kind:n.x.PAGES,page:"/RegisterPage",pathname:"/RegisterPage",bundlePath:"",filename:""},components:{App:d(),Document:l()},userland:r})},1:(e,a,t)=>{t.d(a,{Z:()=>s});var r=t(6689),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),s=(e,a)=>{let t=(0,r.forwardRef)(({color:t="currentColor",size:s=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:u="",children:d,...c},m)=>(0,r.createElement)("svg",{ref:m,...i,width:s,height:s,stroke:t,strokeWidth:l?24*Number(o)/Number(s):o,className:["lucide",`lucide-${n(e)}`,u].join(" "),...c},[...a.map(([e,a])=>(0,r.createElement)(e,a)),...Array.isArray(d)?d:[d]]));return t.displayName=`${e}`,t}},6179:(e,a,t)=>{t.d(a,{Z:()=>r});let r=(0,t(1).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},7871:(e,a,t)=>{t.d(a,{Z:()=>r});let r=(0,t(1).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},2922:(e,a,t)=>{t.d(a,{Z:()=>r});let r=(0,t(1).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},9972:(e,a,t)=>{t.d(a,{Z:()=>r});let r=(0,t(1).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},4132:(e,a,t)=>{t.d(a,{Z:()=>r});let r=(0,t(1).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},3656:(e,a,t)=>{t.d(a,{Z:()=>r});let r=(0,t(1).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},8141:(e,a,t)=>{Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let r=t(167),i=t(997),n=r._(t(6689)),s=t(5782);async function o(e){let{Component:a,ctx:t}=e;return{pageProps:await (0,s.loadGetInitialProps)(a,t)}}class l extends n.default.Component{render(){let{Component:e,pageProps:a}=this.props;return(0,i.jsx)(e,{...a})}}l.origGetInitialProps=o,l.getInitialProps=o,("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)},9847:(e,a,t)=>{t.d(a,{hi:()=>d,lx:()=>s,ts:()=>n,uB:()=>i});let r=()=>localStorage.getItem("ssb_token"),i=e=>(localStorage.getItem("ssb_token"),localStorage.setItem("ssb_token",e)),n=()=>{let e=localStorage.getItem("ssb_user");if(!e)return null;try{return JSON.parse(e)}catch{return null}},s=e=>{e?localStorage.setItem("ssb_user",JSON.stringify(e)):localStorage.removeItem("ssb_user")};async function o(e,a={}){let t=r(),i={"Content-Type":"application/json",...a.headers};t&&(i.Authorization=`Bearer ${t}`);try{let t=await fetch(`/api${e}`,{...a,headers:i});if(t.ok)return await t.json()}catch(a){console.warn(`API call to ${e} failed, falling back to mock data:`,a)}return function(e,a){let t=a.method||"GET";if(e.startsWith("/ruangan")){if(e.includes("/ruang-")){let a=e.split("/")[2];return l.find(e=>e.id===a)||l[0]}return l}if(e.startsWith("/reservasi")){if("POST"===t){let e=JSON.parse(a.body||"{}"),t={id:`res-${Date.now()}`,kodeBooking:`SSB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(100+900*Math.random())}`,ruanganId:e.ruanganId||"ruang-1",ruangan:l.find(a=>a.id===e.ruanganId)||l[0],userId:n()?.id||"usr-1",user:n()||{id:"usr-1",nama:"User Member",email:"user@example.com",role:"MEMBER"},tanggal:e.tanggal||"2026-09-10",jamMulai:e.jamMulai||"10:00",jamSelesai:e.jamSelesai||"12:00",durasiJam:e.durasiJam||2,totalHarga:e.totalHarga||3e5,status:"BELUM_DIKONFIRMASI",catatan:e.catatan||"",createdAt:new Date().toISOString()};return u.unshift(t),t}return u}return e.startsWith("/admin/metrics")?{totalReservasi:128,reservasiPending:5,ruanganAktif:8,totalMember:340,totalPendapatan:485e5,tingkatOkupansi:84.5}:{}}(e,a)}let l=[{id:"ruang-1",nama:"Sonder Grand Suite — Meeting Room A",slug:"sonder-grand-suite",tipe:"MEETING_ROOM",kapasitas:12,hargaPerJam:15e4,hargaPerHari:1e6,deskripsi:"Ruang rapat eksklusif dengan pencahayaan alami, monitor 4K 65-inch, sound system premium, dan meja kayu solid ergonomis.",fasilitas:["High-speed Wi-Fi","Proyektor 4K","Whiteboard Glass","Coffee & Tea","Air Conditioner","Soundproof Wall"],gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 3 — Zone North",isAktif:!0,rating:4.9},{id:"ruang-2",nama:"Urban Loft — Coworking Hot Desk",slug:"urban-loft-hot-desk",tipe:"COWORKING_DESK",kapasitas:1,hargaPerJam:35e3,hargaPerHari:2e5,deskripsi:"Meja kerja fleksibel di area open-space yang tenang, dilengkapi power outlet dedicated dan akses lounge kopi.",fasilitas:["Wi-Fi 500Mbps","Power Outlet Dedicated","Ergonomic Mesh Chair","Free Flow Artisan Coffee"],gambarUrl:["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 1 — Main Lounge",isAktif:!0,rating:4.8},{id:"ruang-3",nama:"Executive Private Office 101",slug:"executive-office-101",tipe:"PRIVATE_OFFICE",kapasitas:6,hargaPerJam:25e4,hargaPerHari:18e5,deskripsi:"Kantor privat siap pakai untuk tim startup atau eksekutif. Privasi penuh dengan kunci pintu digital.",fasilitas:["Akses 24/7 Digital Key","Private Wi-Fi Subnet","Standing Desk","Locker Pribadi","Cleaning Service Harian"],gambarUrl:["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 2 — West Wing",isAktif:!0,rating:5},{id:"ruang-4",nama:"Grand Auditorium & Event Hall",slug:"grand-auditorium-hall",tipe:"EVENT_SPACE",kapasitas:80,hargaPerJam:75e4,hargaPerHari:5e6,deskripsi:"Aula serbaguna premium untuk workshop, seminar, peluncuran produk, dan gathering perusahaan.",fasilitas:["Stage & Lighting System","Dual Screen Projector","Wireless Microphones","Catering Station Area","VIP Holding Room"],gambarUrl:["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai Ground — Main Auditorium",isAktif:!0,rating:4.9}],u=[{id:"res-101",kodeBooking:"SSB-20260908-881",ruanganId:"ruang-1",ruangan:l[0],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-09",jamMulai:"09:00",jamSelesai:"11:00",durasiJam:2,totalHarga:3e5,status:"DISETUJUI",catatan:"Perlu kabel HDMI ekstra dan proyektor disiapkan 15 menit sebelum acara.",qrCodeUrl:"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SSB-20260908-881",createdAt:"2026-09-08 14:20:00"},{id:"res-102",kodeBooking:"SSB-20260908-412",ruanganId:"ruang-2",ruangan:l[1],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-10",jamMulai:"13:00",jamSelesai:"17:00",durasiJam:4,totalHarga:14e4,status:"BELUM_DIKONFIRMASI",createdAt:"2026-09-08 16:45:00"}],d={getRuangan:()=>o("/ruangan"),getRuanganById:e=>o(`/ruangan/${e}`),getReservasi:()=>o("/reservasi"),getReservasiById:e=>o(`/reservasi/${e}`),createReservasi:e=>o("/reservasi",{method:"POST",body:JSON.stringify(e)}),getAdminMetrics:()=>o("/admin/metrics")}},5244:(e,a)=>{var t;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),r=a.X(0,[682],()=>t(348));module.exports=r})();