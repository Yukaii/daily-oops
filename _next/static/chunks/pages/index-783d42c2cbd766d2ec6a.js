_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[17],{I631:function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){var r=e.prototype,i=r.format,s={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};n.en.formats=s,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var e=this.$locale().formats,n=void 0===e?{}:e,r=t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,e,r){var i=r&&r.toUpperCase();return e||n[r]||s[r]||n[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}));return i.call(this,r)}}}()},RNiq:function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return h})),n.d(e,"default",(function(){return d}));var r=n("nKUr"),i=n("8Kt/"),s=n.n(i),a=n("YFqc"),o=n.n(a),u=n("b0oO"),c=n("UpFB"),h=!0;function d(t){var e=t.posts;return Object(r.jsxs)("div",{children:[Object(r.jsx)(s.a,{children:Object(r.jsx)("title",{children:"Daily Oops!"})}),Object(r.jsx)(u.a,{}),Object(r.jsxs)("div",{className:"d-block mx-auto markdown-body py-4 px-3",style:{maxWidth:700},children:[Object(r.jsx)("h2",{children:"Hi"}),Object(r.jsx)("p",{children:"This is Yukai Huang's personal website."}),Object(r.jsxs)("p",{children:["Here you can read my ",Object(r.jsx)(o.a,{href:"/blog",children:"recent posts"}),", play with ",Object(r.jsx)(o.a,{href:"/projects",children:"my side projects before"}),", or ",Object(r.jsx)(o.a,{href:"/about",children:"get to know me more"}),"."]}),Object(r.jsx)("p",{children:"\u5b89\u4e45\u5427\uff01"}),Object(r.jsx)("h2",{children:"Recent posts"}),Object(r.jsx)("div",{className:"Box",children:e.slice(0,5).map((function(t,n){return Object(r.jsx)(c.a,{post:t,index:n,totalCount:e.length},t.id)}))}),Object(r.jsx)(o.a,{href:"/blog",children:Object(r.jsx)("button",{className:"mt-3 btn mr-2",type:"button",children:"Read More"})}),Object(r.jsx)("a",{href:"/feed.xml",children:Object(r.jsx)("button",{className:"mt-3 btn btn-primary",type:"button",children:"Subscribe via RSS"})})]})]})}},UpFB:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n("nKUr"),i=n("it45"),s=n("YFqc"),a=n.n(s);function o(t){var e=t.post,n=t.index,s=t.totalCount,o=e.date,u=o.year,c=o.month,h=o.day,d=e.slug,f=Object(i.a)("".concat(u,"-").concat(c,"-").concat(h));return Object(r.jsx)("div",{className:"Box-row Box-row--hover-gray d-flex flex-items-center",children:Object(r.jsxs)("div",{className:"flex-auto",children:[Object(r.jsx)(a.a,{href:"/blog/".concat(u,"/").concat(c,"/").concat(h,"/").concat(d),children:Object(r.jsx)("a",{children:Object(r.jsx)("strong",{children:e.title})})}),Object(r.jsxs)("div",{className:"text-small text-gray-light",children:["#",s-n," posted on ",f.format("LL")]})]})})}},Wgwc:function(t,e,n){t.exports=function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",a="month",o="quarter",u="year",c="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,d=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},$={s:l,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+l(r,2,"0")+":"+l(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,a),s=n-i<0,o=e.clone().add(r+(s?-1:1),a);return+(-(r+(n-i)/(s?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:a,y:u,w:s,d:i,D:c,h:r,m:n,s:e,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},m="en",M={};M[m]=f;var p=function(t){return t instanceof y},b=function(t,e,n){var r;if(!t)return m;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(m=r),r||!n&&m},j=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new y(n)},v=$;v.l=b,v.i=p,v.w=function(t,e){return j(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var y=function(){function f(t){this.$L=this.$L||b(t.locale,null,!0),this.parse(t)}var l=f.prototype;return l.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(v.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},l.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},l.$utils=function(){return v},l.isValid=function(){return!("Invalid Date"===this.$d.toString())},l.isSame=function(t,e){var n=j(t);return this.startOf(e)<=n&&n<=this.endOf(e)},l.isAfter=function(t,e){return j(t)<this.startOf(e)},l.isBefore=function(t,e){return this.endOf(e)<j(t)},l.$g=function(t,e,n){return v.u(t)?this[e]:this.set(n,t)},l.unix=function(){return Math.floor(this.valueOf()/1e3)},l.valueOf=function(){return this.$d.getTime()},l.startOf=function(t,o){var h=this,d=!!v.u(o)||o,f=v.p(t),l=function(t,e){var n=v.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return d?n:n.endOf(i)},$=function(t,e){return v.w(h.toDate()[t].apply(h.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},m=this.$W,M=this.$M,p=this.$D,b="set"+(this.$u?"UTC":"");switch(f){case u:return d?l(1,0):l(31,11);case a:return d?l(1,M):l(0,M+1);case s:var j=this.$locale().weekStart||0,y=(m<j?m+7:m)-j;return l(d?p-y:p+(6-y),M);case i:case c:return $(b+"Hours",0);case r:return $(b+"Minutes",1);case n:return $(b+"Seconds",2);case e:return $(b+"Milliseconds",3);default:return this.clone()}},l.endOf=function(t){return this.startOf(t,!1)},l.$set=function(s,o){var h,d=v.p(s),f="set"+(this.$u?"UTC":""),l=(h={},h[i]=f+"Date",h[c]=f+"Date",h[a]=f+"Month",h[u]=f+"FullYear",h[r]=f+"Hours",h[n]=f+"Minutes",h[e]=f+"Seconds",h[t]=f+"Milliseconds",h)[d],$=d===i?this.$D+(o-this.$W):o;if(d===a||d===u){var m=this.clone().set(c,1);m.$d[l]($),m.init(),this.$d=m.set(c,Math.min(this.$D,m.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},l.set=function(t,e){return this.clone().$set(t,e)},l.get=function(t){return this[v.p(t)]()},l.add=function(t,o){var c,h=this;t=Number(t);var d=v.p(o),f=function(e){var n=j(h);return v.w(n.date(n.date()+Math.round(e*t)),h)};if(d===a)return this.set(a,this.$M+t);if(d===u)return this.set(u,this.$y+t);if(d===i)return f(1);if(d===s)return f(7);var l=(c={},c[n]=6e4,c[r]=36e5,c[e]=1e3,c)[d]||1,$=this.$d.getTime()+t*l;return v.w($,this)},l.subtract=function(t,e){return this.add(-1*t,e)},l.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=v.z(this),i=this.$locale(),s=this.$H,a=this.$m,o=this.$M,u=i.weekdays,c=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},f=function(t){return v.s(s%12||12,t,"0")},l=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:v.s(o+1,2,"0"),MMM:h(i.monthsShort,o,c,3),MMMM:h(c,o),D:this.$D,DD:v.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,u,2),ddd:h(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(s),HH:v.s(s,2,"0"),h:f(1),hh:f(2),a:l(s,a,!0),A:l(s,a,!1),m:String(a),mm:v.s(a,2,"0"),s:String(this.$s),ss:v.s(this.$s,2,"0"),SSS:v.s(this.$ms,3,"0"),Z:r};return n.replace(d,(function(t,e){return e||$[t]||r.replace(":","")}))},l.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},l.diff=function(t,c,h){var d,f=v.p(c),l=j(t),$=6e4*(l.utcOffset()-this.utcOffset()),m=this-l,M=v.m(this,l);return M=(d={},d[u]=M/12,d[a]=M,d[o]=M/3,d[s]=(m-$)/6048e5,d[i]=(m-$)/864e5,d[r]=m/36e5,d[n]=m/6e4,d[e]=m/1e3,d)[f]||m,h?M:v.a(M)},l.daysInMonth=function(){return this.endOf(a).$D},l.$locale=function(){return M[this.$L]},l.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=b(t,e,!0);return r&&(n.$L=r),n},l.clone=function(){return v.w(this.$d,this)},l.toDate=function(){return new Date(this.valueOf())},l.toJSON=function(){return this.isValid()?this.toISOString():null},l.toISOString=function(){return this.$d.toISOString()},l.toString=function(){return this.$d.toUTCString()},f}(),g=y.prototype;return j.prototype=g,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",a],["$y",u],["$D",c]].forEach((function(t){g[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),j.extend=function(t,e){return t(e,y,j),j},j.locale=b,j.isDayjs=p,j.unix=function(t){return j(1e3*t)},j.en=M[m],j.Ls=M,j}()},it45:function(t,e,n){"use strict";var r=n("Wgwc"),i=n.n(r),s=n("I631"),a=n.n(s);i.a.extend(a.a),e.a=i.a},vlRD:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("RNiq")}])}},[["vlRD",1,2,3,0,4]]]);