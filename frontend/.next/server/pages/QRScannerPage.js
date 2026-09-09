"use strict";(()=>{var e={};e.id=593,e.ids=[593,660],e.modules={1323:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},2999:(e,r,t)=>{t.r(r),t.d(r,{config:()=>k,default:()=>P,getServerSideProps:()=>y,getStaticPaths:()=>v,getStaticProps:()=>x,reportWebVitals:()=>j,routeModule:()=>N,unstable_getServerProps:()=>A,unstable_getServerSideProps:()=>E,unstable_getStaticParams:()=>w,unstable_getStaticPaths:()=>_,unstable_getStaticProps:()=>C});var a={};t.r(a),t.d(a,{QRScannerPage:()=>b});var n=t(7093),s=t(5244),i=t(1323),o=t(1682),l=t.n(o),c=t(8141),d=t.n(c),u=t(997),m=t(6689),p=t(1);let h=(0,p.Z)("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);var g=t(5489);let f=(0,p.Z)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]),S=require("html5-qrcode"),b=()=>{let[e,r]=(0,m.useState)(null),[t,a]=(0,m.useState)("IDLE");return(0,m.useEffect)(()=>{let e=new S.Html5QrcodeScanner("reader",{fps:10,qrbox:{width:250,height:250}},!1);return e.render(t=>{r(t),a("SUCCESS"),e.clear()},e=>{}),()=>{e.clear().catch(()=>{})}},[]),(0,u.jsxs)("div",{className:"container scanner-page-root",children:[(0,u.jsxs)("div",{className:"scanner-header text-center",children:[u.jsx("span",{className:"section-subtitle",children:"AKSES QR CHECK-IN"}),u.jsx("h1",{className:"font-serif scanner-title",children:"Scan E-Ticket QR Code Pass"}),u.jsx("p",{className:"scanner-desc",children:"Arahkan kamera ke QR Code E-Ticket pada smartphone Anda untuk verifikasi dan check-in otomatis ke ruangan Sonder."})]}),(0,u.jsxs)("div",{className:"scanner-card-wrapper sonder-card",children:["IDLE"===t&&(0,u.jsxs)("div",{className:"camera-box",children:[u.jsx("div",{id:"reader",className:"html5-qr-reader"}),u.jsx("div",{className:"simulate-bar",children:(0,u.jsxs)("button",{onClick:()=>{r(`SSB-20260908-${Math.floor(100+900*Math.random())}`),a("SUCCESS")},className:"btn btn-outline btn-sm",children:[u.jsx(h,{size:16})," Simulasikan Scan Pass (Demo)"]})})]}),"SUCCESS"===t&&(0,u.jsxs)("div",{className:"result-box success",children:[u.jsx(g.Z,{size:56,className:"success-icon"}),u.jsx("h2",{className:"font-serif",children:"Verifikasi QR Code Berhasil!"}),u.jsx("div",{className:"code-display font-mono",children:e}),u.jsx("p",{className:"result-text",children:"Akses Pintu Sonder Room 101 Diberikan. Sesi Anda Resmi Dimulai."}),(0,u.jsxs)("button",{className:"btn btn-primary btn-md mt-2",onClick:()=>{r(null),a("IDLE"),window.location.reload()},children:[u.jsx(f,{size:16})," Scan QR Code Lainnya"]})]})]}),u.jsx("style",{children:`
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
        .scanner-desc {
          color: var(--text-secondary);
        }

        .scanner-card-wrapper {
          padding: 2rem;
        }

        .html5-qr-reader {
          width: 100%;
          border: none !important;
        }

        .simulate-bar {
          margin-top: 1.5rem;
          text-align: center;
        }

        .result-box {
          text-align: center;
          padding: 2rem 1rem;
        }
        .success-icon {
          color: #10B981;
          margin-bottom: 1rem;
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
        .result-text {
          color: var(--text-secondary);
        }
        .mt-2 { margin-top: 1.5rem; }
      `})]})},P=(0,i.l)(a,"default"),x=(0,i.l)(a,"getStaticProps"),v=(0,i.l)(a,"getStaticPaths"),y=(0,i.l)(a,"getServerSideProps"),k=(0,i.l)(a,"config"),j=(0,i.l)(a,"reportWebVitals"),C=(0,i.l)(a,"unstable_getStaticProps"),_=(0,i.l)(a,"unstable_getStaticPaths"),w=(0,i.l)(a,"unstable_getStaticParams"),A=(0,i.l)(a,"unstable_getServerProps"),E=(0,i.l)(a,"unstable_getServerSideProps"),N=new n.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/QRScannerPage",pathname:"/QRScannerPage",bundlePath:"",filename:""},components:{App:d(),Document:l()},userland:a})},1:(e,r,t)=>{t.d(r,{Z:()=>i});var a=t(6689),n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),i=(e,r)=>{let t=(0,a.forwardRef)(({color:t="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:c="",children:d,...u},m)=>(0,a.createElement)("svg",{ref:m,...n,width:i,height:i,stroke:t,strokeWidth:l?24*Number(o)/Number(i):o,className:["lucide",`lucide-${s(e)}`,c].join(" "),...u},[...r.map(([e,r])=>(0,a.createElement)(e,r)),...Array.isArray(d)?d:[d]]));return t.displayName=`${e}`,t}},5489:(e,r,t)=>{t.d(r,{Z:()=>a});let a=(0,t(1).Z)("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]])},8141:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return l}});let a=t(167),n=t(997),s=a._(t(6689)),i=t(5782);async function o(e){let{Component:r,ctx:t}=e;return{pageProps:await (0,i.loadGetInitialProps)(r,t)}}class l extends s.default.Component{render(){let{Component:e,pageProps:r}=this.props;return(0,n.jsx)(e,{...r})}}l.origGetInitialProps=o,l.getInitialProps=o,("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},5244:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},5315:e=>{e.exports=require("path")}};var r=require("../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[682],()=>t(2999));module.exports=a})();