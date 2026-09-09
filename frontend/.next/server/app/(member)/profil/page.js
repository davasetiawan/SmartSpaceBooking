(()=>{var e={};e.id=448,e.ids=[448],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7527:(e,r,a)=>{"use strict";a.r(r),a.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>m,routeModule:()=>u,tree:()=>d}),a(3094),a(4861),a(5866),a(1506);var s=a(3191),t=a(8716),o=a(7922),i=a.n(o),l=a(5231),n={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>l[e]);a.d(r,n);let d=["",{children:["(member)",{children:["profil",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,3094)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\profil\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"]}],m=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\profil\\page.tsx"],c="/(member)/profil/page",p={require:a,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:t.x.APP_PAGE,page:"/(member)/profil/page",pathname:"/profil",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},1736:(e,r,a)=>{Promise.resolve().then(a.bind(a,7422))},7422:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>c});var s=a(326),t=a(7577),o=a(6226),i=a(2179),l=a(6557);let n=(0,l.Z)("KeyRound",[["path",{d:"M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",key:"167ctg"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]),d=(0,l.Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]]);var m=a(2374);function c(){let e=(0,m.ts)()||{id:"usr-1",nama:"Alexander Wright",email:"alex.wright@example.com",role:"MEMBER",telepon:"+62 812-3456-7890"},[r,a]=(0,t.useState)(e.nama),[l,c]=(0,t.useState)(e.email),[p,u]=(0,t.useState)(e.telepon||""),[x,f]=(0,t.useState)(!1);return(0,s.jsxs)("div",{className:"container profile-page-root",children:[(0,s.jsxs)("div",{className:"profile-header",children:[s.jsx("span",{className:"section-subtitle",children:"PENGATURAN AKUN"}),s.jsx("h1",{className:"font-serif profile-title",children:"Profil Member Sonder"}),s.jsx("p",{className:"profile-desc",children:"Kelola informasi pribadi, kontak, dan kuota jam penggunaan ruangan Anda."})]}),(0,s.jsxs)("div",{className:"profile-grid",children:[s.jsx("div",{className:"profile-card-col",children:(0,s.jsxs)("div",{className:"sonder-card user-badge-card",children:[s.jsx("div",{className:"user-avatar-large font-serif",children:r.charAt(0).toUpperCase()}),s.jsx("h2",{className:"font-serif user-fullname",children:r}),s.jsx("p",{className:"user-email",children:l}),(0,s.jsxs)("span",{className:"badge-pill badge-approved mt-1",children:[s.jsx(o.Z,{size:12})," Member Sonder Gold"]}),(0,s.jsxs)("div",{className:"quota-box mt-2",children:[(0,s.jsxs)("div",{className:"quota-row",children:[s.jsx("span",{children:"Sisa Kuota Jam Rapat"}),s.jsx("span",{className:"font-mono font-bold",children:"24 Jam"})]}),s.jsx("div",{className:"quota-progress-bar",children:s.jsx("div",{className:"quota-progress-fill",style:{width:"70%"}})}),s.jsx("small",{className:"quota-hint",children:"Kupon aktif diperbarui setiap awal bulan"})]})]})}),s.jsx("div",{className:"profile-form-col",children:(0,s.jsxs)("form",{onSubmit:a=>{a.preventDefault();let s={...e,nama:r,email:l,telepon:p};(0,m.lx)(s),f(!0),setTimeout(()=>f(!1),3e3)},className:"sonder-card form-box",children:[s.jsx("h3",{className:"font-serif box-title",children:"Perbarui Informasi Pribadi"}),x&&(0,s.jsxs)("div",{className:"alert-success",children:[s.jsx(i.Z,{size:18})," Profil berhasil diperbarui!"]}),(0,s.jsxs)("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",children:"Nama Lengkap"}),s.jsx("input",{type:"text",className:"form-control",value:r,onChange:e=>a(e.target.value),required:!0})]}),(0,s.jsxs)("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",children:"Alamat Email"}),s.jsx("input",{type:"email",className:"form-control",value:l,onChange:e=>c(e.target.value),required:!0})]}),(0,s.jsxs)("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",children:"Nomor Telepon / WhatsApp"}),s.jsx("input",{type:"text",className:"form-control",value:p,onChange:e=>u(e.target.value)})]}),s.jsx("div",{className:"form-divider"}),(0,s.jsxs)("h4",{className:"font-serif box-subtitle",children:[s.jsx(n,{size:16})," Keamanan Kata Sandi"]}),(0,s.jsxs)("div",{className:"form-group",children:[s.jsx("label",{className:"form-label",children:"Kata Sandi Baru"}),s.jsx("input",{type:"password",className:"form-control",placeholder:"Kosongkan jika tidak ingin mengubah"})]}),(0,s.jsxs)("button",{type:"submit",className:"btn btn-primary btn-md",children:[s.jsx(d,{size:16})," Simpan Perubahan Profil"]})]})})]}),s.jsx("style",{children:`
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

        .form-box {
          padding: 2rem;
        }
        .box-title {
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
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
      `})]})}},6226:(e,r,a)=>{"use strict";a.d(r,{Z:()=>s});let s=(0,a(6557).Z)("Award",[["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}],["path",{d:"M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",key:"em7aur"}]])},2179:(e,r,a)=>{"use strict";a.d(r,{Z:()=>s});let s=(0,a(6557).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},3094:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>s});let s=(0,a(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\profil\page.tsx#default`)}};var r=require("../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),s=r.X(0,[278,752,336],()=>a(7527));module.exports=s})();