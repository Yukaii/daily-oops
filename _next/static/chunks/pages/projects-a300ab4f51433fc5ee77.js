_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{D85t:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return n("RHEb")}])},RHEb:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n("q1tI"),o=n.n(r),a=n("8Kt/"),i=n.n(a),c=n("b0oO"),l=o.a.createElement,s=!0;function u(e){var t=e.projects;return l("div",null,l(i.a,null,l("title",null,"Projects | Daily Oops!")),l(c.a,null),l("div",{className:"markdown-body mx-auto pt-4 pb-6 px-3 container-lg",style:{maxWidth:700}},t.map((function(e){return l("div",{className:"col-12 col-sm-6 d-inline-block"},l("a",{className:"d-inline-block box-shadow-medium mx-2 px-3 pt-4 pb-6 position-relative rounded-1 overflow-hidden no-underline",href:e.link,target:"_blank",style:{width:"calc(100% - 16px)",height:200}},l("h3",{className:"text-gray-dark"},e.title),l("p",{className:"text-gray"},e.description)))}))))}},YFqc:function(e,t,n){e.exports=n("cTJO")},b0oO:function(e,t,n){"use strict";var r=n("q1tI"),o=n.n(r),a=n("nOHt"),i=n("YFqc"),c=n.n(i),l=n("aOgs"),s=o.a.createElement;t.a=function(){var e=Object(a.useRouter)().pathname,t=[{text:"Blog",href:"/",icon:l.a},{text:"Projects",href:"/projects",icon:l.b},{text:"About",href:"/about",icon:l.c}];return s(o.a.Fragment,null,s("div",{className:"d-block text-center bg-gray py-4 px-1"},s("div",{className:"CircleBadge CircleBadge--large mx-auto mb-3",style:{overflow:"hidden",backgroundColor:"#F5CC7F"}},s("img",{src:"/logo-animated.gif",alt:"Daily Oops",style:{height:"auto",maxHeight:"80%"},className:"user-select-none"})),s("h1",null,"Daily Oops!")),s("nav",{className:"UnderlineNav flex-justify-center bg-gray px-1 position-sticky top-0",style:{zIndex:1}},s("div",{className:"UnderlineNav-body",role:"tablist"},t.map((function(t){return s(c.a,{href:t.href,key:t.href},s("button",{className:"UnderlineNav-item",role:"tab",type:"button","aria-selected":t.href===e},t.icon?s(o.a.Fragment,null,s(t.icon,{className:"UnderlineNav-octicon"}),s("span",null,t.text)):t.text))})))))}},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),o=n("284h");t.__esModule=!0,t.default=void 0;var a,i=o(n("q1tI")),c=n("elyg"),l=n("nOHt"),s=new Map,u=window.IntersectionObserver,f={};var d=function(e,t){var n=a||(u?a=new u((function(e){e.forEach((function(e){if(s.has(e.target)){var t=s.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),s.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),s.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}s.delete(e)}):function(){}};function p(e,t,n,r){(0,c.isLocalURL)(t)&&(e.prefetch(t,n,r).catch((function(e){0})),f[t+"%"+n]=!0)}var h=function(e){var t=!1!==e.prefetch,n=i.default.useState(),o=r(n,2),a=o[0],s=o[1],h=(0,l.useRouter)(),v=h&&h.pathname||"/",m=i.default.useMemo((function(){var t=(0,c.resolveHref)(v,e.href);return{href:t,as:e.as?(0,c.resolveHref)(v,e.as):t}}),[v,e.href,e.as]),g=m.href,y=m.as;i.default.useEffect((function(){if(t&&u&&a&&a.tagName&&(0,c.isLocalURL)(g)&&!f[g+"%"+y])return d(a,(function(){p(h,g,y)}))}),[t,a,g,y,h]);var b=e.children,w=e.replace,x=e.shallow,N=e.scroll;"string"===typeof b&&(b=i.default.createElement("a",null,b));var _=i.Children.only(b),E={ref:function(e){e&&s(e),_&&"object"===typeof _&&_.ref&&("function"===typeof _.ref?_.ref(e):"object"===typeof _.ref&&(_.ref.current=e))},onClick:function(e){_.props&&"function"===typeof _.props.onClick&&_.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,i){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(n))&&(e.preventDefault(),null==i&&(i=r.indexOf("#")<0),t[o?"replace":"push"](n,r,{shallow:a}).then((function(e){e&&i&&(window.scrollTo(0,0),document.body.focus())})))}(e,h,g,y,w,x,N)}};return t&&(E.onMouseEnter=function(e){(0,c.isLocalURL)(g)&&(_.props&&"function"===typeof _.props.onMouseEnter&&_.props.onMouseEnter(e),p(h,g,y,{priority:!0}))}),(e.passHref||"a"===_.type&&!("href"in _.props))&&(E.href=(0,c.addBasePath)(y)),i.default.cloneElement(_,E)};t.default=h}},[["D85t",0,2,3,1]]]);