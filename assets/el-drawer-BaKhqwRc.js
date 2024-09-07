import{I as H,bv as O,bw as V,d as A,bx as q,by as U,c as v,r as C,O as M,aJ as G,bz as J,P as Q,o,l as _,w as l,e as d,aH as j,u as e,aF as K,bA as W,bB as X,b as E,R as Y,a_ as Z,Q as t,a as i,D as u,t as x,x as r,aT as ee,aV as ae,aG as se,bC as te,C as oe,U as re}from"./index-isLO3Dwa.js";const le=H({...O,direction:{type:String,default:"rtl",values:["ltr","rtl","ttb","btt"]},size:{type:[String,Number],default:"30%"},withHeader:{type:Boolean,default:!0},modalFade:{type:Boolean,default:!0},headerAriaLevel:{type:String,default:"2"}}),de=V,ie=A({name:"ElDrawer",inheritAttrs:!1}),ne=A({...ie,props:le,emits:de,setup(R,{expose:g}){const n=R,F=q();U({scope:"el-drawer",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/drawer.html#slots"},v(()=>!!F.title));const c=C(),m=C(),s=M("drawer"),{t:S}=G(),{afterEnter:y,afterLeave:h,beforeLeave:T,visible:f,rendered:B,titleId:p,bodyId:w,zIndex:D,onModalClick:L,onOpenAutoFocus:z,onCloseAutoFocus:P,onFocusoutPrevented:$,onCloseRequested:I,handleClose:b}=J(n,c),N=v(()=>n.direction==="rtl"||n.direction==="ltr"),k=v(()=>Q(n.size));return g({handleClose:b,afterEnter:y,afterLeave:h}),(a,ce)=>(o(),_(e(te),{to:a.appendTo,disabled:a.appendTo!=="body"?!1:!a.appendToBody},{default:l(()=>[d(j,{name:e(s).b("fade"),onAfterEnter:e(y),onAfterLeave:e(h),onBeforeLeave:e(T),persisted:""},{default:l(()=>[K(d(e(W),{mask:a.modal,"overlay-class":a.modalClass,"z-index":e(D),onClick:e(L)},{default:l(()=>[d(e(X),{loop:"",trapped:e(f),"focus-trap-el":c.value,"focus-start-el":m.value,onFocusAfterTrapped:e(z),onFocusAfterReleased:e(P),onFocusoutPrevented:e($),onReleaseRequested:e(I)},{default:l(()=>[E("div",Y({ref_key:"drawerRef",ref:c,"aria-modal":"true","aria-label":a.title||void 0,"aria-labelledby":a.title?void 0:e(p),"aria-describedby":e(w)},a.$attrs,{class:[e(s).b(),a.direction,e(f)&&"open"],style:e(N)?"width: "+e(k):"height: "+e(k),role:"dialog",onClick:Z(()=>{},["stop"])}),[E("span",{ref_key:"focusStartRef",ref:m,class:t(e(s).e("sr-focus")),tabindex:"-1"},null,2),a.withHeader?(o(),i("header",{key:0,class:t(e(s).e("header"))},[a.$slots.title?u(a.$slots,"title",{key:1},()=>[r(" DEPRECATED SLOT ")]):u(a.$slots,"header",{key:0,close:e(b),titleId:e(p),titleClass:e(s).e("title")},()=>[a.$slots.title?r("v-if",!0):(o(),i("span",{key:0,id:e(p),role:"heading","aria-level":a.headerAriaLevel,class:t(e(s).e("title"))},x(a.title),11,["id","aria-level"]))]),a.showClose?(o(),i("button",{key:2,"aria-label":e(S)("el.drawer.close"),class:t(e(s).e("close-btn")),type:"button",onClick:e(b)},[d(e(ee),{class:t(e(s).e("close"))},{default:l(()=>[d(e(ae))]),_:1},8,["class"])],10,["aria-label","onClick"])):r("v-if",!0)],2)):r("v-if",!0),e(B)?(o(),i("div",{key:1,id:e(w),class:t(e(s).e("body"))},[u(a.$slots,"default")],10,["id"])):r("v-if",!0),a.$slots.footer?(o(),i("div",{key:2,class:t(e(s).e("footer"))},[u(a.$slots,"footer")],2)):r("v-if",!0)],16,["aria-label","aria-labelledby","aria-describedby","onClick"])]),_:3},8,["trapped","focus-trap-el","focus-start-el","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])]),_:3},8,["mask","overlay-class","z-index","onClick"]),[[se,e(f)]])]),_:3},8,["name","onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var ue=oe(ne,[["__file","drawer.vue"]]);const pe=re(ue);export{pe as E};
