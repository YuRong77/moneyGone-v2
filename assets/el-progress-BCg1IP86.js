import{I as A,L as b,d as T,O as M,c as o,bt as O,b0 as U,bu as Q,b1 as R,aV as Y,b8 as j,Y as C,o as l,a as c,Q as i,u as t,b as g,B as f,D as P,t as D,x as I,l as N,w as q,bg as G,aT as H,C as J,U as K}from"./index-isLO3Dwa.js";const X=A({type:{type:String,default:"line",values:["line","circle","dashboard"]},percentage:{type:Number,default:0,validator:u=>u>=0&&u<=100},status:{type:String,default:"",values:["","success","exception","warning"]},indeterminate:Boolean,duration:{type:Number,default:3},strokeWidth:{type:Number,default:6},strokeLinecap:{type:b(String),default:"round"},textInside:Boolean,width:{type:Number,default:126},showText:{type:Boolean,default:!0},color:{type:b([String,Array,Function]),default:""},striped:Boolean,stripedFlow:Boolean,format:{type:b(Function),default:u=>`${u}%`}}),Z=T({name:"ElProgress"}),_=T({...Z,props:X,setup(u){const s=u,m={success:"#13ce66",exception:"#ff4949",warning:"#e6a23c",default:"#20a0ff"},a=M("progress"),F=o(()=>{const e={width:`${s.percentage}%`,animationDuration:`${s.duration}s`},r=B(s.percentage);return r.includes("gradient")?e.background=r:e.backgroundColor=r,e}),y=o(()=>(s.strokeWidth/s.width*100).toFixed(1)),v=o(()=>["circle","dashboard"].includes(s.type)?Number.parseInt(`${50-Number.parseFloat(y.value)/2}`,10):0),w=o(()=>{const e=v.value,r=s.type==="dashboard";return`
          M 50 50
          m 0 ${r?"":"-"}${e}
          a ${e} ${e} 0 1 1 0 ${r?"-":""}${e*2}
          a ${e} ${e} 0 1 1 0 ${r?"":"-"}${e*2}
          `}),h=o(()=>2*Math.PI*v.value),k=o(()=>s.type==="dashboard"?.75:1),$=o(()=>`${-1*h.value*(1-k.value)/2}px`),x=o(()=>({strokeDasharray:`${h.value*k.value}px, ${h.value}px`,strokeDashoffset:$.value})),E=o(()=>({strokeDasharray:`${h.value*k.value*(s.percentage/100)}px, ${h.value}px`,strokeDashoffset:$.value,transition:"stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"})),L=o(()=>{let e;return s.color?e=B(s.percentage):e=m[s.status]||m.default,e}),W=o(()=>s.status==="warning"?O:s.type==="line"?s.status==="success"?U:Q:s.status==="success"?R:Y),z=o(()=>s.type==="line"?12+s.strokeWidth*.4:s.width*.111111+2),S=o(()=>s.format(s.percentage));function V(e){const r=100/e.length;return e.map((n,p)=>C(n)?{color:n,percentage:(p+1)*r}:n).sort((n,p)=>n.percentage-p.percentage)}const B=e=>{var r;const{color:d}=s;if(j(d))return d(e);if(C(d))return d;{const n=V(d);for(const p of n)if(p.percentage>e)return p.color;return(r=n[n.length-1])==null?void 0:r.color}};return(e,r)=>(l(),c("div",{class:i([t(a).b(),t(a).m(e.type),t(a).is(e.status),{[t(a).m("without-text")]:!e.showText,[t(a).m("text-inside")]:e.textInside}]),role:"progressbar","aria-valuenow":e.percentage,"aria-valuemin":"0","aria-valuemax":"100"},[e.type==="line"?(l(),c("div",{key:0,class:i(t(a).b("bar"))},[g("div",{class:i(t(a).be("bar","outer")),style:f({height:`${e.strokeWidth}px`})},[g("div",{class:i([t(a).be("bar","inner"),{[t(a).bem("bar","inner","indeterminate")]:e.indeterminate},{[t(a).bem("bar","inner","striped")]:e.striped},{[t(a).bem("bar","inner","striped-flow")]:e.stripedFlow}]),style:f(t(F))},[(e.showText||e.$slots.default)&&e.textInside?(l(),c("div",{key:0,class:i(t(a).be("bar","innerText"))},[P(e.$slots,"default",{percentage:e.percentage},()=>[g("span",null,D(t(S)),1)])],2)):I("v-if",!0)],6)],6)],2)):(l(),c("div",{key:1,class:i(t(a).b("circle")),style:f({height:`${e.width}px`,width:`${e.width}px`})},[(l(),c("svg",{viewBox:"0 0 100 100"},[g("path",{class:i(t(a).be("circle","track")),d:t(w),stroke:`var(${t(a).cssVarName("fill-color-light")}, #e5e9f2)`,"stroke-linecap":e.strokeLinecap,"stroke-width":t(y),fill:"none",style:f(t(x))},null,14,["d","stroke","stroke-linecap","stroke-width"]),g("path",{class:i(t(a).be("circle","path")),d:t(w),stroke:t(L),fill:"none",opacity:e.percentage?1:0,"stroke-linecap":e.strokeLinecap,"stroke-width":t(y),style:f(t(E))},null,14,["d","stroke","opacity","stroke-linecap","stroke-width"])]))],6)),(e.showText||e.$slots.default)&&!e.textInside?(l(),c("div",{key:2,class:i(t(a).e("text")),style:f({fontSize:`${t(z)}px`})},[P(e.$slots,"default",{percentage:e.percentage},()=>[e.status?(l(),N(t(H),{key:1},{default:q(()=>[(l(),N(G(t(W))))]),_:1})):(l(),c("span",{key:0},D(t(S)),1))])],6)):I("v-if",!0)],10,["aria-valuenow"]))}});var ee=J(_,[["__file","progress.vue"]]);const se=K(ee);export{se as E};
