import{I as j,M as g,L as q,W as _,X as N,N as V,Y as w,Z as T,$ as P,bJ as B,d as L,a3 as x,a1 as ee,O as ae,a4 as ie,a2 as te,c as d,r as E,P as ne,v as M,a8 as se,g as oe,o as i,a as v,b as S,u as a,Q as u,aR as le,l as c,w as p,bg as b,aT as h,x as r,t as C,e as ce,bE as re,D as O,B as ue,a_ as de,C as ve,af as fe,bK as F,aW as pe,U as he}from"./index-isLO3Dwa.js";import{i as me}from"./Header-DhTfVw2h.js";const be=j({modelValue:{type:[Boolean,String,Number],default:!1},disabled:Boolean,loading:Boolean,size:{type:String,validator:me},width:{type:[String,Number],default:""},inlinePrompt:Boolean,inactiveActionIcon:{type:g},activeActionIcon:{type:g},activeIcon:{type:g},inactiveIcon:{type:g},activeText:{type:String,default:""},inactiveText:{type:String,default:""},activeValue:{type:[Boolean,String,Number],default:!0},inactiveValue:{type:[Boolean,String,Number],default:!1},name:{type:String,default:""},validateEvent:{type:Boolean,default:!0},beforeChange:{type:q(Function)},id:String,tabindex:{type:[String,Number]},..._(["ariaLabel"])}),ye={[N]:o=>V(o)||w(o)||T(o),[P]:o=>V(o)||w(o)||T(o),[B]:o=>V(o)||w(o)||T(o)},U="ElSwitch",Ie=L({name:U}),ke=L({...Ie,props:be,emits:ye,setup(o,{expose:W,emit:f}){const n=o,{formItem:y}=x(),$=ee(),t=ae("switch"),{inputId:R}=ie(n,{formItemContext:y}),I=te(d(()=>n.loading)),A=E(n.modelValue!==!1),m=E(),G=E(),H=d(()=>[t.b(),t.m($.value),t.is("disabled",I.value),t.is("checked",s.value)]),J=d(()=>[t.e("label"),t.em("label","left"),t.is("active",!s.value)]),Q=d(()=>[t.e("label"),t.em("label","right"),t.is("active",s.value)]),X=d(()=>({width:ne(n.width)}));M(()=>n.modelValue,()=>{A.value=!0});const D=d(()=>A.value?n.modelValue:!1),s=d(()=>D.value===n.activeValue);[n.activeValue,n.inactiveValue].includes(D.value)||(f(N,n.inactiveValue),f(P,n.inactiveValue),f(B,n.inactiveValue)),M(s,e=>{var l;m.value.checked=e,n.validateEvent&&((l=y==null?void 0:y.validate)==null||l.call(y,"change").catch(Z=>se()))});const k=()=>{const e=s.value?n.inactiveValue:n.activeValue;f(N,e),f(P,e),f(B,e),fe(()=>{m.value.checked=s.value})},K=()=>{if(I.value)return;const{beforeChange:e}=n;if(!e){k();return}const l=e();[F(l),V(l)].includes(!0)||pe(U,"beforeChange must return type `Promise<boolean>` or `boolean`"),F(l)?l.then(z=>{z&&k()}).catch(z=>{}):l&&k()},Y=()=>{var e,l;(l=(e=m.value)==null?void 0:e.focus)==null||l.call(e)};return oe(()=>{m.value.checked=s.value}),W({focus:Y,checked:s}),(e,l)=>(i(),v("div",{class:u(a(H)),onClick:de(K,["prevent"])},[S("input",{id:a(R),ref_key:"input",ref:m,class:u(a(t).e("input")),type:"checkbox",role:"switch","aria-checked":a(s),"aria-disabled":a(I),"aria-label":e.ariaLabel,name:e.name,"true-value":e.activeValue,"false-value":e.inactiveValue,disabled:a(I),tabindex:e.tabindex,onChange:k,onKeydown:le(K,["enter"])},null,42,["id","aria-checked","aria-disabled","aria-label","name","true-value","false-value","disabled","tabindex","onKeydown"]),!e.inlinePrompt&&(e.inactiveIcon||e.inactiveText)?(i(),v("span",{key:0,class:u(a(J))},[e.inactiveIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(b(e.inactiveIcon)))]),_:1})):r("v-if",!0),!e.inactiveIcon&&e.inactiveText?(i(),v("span",{key:1,"aria-hidden":a(s)},C(e.inactiveText),9,["aria-hidden"])):r("v-if",!0)],2)):r("v-if",!0),S("span",{ref_key:"core",ref:G,class:u(a(t).e("core")),style:ue(a(X))},[e.inlinePrompt?(i(),v("div",{key:0,class:u(a(t).e("inner"))},[e.activeIcon||e.inactiveIcon?(i(),c(a(h),{key:0,class:u(a(t).is("icon"))},{default:p(()=>[(i(),c(b(a(s)?e.activeIcon:e.inactiveIcon)))]),_:1},8,["class"])):e.activeText||e.inactiveText?(i(),v("span",{key:1,class:u(a(t).is("text")),"aria-hidden":!a(s)},C(a(s)?e.activeText:e.inactiveText),11,["aria-hidden"])):r("v-if",!0)],2)):r("v-if",!0),S("div",{class:u(a(t).e("action"))},[e.loading?(i(),c(a(h),{key:0,class:u(a(t).is("loading"))},{default:p(()=>[ce(a(re))]),_:1},8,["class"])):a(s)?O(e.$slots,"active-action",{key:1},()=>[e.activeActionIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(b(e.activeActionIcon)))]),_:1})):r("v-if",!0)]):a(s)?r("v-if",!0):O(e.$slots,"inactive-action",{key:2},()=>[e.inactiveActionIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(b(e.inactiveActionIcon)))]),_:1})):r("v-if",!0)])],2)],6),!e.inlinePrompt&&(e.activeIcon||e.activeText)?(i(),v("span",{key:1,class:u(a(Q))},[e.activeIcon?(i(),c(a(h),{key:0},{default:p(()=>[(i(),c(b(e.activeIcon)))]),_:1})):r("v-if",!0),!e.activeIcon&&e.activeText?(i(),v("span",{key:1,"aria-hidden":!a(s)},C(e.activeText),9,["aria-hidden"])):r("v-if",!0)],2)):r("v-if",!0)],10,["onClick"]))}});var ge=ve(ke,[["__file","switch.vue"]]);const Te=he(ge);export{Te as E};
