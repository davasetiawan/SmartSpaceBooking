(()=>{var e={};e.id=158,e.ids=[158],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3866:(e,a,r)=>{"use strict";r.r(a),r.d(a,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>c,pages:()=>m,routeModule:()=>p,tree:()=>d}),r(592),r(4861),r(5866),r(1506);var t=r(3191),s=r(8716),n=r(7922),i=r.n(n),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(a,l);let d=["",{children:["(member)",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,592)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\login\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],m=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\login\\page.tsx"],c="/(member)/login/page",u={require:r,loadChunk:()=>Promise.resolve()},p=new t.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(member)/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6232:(e,a,r)=>{Promise.resolve().then(r.bind(r,2847))},2847:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>g});var t=r(326),s=r(7577),n=r(434),i=r(5047),o=r(9734),l=r(5932),d=r(9015),m=r(6557);let c=(0,m.Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]),u=(0,m.Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var p=r(4230),h=r(2374);function g(){let[e,a]=(0,s.useState)(""),[r,m]=(0,s.useState)(""),[g,x]=(0,s.useState)(!1),[b,f]=(0,s.useState)(!1),[y,j]=(0,s.useState)(""),v=(0,i.useRouter)(),k=async a=>{a.preventDefault(),f(!0),j("");try{let a=e.includes("@"),t=a?e:"",s=a?"":e,{user:n}=await h.hi.login(t||s,r);"ADMIN"===n.role?v.push("/admin"):v.push("/"),setTimeout(()=>{window.location.reload()},200)}catch(e){j(e.message||"Login gagal, periksa email/username dan password.")}finally{f(!1)}};return(0,t.jsxs)("div",{className:"auth-split-layout",children:[(0,t.jsxs)("div",{className:"auth-banner-col",children:[t.jsx("div",{className:"auth-banner-overlay",children:(0,t.jsxs)("div",{className:"banner-content",children:[t.jsx("span",{className:"banner-badge font-mono",children:"SONDER MEMBERSHIP"}),t.jsx("h1",{className:"font-serif banner-title",children:"Kembali ke Ruang Kerja Impian Anda."}),t.jsx("p",{className:"banner-desc",children:"Pesan meeting room 4K, hot desk ergonomis, dan kelola E-Ticket dalam satu akses terpadu."})]})}),t.jsx("img",{src:"https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",alt:"Sonder Space",className:"auth-bg-img"})]}),t.jsx("div",{className:"auth-form-col",children:(0,t.jsxs)("div",{className:"auth-form-wrapper",children:[(0,t.jsxs)("div",{className:"auth-brand-logo",children:[t.jsx(o.Z,{size:24,className:"brand-icon"}),t.jsx("span",{className:"font-serif brand-text",children:"SONDER"})]}),t.jsx("h2",{className:"font-serif auth-heading",children:"Masuk ke Akun Anda"}),t.jsx("p",{className:"auth-subheading",children:"Masukkan email atau username & kata sandi terdaftar Anda."}),y&&t.jsx("div",{className:"error-box",children:y}),(0,t.jsxs)("form",{onSubmit:k,className:"auth-form",children:[(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Email atau Username"}),(0,t.jsxs)("div",{className:"input-icon-group",children:[t.jsx(l.Z,{size:16,className:"input-icon"}),t.jsx("input",{type:"text",className:"form-control with-icon",placeholder:"admin@smartspace.com / member",value:e,onChange:e=>a(e.target.value),required:!0})]})]}),(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Kata Sandi"}),(0,t.jsxs)("div",{className:"input-icon-group",children:[t.jsx(d.Z,{size:16,className:"input-icon"}),t.jsx("input",{type:g?"text":"password",className:"form-control with-icon",placeholder:"••••••••",value:r,onChange:e=>m(e.target.value),required:!0}),t.jsx("button",{type:"button",className:"toggle-eye",onClick:()=>x(!g),children:g?t.jsx(c,{size:16}):t.jsx(u,{size:16})})]})]}),(0,t.jsxs)("button",{type:"submit",className:"btn btn-primary btn-full btn-lg mt-1",disabled:b,children:[b?"Memproses Masuk...":"Masuk Sekarang"," ",t.jsx(p.Z,{size:16})]}),(0,t.jsxs)("div",{className:"demo-hint-box font-mono",children:["\uD83D\uDCA1 Credential Demo Backend:",t.jsx("br",{}),"Admin: ",t.jsx("code",{children:"admin"})," / ",t.jsx("code",{children:"admin123"})," (atau ",t.jsx("code",{children:"admin@smartspace.com"}),")",t.jsx("br",{}),"Member: ",t.jsx("code",{children:"member"})," / ",t.jsx("code",{children:"member123"})," (atau ",t.jsx("code",{children:"member@smartspace.com"}),")"]})]}),(0,t.jsxs)("div",{className:"auth-footer-text",children:["Belum memiliki akun Sonder? ",t.jsx(n.default,{href:"/register",className:"auth-link",children:"Daftar Akun Baru →"})]})]})}),t.jsx("style",{children:`
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
        .banner-title {
          font-size: 2.75rem;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1rem;
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

        .auth-heading {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .auth-subheading {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .error-box {
          background: #FEE2E2;
          color: #991B1B;
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-md);
          font-size: 0.875rem;
          margin-bottom: 1rem;
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

        .form-control.with-icon {
          padding-left: 2.75rem;
        }

        .toggle-eye {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .demo-hint-box {
          margin-top: 1.5rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 0.85rem;
          border-radius: var(--border-radius-md);
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .auth-footer-text {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .auth-split-layout { grid-template-columns: 1fr; }
          .auth-banner-col { display: none; }
        }
      `})]})}},4230:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},2179:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},9015:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},5932:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},592:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>t});let t=(0,r(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\login\page.tsx#default`)}};var a=require("../../../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[278,752,336],()=>r(3866));module.exports=t})();