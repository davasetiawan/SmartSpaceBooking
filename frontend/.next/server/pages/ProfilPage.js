"use strict";(()=>{var e={};e.id=285,e.ids=[285,660],e.modules={1323:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,r){return r in a?a[r]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,r)):"function"==typeof a&&"default"===r?a:void 0}}})},9405:(e,a,r)=>{r.r(a),r.d(a,{config:()=>y,default:()=>v,getServerSideProps:()=>j,getStaticPaths:()=>S,getStaticProps:()=>P,reportWebVitals:()=>N,routeModule:()=>_,unstable_getServerProps:()=>I,unstable_getServerSideProps:()=>E,unstable_getStaticParams:()=>M,unstable_getStaticPaths:()=>w,unstable_getStaticProps:()=>A});var t={};r.r(t),r.d(t,{ProfilPage:()=>k});var i=r(7093),s=r(5244),o=r(1323),n=r(1682),l=r.n(n),d=r(8141),u=r.n(d),m=r(997),c=r(6689),g=r(9737),p=r(5489),f=r(1);let h=(0,f.Z)("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]),b=(0,f.Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);var x=r(9847);let k=()=>{let e=(0,x.ts)()||{id:"usr-1",nama:"Alexander Wright",email:"alex.wright@example.com",role:"MEMBER",telepon:"+62 812-3456-7890"},[a,r]=(0,c.useState)(e.nama),[t,i]=(0,c.useState)(e.email),[s,o]=(0,c.useState)(e.telepon||""),[n,l]=(0,c.useState)(!1);return(0,m.jsxs)("div",{className:"container profile-page-root",children:[(0,m.jsxs)("div",{className:"profile-header",children:[m.jsx("span",{className:"section-subtitle",children:"PENGATURAN AKUN"}),m.jsx("h1",{className:"font-serif profile-title",children:"Profil Member Sonder"}),m.jsx("p",{className:"profile-desc",children:"Kelola informasi pribadi, kontak, dan kuota jam penggunaan ruangan Anda."})]}),(0,m.jsxs)("div",{className:"profile-grid",children:[m.jsx("div",{className:"profile-card-col",children:(0,m.jsxs)("div",{className:"sonder-card user-badge-card",children:[m.jsx("div",{className:"user-avatar-large font-serif",children:a.charAt(0).toUpperCase()}),m.jsx("h2",{className:"font-serif user-fullname",children:a}),m.jsx("p",{className:"user-email",children:t}),(0,m.jsxs)("span",{className:"badge-pill badge-approved mt-1",children:[m.jsx(g.Z,{size:12})," Member Sonder Gold"]}),(0,m.jsxs)("div",{className:"quota-box mt-2",children:[(0,m.jsxs)("div",{className:"quota-row",children:[m.jsx("span",{children:"Sisa Kuota Jam Rapat"}),m.jsx("span",{className:"font-mono font-bold",children:"24 Jam"})]}),m.jsx("div",{className:"quota-progress-bar",children:m.jsx("div",{className:"quota-progress-fill",style:{width:"70%"}})}),m.jsx("small",{className:"quota-hint",children:"Kupon aktif diperbarui setiap awal bulan"})]})]})}),m.jsx("div",{className:"profile-form-col",children:(0,m.jsxs)("form",{onSubmit:r=>{r.preventDefault();let i={...e,nama:a,email:t,telepon:s};(0,x.lx)(i),l(!0),setTimeout(()=>l(!1),3e3)},className:"sonder-card form-box",children:[m.jsx("h3",{className:"font-serif box-title",children:"Perbarui Informasi Pribadi"}),n&&(0,m.jsxs)("div",{className:"alert-success",children:[m.jsx(p.Z,{size:18})," Profil berhasil diperbarui!"]}),(0,m.jsxs)("div",{className:"form-group",children:[m.jsx("label",{className:"form-label",children:"Nama Lengkap"}),m.jsx("input",{type:"text",className:"form-control",value:a,onChange:e=>r(e.target.value),required:!0})]}),(0,m.jsxs)("div",{className:"form-group",children:[m.jsx("label",{className:"form-label",children:"Alamat Email"}),m.jsx("input",{type:"email",className:"form-control",value:t,onChange:e=>i(e.target.value),required:!0})]}),(0,m.jsxs)("div",{className:"form-group",children:[m.jsx("label",{className:"form-label",children:"Nomor Telepon / WhatsApp"}),m.jsx("input",{type:"text",className:"form-control",value:s,onChange:e=>o(e.target.value)})]}),m.jsx("div",{className:"form-divider"}),(0,m.jsxs)("h4",{className:"font-serif box-subtitle",children:[m.jsx(h,{size:16})," Keamanan Kata Sandi"]}),(0,m.jsxs)("div",{className:"form-group",children:[m.jsx("label",{className:"form-label",children:"Kata Sandi Baru"}),m.jsx("input",{type:"password",className:"form-control",placeholder:"Kosongkan jika tidak ingin mengubah"})]}),(0,m.jsxs)("button",{type:"submit",className:"btn btn-primary btn-md",children:[m.jsx(b,{size:16})," Simpan Perubahan Profil"]})]})})]}),m.jsx("style",{children:`
        .profile-page-root {
          padding: 3rem 1.5rem;
        }

        .profile-header {
          margin-bottom: 2.5rem;
        }
        .profile-title {
          font-size: 2.75rem;
          color: var(--color-primary);
        }
        .profile-desc {
          color: var(--text-secondary);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 2.5rem;
        }

        .user-badge-card {
          padding: 2rem;
          text-align: center;
        }
        .user-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--color-primary);
          color: var(--color-accent);
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
        }
        .user-fullname {
          font-size: 1.5rem;
          margin-bottom: 0.2rem;
        }
        .user-email {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .quota-box {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: var(--border-radius-md);
          text-align: left;
        }
        .quota-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .quota-progress-bar {
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.35rem;
        }
        .quota-progress-fill {
          height: 100%;
          background: var(--color-accent);
        }
        .quota-hint {
          font-size: 0.725rem;
          color: var(--text-tertiary);
        }

        .form-box {
          padding: 2rem;
        }
        .box-title {
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
        }
        .box-subtitle {
          font-size: 1.1rem;
          margin: 1.5rem 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .alert-success {
          background: #D1FAE5;
          color: #065F46;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        .form-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.5rem 0;
        }
        .mt-1 { margin-top: 0.5rem; }
        .mt-2 { margin-top: 1.5rem; }

        @media (max-width: 800px) {
          .profile-grid { grid-template-columns: 1fr; }
        }
      `})]})},v=(0,o.l)(t,"default"),P=(0,o.l)(t,"getStaticProps"),S=(0,o.l)(t,"getStaticPaths"),j=(0,o.l)(t,"getServerSideProps"),y=(0,o.l)(t,"config"),N=(0,o.l)(t,"reportWebVitals"),A=(0,o.l)(t,"unstable_getStaticProps"),w=(0,o.l)(t,"unstable_getStaticPaths"),M=(0,o.l)(t,"unstable_getStaticParams"),I=(0,o.l)(t,"unstable_getServerProps"),E=(0,o.l)(t,"unstable_getServerSideProps"),_=new i.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/ProfilPage",pathname:"/ProfilPage",bundlePath:"",filename:""},components:{App:u(),Document:l()},userland:t})},1:(e,a,r)=>{r.d(a,{Z:()=>o});var t=r(6689),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),o=(e,a)=>{let r=(0,t.forwardRef)(({color:r="currentColor",size:o=24,strokeWidth:n=2,absoluteStrokeWidth:l,className:d="",children:u,...m},c)=>(0,t.createElement)("svg",{ref:c,...i,width:o,height:o,stroke:r,strokeWidth:l?24*Number(n)/Number(o):n,className:["lucide",`lucide-${s(e)}`,d].join(" "),...m},[...a.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(u)?u:[u]]));return r.displayName=`${e}`,r}},9737:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]])},5489:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8141:(e,a,r)=>{Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let t=r(167),i=r(997),s=t._(r(6689)),o=r(5782);async function n(e){let{Component:a,ctx:r}=e;return{pageProps:await (0,o.loadGetInitialProps)(a,r)}}class l extends s.default.Component{render(){let{Component:e,pageProps:a}=this.props;return(0,i.jsx)(e,{...a})}}l.origGetInitialProps=n,l.getInitialProps=n,("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)},9847:(e,a,r)=>{r.d(a,{hi:()=>u,lx:()=>o,ts:()=>s,uB:()=>i});let t=()=>localStorage.getItem("ssb_token"),i=e=>(localStorage.getItem("ssb_token"),localStorage.setItem("ssb_token",e)),s=()=>{let e=localStorage.getItem("ssb_user");if(!e)return null;try{return JSON.parse(e)}catch{return null}},o=e=>{e?localStorage.setItem("ssb_user",JSON.stringify(e)):localStorage.removeItem("ssb_user")};async function n(e,a={}){let r=t(),i={"Content-Type":"application/json",...a.headers};r&&(i.Authorization=`Bearer ${r}`);try{let r=await fetch(`/api${e}`,{...a,headers:i});if(r.ok)return await r.json()}catch(a){console.warn(`API call to ${e} failed, falling back to mock data:`,a)}return function(e,a){let r=a.method||"GET";if(e.startsWith("/ruangan")){if(e.includes("/ruang-")){let a=e.split("/")[2];return l.find(e=>e.id===a)||l[0]}return l}if(e.startsWith("/reservasi")){if("POST"===r){let e=JSON.parse(a.body||"{}"),r={id:`res-${Date.now()}`,kodeBooking:`SSB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(100+900*Math.random())}`,ruanganId:e.ruanganId||"ruang-1",ruangan:l.find(a=>a.id===e.ruanganId)||l[0],userId:s()?.id||"usr-1",user:s()||{id:"usr-1",nama:"User Member",email:"user@example.com",role:"MEMBER"},tanggal:e.tanggal||"2026-09-10",jamMulai:e.jamMulai||"10:00",jamSelesai:e.jamSelesai||"12:00",durasiJam:e.durasiJam||2,totalHarga:e.totalHarga||3e5,status:"BELUM_DIKONFIRMASI",catatan:e.catatan||"",createdAt:new Date().toISOString()};return d.unshift(r),r}return d}return e.startsWith("/admin/metrics")?{totalReservasi:128,reservasiPending:5,ruanganAktif:8,totalMember:340,totalPendapatan:485e5,tingkatOkupansi:84.5}:{}}(e,a)}let l=[{id:"ruang-1",nama:"Sonder Grand Suite — Meeting Room A",slug:"sonder-grand-suite",tipe:"MEETING_ROOM",kapasitas:12,hargaPerJam:15e4,hargaPerHari:1e6,deskripsi:"Ruang rapat eksklusif dengan pencahayaan alami, monitor 4K 65-inch, sound system premium, dan meja kayu solid ergonomis.",fasilitas:["High-speed Wi-Fi","Proyektor 4K","Whiteboard Glass","Coffee & Tea","Air Conditioner","Soundproof Wall"],gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 3 — Zone North",isAktif:!0,rating:4.9},{id:"ruang-2",nama:"Urban Loft — Coworking Hot Desk",slug:"urban-loft-hot-desk",tipe:"COWORKING_DESK",kapasitas:1,hargaPerJam:35e3,hargaPerHari:2e5,deskripsi:"Meja kerja fleksibel di area open-space yang tenang, dilengkapi power outlet dedicated dan akses lounge kopi.",fasilitas:["Wi-Fi 500Mbps","Power Outlet Dedicated","Ergonomic Mesh Chair","Free Flow Artisan Coffee"],gambarUrl:["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 1 — Main Lounge",isAktif:!0,rating:4.8},{id:"ruang-3",nama:"Executive Private Office 101",slug:"executive-office-101",tipe:"PRIVATE_OFFICE",kapasitas:6,hargaPerJam:25e4,hargaPerHari:18e5,deskripsi:"Kantor privat siap pakai untuk tim startup atau eksekutif. Privasi penuh dengan kunci pintu digital.",fasilitas:["Akses 24/7 Digital Key","Private Wi-Fi Subnet","Standing Desk","Locker Pribadi","Cleaning Service Harian"],gambarUrl:["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 2 — West Wing",isAktif:!0,rating:5},{id:"ruang-4",nama:"Grand Auditorium & Event Hall",slug:"grand-auditorium-hall",tipe:"EVENT_SPACE",kapasitas:80,hargaPerJam:75e4,hargaPerHari:5e6,deskripsi:"Aula serbaguna premium untuk workshop, seminar, peluncuran produk, dan gathering perusahaan.",fasilitas:["Stage & Lighting System","Dual Screen Projector","Wireless Microphones","Catering Station Area","VIP Holding Room"],gambarUrl:["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai Ground — Main Auditorium",isAktif:!0,rating:4.9}],d=[{id:"res-101",kodeBooking:"SSB-20260908-881",ruanganId:"ruang-1",ruangan:l[0],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-09",jamMulai:"09:00",jamSelesai:"11:00",durasiJam:2,totalHarga:3e5,status:"DISETUJUI",catatan:"Perlu kabel HDMI ekstra dan proyektor disiapkan 15 menit sebelum acara.",qrCodeUrl:"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SSB-20260908-881",createdAt:"2026-09-08 14:20:00"},{id:"res-102",kodeBooking:"SSB-20260908-412",ruanganId:"ruang-2",ruangan:l[1],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-10",jamMulai:"13:00",jamSelesai:"17:00",durasiJam:4,totalHarga:14e4,status:"BELUM_DIKONFIRMASI",createdAt:"2026-09-08 16:45:00"}],u={getRuangan:()=>n("/ruangan"),getRuanganById:e=>n(`/ruangan/${e}`),getReservasi:()=>n("/reservasi"),getReservasiById:e=>n(`/reservasi/${e}`),createReservasi:e=>n("/reservasi",{method:"POST",body:JSON.stringify(e)}),getAdminMetrics:()=>n("/admin/metrics")}},5244:(e,a)=>{var r;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[682],()=>r(9405));module.exports=t})();