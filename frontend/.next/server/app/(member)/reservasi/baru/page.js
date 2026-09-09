(()=>{var e={};e.id=131,e.ids=[131],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6797:(e,a,s)=>{"use strict";s.r(a),s.d(a,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>m,routeModule:()=>u,tree:()=>d}),s(2750),s(4861),s(5866),s(1506);var r=s(3191),t=s(8716),i=s(7922),n=s.n(i),o=s(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);s.d(a,l);let d=["",{children:["(member)",{children:["reservasi",{children:["baru",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,2750)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\reservasi\\baru\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,5866,23)),"next/dist/client/components/not-found-error"]}],m=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\reservasi\\baru\\page.tsx"],c="/(member)/reservasi/baru/page",p={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:t.x.APP_PAGE,page:"/(member)/reservasi/baru/page",pathname:"/reservasi/baru",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},978:(e,a,s)=>{Promise.resolve().then(s.bind(s,5672))},5672:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>h});var r=s(326),t=s(7577),i=s(5047),n=s(9734),o=s(7358),l=s(8998),d=s(6557);let m=(0,d.Z)("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]),c=(0,d.Z)("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);var p=s(763),u=s(2374);function h(){let e=(0,i.useSearchParams)(),a=(0,i.useRouter)(),[s,d]=(0,t.useState)(e?.get("ruanganId")||"ruang-1"),[h,x]=(0,t.useState)(null),[g,b]=(0,t.useState)(e?.get("tanggal")||new Date().toISOString().slice(0,10)),[v,f]=(0,t.useState)(e?.get("jamMulai")||"09:00"),[j,y]=(0,t.useState)(parseInt(e?.get("durasiJam")||"2",10)),[N,k]=(0,t.useState)(""),[P,R]=(0,t.useState)("TRANSFER_BANK"),[S,C]=(0,t.useState)(!1),[I,T]=(0,t.useState)(!1),w=h?h.hargaPerJam:15e4,A=w*j,_=(e,a)=>{let s=parseInt(e.split(":")[0],10)+a;return`${s<10?"0"+s:s}:00`},B=async e=>{e.preventDefault(),T(!0);try{let e=_(v,j);await u.hi.createReservasi({ruanganId:s,tanggal:g,jamMulai:v,jamSelesai:e,durasiJam:j,totalHarga:A,catatan:N}),T(!1),a.push("/reservasi")}catch(e){T(!1),alert("Gagal membuat reservasi: "+e)}};return(0,r.jsxs)("div",{className:"container form-page-root",children:[(0,r.jsxs)("div",{className:"form-header",children:[r.jsx("span",{className:"section-subtitle",children:"FORMULIR PEMESANAN"}),r.jsx("h1",{className:"font-serif form-title",children:"Konfirmasi Reservasi Ruangan"}),r.jsx("p",{className:"form-desc",children:"Lengkapi rincian tanggal, durasi, dan metode pembayaran untuk menerbitkan E-Ticket Pass Anda."})]}),(0,r.jsxs)("div",{className:"form-grid",children:[r.jsx("div",{className:"form-inputs-col",children:(0,r.jsxs)("form",{onSubmit:B,className:"sonder-card form-card",children:[(0,r.jsxs)("div",{className:"form-section",children:[(0,r.jsxs)("h3",{className:"font-serif section-heading",children:[r.jsx(n.Z,{size:18,className:"icon-gold"})," 1. Detail Ruangan & Waktu"]}),(0,r.jsxs)("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Ruangan Terpilih"}),r.jsx("input",{type:"text",className:"form-control",value:h?.nama||"Sonder Suite Room",readOnly:!0})]}),(0,r.jsxs)("div",{className:"form-row-2",children:[(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsxs)("label",{className:"form-label",children:[r.jsx(o.Z,{size:14})," Tanggal Booking"]}),r.jsx("input",{type:"date",className:"form-control",value:g,onChange:e=>b(e.target.value),required:!0})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsxs)("label",{className:"form-label",children:[r.jsx(l.Z,{size:14})," Jam Mulai"]}),(0,r.jsxs)("select",{className:"form-control",value:v,onChange:e=>f(e.target.value),children:[r.jsx("option",{value:"08:00",children:"08:00 WIB"}),r.jsx("option",{value:"09:00",children:"09:00 WIB"}),r.jsx("option",{value:"10:00",children:"10:00 WIB"}),r.jsx("option",{value:"13:00",children:"13:00 WIB"}),r.jsx("option",{value:"14:00",children:"14:00 WIB"})]})]})]}),(0,r.jsxs)("div",{className:"form-group",children:[r.jsx("label",{className:"form-label",children:"Durasi Sewa (Jam)"}),r.jsx("input",{type:"number",min:"1",max:"12",className:"form-control font-mono",value:j,onChange:e=>y(parseInt(e.target.value,10)||1)}),(0,r.jsxs)("small",{className:"form-help",children:["Waktu Berakhir Otomatis: ",_(v,j)," WIB"]})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsxs)("label",{className:"form-label",children:[r.jsx(m,{size:14})," Catatan Khusus (Opsional)"]}),r.jsx("textarea",{className:"form-control",rows:3,placeholder:"Contoh: Perlu setup meja U-shape atau tambahan kabel HDMI...",value:N,onChange:e=>k(e.target.value)})]})]}),(0,r.jsxs)("div",{className:"form-section",children:[(0,r.jsxs)("h3",{className:"font-serif section-heading",children:[r.jsx(c,{size:18,className:"icon-gold"})," 2. Metode Pembayaran"]}),(0,r.jsxs)("div",{className:"payment-options",children:[(0,r.jsxs)("label",{className:`payment-option ${"TRANSFER_BANK"===P?"selected":""}`,children:[r.jsx("input",{type:"radio",name:"bayar",value:"TRANSFER_BANK",checked:"TRANSFER_BANK"===P,onChange:()=>R("TRANSFER_BANK")}),(0,r.jsxs)("div",{children:[r.jsx("div",{className:"opt-title",children:"Transfer Bank Virtual Account"}),r.jsx("div",{className:"opt-desc",children:"BCA / Mandiri / BNI Instant Verification"})]})]}),(0,r.jsxs)("label",{className:`payment-option ${"QRIS"===P?"selected":""}`,children:[r.jsx("input",{type:"radio",name:"bayar",value:"QRIS",checked:"QRIS"===P,onChange:()=>R("QRIS")}),(0,r.jsxs)("div",{children:[r.jsx("div",{className:"opt-title",children:"QRIS Instant Payment"}),r.jsx("div",{className:"opt-desc",children:"Scan QRIS dari Gopay, OVO, ShopeePay, DANA"})]})]})]}),(0,r.jsxs)("div",{className:"upload-box",children:[r.jsx("label",{className:"form-label",children:"Upload Bukti Transfer / Resi (Format JPG/PNG)"}),(0,r.jsxs)("div",{className:"upload-dropzone",children:[r.jsx("p",{children:S?"✓ File Bukti Pembayaran Berhasil Dimuat":"Klik atau seret foto bukti pembayaran ke sini"}),r.jsx("button",{type:"button",className:"btn btn-outline btn-sm mt-1",onClick:()=>C(!0),children:S?"Ganti File":"Pilih File"})]})]})]}),r.jsx("button",{type:"submit",className:"btn btn-primary btn-full btn-lg",disabled:I,children:I?"Memproses Reservasi...":"Konfirmasi & Terbitkan E-Ticket Pass"})]})}),r.jsx("div",{className:"summary-sidebar-col",children:(0,r.jsxs)("div",{className:"summary-card sonder-card glass-card",children:[r.jsx("h3",{className:"font-serif summary-heading",children:"Rincian Pemesanan"}),(0,r.jsxs)("div",{className:"summary-room-preview",children:[r.jsx("img",{src:h?.gambarUrl[0],alt:"Ruangan",className:"summary-img"}),(0,r.jsxs)("div",{children:[r.jsx("div",{className:"summary-room-name font-serif",children:h?.nama}),r.jsx("div",{className:"summary-room-loc",children:h?.lokasi})]})]}),(0,r.jsxs)("div",{className:"summary-table",children:[(0,r.jsxs)("div",{className:"s-row",children:[r.jsx("span",{children:"Tanggal"}),r.jsx("span",{className:"font-mono",children:g})]}),(0,r.jsxs)("div",{className:"s-row",children:[r.jsx("span",{children:"Waktu Sesi"}),(0,r.jsxs)("span",{className:"font-mono",children:[v," - ",_(v,j)]})]}),(0,r.jsxs)("div",{className:"s-row",children:[r.jsx("span",{children:"Durasi Total"}),(0,r.jsxs)("span",{className:"font-mono",children:[j," Jam"]})]}),(0,r.jsxs)("div",{className:"s-row",children:[r.jsx("span",{children:"Tarif Per Jam"}),(0,r.jsxs)("span",{className:"font-mono",children:["Rp ",w.toLocaleString("id-ID")]})]}),r.jsx("div",{className:"s-divider"}),(0,r.jsxs)("div",{className:"s-row s-total",children:[r.jsx("span",{children:"Total Pembayaran"}),(0,r.jsxs)("span",{className:"font-mono s-price",children:["Rp ",A.toLocaleString("id-ID")]})]})]}),(0,r.jsxs)("div",{className:"guarantee-box",children:[r.jsx(p.Z,{size:18,className:"shield-icon"}),r.jsx("span",{children:"Jaminan Ruangan Sonder: Kebersihan terstandarisasi & jaminan Wi-Fi aktif."})]})]})})]}),r.jsx("style",{children:`
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
        }
        .payment-option.selected {
          border-color: var(--color-accent);
          background: var(--color-accent-light);
        }

        .upload-dropzone {
          border: 2px dashed var(--border-color);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          text-align: center;
          background: var(--bg-primary);
        }

        .summary-card {
          padding: 1.75rem;
          position: sticky;
          top: 100px;
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

        @media (max-width: 900px) {
          .form-grid { grid-template-columns: 1fr; }
          .payment-options { grid-template-columns: 1fr; }
        }
      `})]})}},7358:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},2179:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8998:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});let r=(0,s(6557).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},2750:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>r});let r=(0,s(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\reservasi\baru\page.tsx#default`)}};var a=require("../../../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),r=a.X(0,[278,752,336],()=>s(6797));module.exports=r})();