(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{21:function(e,t,s){},44:function(e,t,s){},70:function(e,t){function s(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}s.keys=function(){return[]},s.resolve=s,e.exports=s,s.id=70},71:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s.n(a),c=s(36),o=s.n(c),i=(s(44),s(13)),r=s(2),d=s(73),l=(s(21),s(1));var j=()=>{const e=Object(r.e)(),[t,s]=Object(a.useState)(!0),[n,c]=Object(a.useState)(!0);return Object(l.jsx)("div",{className:"wraper",children:Object(l.jsxs)("div",{className:"container",children:[Object(l.jsxs)("div",{className:"video-icon",children:[Object(l.jsx)("i",{className:"fas fa-video"}),Object(l.jsx)("h1",{children:"VIDEO CONFERENCE"})]}),t?Object(l.jsx)("button",{className:"btn",value:"Enter User Name",onClick:()=>{s(!1)},children:"Start Meeting"}):Object(l.jsxs)("form",{className:"form",onSubmit:t=>{e.push("".concat(Object(d.a)(),"?name=").concat(t.target.text.value))},children:[Object(l.jsx)("input",{type:"text",name:"text",className:"input-name",placeholder:"Enter your name..."}),Object(l.jsx)("button",{className:"btn",type:"submit",children:"Start"})]}),n?Object(l.jsx)("button",{className:"btn",id:"login-button",value:"Enter Room ID",onClick:()=>{c(!1)},children:"Join Meet"}):Object(l.jsxs)("form",{className:"form",onSubmit:t=>{t.preventDefault();new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/).test(t.target.roomId.value)?(console.log("valid"),e.push("".concat(t.target.roomId.value,"?name=").concat(t.target.username.value))):console.log("invalid uuid")},children:[Object(l.jsx)("input",{type:"text",name:"roomId",className:"input-name",placeholder:"Enter Room ID"}),Object(l.jsx)("input",{type:"text",name:"username",className:"input-name",placeholder:"Enter your name..."}),Object(l.jsx)("button",{className:"btn",type:"submit",children:"Start"})]})]})})},m=s(38),b=s.n(m),u=s(39),h=s.n(u);let v,O,p=[],x=b()("https://video-conference-x2fq.onrender.com/");var g=()=>{const[e,t]=Object(a.useState)(""),[s,n]=Object(a.useState)([]),[c,o]=Object(a.useState)(!1),[i,d]=Object(a.useState)(!1),{roomId:j}=Object(r.f)();Object(a.useEffect)((()=>(setInterval(void x.on("createMessage",(e=>{n([...s,e])})),100),()=>{x.off()}))),Object(a.useEffect)((()=>{var e;O=new h.a(void 0,{path:"/peerjs",host:"/"}),O.on("open",(e=>{x.emit("join-room",j,e)}));const t=(null===(e=navigator.mediaDevices)||void 0===e?void 0:e.getUserMedia)||navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;t?t.call(navigator,{video:!0}).then((e=>{v=e;const t=document.createElement("video");m(t,v),s(e)})).catch((e=>{console.error("Xato yuz berdi:",e)})):console.error("getUserMedia API qo\u2018llab-quvvatlanmaydi."),x.on("user-disconnected",(e=>{p[e]&&p[e].destroy(),x.disconnect()}));const s=e=>{O.on("call",(t=>{t.answer(e);const s=document.createElement("video");t.on("stream",(e=>{m(s,e)}))}))};return x.on("user-connected",(e=>{navigator.mediaDevices.getUserMedia({video:!0}).then((t=>{const s=O.call(e,t),a=document.createElement("video");s.on("stream",(e=>{m(a,e)})),s.on("close",(()=>{a.remove()})),p[e]=s})).catch((e=>{console.error(e)}))})),()=>{x.off()}}),[j]);const m=(e,t)=>{const s=document.getElementById("video-grid");e.srcObject=t,e.addEventListener("loadedmetadata",(()=>{e.play(),e.muted=!0})),s.append(e)},b=()=>{v.getVideoTracks()[0].enabled?(v.getVideoTracks()[0].enabled=!1,d(!0)):(v.getVideoTracks()[0].enabled=!0,d(!1))};return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("header",{children:Object(l.jsxs)("div",{className:"header",children:[Object(l.jsx)("p",{children:"VIDEO CONFERENCE"}),Object(l.jsxs)("p",{children:["ROOM ID: ",j]})]})}),Object(l.jsxs)("div",{className:"show-case",children:[Object(l.jsxs)("div",{className:"main-left",children:[Object(l.jsx)("div",{className:"videos-grp",children:Object(l.jsx)("div",{id:"video-grid"})}),Object(l.jsxs)("div",{className:"options",children:[Object(l.jsxs)("div",{className:"options-left",children:[c?Object(l.jsx)("div",{id:"muteButton",className:"options-button",children:Object(l.jsx)("i",{class:"fas fa-microphone"})}):Object(l.jsx)("div",{id:"muteButton",className:"options-button",onClick:()=>{v.getAudioTracks()[0].enabled?(v.getAudioTracks()[0].enabled=!1,o(!0)):(v.getAudioTracks()[0].enabled=!0,o(!1))},children:Object(l.jsx)("i",{className:"fa fa-microphone-slash"})}),i?Object(l.jsx)("div",{id:"stopVideo",className:"options-button",onClick:b,children:Object(l.jsx)("i",{className:"fa fa-video"})}):Object(l.jsx)("div",{id:"stopVideo",className:"options-button",onClick:b,children:Object(l.jsx)("i",{className:"fa fa-video-slash"})})]}),Object(l.jsx)("div",{className:"options-right",children:Object(l.jsx)("div",{className:"leave-meet",children:Object(l.jsx)("button",{onClick:()=>{window.location.href="/"},children:"Leave Meeting"})})})]})]}),Object(l.jsxs)("div",{className:"main-right",children:[Object(l.jsx)("div",{className:"main-chat-window",children:Object(l.jsx)("div",{className:"messages",children:s.map(((e,t)=>Object(l.jsx)("div",{className:"msg chat",children:Object(l.jsx)("p",{children:e},t)},t)))})}),Object(l.jsx)("form",{onSubmit:s=>{s.preventDefault(),x.emit("message",{message:e,userId:O.id}),t(""),s.target.reset()},children:Object(l.jsxs)("div",{className:"main-message-container",children:[Object(l.jsx)("input",{id:"chat-message",type:"text",onChange:e=>{t(e.target.value)},autoComplete:"off",placeholder:"Type message here...",required:!0}),Object(l.jsx)("button",{type:"submit",id:"send",className:"options-button",children:Object(l.jsx)("i",{className:"fab fa-telegram-plane"})})]})})]})]})]})};var f=function(){return Object(l.jsxs)(i.a,{children:[Object(l.jsx)(r.a,{path:"/",component:j,exact:!0}),Object(l.jsx)(r.a,{path:"/:roomId",component:g})]})};var N=e=>{e&&e instanceof Function&&s.e(3).then(s.bind(null,74)).then((t=>{let{getCLS:s,getFID:a,getFCP:n,getLCP:c,getTTFB:o}=t;s(e),a(e),n(e),c(e),o(e)}))};o.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(f,{})}),document.getElementById("root")),N()}},[[71,1,2]]]);
//# sourceMappingURL=main.460762ba.chunk.js.map