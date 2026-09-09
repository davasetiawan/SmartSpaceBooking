(()=>{var e={};e.id=679,e.ids=[679],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7496:(e,a,r)=>{"use strict";r.r(a),r.d(a,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>l,routeModule:()=>u,tree:()=>c}),r(2097),r(596),r(1506),r(5866);var n=r(3191),s=r(8716),t=r(7922),i=r.n(t),o=r(5231),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);r.d(a,d);let c=["",{children:["admin",{children:["scanner",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2097)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\admin\\scanner\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,596)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\admin\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,1506)),"C:\\PROJECT\\smart-space-booking\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],l=["C:\\PROJECT\\smart-space-booking\\frontend\\app\\admin\\scanner\\page.tsx"],m="/admin/scanner/page",p={require:r,loadChunk:()=>Promise.resolve()},u=new n.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/admin/scanner/page",pathname:"/admin/scanner",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},4100:(e,a,r)=>{Promise.resolve().then(r.bind(r,8302))},581:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>d});var n=r(326),s=r(7577),t=r(1896),i=r(2179),o=r(1405);function d(){let[e,a]=(0,s.useState)(null),[r,d]=(0,s.useState)("IDLE");return(0,n.jsxs)("div",{className:"container scanner-page-root",children:[(0,n.jsxs)("div",{className:"scanner-header text-center",children:[n.jsx("span",{className:"section-subtitle",children:"AKSES QR CHECK-IN"}),n.jsx("h1",{className:"font-serif scanner-title",children:"Scan E-Ticket QR Code Pass"}),n.jsx("p",{className:"scanner-desc",children:"Arahkan kamera ke QR Code E-Ticket pada smartphone Anda untuk verifikasi dan check-in otomatis ke ruangan Sonder."})]}),(0,n.jsxs)("div",{className:"scanner-card-wrapper sonder-card",children:["IDLE"===r&&(0,n.jsxs)("div",{className:"camera-box",children:[n.jsx("div",{id:"reader",className:"html5-qr-reader"}),n.jsx("div",{className:"simulate-bar",children:(0,n.jsxs)("button",{onClick:()=>{a(`SSB-20260908-${Math.floor(100+900*Math.random())}`),d("SUCCESS")},className:"btn btn-outline btn-sm",children:[n.jsx(t.Z,{size:16})," Simulasikan Scan Pass (Demo)"]})})]}),"SUCCESS"===r&&(0,n.jsxs)("div",{className:"result-box success",children:[n.jsx(i.Z,{size:56,className:"success-icon"}),n.jsx("h2",{className:"font-serif",children:"Verifikasi QR Code Berhasil!"}),n.jsx("div",{className:"code-display font-mono",children:e}),n.jsx("p",{className:"result-text",children:"Akses Pintu Sonder Room 101 Diberikan. Sesi Anda Resmi Dimulai."}),(0,n.jsxs)("button",{className:"btn btn-primary btn-md mt-2",onClick:()=>{a(null),d("IDLE"),window.location.reload()},children:[n.jsx(o.Z,{size:16})," Scan QR Code Lainnya"]})]})]}),n.jsx("style",{children:`
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
      `})]})}r(133)},8302:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>t});var n=r(326),s=r(581);function t(){return n.jsx(s.default,{})}},2097:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>n});let n=(0,r(8570).createProxy)(String.raw`C:\PROJECT\smart-space-booking\frontend\app\admin\scanner\page.tsx#default`)}};var a=require("../../../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),n=a.X(0,[278,752,119,540],()=>r(7496));module.exports=n})();