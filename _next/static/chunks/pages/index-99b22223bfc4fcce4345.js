(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2817:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var s=n(5893),r=n(1163),o=n(1664),a=n(3011),i=n(5529);function c(){var e=(0,a.Z)();return(0,s.jsx)("button",{className:"night-switch-button btn position-absolute top-4 right-4 px-2",type:"button",onClick:e.toggle,children:e.value?(0,s.jsx)(i.kLh,{}):(0,s.jsx)(i.NWY,{})})}var l=function(){var e=(0,r.useRouter)().pathname,t=[{text:"Home",href:"/",icon:i.Edh},{text:"Blog",href:"/blog",icon:i.vJ3},{text:"Projects",href:"/projects",icon:i.dNJ},{text:"About",href:"/about",icon:i.szr}];return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"d-block text-center color-bg-secondary py-4 px-3",children:[(0,s.jsx)(c,{}),(0,s.jsx)("div",{className:"CircleBadge CircleBadge--large mx-auto mb-3",style:{overflow:"hidden",backgroundColor:"#F5CC7F"},children:(0,s.jsx)("img",{src:"/logo-animated.gif",alt:"Daily Oops",style:{height:"auto",maxHeight:"80%"},className:"user-select-none"})}),(0,s.jsx)("h1",{children:"Daily Oops!"})]}),(0,s.jsx)("nav",{className:"UnderlineNav flex-justify-center color-bg-secondary px-3 position-sticky top-0",style:{zIndex:99},children:(0,s.jsx)("div",{className:"UnderlineNav-body",role:"tablist",style:{maxWidth:"100%"},children:t.map((function(t){return(0,s.jsx)(o.default,{href:t.href,children:(0,s.jsx)("button",{className:"UnderlineNav-item",role:"tab",type:"button","aria-selected":t.href===e,children:t.icon?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.icon,{className:"UnderlineNav-octicon"}),(0,s.jsx)("span",{children:t.text})]}):t.text})},t.href)}))})})]})}},3281:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var s=n(5893),r=n(1177),o=n(1664);function a(e){var t=e.post,n=e.index,a=e.totalCount,i=t.date,c=i.year,l=i.month,d=i.day,u=t.slug,h=(0,r.Z)("".concat(c,"-").concat(l,"-").concat(d));return(0,s.jsx)("div",{className:"Box-row Box-row--hover-gray d-flex flex-items-center",children:(0,s.jsxs)("div",{className:"flex-auto",children:[(0,s.jsx)(o.default,{href:"/blog/".concat(c,"/").concat(l,"/").concat(d,"/").concat(u),children:(0,s.jsx)("a",{children:(0,s.jsx)("strong",{children:t.title})})}),(0,s.jsxs)("div",{className:"text-small color-text-secondary",children:["#",a-n," posted on ",h.format("LL")]})]})})}},1177:function(e,t,n){"use strict";var s=n(7484),r=n.n(s),o=n(6176),a=n.n(o);r().extend(a()),t.Z=r()},8474:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c},default:function(){return l}});var s=n(5893),r=n(1664),o=n(2817),a=n(3281),i=n(2962),c=!0;function l(e){var t=e.posts;return(0,s.jsxs)("div",{children:[(0,s.jsx)(i.PB,{title:"Daily Oops!",description:"Yukai's blog. Web tech, apps, photos, and notes.",openGraph:{type:"article",locale:"zh-Hant-TW",title:"Daily Oops!",site_name:"Daily Oops!"}}),(0,s.jsx)(o.Z,{}),(0,s.jsxs)("div",{className:"d-block mx-auto markdown-body py-4 px-3",style:{maxWidth:700},children:[(0,s.jsx)("h2",{children:"Hi"}),(0,s.jsx)("p",{children:"This is Yukai Huang's personal website."}),(0,s.jsxs)("p",{children:["Here you can read my ",(0,s.jsx)(r.default,{href:"/blog",children:"recent posts"}),", play with ",(0,s.jsx)(r.default,{href:"/projects",children:"my side projects before"}),", or ",(0,s.jsx)(r.default,{href:"/about",children:"get to know me more"}),"."]}),(0,s.jsx)("p",{children:"\u5b89\u4e45\u5427\uff01"}),(0,s.jsx)("h2",{children:"Recent posts"}),(0,s.jsx)("div",{className:"Box",children:t.slice(0,5).map((function(e,n){return(0,s.jsx)(a.Z,{post:e,index:n,totalCount:t.length},e.id)}))}),(0,s.jsx)(r.default,{href:"/blog",children:(0,s.jsx)("button",{className:"mt-3 btn mr-2",type:"button",children:"Read More"})}),(0,s.jsx)("a",{href:"/feed.xml",children:(0,s.jsx)("button",{className:"mt-3 btn btn-primary",type:"button",children:"Subscribe via RSS"})})]})]})}},8581:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(8474)}])}},function(e){e.O(0,[774,547,351,747,962],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);