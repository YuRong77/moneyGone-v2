import{p as h,_ as S}from"./RecordItem-2UgqefEg.js";import{d as I,c as k,o as p,a as v,b as e,t as l,u as n,e as m,w as T,p as $,f as y,_ as x,r as F,g as O,h as b,i as C,F as w,j as E,k as L,l as N,m as P}from"./index-isLO3Dwa.js";import{E as R}from"./el-progress-BCg1IP86.js";import{_ as V}from"./Header-DhTfVw2h.js";import"./index-Bz0jgJJn.js";const B=t=>($("data-v-f7fd5860"),t=t(),y(),t),j={class:"overview cardShadow"},A={class:"mb-3"},D=B(()=>e("div",{class:"label"},"今日花費",-1)),H={class:"amount"},M=B(()=>e("div",{class:"label"},"本月花費",-1)),U={class:"amount"},q={class:"percent"},z={class:"over"},G=I({__name:"Overview",props:{data:{}},setup(t){const o=t,_=[{color:"#1989fa",percentage:40},{color:"#5cb87a",percentage:60},{color:"#e6a23c",percentage:80},{color:"#f56c6c",percentage:100}],a=k(()=>{if(!o.data)return{};const{monthlyTotal:d,monthlyBudget:c}=o.data,r=c-d,s=d/c*100;return{remainingBudget:r,percent:s>=100?100:s,percentStr:`${s.toFixed()}%`}});return(d,c)=>{var s,i;const r=R;return p(),v("div",j,[e("div",null,[e("div",A,[D,e("div",H,"$ "+l(n(h)((s=o.data)==null?void 0:s.dailyTotal)),1)]),e("div",null,[M,e("div",U,"$ "+l(n(h)((i=o.data)==null?void 0:i.monthlyTotal)),1)])]),m(r,{type:"dashboard",percentage:n(a).percent,color:_,"stroke-width":10},{default:T(({percentage:u})=>[e("div",q,l(n(a).percentStr),1),e("div",z,"剩餘 $"+l(n(h)(n(a).remainingBudget)),1)]),_:1},8,["percentage"])])}}}),J=x(G,[["__scopeId","data-v-f7fd5860"]]),f=t=>($("data-v-808933d9"),t=t(),y(),t),K={class:"content"},Q=f(()=>e("h4",{class:"subTitle"},"概要",-1)),W=f(()=>e("h4",{class:"subTitle"},"分類",-1)),X=f(()=>e("h4",{class:"subTitle"},"本日花費",-1)),Y={class:"record"},Z=I({__name:"Index",setup(t){const o=F();function _(){L.transactionOverview().then(a=>{o.value=a})}return O(()=>{_(),b.on("refresh",_)}),C(()=>{b.off("refresh")}),(a,d)=>{var u;const c=V,r=J,s=P,i=S;return p(),v(w,null,[m(c,{title:"Lobby"}),e("div",K,[Q,m(r,{class:"mb-10",data:n(o)},null,8,["data"]),W,m(s,{class:"mb-10"}),X,e("div",Y,[(p(!0),v(w,null,E((u=n(o))==null?void 0:u.todayRecords,g=>(p(),N(i,{key:g.id,item:g},null,8,["item"]))),128))])])],64)}}}),ae=x(Z,[["__scopeId","data-v-808933d9"]]);export{ae as default};
