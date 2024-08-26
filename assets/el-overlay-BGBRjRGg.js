import{C as ae,d as M,A as K,c as w,o as B,m as U,b as O,y as E,p,u as e,t as se,e as N,w as m,a as _,G as te,v as j,E as W,r as k,j as G,x as ne,k as re,W as ie,X as de,z as ue,T as ce,K as fe,B as ve,Y as ye,N as pe}from"./index-EtbRRVl9.js";import{u as me,a as ge,E as Ce,b as be}from"./cat-BnSv-7P_.js";import{F as he,i as Ee,a as ke,b as we}from"./emitter-8cuvU-fK.js";import{b as X,i as Be,v as De,m as Ie,_ as H,C as Te,d as Y,U as Q,c as Ae,x as Fe,q as Z,y as Se,e as Pe,z as $e,A as J,r as Le,B as Re,u as Oe,f as Ne}from"./axios-fCVBJ1HB.js";const Me=(...o)=>n=>{o.forEach(a=>{ae(a)?a(n):a.value=n})},x=Symbol("dialogInjectionKey"),ee=X({center:Boolean,alignCenter:Boolean,closeIcon:{type:Be},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),ze={close:()=>!0},Ve=M({name:"ElDialogContent"}),Ue=M({...Ve,props:ee,emits:ze,setup(o,{expose:n}){const a=o,{t:S}=De(),{Close:r}=Te,{dialogRef:f,headerRef:g,bodyId:C,ns:s,style:i}=K(x),{focusTrapRef:v}=K(he),y=w(()=>[s.b(),s.is("fullscreen",a.fullscreen),s.is("draggable",a.draggable),s.is("align-center",a.alignCenter),{[s.m("center")]:a.center}]),b=Me(v,f),u=w(()=>a.draggable),c=w(()=>a.overflow),{resetPostion:D}=me(f,g,u,c);return n({resetPostion:D}),(t,P)=>(B(),U("div",{ref:e(b),class:p(e(y)),style:W(e(i)),tabindex:"-1"},[O("header",{ref_key:"headerRef",ref:g,class:p([e(s).e("header"),{"show-close":t.showClose}])},[E(t.$slots,"header",{},()=>[O("span",{role:"heading","aria-level":t.ariaLevel,class:p(e(s).e("title"))},se(t.title),11,["aria-level"])]),t.showClose?(B(),U("button",{key:0,"aria-label":e(S)("el.dialog.close"),class:p(e(s).e("headerbtn")),type:"button",onClick:I=>t.$emit("close")},[N(e(Ie),{class:p(e(s).e("close"))},{default:m(()=>[(B(),_(te(t.closeIcon||e(r))))]),_:1},8,["class"])],10,["aria-label","onClick"])):j("v-if",!0)],2),O("div",{id:e(C),class:p(e(s).e("body"))},[E(t.$slots,"default")],10,["id"]),t.$slots.footer?(B(),U("footer",{key:0,class:p(e(s).e("footer"))},[E(t.$slots,"footer")],2)):j("v-if",!0)],6))}});var _e=H(Ue,[["__file","dialog-content.vue"]]);const je=X({...ee,appendToBody:Boolean,appendTo:{type:Y([String,Object]),default:"body"},beforeClose:{type:Y(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),qe={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[Q]:o=>Ae(o),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},Ke=(o,n)=>{var a;const r=ie().emit,{nextZIndex:f}=Fe();let g="";const C=Z(),s=Z(),i=k(!1),v=k(!1),y=k(!1),b=k((a=o.zIndex)!=null?a:f());let u,c;const D=Se("namespace",$e),t=w(()=>{const d={},h=`--${D.value}-dialog`;return o.fullscreen||(o.top&&(d[`${h}-margin-top`]=o.top),o.width&&(d[`${h}-width`]=Pe(o.width))),d}),P=w(()=>o.alignCenter?{display:"flex"}:{});function I(){r("opened")}function z(){r("closed"),r(Q,!1),o.destroyOnClose&&(y.value=!1)}function V(){r("close")}function $(){c==null||c(),u==null||u(),o.openDelay&&o.openDelay>0?{stop:u}=J(()=>L(),o.openDelay):L()}function T(){u==null||u(),c==null||c(),o.closeDelay&&o.closeDelay>0?{stop:c}=J(()=>R(),o.closeDelay):R()}function A(){function d(h){h||(v.value=!0,i.value=!1)}o.beforeClose?o.beforeClose(d):T()}function F(){o.closeOnClickModal&&A()}function L(){Le&&(i.value=!0)}function R(){i.value=!1}function l(){r("openAutoFocus")}function q(){r("closeAutoFocus")}function oe(d){var h;((h=d.detail)==null?void 0:h.focusReason)==="pointer"&&d.preventDefault()}o.lockScroll&&ge(i);function le(){o.closeOnPressEscape&&A()}return G(()=>o.modelValue,d=>{d?(v.value=!1,$(),y.value=!0,b.value=Ee(o.zIndex)?f():b.value++,ne(()=>{r("open"),n.value&&(n.value.scrollTop=0)})):i.value&&T()}),G(()=>o.fullscreen,d=>{n.value&&(d?(g=n.value.style.transform,n.value.style.transform=""):n.value.style.transform=g)}),re(()=>{o.modelValue&&(i.value=!0,y.value=!0,$())}),{afterEnter:I,afterLeave:z,beforeLeave:V,handleClose:A,onModalClick:F,close:T,doClose:R,onOpenAutoFocus:l,onCloseAutoFocus:q,onCloseRequested:le,onFocusoutPrevented:oe,titleId:C,bodyId:s,closed:v,style:t,overlayDialogStyle:P,rendered:y,visible:i,zIndex:b}},Ge=M({name:"ElDialog",inheritAttrs:!1}),Ye=M({...Ge,props:je,emits:qe,setup(o,{expose:n}){const a=o,S=de();Re({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},w(()=>!!S.title));const r=Oe("dialog"),f=k(),g=k(),C=k(),{visible:s,titleId:i,bodyId:v,style:y,overlayDialogStyle:b,rendered:u,zIndex:c,afterEnter:D,afterLeave:t,beforeLeave:P,handleClose:I,onModalClick:z,onOpenAutoFocus:V,onCloseAutoFocus:$,onCloseRequested:T,onFocusoutPrevented:A}=Ke(a,f);ue(x,{dialogRef:f,headerRef:g,bodyId:v,ns:r,rendered:u,style:y});const F=be(z),L=w(()=>a.draggable&&!a.fullscreen);return n({visible:s,dialogContentRef:C,resetPostion:()=>{C.value.resetPostion()}}),(l,q)=>(B(),_(e(we),{to:l.appendTo,disabled:l.appendTo!=="body"?!1:!l.appendToBody},{default:m(()=>[N(ce,{name:"dialog-fade",onAfterEnter:e(D),onAfterLeave:e(t),onBeforeLeave:e(P),persisted:""},{default:m(()=>[fe(N(e(Ce),{"custom-mask-event":"",mask:l.modal,"overlay-class":l.modalClass,"z-index":e(c)},{default:m(()=>[O("div",{role:"dialog","aria-modal":"true","aria-label":l.title||void 0,"aria-labelledby":l.title?void 0:e(i),"aria-describedby":e(v),class:p(`${e(r).namespace.value}-overlay-dialog`),style:W(e(b)),onClick:e(F).onClick,onMousedown:e(F).onMousedown,onMouseup:e(F).onMouseup},[N(e(ke),{loop:"",trapped:e(s),"focus-start-el":"container",onFocusAfterTrapped:e(V),onFocusAfterReleased:e($),onFocusoutPrevented:e(A),onReleaseRequested:e(T)},{default:m(()=>[e(u)?(B(),_(_e,ve({key:0,ref_key:"dialogContentRef",ref:C},l.$attrs,{center:l.center,"align-center":l.alignCenter,"close-icon":l.closeIcon,draggable:e(L),overflow:l.overflow,fullscreen:l.fullscreen,"show-close":l.showClose,title:l.title,"aria-level":l.headerAriaLevel,onClose:e(I)}),ye({header:m(()=>[l.$slots.title?E(l.$slots,"title",{key:1}):E(l.$slots,"header",{key:0,close:e(I),titleId:e(i),titleClass:e(r).e("title")})]),default:m(()=>[E(l.$slots,"default")]),_:2},[l.$slots.footer?{name:"footer",fn:m(()=>[E(l.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):j("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,["aria-label","aria-labelledby","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["mask","overlay-class","z-index"]),[[pe,e(s)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var Ze=H(Ye,[["__file","dialog.vue"]]);const Qe=Ne(Ze);export{Qe as E};
