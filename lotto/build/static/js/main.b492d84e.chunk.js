(this.webpackJsonplotto=this.webpackJsonplotto||[]).push([[0],{29:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(23),r=n.n(a),i=n(8),u=n(11),l=n(3),o=n(4),j=n.n(o),d=(n(29),n(7)),b=n.n(d),h=n(0),p=function(){var e=Object(c.useState)(""),t=Object(l.a)(e,2),n=t[0],s=t[1];return Object(c.useEffect)((function(){b.a.get("https://lotto.c4ei.net/api/week").then((function(e){return s(e)}))}),[]),n?Object(h.jsxs)("h1",{style:{textAlign:"center"},children:[" ",n.data[0].yyyywkr," Lotto 6/45 "]}):Object(h.jsx)("h1",{style:{textAlign:"center"},children:" Lotto 6/45 "})},m=function(e){var t=e.games,n=e.hits,c=e.money,s=n?"".concat(n,"\uac1c \ub9de\uc74c"):"0\uac1c \ub9de\uc74c";return Object(h.jsxs)("section",{className:"results",children:[Object(h.jsx)("h3",{className:"info",style:{display:"none"},children:t?s:"..."}),Object(h.jsxs)("div",{className:"games",style:{display:"none"},children:[Object(h.jsx)("span",{children:"\uac8c\uc784 \uc218:"}),Object(h.jsx)("span",{children:t})]}),Object(h.jsxs)("div",{className:"wallet",children:[Object(h.jsx)("span",{children:"\ubca0\ud305 \ucf54\uc778\uc218:"}),Object(h.jsx)("span",{children:"1 klay"})]}),Object(h.jsxs)("div",{className:"money",style:{display:"none"},children:[Object(h.jsx)("span",{children:"\ub2f9\ucca8\uae08\uc561:"}),Object(h.jsxs)("span",{children:[c," klay"]})]})]})},O=function(e){var t=e.number,n=e.add;return Object(h.jsx)("div",{className:"number",onClick:n.bind(undefined,t),children:t})},f=function(e){var t=e.numbers,n=e.add,c=t.map((function(e){return Object(h.jsx)(O,{number:e,add:n},e)}));return Object(h.jsxs)("div",{className:"coupon",children:[c,Object(h.jsx)("div",{className:"number"}),Object(h.jsx)("div",{className:"number"}),Object(h.jsx)("div",{className:"number"}),Object(h.jsx)("div",{className:"number"}),Object(h.jsx)("div",{className:"number"})]})},x=function(e){var t=e.start;return 6===e.playerNumbers.length?Object(h.jsx)("button",{className:"start",onClick:t,children:" \ucd94\ucca8 "}):Object(h.jsx)("button",{className:"off",disabled:!0,children:" \ucd94\ucca8 "})},v=function(e){var t=e.number;return Object(h.jsx)("div",{className:"ball",children:t})},y=function(e){var t=e.drawedNumbers,n=t.map((function(e){return Object(h.jsx)(v,{number:e},e)})),c=t.length?n:"6\uac1c\uc758 \uc22b\uc790\ub97c \uc120\ud0dd\ud558\uc138\uc694.";return Object(h.jsx)("div",{className:"display",children:c})},k=function(e){var t=e.reset;return Object(h.jsx)("button",{className:"reset",onClick:t,children:"Reset"})},N=n(5),g=function(){var e=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],t=Object(c.useState)([]),n=Object(l.a)(t,2),s=n[0],a=n[1],r=Object(c.useState)([]),o=Object(l.a)(r,2),d=o[0],O=o[1],v=Object(c.useState)(0),g=Object(l.a)(v,2),_=g[0],S=g[1],w=Object(c.useState)(0),A=Object(l.a)(w,2),q=A[0],L=A[1],C=Object(c.useState)(0),K=Object(l.a)(C,2),T=K[0],P=K[1],R=Object(c.useState)(""),E=Object(l.a)(R,2),I=E[0],Y=E[1],J=Object(c.useState)(""),B=Object(l.a)(J,2),F=B[0],M=B[1],D=Object(c.useState)(""),G=Object(l.a)(D,2),U=G[0],z=G[1],H="lotto.c4ei.net",Q=!1,V=function(){var e=Object(i.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Q){e.next=15;break}return e.prev=1,e.next=4,N.prepare.auth({bappName:H,successLink:"https://lotto.c4ei.net/klipSuccess",failLink:"https://lotto.c4ei.net/klipFail"});case 4:t=e.sent,W(t.request_key),console.log("68 line : getKlipdata "),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),alert("e :"+e.t0);case 13:e.next=17;break;case 15:z(""),Q=!1;case 17:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();function W(e){return X.apply(this,arguments)}function X(){return(X=Object(i.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:alert("79 request_key :"+t),b.a.get("https://a2a-api.klipwallet.com/v2/a2a/result?request_key=".concat(t)).then((function(e){e.data.result?alert(" 83 [Result] ".concat(JSON.stringify(e.data.result))):alert("86 no data ")})).catch((function(e){alert("89 error :"+e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Z=function(){var e=Object(i.a)(j.a.mark((function e(t,n,c){var s,a,r,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==n&&""!==n||(n=1),void 0!==c&&""!==c||(c="KLAY"),s="0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654",a="0x7C720ca152B43fa72a24eCcd51ccDAFBF74A884e",alert("sendPrepareRequest 87 send_account :"+t+", send_amt:"+n+", send_coinname:"+c),"KLAY"!==c){e.next=10;break}return e.next=8,N.prepare.sendKLAY({bappName:H,send_account:t,rcvAddr:a,send_amt:n});case 8:(r=e.sent).request_key&&(ce(ee),Object(N.request)(r.request_key),se(r.request_key,n,c));case 10:if("KSP"!==c){e.next=15;break}return e.next=13,N.prepare.sendToken({bappName:H,send_account:t,rcvAddr:a,send_amt:n,KSP_tokenAddress:s});case 13:(i=e.sent).request_key&&(ce(ee),Object(N.request)(i.request_key),se(i.request_key,n,c));case 15:case"end":return e.stop()}}),e)})));return function(t,n,c){return e.apply(this,arguments)}}();function $(e,t,n){var c={chips:t,num1:s[0],num2:s[1],num3:s[2],num4:s[3],num5:s[4],num6:s[5],addr:U,chainId:8217,coin_name:n,tx_hash:e};b.a.post("https://lotto.c4ei.net/api/setLotto",c).then((function(t){document.writeln('<!DOCTYPE html><html lang="en"><head><meta http-equiv="refresh" conten="1;url=https://lotto.c4ei.net/lottoNum/'+e+'"><title>move</title></head><body><a href="https://lotto.c4ei.net/lottoNum/'+e+'">'+e+'</a><SCRIPT LANGUAGE="JavaScript">function Timer() { setTimeout("locateKap()",5000); }function locateKap(){ location.replace("https://lotto.c4ei.net/lottoNum/'+e+'"); }Timer();<\/SCRIPT></body></html>')})).catch((function(e){}))}var ee=2,te=Object(c.useState)(1),ne=Object(l.a)(te,2),ce=(ne[0],ne[1]),se=function(e,t,n){var c=setInterval(Object(i.a)(j.a.mark((function s(){var a;return j.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Object(N.getResult)(e);case 2:"completed"===(a=s.sent).status&&(clearTimeout(c),ce(3),"success"===a.result.status&&$(a.result.tx_hash,t,n));case 4:case"end":return s.stop()}}),s)}))),1e3)};return Object(h.jsxs)("div",{className:"app",children:[Object(h.jsx)(p,{}),Object(h.jsxs)("main",{children:[Object(h.jsx)("div",{children:Object(h.jsxs)("p",{children:["Account: ",Object(h.jsx)("a",{href:"/myNum/"+U,target:"_blank",children:U})]})}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"button",onClick:V,children:Q?"disconnect":"connect"})}),Object(h.jsx)(y,{drawedNumbers:d}),Object(h.jsx)(f,{numbers:e,add:function(e,t){if(s.length<6&&!s.includes(e)){var n=Object(u.a)(s);n.push(e),a(n),t.target.classList.toggle("selected")}if(s.includes(e)){var c=Object(u.a)(s);c=c.filter((function(t){return t!==e})),a(c),t.target.classList.toggle("selected")}}}),Object(h.jsxs)("div",{children:[Object(h.jsx)("span",{children:" \ucf54\uc778\uc218:"}),Object(h.jsxs)("span",{children:[Object(h.jsx)("select",{onChange:function(e){Y(e.target.value)},value:I,children:["0.001","1","2","3","4","5","10","20","30","40","50","100","500","1000"].map((function(e){return Object(h.jsxs)("option",{value:e,children:[" ",e," "]},e)}))}),Object(h.jsx)("select",{onChange:function(e){M(e.target.value)},value:F,children:["KLAY","KSP"].map((function(e){return Object(h.jsxs)("option",{value:e,children:[" ",e," "]},e)}))})]})]}),Object(h.jsx)(m,{games:_,hits:q,money:T}),Object(h.jsxs)("section",{className:"controls",children:[Object(h.jsx)(x,{playerNumbers:s,start:function(){if(6===s.length){for(var t=[].concat(e),n=[],c=0;c<6;c++){var a=Math.floor(Math.random()*t.length);n.push(t[a]),t.splice(a,1)}Z(U,I,F)}}}),Object(h.jsx)(k,{reset:function(){Object(u.a)(document.querySelectorAll(".selected")).forEach((function(e){return e.classList.remove("selected")})),a([]),O([]),S(0),L(0),P(0)}})]})]})]})};r.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root"))}},[[49,1,2]]]);
//# sourceMappingURL=main.b492d84e.chunk.js.map