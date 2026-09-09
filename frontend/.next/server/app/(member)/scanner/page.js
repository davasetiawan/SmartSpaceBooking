(()=>{var e={};e.id=644,e.ids=[644],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3539:(e,r,n)=>{"use strict";n.r(r),n.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>l,routeModule:()=>u,tree:()=>d}),n(1366),n(4861),n(5866),n(1506);var a=n(3191),s=n(8716),t=n(7922),i=n.n(t),o=n(5231),c={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>o[e]);n.d(r,c);let d=["",{children:["(member)",{children:["scanner",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,1366)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\scanner\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,4861)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(n.bind(n,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,5866,23)),"next/dist/client/components/not-found-error"]}],l=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\(member)\\scanner\\page.tsx"],m="/(member)/scanner/page",p={require:n,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(member)/scanner/page",pathname:"/scanner",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},2791:(e,r,n)=>{Promise.resolve().then(n.bind(n,581))},581:(e,r,n)=>{"use strict";n.r(r),n.d(r,{default:()=>c});var a=n(326),s=n(7577),t=n(1896),i=n(2179),o=n(1405);function c(){let[e,r]=(0,s.useState)(null),[n,c]=(0,s.useState)("IDLE");return(0,a.jsxs)("div",{className:"container scanner-page-root",children:[(0,a.jsxs)("div",{className:"scanner-header text-center",children:[a.jsx("span",{className:"section-subtitle",children:"AKSES QR CHECK-IN"}),a.jsx("h1",{className:"font-serif scanner-title",children:"Scan E-Ticket QR Code Pass"}),a.jsx("p",{className:"scanner-desc",children:"Arahkan kamera ke QR Code E-Ticket pada smartphone Anda untuk verifikasi dan check-in otomatis ke ruangan Sonder."})]}),(0,a.jsxs)("div",{className:"scanner-card-wrapper sonder-card",children:["IDLE"===n&&(0,a.jsxs)("div",{className:"camera-box",children:[a.jsx("div",{id:"reader",className:"html5-qr-reader"}),a.jsx("div",{className:"simulate-bar",children:(0,a.jsxs)("button",{onClick:()=>{r(`SSB-20260908-${Math.floor(100+900*Math.random())}`),c("SUCCESS")},className:"btn btn-outline btn-sm",children:[a.jsx(t.Z,{size:16})," Simulasikan Scan Pass (Demo)"]})})]}),"SUCCESS"===n&&(0,a.jsxs)("div",{className:"result-box success",children:[a.jsx(i.Z,{size:56,className:"success-icon"}),a.jsx("h2",{className:"font-serif",children:"Verifikasi QR Code Berhasil!"}),a.jsx("div",{className:"code-display font-mono",children:e}),a.jsx("p",{className:"result-text",children:"Akses Pintu Sonder Room 101 Diberikan. Sesi Anda Resmi Dimulai."}),(0,a.jsxs)("button",{className:"btn btn-primary btn-md mt-2",onClick:()=>{r(null),c("IDLE"),window.location.reload()},children:[a.jsx(o.Z,{size:16})," Scan QR Code Lainnya"]})]})]}),a.jsx("style",{children:`
        .scanner-page-root {
          padding: 3rem 1.5rem;
          max-width: 680px;
        }

        .scanner-header {
          margin-bottom: 2.5rem;
        }
        .scanner-title {
          font-size: 2.5rem;
          color: var(--color-primary);
        }

        .scanner-card-wrapper {
          padding: 2rem;
        }

        .simulate-bar {
          margin-top: 1.5rem;
          text-align: center;
        }

        .result-box {
          text-align: center;
          padding: 2rem 1rem;
        }
        .code-display {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-primary);
          background: var(--bg-secondary);
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius-pill);
          display: inline-block;
          margin: 1rem 0;
        }
        .mt-2 { margin-top: 1.5rem; }
      `})]})}n(133)},1366:(e,r,n)=>{"use strict";n.r(r),n.d(r,{default:()=>a});let a=(0,n(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\(member)\scanner\page.tsx#default`)}};var r=require("../../../webpack-runtime.js");r.C(e);var n=e=>r(r.s=e),a=r.X(0,[278,752,119,336],()=>n(3539));module.exports=a})();