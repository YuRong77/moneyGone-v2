import{d as R,c as U,o as i,k as V,w as m,b as r,e as u,v as P,a as h,j as N,F as k,u as a,x as y,y as T,_ as S,r as p,z as q,g as L,h as x,i as O,l as I,A as B,n as j,q as H,B as G,E as J,C,t as E}from"./index-DaPa3jmL.js";import{E as K}from"./el-drawer-DahBV4j_.js";import{_ as Q,p as W}from"./RecordItem-D7jnFTBB.js";import{l as M,_ as X,r as Y}from"./right-DDeJz22A.js";import{s as Z,e as ee,a as te,h as se,_ as ae}from"./house-ICRpAVIQ.js";const oe=R({__name:"RecordDrawer",props:{isVisible:Boolean,rowDetails:{type:Array,required:!0}},emits:["update:isVisible"],setup(b,{emit:l}){const _=b,d=l,o=U({get:()=>_.isVisible,set:n=>d("update:isVisible",n)});return(n,c)=>{const f=Q,w=T,v=K;return i(),V(v,{modelValue:a(o),"onUpdate:modelValue":c[1]||(c[1]=e=>y(o)?o.value=e:null),title:"詳情",direction:"btt",size:"90%"},{footer:m(()=>[r("div",null,[u(w,{plain:"",class:"mainBtn",onClick:c[0]||(c[0]=e=>d("update:isVisible",!1))},{default:m(()=>[P("cancel")]),_:1})])]),default:m(()=>[(i(!0),h(k,null,N(b.rowDetails,e=>(i(),V(f,{key:e.id,item:e},null,8,["item"]))),128))]),_:1},8,["modelValue"])}}}),ne=S(oe,[["__scopeId","data-v-a8632994"]]),le={class:"content"},re=["onClick"],ie={class:"info"},ce={class:"date"},de={class:"amount"},ue=R({__name:"Index",setup(b){let l=p(new Date);const _=p([]);let d=p(null),o=p(!1),n=p("");const c=U(()=>n.value?_.value.filter(e=>e.details.find(t=>t.categoryName.includes(n.value)||t.name.includes(n.value))):_.value);q(l,()=>{v()},{immediate:!0});function f(e){return e.details.reduce((t,g)=>g.amount>t.amount?g:t,e.details[0])}function w(e){d.value=e,o.value=!0}function v(){const e={startDate:B(Z(l.value),"yyyy-MM-dd"),endDate:B(ee(l.value),"yyyy-MM-dd")};M.open(),j.transactionTotalList(e).then(t=>{_.value=t}).catch(t=>{}).finally(()=>{o.value=!1,M.close()})}return L(()=>{x.on("refresh",v)}),O(()=>{x.off("refresh")}),(e,t)=>{const g=ae,$=X,D=H("inline-svg"),z=G,A=J,F=ne;return i(),h(k,null,[u($,{title:"Record"},{right:m(()=>[u(g,{date:a(l),"onUpdate:date":t[0]||(t[0]=s=>y(l)?l.value=s:l=s),type:"month"},null,8,["date"])]),_:1}),r("div",le,[u(z,{class:"search cardShadow mb-5",modelValue:a(n),"onUpdate:modelValue":t[1]||(t[1]=s=>y(n)?n.value=s:n=s),placeholder:"Please Input"},{prefix:m(()=>[u(D,{src:a(te),height:"18",width:"18"},null,8,["src"])]),_:1},8,["modelValue"]),(i(!0),h(k,null,N(a(c),s=>(i(),h("div",{class:"totalItem cardShadow",key:s.date,onClick:_e=>w(s.details)},[r("div",ie,[r("div",{class:"iconBox",style:C({background:`${f(s).categoryColor}`})},[r("div",{class:"icon",style:C({backgroundImage:`url(${f(s).imageUrl})`})},null,4)],4),r("div",null,[r("div",ce,E(s.date),1),r("div",de,"$ "+E(a(W)(s.totalAmount)),1)])]),u(D,{src:a(Y),color:"#ababab",height:"18",width:"18"},null,8,["src"])],8,re))),128)),a(c).length===0?(i(),V(A,{key:0,style:{height:"calc(100dvh - 235px)"},image:a(se),"image-size":200,description:"這個月還沒有消費"},null,8,["image"])):I("",!0)]),a(d)?(i(),V(F,{key:0,isVisible:a(o),"onUpdate:isVisible":t[2]||(t[2]=s=>y(o)?o.value=s:o=s),rowDetails:a(d)},null,8,["isVisible","rowDetails"])):I("",!0)],64)}}}),he=S(ue,[["__scopeId","data-v-95d78d34"]]);export{he as default};
