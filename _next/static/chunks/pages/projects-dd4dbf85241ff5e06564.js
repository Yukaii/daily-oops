_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[15],{"094J":function(e,t,n){"use strict";(function(e){var r=n("q1tI"),a=n("puqk"),o={},c=function(e,t,n){return o[e]||(o[e]={callbacks:[],value:n}),o[e].callbacks.push(t),{deregister:function(){var n=o[e].callbacks,r=n.indexOf(t);r>-1&&n.splice(r,1)},emit:function(n){o[e].value!==n&&(o[e].value=n,o[e].callbacks.forEach((function(e){t!==e&&e(n)})))}}};t.a=function(t,n){if(void 0===n&&(n=e.localStorage),n){var o=(i=n,{get:function(e,t){var n=i.getItem(e);return null===n?"function"==typeof t?t():t:JSON.parse(n)},set:function(e,t){i.setItem(e,JSON.stringify(t))}});return function(e){return function(e,t,n){var o=n.get,i=n.set,u=Object(r.useRef)(null),s=Object(r.useState)((function(){return o(t,e)})),l=s[0],f=s[1];return Object(a.a)("storage",(function(e){var n=e.key,r=JSON.parse(e.newValue);n===t&&l!==r&&f(r)})),Object(r.useEffect)((function(){return u.current=c(t,f,e),function(){u.current.deregister()}}),[]),Object(r.useEffect)((function(){i(t,l),u.current.emit(l)}),[l]),[l,f]}(e,t,o)}}var i;return r.useState}}).call(this,n("yLpj"))},D85t:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return n("RHEb")}])},RHEb:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n("q1tI"),a=n.n(r),o=n("8Kt/"),c=n.n(o),i=n("b0oO"),u=a.a.createElement,s=!0;function l(e){var t=e.projects;return u("div",null,u(c.a,null,u("title",null,"Projects | Daily Oops!")),u(i.a,null),u("div",{className:"markdown-body mx-auto pt-4 pb-6 px-3 container-lg",style:{maxWidth:700}},t.map((function(e){return u("div",{className:"col-12 col-sm-6 d-inline-block"},u("a",{className:"d-inline-block box-shadow-medium mx-2 px-3 pt-4 pb-6 position-relative rounded-1 overflow-hidden no-underline",href:e.link,target:"_blank",style:{width:"calc(100% - 16px)",height:200}},u("h3",{className:"text-gray-dark"},e.title),u("p",{className:"text-gray"},e.description)))}))))}},YFqc:function(e,t,n){e.exports=n("cTJO")},b0oO:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),o=n("nOHt"),c=n("YFqc"),i=n.n(c),u=n("g+62"),s=n("aOgs"),l=a.a.createElement;function f(){var e=Object(u.a)();return l("button",{className:"night-switch-button btn position-absolute top-4 right-4 px-2",type:"button",onClick:e.toggle},e.value?l(s.d,null):l(s.f,null))}var d=a.a.createElement;t.a=function(){var e=Object(o.useRouter)().pathname,t=[{text:"Home",href:"/",icon:s.e},{text:"Blog",href:"/blog",icon:s.a},{text:"Projects",href:"/projects",icon:s.b},{text:"About",href:"/about",icon:s.c}];return d(a.a.Fragment,null,d("div",{className:"d-block text-center bg-gray py-4 px-3"},d(f,null),d("div",{className:"CircleBadge CircleBadge--large mx-auto mb-3",style:{overflow:"hidden",backgroundColor:"#F5CC7F"}},d("img",{src:"/logo-animated.gif",alt:"Daily Oops",style:{height:"auto",maxHeight:"80%"},className:"user-select-none"})),d("h1",null,"Daily Oops!")),d("nav",{className:"UnderlineNav flex-justify-center bg-gray px-3 position-sticky top-0",style:{zIndex:1}},d("div",{className:"UnderlineNav-body",role:"tablist",style:{maxWidth:"100%"}},t.map((function(t){return d(i.a,{href:t.href,key:t.href},d("button",{className:"UnderlineNav-item",role:"tab",type:"button","aria-selected":t.href===e},t.icon?d(a.a.Fragment,null,d(t.icon,{className:"UnderlineNav-octicon"}),d("span",null,t.text)):t.text))})))))}},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),a=n("284h");t.__esModule=!0,t.default=void 0;var o,c=a(n("q1tI")),i=n("elyg"),u=n("nOHt"),s=new Map,l=window.IntersectionObserver,f={};var d=function(e,t){var n=o||(l?o=new l((function(e){e.forEach((function(e){if(s.has(e.target)){var t=s.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(o.unobserve(e.target),s.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),s.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}s.delete(e)}):function(){}};function v(e,t,n,r){(0,i.isLocalURL)(t)&&(e.prefetch(t,n,r).catch((function(e){0})),f[t+"%"+n]=!0)}var p=function(e){var t=!1!==e.prefetch,n=c.default.useState(),a=r(n,2),o=a[0],s=a[1],p=(0,u.useRouter)(),h=p&&p.pathname||"/",m=c.default.useMemo((function(){var t=(0,i.resolveHref)(h,e.href);return{href:t,as:e.as?(0,i.resolveHref)(h,e.as):t}}),[h,e.href,e.as]),b=m.href,g=m.as;c.default.useEffect((function(){if(t&&l&&o&&o.tagName&&(0,i.isLocalURL)(b)&&!f[b+"%"+g])return d(o,(function(){v(p,b,g)}))}),[t,o,b,g,p]);var y=e.children,O=e.replace,k=e.shallow,E=e.scroll;"string"===typeof y&&(y=c.default.createElement("a",null,y));var j=c.Children.only(y),w={ref:function(e){e&&s(e),j&&"object"===typeof j&&j.ref&&("function"===typeof j.ref?j.ref(e):"object"===typeof j.ref&&(j.ref.current=e))},onClick:function(e){j.props&&"function"===typeof j.props.onClick&&j.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,c){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(n))&&(e.preventDefault(),null==c&&(c=r.indexOf("#")<0),t[a?"replace":"push"](n,r,{shallow:o}).then((function(e){e&&c&&(window.scrollTo(0,0),document.body.focus())})))}(e,p,b,g,O,k,E)}};return t&&(w.onMouseEnter=function(e){(0,i.isLocalURL)(b)&&(j.props&&"function"===typeof j.props.onMouseEnter&&j.props.onMouseEnter(e),v(p,b,g,{priority:!0}))}),(e.passHref||"a"===j.type&&!("href"in j.props))&&(w.href=(0,i.addBasePath)(g)),c.default.cloneElement(j,w)};t.default=p},"g+62":function(e,t,n){"use strict";(function(e){var r=n("puqk"),a=n("q1tI"),o=n("094J"),c=function(){},i={classList:{add:c,remove:c}},u=function(t,n,r){void 0===r&&(r=e);var c=t?Object(o.a)(t,n):a.useState,u=r.matchMedia?r.matchMedia("(prefers-color-scheme: dark)"):{},s={addEventListener:function(e,t){return u.addListener&&u.addListener(t)},removeEventListener:function(e,t){return u.removeListener&&u.removeListener(t)}},l="(prefers-color-scheme: dark)"===u.media,f=r.document&&r.document.body||i;return{usePersistedDarkModeState:c,getDefaultOnChange:function(e,t,n){return void 0===e&&(e=f),void 0===t&&(t="dark-mode"),void 0===n&&(n="light-mode"),function(r){e.classList.add(r?t:n),e.classList.remove(r?n:t)}},mediaQueryEventTarget:s,getInitialValue:function(e){return l?u.matches:e}}};t.a=function(e,t){void 0===e&&(e=!1),void 0===t&&(t={});var n=t.element,o=t.classNameDark,c=t.classNameLight,i=t.onChange,s=t.storageKey;void 0===s&&(s="darkMode");var l=t.storageProvider,f=t.global,d=Object(a.useMemo)((function(){return u(s,l,f)}),[s,l,f]),v=d.getDefaultOnChange,p=d.mediaQueryEventTarget,h=(0,d.usePersistedDarkModeState)((0,d.getInitialValue)(e)),m=h[0],b=h[1],g=Object(a.useMemo)((function(){return i||v(n,o,c)}),[i,n,o,c,v]);return Object(a.useEffect)((function(){g(m)}),[g,m]),Object(r.a)("change",(function(e){return b(e.matches)}),p),{value:m,enable:Object(a.useCallback)((function(){return b(!0)}),[b]),disable:Object(a.useCallback)((function(){return b(!1)}),[b]),toggle:Object(a.useCallback)((function(){return b((function(e){return!e}))}),[b])}}}).call(this,n("yLpj"))},puqk:function(e,t,n){"use strict";(function(e){var r=n("q1tI");t.a=function(t,n,a,o){void 0===a&&(a=e),void 0===o&&(o={});var c=Object(r.useRef)(),i=o.capture,u=o.passive,s=o.once;Object(r.useEffect)((function(){c.current=n}),[n]),Object(r.useEffect)((function(){if(a&&a.addEventListener){var e=function(e){return c.current(e)},n={capture:i,passive:u,once:s};return a.addEventListener(t,e,n),function(){a.removeEventListener(t,e,n)}}}),[t,a,i,u,s])}}).call(this,n("yLpj"))},yLpj:function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}e.exports=n}},[["D85t",0,2,3,1]]]);