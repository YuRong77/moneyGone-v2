if(!self.define){let s,e={};const l=(l,r)=>(l=new URL(l+".js",r).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(r,i)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),o={module:{uri:n},exports:u,require:t};e[n]=Promise.all(r.map((s=>o[s]||t(s)))).then((s=>(i(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/auth-0usFa767.js",revision:null},{url:"assets/el-drawer-Bz6PVJzA.css",revision:null},{url:"assets/el-drawer-CSsUcfv3.js",revision:null},{url:"assets/el-progress-CqTFmmvK.css",revision:null},{url:"assets/el-progress-Cxy7Wznf.js",revision:null},{url:"assets/el-switch-BhrVVMax.css",revision:null},{url:"assets/el-switch-Z3-IF2oc.js",revision:null},{url:"assets/ForgotPassword-BU_dBkMt.js",revision:null},{url:"assets/house-BDS7D5BN.css",revision:null},{url:"assets/house-D3NLzWSr.js",revision:null},{url:"assets/index-B7YVAiEQ.js",revision:null},{url:"assets/Index-B8-04ZyN.js",revision:null},{url:"assets/Index-Bdkb7w7U.js",revision:null},{url:"assets/index-BGzqVt7s.css",revision:null},{url:"assets/Index-Br2WThWC.css",revision:null},{url:"assets/Index-CJ2Ey0hm.js",revision:null},{url:"assets/Index-DlxLaisL.js",revision:null},{url:"assets/Index-DQWg7mIN.css",revision:null},{url:"assets/Index-DVA_Bks-.css",revision:null},{url:"assets/Index-tMwbYwR6.css",revision:null},{url:"assets/Login-BRp6CBU-.js",revision:null},{url:"assets/Login-CgNhpKoD.css",revision:null},{url:"assets/RecordItem-D4xJc5Uz.css",revision:null},{url:"assets/RecordItem-Dt20WxCJ.js",revision:null},{url:"assets/Register-CRCPkdjV.js",revision:null},{url:"assets/ResetPassword-BmdeGC8D.js",revision:null},{url:"assets/right-CJQzeHqH.css",revision:null},{url:"assets/right-EZb9HEQ_.js",revision:null},{url:"index.html",revision:"3ab698949d2268625b2dbb2d1560a308"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"icon192.png",revision:"802411be70fb40cfc2ecd5787da3baf5"},{url:"icon512.png",revision:"38d1fd33b6edd1a1bf1c2faec7e62b01"},{url:"manifest.webmanifest",revision:"53d6bcee86cce8d1ed55745510d796c4"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
