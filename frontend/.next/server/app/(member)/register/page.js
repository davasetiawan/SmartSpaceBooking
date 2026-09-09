(()=>{var e={};e.id=852,e.ids=[852],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},8068:(e,a,r)=>{"use strict";r.r(a),r.d(a,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>m,pages:()=>c,routeModule:()=>p,tree:()=>d}),r(6665),r(4861),r(5866),r(1506);var t=r(3191),s=r(8716),n=r(7922),i=r.n(n),o=r(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(a,l);let d=["",{children:["(member)",{children:["register",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,6665)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\register\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\register\\page.tsx"],m="/(member)/register/page",u={require:r,loadChunk:()=>Promise.resolve()},p=new t.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(member)/register/page",pathname:"/register",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},8640:(e,a,r)=>{Promise.resolve().then(r.bind(r,991))},991:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>g});var t=r(326),s=r(7577),n=r(434),i=r(5047),o=r(9734),l=r(6557);let d=(0,l.Z)("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var c=r(5932);let m=(0,l.Z)("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);var u=r(9015),p=r(4230),h=r(2374);function g(){let[e,a]=(0,s.useState)(""),[r,l]=(0,s.useState)(""),[g,x]=(0,s.useState)(""),[b,f]=(0,s.useState)(""),[v,y]=(0,s.useState)(!1),[j,k]=(0,s.useState)(""),N=(0,i.useRouter)(),w=async a=>{a.preventDefault(),y(!0),k("");try{await h.hi.register({nama:e,email:r,password:g,telepon:b}),N.push("/"),setTimeout(()=>{window.location.reload()},200)}catch(e){k(e.message||"Registrasi gagal, pastikan email & data belum terdaftar.")}finally{y(!1)}};return(0,t.jsxs)("div",{className:"auth-split-layout",children:[(0,t.jsxs)("div",{className:"auth-banner-col",children:[t.jsx("div",{className:"auth-banner-overlay",children:(0,t.jsxs)("div",{className:"banner-content",children:[t.jsx("span",{className:"banner-badge font-mono",children:"SONDER WORKSPACES"}),t.jsx("h1",{className:"font-serif banner-title",children:"Nikmati Kemudahan Akses Ruang Kerja Cerdas."}),t.jsx("p",{className:"banner-desc",children:"Bergabunglah dengan ribuan profesional dan tim yang mengandalkan Sonder untuk reservasi instan bebas bentrok."})]})}),t.jsx("img",{src:"https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",alt:"Sonder Space",className:"auth-bg-img"})]}),t.jsx("div",{className:"auth-form-col",children:(0,t.jsxs)("div",{className:"auth-form-wrapper",children:[(0,t.jsxs)("div",{className:"auth-brand-logo",children:[t.jsx(o.Z,{size:24,className:"brand-icon"}),t.jsx("span",{className:"font-serif brand-text",children:"SONDER"})]}),t.jsx("h2",{className:"font-serif auth-heading",children:"Daftar Akun Baru"}),t.jsx("p",{className:"auth-subheading",children:"Buat akun Sonder Anda dalam beberapa langkah mudah."}),j&&t.jsx("div",{className:"error-box",children:j}),(0,t.jsxs)("form",{onSubmit:w,className:"auth-form",children:[(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Nama Lengkap"}),(0,t.jsxs)("div",{className:"input-icon-group",children:[t.jsx(d,{size:16,className:"input-icon"}),t.jsx("input",{type:"text",className:"form-control with-icon",placeholder:"Ahmad Rizky",value:e,onChange:e=>a(e.target.value),required:!0})]})]}),(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Alamat Email"}),(0,t.jsxs)("div",{className:"input-icon-group",children:[t.jsx(c.Z,{size:16,className:"input-icon"}),t.jsx("input",{type:"email",className:"form-control with-icon",placeholder:"nama@email.com",value:r,onChange:e=>l(e.target.value),required:!0})]})]}),(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Nomor Telepon / WhatsApp"}),(0,t.jsxs)("div",{className:"input-icon-group",children:[t.jsx(m,{size:16,className:"input-icon"}),t.jsx("input",{type:"tel",className:"form-control with-icon",placeholder:"081234567890",value:b,onChange:e=>f(e.target.value),required:!0})]})]}),(0,t.jsxs)("div",{className:"form-group",children:[t.jsx("label",{className:"form-label",children:"Kata Sandi (Min. 8 Karakter)"}),(0,t.jsxs)("div",{className:"input-icon-group",children:[t.jsx(u.Z,{size:16,className:"input-icon"}),t.jsx("input",{type:"password",className:"form-control with-icon",placeholder:"••••••••",value:g,onChange:e=>x(e.target.value),minLength:8,required:!0})]})]}),(0,t.jsxs)("button",{type:"submit",className:"btn btn-primary btn-full btn-lg mt-1",disabled:v,children:[v?"Mendaftarkan Akun...":"Daftar Akun"," ",t.jsx(p.Z,{size:16})]})]}),(0,t.jsxs)("div",{className:"auth-footer-text",children:["Sudah memiliki akun Sonder? ",t.jsx(n.default,{href:"/login",className:"auth-link",children:"Masuk Sekarang →"})]})]})}),t.jsx("style",{children:`
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
      `})]})}},4230:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},2179:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},9015:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},5932:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});let t=(0,r(6557).Z)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]])},6665:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>t});let t=(0,r(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\register\page.tsx#default`)}};var a=require("../../../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[278,752,336],()=>r(8068));module.exports=t})();