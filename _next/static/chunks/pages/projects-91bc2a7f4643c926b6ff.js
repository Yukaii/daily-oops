_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[17],{"094J":function(e,t,n){"use strict";(function(e){var r=n("q1tI"),c=n("puqk"),o={},a=function(e,t,n){return o[e]||(o[e]={callbacks:[],value:n}),o[e].callbacks.push(t),{deregister:function(){var n=o[e].callbacks,r=n.indexOf(t);r>-1&&n.splice(r,1)},emit:function(n){o[e].value!==n&&(o[e].value=n,o[e].callbacks.forEach((function(e){t!==e&&e(n)})))}}};t.a=function(t,n){if(void 0===n&&(n="undefined"!=typeof e&&e.localStorage?e.localStorage:"undefined"!=typeof globalThis&&globalThis.localStorage?globalThis.localStorage:"undefined"!=typeof window&&window.localStorage?window.localStorage:"undefined"!=typeof localStorage?localStorage:null),n){var o=(i=n,{get:function(e,t){var n=i.getItem(e);return null==n?"function"==typeof t?t():t:JSON.parse(n)},set:function(e,t){i.setItem(e,JSON.stringify(t))}});return function(e){return function(e,t,n){var o=n.get,i=n.set,s=Object(r.useRef)(null),u=Object(r.useState)((function(){return o(t,e)})),l=u[0],f=u[1];Object(c.a)("storage",(function(e){if(e.key===t){var n=JSON.parse(e.newValue);l!==n&&f(n)}})),Object(r.useEffect)((function(){return s.current=a(t,f,e),function(){s.current.deregister()}}),[e,t]);var d=Object(r.useCallback)((function(e){var n="function"==typeof e?e(l):e;i(t,n),f(n),s.current.emit(e)}),[l,i,t]);return[l,d]}(e,t,o)}}var i;return r.useState}}).call(this,n("ntbh"))},"20a2":function(e,t,n){e.exports=n("nOHt")},D85t:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return n("RHEb")}])},RHEb:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return i})),n.d(t,"default",(function(){return s}));var r=n("nKUr"),c=n("g4pe"),o=n.n(c),a=n("b0oO"),i=!0;function s(e){var t=e.projects;return Object(r.jsxs)("div",{children:[Object(r.jsx)(o.a,{children:Object(r.jsx)("title",{children:"Projects | Daily Oops!"})}),Object(r.jsx)(a.a,{}),Object(r.jsx)("div",{className:"markdown-body mx-auto pt-4 pb-6 px-3 container-lg",style:{maxWidth:700,columns:"6 250px",columnGap:"1rem"},children:t.map((function(e){return Object(r.jsxs)("a",{className:"Box d-inline-block ma-2 mb-5 overflow-hidden no-underline",href:e.link,target:"_blank",style:{width:"calc(100% - 16px)",height:"100%"},children:[e.image&&Object(r.jsx)("img",{src:e.image,style:{borderRadius:0}}),Object(r.jsxs)("div",{className:"px-3 pa-2",children:[Object(r.jsx)("h3",{className:"color-text-primary",children:e.title}),Object(r.jsx)("p",{className:"color-text-secondary",children:e.description})]})]})}))})]})}},YFqc:function(e,t,n){e.exports=n("cTJO")},b0oO:function(e,t,n){"use strict";var r=n("nKUr"),c=n("20a2"),o=n("YFqc"),a=n.n(o),i=n("g+62"),s=n("aOgs");function u(){var e=Object(i.a)();return Object(r.jsx)("button",{className:"night-switch-button btn position-absolute top-4 right-4 px-2",type:"button",onClick:e.toggle,children:e.value?Object(r.jsx)(s.d,{}):Object(r.jsx)(s.f,{})})}t.a=function(){var e=Object(c.useRouter)().pathname,t=[{text:"Home",href:"/",icon:s.e},{text:"Blog",href:"/blog",icon:s.a},{text:"Projects",href:"/projects",icon:s.b},{text:"About",href:"/about",icon:s.c}];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{className:"d-block text-center color-bg-secondary py-4 px-3",children:[Object(r.jsx)(u,{}),Object(r.jsx)("div",{className:"CircleBadge CircleBadge--large mx-auto mb-3",style:{overflow:"hidden",backgroundColor:"#F5CC7F"},children:Object(r.jsx)("img",{src:"/logo-animated.gif",alt:"Daily Oops",style:{height:"auto",maxHeight:"80%"},className:"user-select-none"})}),Object(r.jsx)("h1",{children:"Daily Oops!"})]}),Object(r.jsx)("nav",{className:"UnderlineNav flex-justify-center color-bg-secondary px-3 position-sticky top-0",style:{zIndex:99},children:Object(r.jsx)("div",{className:"UnderlineNav-body",role:"tablist",style:{maxWidth:"100%"},children:t.map((function(t){return Object(r.jsx)(a.a,{href:t.href,children:Object(r.jsx)("button",{className:"UnderlineNav-item",role:"tab",type:"button","aria-selected":t.href===e,children:t.icon?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(t.icon,{className:"UnderlineNav-octicon"}),Object(r.jsx)("span",{children:t.text})]}):t.text})},t.href)}))})})]})}},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),c=n("284h");t.__esModule=!0,t.default=void 0;var o=c(n("q1tI")),a=n("elyg"),i=n("nOHt"),s=n("vNVm"),u={};function l(e,t,n,r){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var c=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[t+"%"+n+(c?"%"+c:"")]=!0}}var f=function(e){var t=!1!==e.prefetch,n=(0,i.useRouter)(),c=n&&n.pathname||"/",f=o.default.useMemo((function(){var t=(0,a.resolveHref)(c,e.href,!0),n=r(t,2),o=n[0],i=n[1];return{href:o,as:e.as?(0,a.resolveHref)(c,e.as):i||o}}),[c,e.href,e.as]),d=f.href,b=f.as,v=e.children,p=e.replace,h=e.shallow,g=e.scroll,m=e.locale;"string"===typeof v&&(v=o.default.createElement("a",null,v));var j=o.Children.only(v),O=j&&"object"===typeof j&&j.ref,x=(0,s.useIntersection)({rootMargin:"200px"}),y=r(x,2),k=y[0],N=y[1],E=o.default.useCallback((function(e){k(e),O&&("function"===typeof O?O(e):"object"===typeof O&&(O.current=e))}),[O,k]);(0,o.useEffect)((function(){var e=N&&t&&(0,a.isLocalURL)(d),r="undefined"!==typeof m?m:n&&n.locale,c=u[d+"%"+b+(r?"%"+r:"")];e&&!c&&l(n,d,b,{locale:r})}),[b,d,N,m,t,n]);var w={ref:E,onClick:function(e){j.props&&"function"===typeof j.props.onClick&&j.props.onClick(e),e.defaultPrevented||function(e,t,n,r,c,o,i,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(n))&&(e.preventDefault(),null==i&&(i=r.indexOf("#")<0),t[c?"replace":"push"](n,r,{shallow:o,locale:s,scroll:i}))}(e,n,d,b,p,h,g,m)},onMouseEnter:function(e){(0,a.isLocalURL)(d)&&(j.props&&"function"===typeof j.props.onMouseEnter&&j.props.onMouseEnter(e),l(n,d,b,{priority:!0}))}};if(e.passHref||"a"===j.type&&!("href"in j.props)){var L="undefined"!==typeof m?m:n&&n.locale,C=n&&n.isLocaleDomain&&(0,a.getDomainLocale)(b,L,n&&n.locales,n&&n.domainLocales);w.href=C||(0,a.addBasePath)((0,a.addLocale)(b,L,n&&n.defaultLocale))}return o.default.cloneElement(j,w)};t.default=f},"g+62":function(e,t,n){"use strict";(function(e){var r=n("puqk"),c=n("q1tI"),o=n("094J"),a=function(){},i={classList:{add:a,remove:a}},s=function(t,n,r){void 0===r&&(r=e);var a=t?Object(o.a)(t,n):c.useState,s=r.matchMedia?r.matchMedia("(prefers-color-scheme: dark)"):{},u={addEventListener:function(e,t){return s.addListener&&s.addListener(t)},removeEventListener:function(e,t){return s.removeListener&&s.removeListener(t)}},l="(prefers-color-scheme: dark)"===s.media,f=r.document&&r.document.body||i;return{usePersistedDarkModeState:a,getDefaultOnChange:function(e,t,n){return void 0===e&&(e=f),void 0===t&&(t="dark-mode"),void 0===n&&(n="light-mode"),function(r){e.classList.add(r?t:n),e.classList.remove(r?n:t)}},mediaQueryEventTarget:u,getInitialValue:function(e){return l?s.matches:e}}};t.a=function(e,t){void 0===e&&(e=!1),void 0===t&&(t={});var n=t.element,o=t.classNameDark,a=t.classNameLight,i=t.onChange,u=t.storageKey;void 0===u&&(u="darkMode");var l=t.storageProvider,f=t.global,d=Object(c.useMemo)((function(){return s(u,l,f)}),[u,l,f]),b=d.getDefaultOnChange,v=d.mediaQueryEventTarget,p=(0,d.usePersistedDarkModeState)((0,d.getInitialValue)(e)),h=p[0],g=p[1],m=Object(c.useMemo)((function(){return i||b(n,o,a)}),[i,n,o,a,b]);return Object(c.useEffect)((function(){m(h)}),[m,h]),Object(r.a)("change",(function(e){return g(e.matches)}),v),{value:h,enable:Object(c.useCallback)((function(){return g(!0)}),[g]),disable:Object(c.useCallback)((function(){return g(!1)}),[g]),toggle:Object(c.useCallback)((function(){return g((function(e){return!e}))}),[g])}}}).call(this,n("ntbh"))},g4pe:function(e,t,n){e.exports=n("8Kt/")},puqk:function(e,t,n){"use strict";(function(e){var r=n("q1tI");t.a=function(t,n,c,o){void 0===c&&(c=e),void 0===o&&(o={});var a=Object(r.useRef)(),i=o.capture,s=o.passive,u=o.once;Object(r.useEffect)((function(){a.current=n}),[n]),Object(r.useEffect)((function(){if(c&&c.addEventListener){var e=function(e){return a.current(e)},n={capture:i,passive:s,once:u};return c.addEventListener(t,e,n),function(){c.removeEventListener(t,e,n)}}}),[t,c,i,s,u])}}).call(this,n("ntbh"))},vNVm:function(e,t,n){"use strict";var r=n("J4zp");t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,s=(0,c.useRef)(),u=(0,c.useState)(!1),l=r(u,2),f=l[0],d=l[1],b=(0,c.useCallback)((function(e){s.current&&(s.current(),s.current=void 0),n||f||e&&e.tagName&&(s.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=i.get(t);if(n)return n;var r=new Map,c=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return i.set(t,n={id:t,observer:c,elements:r}),n}(n),c=r.id,o=r.observer,a=r.elements;return a.set(e,t),o.observe(e),function(){a.delete(e),o.unobserve(e),0===a.size&&(o.disconnect(),i.delete(c))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return(0,c.useEffect)((function(){if(!a&&!f){var e=(0,o.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[f]),[b,f]};var c=n("q1tI"),o=n("0G5g"),a="undefined"!==typeof IntersectionObserver;var i=new Map}},[["D85t",1,2,3,0]]]);