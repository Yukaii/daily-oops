_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[13],{I631:function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){var r=e.prototype,i=r.format,a={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};n.en.formats=a,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var e=this.$locale().formats,n=void 0===e?{}:e,r=t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,e,r){var i=r&&r.toUpperCase();return e||n[r]||a[r]||n[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}));return i.call(this,r)}}}()},RNiq:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return h})),n.d(e,"default",(function(){return d}));var r=n("q1tI"),i=n.n(r),a=n("8Kt/"),s=n.n(a),o=n("YFqc"),u=n.n(o),c=n("b0oO"),f=n("UpFB"),l=i.a.createElement,h=!0;function d(t){var e=t.posts;return l("div",null,l(s.a,null,l("title",null,"Daily Oops!")),l(c.a,null),l("div",{className:"d-block mx-auto markdown-body py-4 px-1",style:{maxWidth:700}},l("h2",null,"Hi"),l("p",null,"This is Yukai Huang's personal website."),l("p",null,"Here you can read my ",l(u.a,{href:"/blog"},"recent posts"),", play with ",l(u.a,{href:"/projects"},"my side projects before"),", or ",l(u.a,{href:"/about"},"get to know me more"),"."),l("p",null,"\u5b89\u4e45\u5427\uff01"),l("h2",null,"Recent posts"),l("div",{className:"Box"},e.slice(0,5).map((function(t,n){return l(f.a,{post:t,index:n,key:t.id,totalCount:e.length})}))),l(u.a,{href:"/blog"},l("button",{className:"mt-3 btn mr-2",type:"button"},"Read More")),l("a",{href:"/feed.xml"},l("button",{className:"mt-3 btn btn-primary",type:"button"},"Subscribe via RSS"))))}},UpFB:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n("q1tI"),i=n.n(r),a=n("it45"),s=n("YFqc"),o=n.n(s),u=i.a.createElement;function c(t){var e=t.post,n=t.index,r=t.totalCount,i=e.date,s=i.year,c=i.month,f=i.day,l=e.slug,h=Object(a.a)("".concat(s,"-").concat(c,"-").concat(f));return u("div",{className:"Box-row Box-row--hover-gray d-flex flex-items-center"},u("div",{className:"flex-auto"},u(o.a,{href:"/blog/".concat(s,"/").concat(c,"/").concat(f,"/").concat(l)},u("a",null,u("strong",null,e.title))),u("div",{className:"text-small text-gray-light"},"#",r-n," posted on ",h.format("LL"))))}},Wgwc:function(t,e,n){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",a="week",s="month",o="quarter",u="year",c="date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,l=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},d=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},p={s:d,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+d(r,2,"0")+":"+d(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,s),a=n-i<0,o=e.clone().add(r+(a?-1:1),s);return+(-(r+(n-i)/(a?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(f){return{M:s,y:u,w:a,d:i,D:c,h:r,m:n,s:e,ms:t,Q:o}[f]||String(f||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},m="en",v={};v[m]=h;var y=function(t){return t instanceof b},g=function(t,e,n){var r;if(!t)return m;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(m=r),r||!n&&m},$=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},M=p;M.l=g,M.i=y,M.w=function(t,e){return $(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function h(t){this.$L=this.$L||g(t.locale,null,!0),this.parse(t)}var d=h.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(f);if(r){var i=r[2]-1||0,a=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return M},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=$(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return $(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<$(t)},d.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var f=this,l=!!M.u(o)||o,h=M.p(t),d=function(t,e){var n=M.w(f.$u?Date.UTC(f.$y,e,t):new Date(f.$y,e,t),f);return l?n:n.endOf(i)},p=function(t,e){return M.w(f.toDate()[t].apply(f.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),f)},m=this.$W,v=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case u:return l?d(1,0):d(31,11);case s:return l?d(1,v):d(0,v+1);case a:var $=this.$locale().weekStart||0,b=(m<$?m+7:m)-$;return d(l?y-b:y+(6-b),v);case i:case c:return p(g+"Hours",0);case r:return p(g+"Minutes",1);case n:return p(g+"Seconds",2);case e:return p(g+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(a,o){var f,l=M.p(a),h="set"+(this.$u?"UTC":""),d=(f={},f[i]=h+"Date",f[c]=h+"Date",f[s]=h+"Month",f[u]=h+"FullYear",f[r]=h+"Hours",f[n]=h+"Minutes",f[e]=h+"Seconds",f[t]=h+"Milliseconds",f)[l],p=l===i?this.$D+(o-this.$W):o;if(l===s||l===u){var m=this.clone().set(c,1);m.$d[d](p),m.init(),this.$d=m.set(c,Math.min(this.$D,m.daysInMonth())).$d}else d&&this.$d[d](p);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[M.p(t)]()},d.add=function(t,o){var c,f=this;t=Number(t);var l=M.p(o),h=function(e){var n=$(f);return M.w(n.date(n.date()+Math.round(e*t)),f)};if(l===s)return this.set(s,this.$M+t);if(l===u)return this.set(u,this.$y+t);if(l===i)return h(1);if(l===a)return h(7);var d=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[l]||1,p=this.$d.getTime()+t*d;return M.w(p,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=M.z(this),i=this.$locale(),a=this.$H,s=this.$m,o=this.$M,u=i.weekdays,c=i.months,f=function(t,r,i,a){return t&&(t[r]||t(e,n))||i[r].substr(0,a)},h=function(t){return M.s(a%12||12,t,"0")},d=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:M.s(o+1,2,"0"),MMM:f(i.monthsShort,o,c,3),MMMM:f(c,o),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:f(i.weekdaysMin,this.$W,u,2),ddd:f(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(a),HH:M.s(a,2,"0"),h:h(1),hh:h(2),a:d(a,s,!0),A:d(a,s,!1),m:String(s),mm:M.s(s,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:r};return n.replace(l,(function(t,e){return e||p[t]||r.replace(":","")}))},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,c,f){var l,h=M.p(c),d=$(t),p=6e4*(d.utcOffset()-this.utcOffset()),m=this-d,v=M.m(this,d);return v=(l={},l[u]=v/12,l[s]=v,l[o]=v/3,l[a]=(m-p)/6048e5,l[i]=(m-p)/864e5,l[r]=m/36e5,l[n]=m/6e4,l[e]=m/1e3,l)[h]||m,f?v:M.a(v)},d.daysInMonth=function(){return this.endOf(s).$D},d.$locale=function(){return v[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=g(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return M.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},h}(),w=b.prototype;return $.prototype=w,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",s],["$y",u],["$D",c]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),$.extend=function(t,e){return t(e,b,$),$},$.locale=g,$.isDayjs=y,$.unix=function(t){return $(1e3*t)},$.en=v[m],$.Ls=v,$}()},YFqc:function(t,e,n){t.exports=n("cTJO")},b0oO:function(t,e,n){"use strict";var r=n("q1tI"),i=n.n(r),a=n("nOHt"),s=n("YFqc"),o=n.n(s),u=n("aOgs"),c=i.a.createElement;e.a=function(){var t=Object(a.useRouter)().pathname,e=[{text:"Home",href:"/",icon:u.d},{text:"Blog",href:"/blog",icon:u.a},{text:"Projects",href:"/projects",icon:u.b},{text:"About",href:"/about",icon:u.c}];return c(i.a.Fragment,null,c("div",{className:"d-block text-center bg-gray py-4 px-1"},c("div",{className:"CircleBadge CircleBadge--large mx-auto mb-3",style:{overflow:"hidden",backgroundColor:"#F5CC7F"}},c("img",{src:"/logo-animated.gif",alt:"Daily Oops",style:{height:"auto",maxHeight:"80%"},className:"user-select-none"})),c("h1",null,"Daily Oops!")),c("nav",{className:"UnderlineNav flex-justify-center bg-gray px-1 position-sticky top-0",style:{zIndex:1}},c("div",{className:"UnderlineNav-body",role:"tablist"},e.map((function(e){return c(o.a,{href:e.href,key:e.href},c("button",{className:"UnderlineNav-item",role:"tab",type:"button","aria-selected":e.href===t},e.icon?c(i.a.Fragment,null,c(e.icon,{className:"UnderlineNav-octicon"}),c("span",null,e.text)):e.text))})))))}},cTJO:function(t,e,n){"use strict";var r=n("J4zp"),i=n("284h");e.__esModule=!0,e.default=void 0;var a,s=i(n("q1tI")),o=n("elyg"),u=n("nOHt"),c=new Map,f=window.IntersectionObserver,l={};var h=function(t,e){var n=a||(f?a=new f((function(t){t.forEach((function(t){if(c.has(t.target)){var e=c.get(t.target);(t.isIntersecting||t.intersectionRatio>0)&&(a.unobserve(t.target),c.delete(t.target),e())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(t),c.set(t,e),function(){try{n.unobserve(t)}catch(e){console.error(e)}c.delete(t)}):function(){}};function d(t,e,n,r){(0,o.isLocalURL)(e)&&(t.prefetch(e,n,r).catch((function(t){0})),l[e+"%"+n]=!0)}var p=function(t){var e=!1!==t.prefetch,n=s.default.useState(),i=r(n,2),a=i[0],c=i[1],p=(0,u.useRouter)(),m=p&&p.pathname||"/",v=s.default.useMemo((function(){var e=(0,o.resolveHref)(m,t.href);return{href:e,as:t.as?(0,o.resolveHref)(m,t.as):e}}),[m,t.href,t.as]),y=v.href,g=v.as;s.default.useEffect((function(){if(e&&f&&a&&a.tagName&&(0,o.isLocalURL)(y)&&!l[y+"%"+g])return h(a,(function(){d(p,y,g)}))}),[e,a,y,g,p]);var $=t.children,M=t.replace,b=t.shallow,w=t.scroll;"string"===typeof $&&($=s.default.createElement("a",null,$));var D=s.Children.only($),S={ref:function(t){t&&c(t),D&&"object"===typeof D&&D.ref&&("function"===typeof D.ref?D.ref(t):"object"===typeof D.ref&&(D.ref.current=t))},onClick:function(t){D.props&&"function"===typeof D.props.onClick&&D.props.onClick(t),t.defaultPrevented||function(t,e,n,r,i,a,s){("A"!==t.currentTarget.nodeName||!function(t){var e=t.currentTarget.target;return e&&"_self"!==e||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which}(t)&&(0,o.isLocalURL)(n))&&(t.preventDefault(),null==s&&(s=r.indexOf("#")<0),e[i?"replace":"push"](n,r,{shallow:a}).then((function(t){t&&s&&(window.scrollTo(0,0),document.body.focus())})))}(t,p,y,g,M,b,w)}};return e&&(S.onMouseEnter=function(t){(0,o.isLocalURL)(y)&&(D.props&&"function"===typeof D.props.onMouseEnter&&D.props.onMouseEnter(t),d(p,y,g,{priority:!0}))}),(t.passHref||"a"===D.type&&!("href"in D.props))&&(S.href=(0,o.addBasePath)(g)),s.default.cloneElement(D,S)};e.default=p},it45:function(t,e,n){"use strict";var r=n("Wgwc"),i=n.n(r),a=n("I631"),s=n.n(a);i.a.extend(s.a),e.a=i.a},vlRD:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("RNiq")}])}},[["vlRD",0,2,3,1]]]);