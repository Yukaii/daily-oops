(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{4184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var c=i.apply(null,n);c&&e.push(c)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var u in n)r.call(n,u)&&n[u]&&e.push(u);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()},2817:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(5893),i=n(1163),o=n(1664),c=n(5529),u=n(4184),a=n.n(u),s=n(3011);function l(){var e=(0,s.Z)();return(0,r.jsx)("button",{className:"night-switch-button btn position-fixed top-2 right-2 px-2",type:"button",onClick:e.toggle,children:e.value?(0,r.jsx)(c.kLh,{}):(0,r.jsx)(c.NWY,{})})}var f=function(){var e=(0,i.useRouter)().pathname,t=[{text:"Home",href:"/",icon:c.XtO},{text:"Blog",href:"/blog",icon:c.vJ3},{text:"Projects",href:"/projects",icon:c.H0r},{text:"About",href:"/about",icon:c.Tk0}],n=!t.map((function(e){return e.href})).includes(e);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:a()("d-flex text-center color-bg-secondary py-4 px-3 header-block flex-items-center",{small:n,"flex-column":!n,"flex-justify-center":n}),children:[(0,r.jsx)("div",{className:a()("CircleBadge user-select-none",{"CircleBadge--small":n,"CircleBadge--large":!n,"mr-1":n,"mb-1":!n}),style:{overflow:"hidden",backgroundColor:"#F5CC7F"},children:(0,r.jsx)("img",{src:"/logo-animated.gif",alt:"Daily Oops",style:{height:"auto",maxWidth:"90%"}})}),(0,r.jsx)("h1",{className:"d-flex flex-items-center flex-justify-center",children:"Daily Oops!"})]}),(0,r.jsxs)("nav",{className:"UnderlineNav color-bg-secondary px-3 position-sticky top-0 flex-items-center flex-justify-center",style:{zIndex:99},children:[(0,r.jsx)("div",{className:"UnderlineNav-body",role:"tablist",style:{maxWidth:"100%"},children:t.map((function(t){return(0,r.jsx)(o.default,{href:t.href,children:(0,r.jsx)("button",{className:"UnderlineNav-item",role:"tab",type:"button","aria-selected":t.href===e,children:t.icon?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.icon,{className:"UnderlineNav-octicon"}),(0,r.jsx)("span",{children:t.text})]}):t.text})},t.href)}))}),(0,r.jsx)(l,{})]})]})}},4413:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return O}});var r=n(5893),i=n(6156),o=n(7294),c=n(9008),u=n(1163),a=n(4930),s=n(655),l=n(6717);var f=n(8626),d=n(5930),v=0;function m(){var e=v;return v++,e}var p=function(e){var t=e.children,n=e.initial,r=e.isPresent,i=e.onExitComplete,c=e.custom,u=e.presenceAffectsLayout,a=(0,d.h)(h),s=(0,d.h)(m),l=(0,o.useMemo)((function(){return{id:s,initial:n,isPresent:r,custom:c,onExitComplete:function(e){a.set(e,!0);var t=!0;a.forEach((function(e){e||(t=!1)})),t&&(null===i||void 0===i||i())},register:function(e){return a.set(e,!1),function(){return a.delete(e)}}}}),u?void 0:[r]);return(0,o.useMemo)((function(){a.forEach((function(e,t){return a.set(t,!1)}))}),[r]),o.useEffect((function(){!r&&!a.size&&(null===i||void 0===i||i())}),[r]),o.createElement(f.O.Provider,{value:l},t)};function h(){return new Map}var g=n(9870);function x(e){return e.key||""}var y=function(e){var t=e.children,n=e.custom,r=e.initial,i=void 0===r||r,c=e.onExitComplete,u=e.exitBeforeEnter,a=e.presenceAffectsLayout,f=void 0===a||a,d=function(){var e=(0,o.useRef)(!1),t=(0,s.CR)((0,o.useState)(0),2),n=t[0],r=t[1];return(0,l.z)((function(){return e.current=!0})),(0,o.useCallback)((function(){!e.current&&r(n+1)}),[n])}(),v=(0,o.useContext)(g.WH);(0,g.Md)(v)&&(d=v.forceUpdate);var m=(0,o.useRef)(!0),h=function(e){var t=[];return o.Children.forEach(e,(function(e){(0,o.isValidElement)(e)&&t.push(e)})),t}(t),y=(0,o.useRef)(h),b=(0,o.useRef)(new Map).current,j=(0,o.useRef)(new Set).current;if(function(e,t){e.forEach((function(e){var n=x(e);t.set(n,e)}))}(h,b),m.current)return m.current=!1,o.createElement(o.Fragment,null,h.map((function(e){return o.createElement(p,{key:x(e),isPresent:!0,initial:!!i&&void 0,presenceAffectsLayout:f},e)})));for(var E=(0,s.ev)([],(0,s.CR)(h)),k=y.current.map(x),O=h.map(x),w=k.length,C=0;C<w;C++){var S=k[C];-1===O.indexOf(S)?j.add(S):j.delete(S)}return u&&j.size&&(E=[]),j.forEach((function(e){if(-1===O.indexOf(e)){var t=b.get(e);if(t){var r=k.indexOf(e);E.splice(r,0,o.createElement(p,{key:x(t),isPresent:!1,onExitComplete:function(){b.delete(e),j.delete(e);var t=y.current.findIndex((function(t){return t.key===e}));y.current.splice(t,1),j.size||(y.current=h,d(),c&&c())},custom:n,presenceAffectsLayout:f},t))}}})),E=E.map((function(e){var t=e.key;return j.has(t)?e:o.createElement(p,{key:x(e),isPresent:!0,presenceAffectsLayout:f},e)})),y.current=E,o.createElement(o.Fragment,null,j.size?E:E.map((function(e){return(0,o.cloneElement)(e)})))},b=n(2817),j=n(3011);n(6671),n(6677),n(9719),n(1963),n(2087);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){(0,i.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}u.default.events.on("routeChangeComplete",(function(e){return function(e){window.gtag("config","G-L4KRS0HB4B",{page_path:e})}(e)}));var O=function(e){var t=e.Component,n=e.pageProps,i=e.router;return function(){var e=(0,j.Z)();(0,o.useEffect)((function(){document.querySelector("html").setAttribute("data-color-mode",e.value?"dark":"light")}),[e])}(),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(c.default,{children:[(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0"}),(0,r.jsx)("meta",{name:"color-scheme",content:"dark light"})]}),(0,r.jsx)(a.ZP,{children:(0,r.jsxs)(y,{children:[(0,r.jsx)(b.Z,{}),(0,o.createElement)(t,k(k({},n),{},{key:i.route}))]})})]})}},1780:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(4413)}])},2087:function(){},6671:function(){},6677:function(){},1963:function(){},9719:function(){},1163:function(e,t,n){e.exports=n(2441)},3011:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var r=n(7294);function i(e,t,i,o){void 0===i&&(i=n.g),void 0===o&&(o={});var c=(0,r.useRef)(),u=o.capture,a=o.passive,s=o.once;(0,r.useEffect)((function(){c.current=t}),[t]),(0,r.useEffect)((function(){if(i&&i.addEventListener){var t=function(e){return c.current(e)},n={capture:u,passive:a,once:s};return i.addEventListener(e,t,n),function(){i.removeEventListener(e,t,n)}}}),[e,i,u,a,s])}var o={},c=function(e,t,n){return o[e]||(o[e]={callbacks:[],value:n}),o[e].callbacks.push(t),{deregister:function(){var n=o[e].callbacks,r=n.indexOf(t);r>-1&&n.splice(r,1)},emit:function(n){o[e].value!==n&&(o[e].value=n,o[e].callbacks.forEach((function(e){t!==e&&e(n)})))}}};function u(e,t){if(void 0===t&&(t="undefined"!=typeof n.g&&n.g.localStorage?n.g.localStorage:"undefined"!=typeof globalThis&&globalThis.localStorage?globalThis.localStorage:"undefined"!=typeof window&&window.localStorage?window.localStorage:"undefined"!=typeof localStorage?localStorage:null),t){var o=(u=t,{get:function(e,t){var n=u.getItem(e);return null==n?"function"==typeof t?t():t:JSON.parse(n)},set:function(e,t){u.setItem(e,JSON.stringify(t))}});return function(t){return function(e,t,n){var o=n.get,u=n.set,a=(0,r.useRef)(null),s=(0,r.useState)((function(){return o(t,e)})),l=s[0],f=s[1];i("storage",(function(e){if(e.key===t){var n=JSON.parse(e.newValue);l!==n&&f(n)}})),(0,r.useEffect)((function(){return a.current=c(t,f,e),function(){a.current.deregister()}}),[e,t]);var d=(0,r.useCallback)((function(e){var n="function"==typeof e?e(l):e;u(t,n),f(n),a.current.emit(e)}),[l,u,t]);return[l,d]}(t,e,o)}}var u;return r.useState}var a=function(){},s={classList:{add:a,remove:a}},l=function(e,t,i){void 0===i&&(i=n.g);var o=e?u(e,t):r.useState,c=i.matchMedia?i.matchMedia("(prefers-color-scheme: dark)"):{},a={addEventListener:function(e,t){return c.addListener&&c.addListener(t)},removeEventListener:function(e,t){return c.removeListener&&c.removeListener(t)}},l="(prefers-color-scheme: dark)"===c.media,f=i.document&&i.document.body||s;return{usePersistedDarkModeState:o,getDefaultOnChange:function(e,t,n){return void 0===e&&(e=f),void 0===t&&(t="dark-mode"),void 0===n&&(n="light-mode"),function(r){e.classList.add(r?t:n),e.classList.remove(r?n:t)}},mediaQueryEventTarget:a,getInitialValue:function(e){return l?c.matches:e}}};function f(e,t){void 0===e&&(e=!1),void 0===t&&(t={});var n=t.element,o=t.classNameDark,c=t.classNameLight,u=t.onChange,a=t.storageKey;void 0===a&&(a="darkMode");var s=t.storageProvider,f=t.global,d=(0,r.useMemo)((function(){return l(a,s,f)}),[a,s,f]),v=d.getDefaultOnChange,m=d.mediaQueryEventTarget,p=(0,d.usePersistedDarkModeState)((0,d.getInitialValue)(e)),h=p[0],g=p[1],x=(0,r.useMemo)((function(){return u||v(n,o,c)}),[u,n,o,c,v]);return(0,r.useEffect)((function(){x(h)}),[x,h]),i("change",(function(e){return g(e.matches)}),m),{value:h,enable:(0,r.useCallback)((function(){return g(!0)}),[g]),disable:(0,r.useCallback)((function(){return g(!1)}),[g]),toggle:(0,r.useCallback)((function(){return g((function(e){return!e}))}),[g])}}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,547,336,837,351,284,996],(function(){return t(1780),t(2441)}));var n=e.O();_N_E=n}]);