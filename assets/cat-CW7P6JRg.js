import{r as O,e as Y,D as U,u as x,F as A,G as R,H as $,I as z,b as K,d as N,a as u}from"./axios-4rbK4SCU.js";import{k as V,Z as j,q,i as Z,c as J,j as Q,$ as g,a0 as T,d as P,e as F,y as D,a1 as ee}from"./index-CduXjUOc.js";let f;const te=e=>{var o;if(!O)return 0;if(f!==void 0)return f;const t=document.createElement("div");t.className=`${e}-scrollbar__wrap`,t.style.visibility="hidden",t.style.width="100px",t.style.position="absolute",t.style.top="-9999px",document.body.appendChild(t);const a=t.offsetWidth;t.style.overflow="scroll";const n=document.createElement("div");n.style.width="100%",t.appendChild(n);const r=n.offsetWidth;return(o=t.parentNode)==null||o.removeChild(t),f=a-r,f};var p=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(p||{});const ce=(e,o,t,a)=>{let n={offsetX:0,offsetY:0};const r=l=>{const E=l.clientX,h=l.clientY,{offsetX:y,offsetY:w}=n,d=e.value.getBoundingClientRect(),S=d.left,L=d.top,_=d.width,k=d.height,B=document.documentElement.clientWidth,H=document.documentElement.clientHeight,I=-S+y,W=-L+w,X=B-S-_+y,G=H-L-k+w,M=b=>{let m=y+b.clientX-E,v=w+b.clientY-h;a!=null&&a.value||(m=Math.min(Math.max(m,I),X),v=Math.min(Math.max(v,W),G)),n={offsetX:m,offsetY:v},e.value&&(e.value.style.transform=`translate(${Y(m)}, ${Y(v)})`)},C=()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",C)};document.addEventListener("mousemove",M),document.addEventListener("mouseup",C)},s=()=>{o.value&&e.value&&o.value.addEventListener("mousedown",r)},i=()=>{o.value&&e.value&&o.value.removeEventListener("mousedown",r)},c=()=>{n={offsetX:0,offsetY:0},e.value&&(e.value.style.transform="none")};return V(()=>{j(()=>{t.value?s():i()})}),q(()=>{i()}),{resetPostion:c}},le=(e,o={})=>{Z(e)||U("[useLockscreen]","You need to pass a ref param to this function");const t=o.ns||x("popup"),a=J(()=>t.bm("parent","hidden"));if(!O||A(document.body,a.value))return;let n=0,r=!1,s="0";const i=()=>{setTimeout(()=>{z(document==null?void 0:document.body,a.value),r&&document&&(document.body.style.width=s)},200)};Q(e,c=>{if(!c){i();return}r=!A(document.body,a.value),r&&(s=document.body.style.width),n=te(t.namespace.value);const l=document.documentElement.clientHeight<document.body.scrollHeight,E=R(document.body,"overflowY");n>0&&(l||E==="scroll")&&r&&(document.body.style.width=`calc(100% - ${n}px)`),$(document.body,a.value)}),g(()=>i())},oe=e=>{if(!e)return{onClick:T,onMousedown:T,onMouseup:T};let o=!1,t=!1;return{onClick:s=>{o&&t&&e(s),o=t=!1},onMousedown:s=>{o=s.target===s.currentTarget},onMouseup:s=>{t=s.target===s.currentTarget}}},ne=K({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:N([String,Array,Object])},zIndex:{type:N([String,Number])}}),se={click:e=>e instanceof MouseEvent},ae="overlay";var re=P({name:"ElOverlay",props:ne,emits:se,setup(e,{slots:o,emit:t}){const a=x(ae),n=c=>{t("click",c)},{onClick:r,onMousedown:s,onMouseup:i}=oe(e.customMaskEvent?void 0:n);return()=>e.mask?F("div",{class:[a.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:r,onMousedown:s,onMouseup:i},[D(o,"default")],p.STYLE|p.CLASS|p.PROPS,["onClick","onMouseup","onMousedown"]):ee("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[D(o,"default")])}});const de=re,me={async transactionCreate(e){return(await u.post("/transactions",e)).data},async transactionUpdate(e,o){return(await u.put(`/transactions/${e}`,o)).data},async transactionDelete(e){return(await u.delete(`/transactions/${e}`)).data},async transactionOverview(){return(await u.get("/transactions/overview")).data},async transactionTotalList(e){return(await u.get("/transactions/total",{params:e})).data},async transactionList(e){return(await u.get("/transactions",{params:e})).data}},ve="/moneyGone-v2/assets/cat-DnfwUBBa.png";export{de as E,le as a,oe as b,ve as c,me as t,ce as u};
