(function(e){function t(t){for(var a,i,c=t[0],o=t[1],d=t[2],f=0,l=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&l.push(s[i][0]),s[i]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);u&&u(t);while(l.length)l.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,c=1;c<n.length;c++){var o=n[c];0!==s[o]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},s={app:0},r=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var u=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0197":function(e,t,n){"use strict";var a=n("2131"),s=n.n(a);s.a},2131:function(e,t,n){},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=r,e.exports=s,s.id="4678"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[n("v-img",{staticClass:"shrink mr-2",attrs:{alt:"Vuetify Logo",contain:"",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",transition:"scale-transition",width:"40"}}),n("v-img",{staticClass:"shrink mt-1 hidden-sm-and-down",attrs:{alt:"Vuetify Name",contain:"","min-width":"100",src:"https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png",width:"100"}})],1),n("v-spacer"),n("v-btn",{attrs:{href:"https://github.com/vuetifyjs/vuetify/releases/latest",target:"_blank",text:""}},[n("span",{staticClass:"mr-2"},[e._v("Latest Release")]),n("v-icon",[e._v("mdi-open-in-new")])],1)],1),n("v-content",[n("Statistics")],1)],1)},r=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"4"}},[n("v-select",{attrs:{items:e.typeSelections},on:{change:e.update},model:{value:e.typeSelection,callback:function(t){e.typeSelection=t},expression:"typeSelection"}})],1),n("v-col",{attrs:{cols:"12",sm:"8"}},[n("v-slider",{attrs:{min:"5",max:e.maxDuration,label:"Aggregation Time"},on:{end:e.update},scopedSlots:e._u([{key:"append",fn:function(){return[n("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"60px"},attrs:{"hide-details":"","single-line":"",type:"number"},model:{value:e.aggregationTime,callback:function(t){e.aggregationTime=t},expression:"aggregationTime"}})]},proxy:!0}]),model:{value:e.aggregationTime,callback:function(t){e.aggregationTime=t},expression:"aggregationTime"}})],1)],1),n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"12",sm:"12"}},["Anzahl Bestellung über Zeit"===e.typeSelection||"Anzahl Items über Zeit"===e.typeSelection?n("lineChart",{attrs:{chartData:e.chartData}}):e._e(),"Anzahl über Items"===e.typeSelection?n("barChart",{attrs:{chartData:e.chartData}}):e._e()],1)],1)],1)},c=[],o=(n("4160"),n("d81d"),n("159b"),n("2909")),d=(n("a4d3"),n("4de4"),n("7db0"),n("e439"),n("dbb4"),n("b64b"),n("d3b7"),n("3ca3"),n("ddb0"),n("ade3")),u=n("bc3a"),f=n.n(u);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){Object(d["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t,n){var a=n.find((function(n){return n[e]===t}));return void 0===a&&(a={},a[e]=t,n.push(a)),a}var b={getTables:function(){return new Promise((function(e,t){f.a.get("/backend/waiter/getTables").then((function(t){e(t.data)})).catch((function(e){t(e.response.data)}))}))},getCategories:function(e){return new Promise((function(t,n){var a="/backend/waiter/getCategories/"+e;f.a.get(a).then((function(e){t(e.data)})).catch((function(e){n(e.response.data)}))}))},getItems:function(e,t){return new Promise((function(n,a){var s="/backend/waiter/getItems/"+e+"/"+t;f.a.get(s).then((function(e){n(e.data)})).catch((function(e){a(e.response.data)}))}))},getCalcItems:function(){return new Promise((function(e,t){var n="/backend/calc/items";f.a.get(n).then((function(t){var n={};t.data.forEach((function(e){n=h({},n,{},e)})),e(n)})).catch((function(e){t(e.response.data)}))}))},putOrder:function(e){return new Promise((function(t,n){var a="/backend/waiter/placeOrder";f.a.put(a,e).then((function(e){t(e.data)})).catch((function(e){n(e.response.data)}))}))},postCalcOrder:function(e){return new Promise((function(t,n){var a="/backend/calc/order";f.a.post(a,e).then((function(e){t(e)})).catch((function(e){n(e.response.data)}))}))},getNotFinished:function(e){return new Promise((function(t,n){var a="/backend/buffet/getNotFinished/"+e;f.a.get(a).then((function(e){t(e.data)})).catch((function(e){n(e)}))}))},updateFinished:function(e,t,n){return new Promise((function(a,s){var r="/backend/buffet/updateFinished/"+t+"/"+e,i={value:n};f.a.post(r,i).then((function(e){a(e.data)})).catch((function(e){s(e)}))}))},getItemsDepletion:function(e){return new Promise((function(t,n){var a="backend/buffet/getItems/"+e;f.a.get(a).then((function(e){t(e.data)})).catch((function(e){n(e)}))}))},updateDepletion:function(e,t,n){return new Promise((function(a,s){var r="backend/buffet/updateDepletion/"+e+"/"+t,i={value:n};f.a.post(r,i).then((function(e){a(e.data)})).catch((function(e){s(e)}))}))},getServantTables:function(e){return new Promise((function(t,n){var a=[],s=[];a.push(new Promise((function(t,n){f.a.get("/backend/servant/getNotServedTables/"+e).then((function(e){e.data.forEach((function(e){e.food?e.food.forEach((function(e){var t=m("idTisch",e.idTisch,s);t.Number=e.Number,t.notServed=!0,t.food=!0})):e.drinks&&e.drinks.forEach((function(e){var t=m("idTisch",e.idTisch,s);t.Number=e.Number,t.notServed=!0,t.drinks=!0}))})),t()})).catch((function(e){n(e)}))}))),a.push(new Promise((function(t,n){f.a.get("/backend/servant/getNotCashedTables/"+e).then((function(e){e.data.forEach((function(e){e.food?e.food.forEach((function(e){var t=m("idTisch",e.idTisch,s);t.Number=e.Number,t.notCashed=!0,t.food=!0})):e.drinks&&e.drinks.forEach((function(e){var t=m("idTisch",e.idTisch,s);t.Number=e.Number,t.notCashed=!0,t.drinks=!0}))})),t()})).catch((function(e){n(e)}))}))),Promise.all(a).then((function(){s.sort((function(e,t){return e.idTisch-t.idTisch})),t(s)})).catch((function(e){n(e)}))}))},getItemsByTable:function(e,t){return new Promise((function(n,a){var s=[],r={notServed:[],notCashed:{food:[],drinks:[]}};s.push(new Promise((function(n,a){f.a.get("/backend/servant/getNotServedItemsByTable/"+e+"/"+t).then((function(e){e.data.forEach((function(e){e.food&&e.food.forEach((function(e){var t=m("idBestellung",e.idBestellung,r.notServed);t.Kellner=e.Kellner,t.food||(t.food=[]);var n=m("NAME",e.NAME,t.food);n.Stueck=e.Stueck,n.served=e.served,n.cashed=e.cashed,n.price=e.price})),e.drinks&&e.drinks.forEach((function(e){var t=m("idBestellung",e.idBestellung,r.notServed);t.Kellner=e.Kellner,t.drinks||(t.drinks=[]);var n=m("NAME",e.NAME,t.drinks);n.Stueck=e.Stueck,n.served=e.served,n.cashed=e.cashed,n.price=e.price}))})),n()})).catch((function(e){a(e)}))}))),s.push(new Promise((function(n,a){f.a.get("/backend/servant/getNotCashedItemsByTable/"+e+"/"+t).then((function(e){e.data.forEach((function(e){e.food&&(r.notCashed.food=e.food),e.drinks&&(r.notCashed.drinks=e.drinks),r.notCashed.food.forEach((function(e){e.selected=0})),r.notCashed.drinks.forEach((function(e){e.selected=0}))})),n()})).catch((function(e){a(e)}))}))),Promise.all(s).then((function(){n(r)})).catch((function(e){a(e)}))}))},serveOrder:function(e,t,n){return new Promise((function(a,s){var r="/backend/servant/updateServed/"+t+"/"+e,i={value:n};f.a.post(r,i).then((function(e){a(e)})).catch((function(e){s(e)}))}))},cashOrder:function(e,t){var n=this;return new Promise((function(a,s){n.cashItemByOrder("all","Stueck",t,e).then((function(e){a(e)})).catch((function(e){s(e)}))}))},cashItemByOrder:function(e,t,n,a){return new Promise((function(s,r){var i="/backend/servant/updateCashed/"+n+"/"+a,c={item:e,value:t};f.a.post(i,c).then((function(e){s(e)})).catch((function(e){r(e)}))}))},getTimeseries:function(){return new Promise((function(e,t){f.a.get("/backend/master/timeseries").then((function(t){e(t.data)})).catch((function(e){t(e.response.data)}))}))},getAllItems:function(){return new Promise((function(e,t){f.a.get("/backend/master/items").then((function(t){e(t.data)})).catch((function(e){t(e.response.data)}))}))}},p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"small"},[n("line-chart",{attrs:{chartData:e.chartData,options:e.chartOptions}})],1)},j=[],g=n("1fca"),v=g["c"].reactiveProp,k={extends:g["b"],mixins:[v],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},y={components:{LineChart:k},props:["chartData"],data:function(){return{datacollection:null,chartOptions:{}}},mounted:function(){this.fillData()},methods:{fillData:function(){this.datacollection={labels:[this.getRandomInt(),this.getRandomInt()],datasets:[{label:"Data One",backgroundColor:"#f87979",data:[this.getRandomInt(),this.getRandomInt()]},{label:"Data One",backgroundColor:"#f87979",data:[this.getRandomInt(),this.getRandomInt()]}]}},getRandomInt:function(){return Math.floor(46*Math.random())+5}}},w=y,O=(n("fa0a"),n("2877")),S=Object(O["a"])(w,p,j,!1,null,null,null),P=S.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"small"},[n("barChart",{attrs:{chartData:e.chartData,options:e.chartOptions}})],1)},T=[],E=g["c"].reactiveProp,N={extends:g["a"],mixins:[E],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}},D={components:{barChart:N},props:["chartData"],data:function(){return{datacollection:null,chartOptions:{}}},mounted:function(){},methods:{}},z=D,I=(n("0197"),Object(O["a"])(z,C,T,!1,null,null,null)),x=I.exports,B=n("c1df"),_=n.n(B),A={name:"Statistics",props:[],components:{lineChart:P,barChart:x},data:function(){return{orders:[],tables:[],items:[],typeSelections:["Anzahl Bestellung über Zeit","Anzahl über Items","Anzahl Items über Zeit"],typeSelection:"Anzahl Bestellung über Zeit",aggregationTime:960,startTimestamp:"",endTimestamp:"",timestamps:[],maxDuration:960,chartData:{}}},created:function(){},mounted:function(){var e=this;b.getTables().then((function(t){e.tables=t,e.update()})).catch((function(){})),b.getAllItems().then((function(t){e.items=t,e.update()})).catch((function(){})),b.getTimeseries().then((function(t){e.orders=e.sortOrders(t[0],t[1]);var n="",a="";e.orders.forEach((function(e){e&&""===n&&(n=e.timePlaced),e&&(a=e.timePlaced)})),n=_()(n).seconds(0),a=_()(a).seconds(0).add(1,"minutes"),e.startTimestamp=n,e.endTimestamp=a,e.maxDuration=_.a.duration(a.diff(n)).asMinutes(),e.update()})).catch((function(){}))},methods:{sortOrders:function(e,t){var n=[];return e.forEach((function(e){void 0===n[e.idBestellung]&&(n[e.idBestellung]={Kellner:e.Kellner,tableNumber:e.Number,timePlaced:e.timePlaced,items:[]});var t=n[e.idBestellung];t.items.push({Name:e.Name,Stueck:e.Stueck,price:e.price,timeFinished:e.timeFinished,timeServed:e.timeServed,timeCashed:e.timeCashed})})),t.forEach((function(e){void 0===n[e.idBestellung]&&(n[e.idBestellung]={Kellner:e.Kellner,tableNumber:e.Number,timePlaced:e.timePlaced,items:[]});var t=n[e.idBestellung];t.items.push({Name:e.Name,Stueck:e.Stueck,price:e.price,timeFinished:e.timeFinished,timeServed:e.timeServed,timeCashed:e.timeCashed})})),n},aggregateOrders:function(){var e=this,t={label:"Aggregated Set",backroundColor:"#ffff00",borderColor:"#ff0000",data:[]};return this.timestamps.forEach((function(n,a){0!==a&&(void 0===t.data[a-1]&&(t.data[a-1]=0),e.orders.forEach((function(s){void 0!==s&&_()(s.timePlaced).isBetween(e.timestamps[a-1],n)&&t.data[a-1]++})))})),{labels:Object(o["a"])(this.timestamps),datasets:[t]}},sumUpItems:function(){var e=this,t={label:"Items",backroundColor:"#ff0000",data:[]};return this.items.forEach((function(n,a){t.data[a]=0,e.orders.forEach((function(e){e&&e.items.forEach((function(e){e.Name===n.Name&&(t.data[a]+=e.Stueck)}))}))})),{labels:Object(o["a"])(this.items.map((function(e){return e.Name}))),datasets:[t]}},aggregateItems:function(){var e=this,t=[];return this.timestamps.forEach((function(n,a){0!==a&&e.items.forEach((function(s,r){void 0===t[r]&&(t[r]={label:s.Name,backroundColor:"#ffff00",borderColor:"#ff0000",data:[]});var i=t[r];void 0===i.data[a-1]&&(i.data[a-1]=0),e.orders.forEach((function(t){void 0!==t&&_()(t.timePlaced).isBetween(e.timestamps[a-1],n)&&t.items.forEach((function(e){e.Name===s.Name&&(i.data[a-1]+=e.Stueck)}))}))}))})),{labels:Object(o["a"])(this.timestamps),datasets:t}},calculateTimestamps:function(){var e=_()(this.startTimestamp),t=[];t.push(e.format());while(_()(e).isBefore(this.endTimestamp))e.add(this.aggregationTime,"minutes"),t.push(e.format());this.timestamps=t},update:function(){switch(this.calculateTimestamps(),this.typeSelection){case"Anzahl Bestellung über Zeit":this.chartData=this.aggregateOrders();break;case"Anzahl über Items":this.chartData=this.sumUpItems();break;case"Anzahl Items über Zeit":this.chartData=this.aggregateItems();break;default:this.chartData={labels:[],datasets:[]}}}},computed:{}},V=A,M=n("6544"),F=n.n(M),R=n("62ad"),K=n("a523"),Z=n("0fd9"),$=n("b974"),L=n("ba0d"),U=n("8654"),q=Object(O["a"])(V,i,c,!1,null,null,null),G=q.exports;F()(q,{VCol:R["a"],VContainer:K["a"],VRow:Z["a"],VSelect:$["a"],VSlider:L["a"],VTextField:U["a"]});var J={name:"App",components:{Statistics:G},data:function(){return{}}},H=J,Q=n("7496"),W=n("40dc"),X=n("8336"),Y=n("a75b"),ee=n("132d"),te=n("adda"),ne=n("2fa4"),ae=Object(O["a"])(H,s,r,!1,null,null,null),se=ae.exports;F()(ae,{VApp:Q["a"],VAppBar:W["a"],VBtn:X["a"],VContent:Y["a"],VIcon:ee["a"],VImg:te["a"],VSpacer:ne["a"]});var re=n("f309"),ie=n("0fe0"),ce=n.n(ie);a["a"].use(re["a"]);var oe=new re["a"]({lang:{locales:{de:ce.a},current:"de"}});n("d5e8"),n("5363");a["a"].config.productionTip=!1,new a["a"]({vuetify:oe,render:function(e){return e(se)}}).$mount("#app")},c01f:function(e,t,n){},fa0a:function(e,t,n){"use strict";var a=n("c01f"),s=n.n(a);s.a}});
//# sourceMappingURL=app.6eb9114a.js.map