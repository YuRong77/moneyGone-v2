import{c as Q,f as g,e as X,S as _,U as N,g as V,T as w,V as S,W as P,bE as B,d as L,$ as x,Y as ee,j as ae,a0 as ie,Z as te,h as d,a as T,k as ne,P as K,a4 as se,o as le,l as i,n as v,B as E,u as a,q as u,aI as oe,m as c,w as p,al as y,aA as h,s as r,t as C,D as ce,bA as re,r as M,C as ue,az as de,_ as ve,ab as fe,bF as O,ac as pe,z as he}from"./index-COjJf4me.js";import{i as me}from"./validator-ePeru0Ld.js";const ye=Q({modelValue:{type:[Boolean,String,Number],default:!1},disabled:Boolean,loading:Boolean,size:{type:String,validator:me},width:{type:[String,Number],default:""},inlinePrompt:Boolean,inactiveActionIcon:{type:g},activeActionIcon:{type:g},activeIcon:{type:g},inactiveIcon:{type:g},activeText:{type:String,default:""},inactiveText:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},beforeChange:{type:X(Function)},id:String,tabindex:{type:[String,Number]},..._(["ariaLabel"])}),be={[N]:l=>V(l)||w(l)||S(l),[P]:l=>V(l)||w(l)||S(l),[B]:l=>V(l)||w(l)||S(l)},U="ElSwitch",ke=L({name:U}),Ie=L({...ke,props:ye,emits:be,setup(l,{expose:$,emit:f}){const n=l,{formItem:b}=x(),W=ee(),t=ae("switch"),{inputId:j}=ie(n,{formItemContext:b}),k=te(d(()=>n.loading)),A=T(n.modelValue!==!1),m=T(),q=T(),G=d(()=>[t.b(),t.m(W.value),t.is("disabled",k.value),t.is("checked",s.value)]),H=d(()=>[t.e("label"),t.em("label","left"),t.is("active",!s.value)]),R=d(()=>[t.e("label"),t.em("label","right"),t.is("active",s.value)]),Y=d(()=>({width:ne(n.width)}));K(()=>n.modelValue,()=>{A.value=!0});const z=d(()=>A.value?n.modelValue:!1),s=d(()=>z.value===n.activeValue);[n.activeValue,n.inactiveValue].includes(z.value)||(f(N,n.inactiveValue),f(P,n.inactiveValue),f(B,n.inactiveValue)),K(s,e=>{var o;m.value.checked=e,n.validateEvent&&((o=b==null?void 0:b.validate)==null||o.call(b,"change").catch(J=>se()))});const I=()=>{const e=s.value?n.inactiveValue:n.activeValue;f(N,e),f(P,e),f(B,e),fe(()=>{m.value.checked=s.value})},D=()=>{if(k.value)return;const{beforeChange:e}=n;if(!e){I();return}const o=e();[O(o),V(o)].includes(!0)||pe(U,"beforeChange must return type `Promise<boolean>` or `boolean`"),O(o)?o.then(F=>{F&&I()}).catch(F=>{}):o&&I()},Z=()=>{var e,o;(o=(e=m.value)==null?void 0:e.focus)==null||o.call(e)};return le(()=>{m.value.checked=s.value}),$({focus:Z,checked:s}),(e,o)=>(i(),v("div",{class:u(a(G)),onClick:de(D,["prevent"])},[E("input",{id:a(j),ref_key:"input",ref:m,class:u(a(t).e("input")),type:"checkbox",role:"switch","aria-checked":a(s),"aria-disabled":a(k),"aria-label":e.ariaLabel,name:e.name,"true-value":e.activeValue,"false-value":e.inactiveValue,disabled:a(k),tabindex:e.tabindex,onChange:I,onKeydown:oe(D,["enter"])},null,42,["id","aria-checked","aria-disabled","aria-label","name","true-value","false-value","disabled","tabindex","onKeydown"]),!e.inlinePrompt&&(e.inactiveIcon||e.inactiveText)?(i(),v("span",{key:0,class:u(a(H))},[e.inactiveIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.inactiveIcon)))]),_:1})):r("v-if",!0),!e.inactiveIcon&&e.inactiveText?(i(),v("span",{key:1,"aria-hidden":a(s)},C(e.inactiveText),9,["aria-hidden"])):r("v-if",!0)],2)):r("v-if",!0),E("span",{ref_key:"core",ref:q,class:u(a(t).e("core")),style:ue(a(Y))},[e.inlinePrompt?(i(),v("div",{key:0,class:u(a(t).e("inner"))},[e.activeIcon||e.inactiveIcon?(i(),c(a(h),{key:0,class:u(a(t).is("icon"))},{default:p(()=>[(i(),c(y(a(s)?e.activeIcon:e.inactiveIcon)))]),_:1},8,["class"])):e.activeText||e.inactiveText?(i(),v("span",{key:1,class:u(a(t).is("text")),"aria-hidden":!a(s)},C(a(s)?e.activeText:e.inactiveText),11,["aria-hidden"])):r("v-if",!0)],2)):r("v-if",!0),E("div",{class:u(a(t).e("action"))},[e.loading?(i(),c(a(h),{key:0,class:u(a(t).is("loading"))},{default:p(()=>[ce(a(re))]),_:1},8,["class"])):a(s)?M(e.$slots,"active-action",{key:1},()=>[e.activeActionIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.activeActionIcon)))]),_:1})):r("v-if",!0)]):a(s)?r("v-if",!0):M(e.$slots,"inactive-action",{key:2},()=>[e.inactiveActionIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.inactiveActionIcon)))]),_:1})):r("v-if",!0)])],2)],6),!e.inlinePrompt&&(e.activeIcon||e.activeText)?(i(),v("span",{key:1,class:u(a(R))},[e.activeIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(y(e.activeIcon)))]),_:1})):r("v-if",!0),!e.activeIcon&&e.activeText?(i(),v("span",{key:1,"aria-hidden":!a(s)},C(e.activeText),9,["aria-hidden"])):r("v-if",!0)],2)):r("v-if",!0)],10,["onClick"]))}});var ge=ve(Ie,[["__file","switch.vue"]]);const Se=he(ge);export{Se as E};
