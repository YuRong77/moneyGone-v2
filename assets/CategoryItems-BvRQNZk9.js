import{V as d,r as u,d as p,s as g,o as n,m as a,F as f,n as v,b as r,E as C,u as i,t as S,_ as k}from"./index-EtbRRVl9.js";import{e as y}from"./emitter-8cuvU-fK.js";import{c as h}from"./cat-BnSv-7P_.js";const x=d("category",()=>{const e=u([]);function t(s){e.value=s}return{categories:e,setCategories:t}}),B={class:"categories"},I=["onClick"],b={class:"iconBox"},E=p({__name:"CategoryItems",emits:["isSelected"],setup(e,{emit:t}){const s=t,l=x(),{categories:_}=g(l);function m(c){y.emit("newTransaction",c),s("isSelected")}return(c,F)=>(n(),a("div",B,[(n(!0),a(f,null,v(i(_),o=>(n(),a("div",{class:"categoryItem",key:o.id,onClick:T=>m(o.id)},[r("div",b,[r("div",{class:"icon",style:C({backgroundImage:`url(${i(h)})`})},null,4)]),r("div",null,S(o.name),1)],8,I))),128))]))}}),z=k(E,[["__scopeId","data-v-963e1b11"]]);export{z as _,x as u};
