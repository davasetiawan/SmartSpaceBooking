"use strict";(()=>{var e={};e.id=913,e.ids=[913,660],e.modules={1323:(e,a)=>{Object.defineProperty(a,"l",{enumerable:!0,get:function(){return function e(a,r){return r in a?a[r]:"then"in a&&"function"==typeof a.then?a.then(a=>e(a,r)):"function"==typeof a&&"default"===r?a:void 0}}})},2780:(e,a,r)=>{r.r(a),r.d(a,{config:()=>M,default:()=>S,getServerSideProps:()=>I,getStaticPaths:()=>P,getStaticProps:()=>N,reportWebVitals:()=>A,routeModule:()=>B,unstable_getServerProps:()=>_,unstable_getServerSideProps:()=>O,unstable_getStaticParams:()=>E,unstable_getStaticPaths:()=>w,unstable_getStaticProps:()=>R});var t={};r.r(t),r.d(t,{FormReservasiPage:()=>j});var s=r(7093),i=r(5244),n=r(1323),o=r(1682),l=r.n(o),d=r(8141),m=r.n(d),c=r(997),u=r(6689),p=r(7871),g=r(2003),h=r(8742),f=r(1);let x=(0,f.Z)("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]),v=(0,f.Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]),b=(0,f.Z)("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);var y=r(4326),k=r(9847);!function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}();let j=()=>{let e=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())(),a=Object(function(){var e=Error("Cannot find module 'react-router-dom'");throw e.code="MODULE_NOT_FOUND",e}())(),r=e.state||{},[t,s]=(0,u.useState)(r.ruanganId||"ruang-1"),[i,n]=(0,u.useState)(null),[o,l]=(0,u.useState)(r.tanggal||new Date().toISOString().slice(0,10)),[d,m]=(0,u.useState)(r.jamMulai||"09:00"),[f,j]=(0,u.useState)(r.durasiJam||2),[S,N]=(0,u.useState)(""),[P,I]=(0,u.useState)("TRANSFER_BANK"),[M,A]=(0,u.useState)(!1),[R,w]=(0,u.useState)(!1);(0,u.useEffect)(()=>{t&&k.hi.getRuanganById(t).then(n)},[t]);let E=i?i.hargaPerJam:15e4,_=E*f,O=(e,a)=>{let r=parseInt(e.split(":")[0],10)+a;return`${r<10?"0"+r:r}:00`},B=async e=>{e.preventDefault(),w(!0);try{let e=O(d,f),r=await k.hi.createReservasi({ruanganId:t,tanggal:o,jamMulai:d,jamSelesai:e,durasiJam:f,totalHarga:_,catatan:S});w(!1),a("/reservasi",{state:{newBookingCreated:!0,createdId:r.id}})}catch(e){w(!1),alert("Gagal membuat reservasi: "+e)}};return(0,c.jsxs)("div",{className:"container form-page-root",children:[(0,c.jsxs)("div",{className:"form-header",children:[c.jsx("span",{className:"section-subtitle",children:"FORMULIR PEMESANAN"}),c.jsx("h1",{className:"font-serif form-title",children:"Konfirmasi Reservasi Ruangan"}),c.jsx("p",{className:"form-desc",children:"Lengkapi rincian tanggal, durasi, dan metode pembayaran untuk menerbitkan E-Ticket Pass Anda."})]}),(0,c.jsxs)("div",{className:"form-grid",children:[c.jsx("div",{className:"form-inputs-col",children:(0,c.jsxs)("form",{onSubmit:B,className:"sonder-card form-card",children:[(0,c.jsxs)("div",{className:"form-section",children:[(0,c.jsxs)("h3",{className:"font-serif section-heading",children:[c.jsx(p.Z,{size:18,className:"icon-gold"})," 1. Detail Ruangan & Waktu"]}),(0,c.jsxs)("div",{className:"form-group",children:[c.jsx("label",{className:"form-label",children:"Ruangan Terpilih"}),c.jsx("input",{type:"text",className:"form-control",value:i?.nama||"Sonder Suite Room",readOnly:!0})]}),(0,c.jsxs)("div",{className:"form-row-2",children:[(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsxs)("label",{className:"form-label",children:[c.jsx(g.Z,{size:14})," Tanggal Booking"]}),c.jsx("input",{type:"date",className:"form-control",value:o,onChange:e=>l(e.target.value),required:!0})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsxs)("label",{className:"form-label",children:[c.jsx(h.Z,{size:14})," Jam Mulai"]}),(0,c.jsxs)("select",{className:"form-control",value:d,onChange:e=>m(e.target.value),children:[c.jsx("option",{value:"08:00",children:"08:00 WIB"}),c.jsx("option",{value:"09:00",children:"09:00 WIB"}),c.jsx("option",{value:"10:00",children:"10:00 WIB"}),c.jsx("option",{value:"13:00",children:"13:00 WIB"}),c.jsx("option",{value:"14:00",children:"14:00 WIB"})]})]})]}),(0,c.jsxs)("div",{className:"form-group",children:[c.jsx("label",{className:"form-label",children:"Durasi Sewa (Jam)"}),c.jsx("input",{type:"number",min:"1",max:"12",className:"form-control font-mono",value:f,onChange:e=>j(parseInt(e.target.value,10)||1)}),(0,c.jsxs)("small",{className:"form-help",children:["Waktu Berakhir Otomatis: ",O(d,f)," WIB"]})]}),(0,c.jsxs)("div",{className:"form-group",children:[(0,c.jsxs)("label",{className:"form-label",children:[c.jsx(x,{size:14})," Catatan Khusus (Opsional)"]}),c.jsx("textarea",{className:"form-control",rows:3,placeholder:"Contoh: Perlu setup meja U-shape atau tambahan kabel HDMI...",value:S,onChange:e=>N(e.target.value)})]})]}),(0,c.jsxs)("div",{className:"form-section",children:[(0,c.jsxs)("h3",{className:"font-serif section-heading",children:[c.jsx(v,{size:18,className:"icon-gold"})," 2. Metode Pembayaran"]}),(0,c.jsxs)("div",{className:"payment-options",children:[(0,c.jsxs)("label",{className:`payment-option ${"TRANSFER_BANK"===P?"selected":""}`,children:[c.jsx("input",{type:"radio",name:"bayar",value:"TRANSFER_BANK",checked:"TRANSFER_BANK"===P,onChange:()=>I("TRANSFER_BANK")}),(0,c.jsxs)("div",{children:[c.jsx("div",{className:"opt-title",children:"Transfer Bank Virtual Account"}),c.jsx("div",{className:"opt-desc",children:"BCA / Mandiri / BNI Instant Verification"})]})]}),(0,c.jsxs)("label",{className:`payment-option ${"QRIS"===P?"selected":""}`,children:[c.jsx("input",{type:"radio",name:"bayar",value:"QRIS",checked:"QRIS"===P,onChange:()=>I("QRIS")}),(0,c.jsxs)("div",{children:[c.jsx("div",{className:"opt-title",children:"QRIS Instant Payment"}),c.jsx("div",{className:"opt-desc",children:"Scan QRIS dari Gopay, OVO, ShopeePay, DANA"})]})]})]}),(0,c.jsxs)("div",{className:"upload-box",children:[c.jsx("label",{className:"form-label",children:"Upload Bukti Transfer / Resi (Format JPG/PNG)"}),(0,c.jsxs)("div",{className:"upload-dropzone",children:[c.jsx(b,{size:24,className:"upload-icon"}),c.jsx("p",{children:M?"✓ File Bukti Pembayaran Berhasil Dimuat":"Klik atau seret foto bukti pembayaran ke sini"}),c.jsx("button",{type:"button",className:"btn btn-outline btn-sm mt-1",onClick:()=>A(!0),children:M?"Ganti File":"Pilih File"})]})]})]}),c.jsx("button",{type:"submit",className:"btn btn-primary btn-full btn-lg",disabled:R,children:R?"Memproses Reservasi...":"Konfirmasi & Terbitkan E-Ticket Pass"})]})}),c.jsx("div",{className:"summary-sidebar-col",children:(0,c.jsxs)("div",{className:"summary-card sonder-card glass-card",children:[c.jsx("h3",{className:"font-serif summary-heading",children:"Rincian Pemesanan"}),(0,c.jsxs)("div",{className:"summary-room-preview",children:[c.jsx("img",{src:i?.gambarUrl[0],alt:"Ruangan",className:"summary-img"}),(0,c.jsxs)("div",{children:[c.jsx("div",{className:"summary-room-name font-serif",children:i?.nama}),c.jsx("div",{className:"summary-room-loc",children:i?.lokasi})]})]}),(0,c.jsxs)("div",{className:"summary-table",children:[(0,c.jsxs)("div",{className:"s-row",children:[c.jsx("span",{children:"Tanggal"}),c.jsx("span",{className:"font-mono",children:o})]}),(0,c.jsxs)("div",{className:"s-row",children:[c.jsx("span",{children:"Waktu Sesi"}),(0,c.jsxs)("span",{className:"font-mono",children:[d," - ",O(d,f)]})]}),(0,c.jsxs)("div",{className:"s-row",children:[c.jsx("span",{children:"Durasi Total"}),(0,c.jsxs)("span",{className:"font-mono",children:[f," Jam"]})]}),(0,c.jsxs)("div",{className:"s-row",children:[c.jsx("span",{children:"Tarif Per Jam"}),(0,c.jsxs)("span",{className:"font-mono",children:["Rp ",E.toLocaleString("id-ID")]})]}),c.jsx("div",{className:"s-divider"}),(0,c.jsxs)("div",{className:"s-row s-total",children:[c.jsx("span",{children:"Total Pembayaran"}),(0,c.jsxs)("span",{className:"font-mono s-price",children:["Rp ",_.toLocaleString("id-ID")]})]})]}),(0,c.jsxs)("div",{className:"guarantee-box",children:[c.jsx(y.Z,{size:18,className:"shield-icon"}),c.jsx("span",{children:"Jaminan Ruangan Sonder: Kebersihan terstandarisasi & jaminan Wi-Fi aktif."})]})]})})]}),c.jsx("style",{children:`
        .form-page-root {
          padding: 3rem 1.5rem;
        }

        .form-header {
          margin-bottom: 2.5rem;
        }
        .form-title {
          font-size: 2.5rem;
          color: var(--color-primary);
        }
        .form-desc {
          color: var(--text-secondary);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
        }

        .form-card {
          padding: 2rem;
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        .section-heading {
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          color: var(--color-primary);
        }
        .icon-gold {
          color: var(--color-accent);
        }

        .form-help {
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .payment-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .payment-option {
          border: 1.5px solid var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .payment-option.selected {
          border-color: var(--color-accent);
          background: var(--color-accent-light);
        }
        .opt-title {
          font-weight: 700;
          font-size: 0.875rem;
        }
        .opt-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .upload-box {
          margin-top: 1rem;
        }
        .upload-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          text-align: center;
          background: var(--bg-primary);
        }
        .upload-icon {
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .summary-card {
          padding: 1.75rem;
          position: sticky;
          top: 100px;
        }
        .summary-heading {
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
        }
        .summary-room-preview {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .summary-img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: var(--border-radius-md);
        }
        .summary-room-name {
          font-size: 1.05rem;
          font-weight: 700;
        }
        .summary-room-loc {
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .summary-table {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
        }
        .s-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }
        .s-divider {
          height: 1px;
          background: var(--border-color);
        }
        .s-total {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 1rem;
        }
        .s-price {
          color: var(--color-accent-hover);
          font-size: 1.25rem;
        }

        .guarantee-box {
          margin-top: 1.5rem;
          background: var(--bg-secondary);
          padding: 0.75rem;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .form-grid { grid-template-columns: 1fr; }
          .payment-options { grid-template-columns: 1fr; }
        }
      `})]})},S=(0,n.l)(t,"default"),N=(0,n.l)(t,"getStaticProps"),P=(0,n.l)(t,"getStaticPaths"),I=(0,n.l)(t,"getServerSideProps"),M=(0,n.l)(t,"config"),A=(0,n.l)(t,"reportWebVitals"),R=(0,n.l)(t,"unstable_getStaticProps"),w=(0,n.l)(t,"unstable_getStaticPaths"),E=(0,n.l)(t,"unstable_getStaticParams"),_=(0,n.l)(t,"unstable_getServerProps"),O=(0,n.l)(t,"unstable_getServerSideProps"),B=new s.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/FormReservasiPage",pathname:"/FormReservasiPage",bundlePath:"",filename:""},components:{App:m(),Document:l()},userland:t})},1:(e,a,r)=>{r.d(a,{Z:()=>n});var t=r(6689),s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),n=(e,a)=>{let r=(0,t.forwardRef)(({color:r="currentColor",size:n=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:d="",children:m,...c},u)=>(0,t.createElement)("svg",{ref:u,...s,width:n,height:n,stroke:r,strokeWidth:l?24*Number(o)/Number(n):o,className:["lucide",`lucide-${i(e)}`,d].join(" "),...c},[...a.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(m)?m:[m]]));return r.displayName=`${e}`,r}},7871:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]])},2003:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},8742:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},4326:(e,a,r)=>{r.d(a,{Z:()=>t});let t=(0,r(1).Z)("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8141:(e,a,r)=>{Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let t=r(167),s=r(997),i=t._(r(6689)),n=r(5782);async function o(e){let{Component:a,ctx:r}=e;return{pageProps:await (0,n.loadGetInitialProps)(a,r)}}class l extends i.default.Component{render(){let{Component:e,pageProps:a}=this.props;return(0,s.jsx)(e,{...a})}}l.origGetInitialProps=o,l.getInitialProps=o,("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),e.exports=a.default)},9847:(e,a,r)=>{r.d(a,{hi:()=>m,lx:()=>n,ts:()=>i,uB:()=>s});let t=()=>localStorage.getItem("ssb_token"),s=e=>(localStorage.getItem("ssb_token"),localStorage.setItem("ssb_token",e)),i=()=>{let e=localStorage.getItem("ssb_user");if(!e)return null;try{return JSON.parse(e)}catch{return null}},n=e=>{e?localStorage.setItem("ssb_user",JSON.stringify(e)):localStorage.removeItem("ssb_user")};async function o(e,a={}){let r=t(),s={"Content-Type":"application/json",...a.headers};r&&(s.Authorization=`Bearer ${r}`);try{let r=await fetch(`/api${e}`,{...a,headers:s});if(r.ok)return await r.json()}catch(a){console.warn(`API call to ${e} failed, falling back to mock data:`,a)}return function(e,a){let r=a.method||"GET";if(e.startsWith("/ruangan")){if(e.includes("/ruang-")){let a=e.split("/")[2];return l.find(e=>e.id===a)||l[0]}return l}if(e.startsWith("/reservasi")){if("POST"===r){let e=JSON.parse(a.body||"{}"),r={id:`res-${Date.now()}`,kodeBooking:`SSB-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(100+900*Math.random())}`,ruanganId:e.ruanganId||"ruang-1",ruangan:l.find(a=>a.id===e.ruanganId)||l[0],userId:i()?.id||"usr-1",user:i()||{id:"usr-1",nama:"User Member",email:"user@example.com",role:"MEMBER"},tanggal:e.tanggal||"2026-09-10",jamMulai:e.jamMulai||"10:00",jamSelesai:e.jamSelesai||"12:00",durasiJam:e.durasiJam||2,totalHarga:e.totalHarga||3e5,status:"BELUM_DIKONFIRMASI",catatan:e.catatan||"",createdAt:new Date().toISOString()};return d.unshift(r),r}return d}return e.startsWith("/admin/metrics")?{totalReservasi:128,reservasiPending:5,ruanganAktif:8,totalMember:340,totalPendapatan:485e5,tingkatOkupansi:84.5}:{}}(e,a)}let l=[{id:"ruang-1",nama:"Sonder Grand Suite — Meeting Room A",slug:"sonder-grand-suite",tipe:"MEETING_ROOM",kapasitas:12,hargaPerJam:15e4,hargaPerHari:1e6,deskripsi:"Ruang rapat eksklusif dengan pencahayaan alami, monitor 4K 65-inch, sound system premium, dan meja kayu solid ergonomis.",fasilitas:["High-speed Wi-Fi","Proyektor 4K","Whiteboard Glass","Coffee & Tea","Air Conditioner","Soundproof Wall"],gambarUrl:["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 3 — Zone North",isAktif:!0,rating:4.9},{id:"ruang-2",nama:"Urban Loft — Coworking Hot Desk",slug:"urban-loft-hot-desk",tipe:"COWORKING_DESK",kapasitas:1,hargaPerJam:35e3,hargaPerHari:2e5,deskripsi:"Meja kerja fleksibel di area open-space yang tenang, dilengkapi power outlet dedicated dan akses lounge kopi.",fasilitas:["Wi-Fi 500Mbps","Power Outlet Dedicated","Ergonomic Mesh Chair","Free Flow Artisan Coffee"],gambarUrl:["https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 1 — Main Lounge",isAktif:!0,rating:4.8},{id:"ruang-3",nama:"Executive Private Office 101",slug:"executive-office-101",tipe:"PRIVATE_OFFICE",kapasitas:6,hargaPerJam:25e4,hargaPerHari:18e5,deskripsi:"Kantor privat siap pakai untuk tim startup atau eksekutif. Privasi penuh dengan kunci pintu digital.",fasilitas:["Akses 24/7 Digital Key","Private Wi-Fi Subnet","Standing Desk","Locker Pribadi","Cleaning Service Harian"],gambarUrl:["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai 2 — West Wing",isAktif:!0,rating:5},{id:"ruang-4",nama:"Grand Auditorium & Event Hall",slug:"grand-auditorium-hall",tipe:"EVENT_SPACE",kapasitas:80,hargaPerJam:75e4,hargaPerHari:5e6,deskripsi:"Aula serbaguna premium untuk workshop, seminar, peluncuran produk, dan gathering perusahaan.",fasilitas:["Stage & Lighting System","Dual Screen Projector","Wireless Microphones","Catering Station Area","VIP Holding Room"],gambarUrl:["https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"],lokasi:"Lantai Ground — Main Auditorium",isAktif:!0,rating:4.9}],d=[{id:"res-101",kodeBooking:"SSB-20260908-881",ruanganId:"ruang-1",ruangan:l[0],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-09",jamMulai:"09:00",jamSelesai:"11:00",durasiJam:2,totalHarga:3e5,status:"DISETUJUI",catatan:"Perlu kabel HDMI ekstra dan proyektor disiapkan 15 menit sebelum acara.",qrCodeUrl:"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SSB-20260908-881",createdAt:"2026-09-08 14:20:00"},{id:"res-102",kodeBooking:"SSB-20260908-412",ruanganId:"ruang-2",ruangan:l[1],userId:"usr-1",user:{id:"usr-1",nama:"Alexander Wright",email:"alex@example.com",role:"MEMBER"},tanggal:"2026-09-10",jamMulai:"13:00",jamSelesai:"17:00",durasiJam:4,totalHarga:14e4,status:"BELUM_DIKONFIRMASI",createdAt:"2026-09-08 16:45:00"}],m={getRuangan:()=>o("/ruangan"),getRuanganById:e=>o(`/ruangan/${e}`),getReservasi:()=>o("/reservasi"),getReservasiById:e=>o(`/reservasi/${e}`),createReservasi:e=>o("/reservasi",{method:"POST",body:JSON.stringify(e)}),getAdminMetrics:()=>o("/admin/metrics")}},5244:(e,a)=>{var r;Object.defineProperty(a,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var a=require("../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[682],()=>r(2780));module.exports=t})();