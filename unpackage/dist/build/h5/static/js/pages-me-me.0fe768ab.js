(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-me-me"],{"0582":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",[a("v-uni-view",{staticClass:"me-head"},[a("v-uni-view",{staticClass:"me-head-pic"},[a("v-uni-image",{attrs:{src:e.avatarUrl}})],1),a("v-uni-view",{staticClass:"me-head-id"},[e._v(e._s(e.userName))]),a("v-uni-view",{staticClass:"me-head-wave-1"}),a("v-uni-view",{staticClass:"me-head-wave-2"})],1),a("v-uni-view",{staticClass:"me-menu"},[a("v-uni-view",{staticClass:"me-menu-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toprofile()}}},[e._v("编辑个人资料")]),a("v-uni-view",{staticClass:"me-menu-item"},[e._v("设置")]),a("v-uni-view",{staticClass:"me-menu-item red"},[e._v("登出")]),a("v-uni-view",{staticClass:"me-menu-line"}),a("v-uni-view",{staticClass:"me-menu-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.login()}}},[e._v("id1")]),a("v-uni-view",{staticClass:"me-menu-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.login2()}}},[e._v("id2")])],1),a("v-uni-view",[e._v(e._s(e.userID))]),a("v-uni-view",[e._v(e._s(e.userName))]),a("v-uni-view",{staticClass:"uni-list-cell"},[a("v-uni-view",{staticClass:"uni-list-cell-left-2"},[e._v("id")]),a("v-uni-view",{staticClass:"uni-input-wrapper"},[a("v-uni-input",{staticClass:"uni-input",attrs:{maxlength:"30",placeholder:""},model:{value:e.userID,callback:function(t){e.userID=t},expression:"userID"}})],1)],1),a("v-uni-view",{staticClass:"uni-list-cell"},[a("v-uni-view",{staticClass:"uni-list-cell-left-2"},[e._v("昵称")]),a("v-uni-view",{staticClass:"uni-input-wrapper"},[a("v-uni-input",{staticClass:"uni-input",attrs:{maxlength:"10",placeholder:"最大输入长度为10"},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}})],1)],1),a("v-uni-view",{staticClass:"login",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.setid()}}},[e._v("设定id")]),a("v-uni-view",{staticClass:"login",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.loginmain()}}},[e._v("登录")])],1)},r=[]},"06c5":function(e,t,a){"use strict";a("a630"),a("fb6a"),a("d3b7"),a("25f0"),a("3ca3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=i(a("6b75"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(e){if("string"===typeof e)return(0,n.default)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?(0,n.default)(e,t):void 0}}},"09f0":function(e,t,a){"use strict";function n(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,i=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done);n=!0)if(a.push(o.value),t&&a.length===t)break}catch(c){i=!0,r=c}finally{try{n||null==s["return"]||s["return"]()}finally{if(i)throw r}}return a}}a("a4d3"),a("e01a"),a("d28b"),a("d3b7"),a("3ca3"),a("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"0d21":function(e,t,a){"use strict";function n(e){if(Array.isArray(e))return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"201f":function(e,t,a){"use strict";(function(e){var n=a("4ea4");a("d81d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("a9bd"));function r(e,t,a){this.uuid=e,this.name=t,this.avatar=a}function o(e,t,a){this.uuid=e,this.name=t,this.avatar=a}function s(e,t){this.currentUser=null,this.groups={},this.GoEasy=t,this.goEasy=e,this.privateMessages={},this.groupMessages={},this.onNewPrivateMessageReceive=function(e,t){},this.onNewGroupMessageReceive=function(e,t){}}s.prototype.getGroupMembers=function(e){var t=i.default.findGroupMembers(e),a={};return t.map((function(e){a[e.uuid]=e})),a},s.prototype.findGroupById=function(e){var t=i.default.findGroupById(e);return new o(t.uuid,t.name,t.avatar)},s.prototype.findFriendById=function(t){e("log","t1"," at lib/imservice.js:62");var a=i.default.findUserById(t);return e("log","t1"+a.uuid,a.name,a.avatar," at lib/imservice.js:64"),new r(a.uuid,a.name,a.avatar)},s.prototype.getGroupMessages=function(e){return this.groupMessages[e]||(this.groupMessages[e]=[]),this.groupMessages[e]},s.prototype.getPrivateMessages=function(e){return this.privateMessages[e]||(this.privateMessages[e]=[]),this.privateMessages[e]},s.prototype.connect=function(t){this.currentUser=t;var a={name:this.currentUser.name,avatar:this.currentUser.avatar};this.initialListeners(),this.goEasy.connect({id:this.currentUser.uuid,data:a,onSuccess:function(){e("log","GoEasy connect successfully."," at lib/imservice.js:96")},onFailed:function(t){e("log","Failed to connect GoEasy, code:"+t.code+",error:"+t.content," at lib/imservice.js:100")},onProgress:function(t){e("log","GoEasy is connecting",t," at lib/imservice.js:103")}}),this.subscribeGroupMessage(t)},s.prototype.subscribeGroupMessage=function(){var t=i.default.findGroups(this.currentUser),a=t.map((function(e){return e.uuid}));this.goEasy.im.subscribeGroup({groupIds:a,onSuccess:function(){e("log","订阅群消息成功"," at lib/imservice.js:116")},onFailed:function(t){e("log","订阅群消息失败"," at lib/imservice.js:120")}})},s.prototype.initialListeners=function(){var e=this;this.goEasy.im.on(this.GoEasy.IM_EVENT.PRIVATE_MESSAGE_RECEIVED,(function(t){var a;a=e.currentUser.uuid===t.senderId?t.receiverId:t.senderId;var n=e.getPrivateMessages(a);n.push(t),e.onNewPrivateMessageReceive(a,t)})),this.goEasy.im.on(this.GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED,(function(t){var a=t.groupId,n=e.getGroupMessages(a);n.push(t),e.onNewGroupMessageReceive(a,t)}))};var c=s;t.default=c}).call(this,a("0de9")["log"])},3835:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=c;var n=s(a("0d21")),i=s(a("09f0")),r=s(a("06c5")),o=s(a("3d8c"));function s(e){return e&&e.__esModule?e:{default:e}}function c(e,t){return(0,n.default)(e)||(0,i.default)(e,t)||(0,r.default)(e,t)||(0,o.default)()}},"3d8c":function(e,t,a){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},4795:function(e,t,a){"use strict";var n=a("861f"),i=a.n(n);i.a},"61b8":function(e,t,a){"use strict";a.r(t);var n=a("0582"),i=a("882b");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);a("4795");var o,s=a("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"b5511392",null,!1,n["a"],o);t["default"]=c.exports},"6b75":function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"7fa3":function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'.uni-list-cell[data-v-b5511392]{position:relative;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.uni-list-cell-hover[data-v-b5511392]{background-color:#eee}.uni-list-cell-pd[data-v-b5511392]{padding:%?22?% %?30?%}.uni-list-cell-left[data-v-b5511392]{white-space:nowrap;font-size:%?34?%;font-weight:600;padding:10px %?30?%}.uni-list-cell-left-2[data-v-b5511392]{display:inline-flex;white-space:nowrap;font-size:%?34?%;font-weight:600;padding:10px %?30?%}.uni-list-cell-db[data-v-b5511392],\n.uni-list-cell-right[data-v-b5511392]{margin-left:45px;flex:1}.uni-list-cell[data-v-b5511392]::after{position:absolute;z-index:3;right:0;bottom:0;left:%?30?%;height:1px;content:"";-webkit-transform:scaleY(.5);transform:scaleY(.5);background-color:#c8c7cc}.me-head[data-v-b5511392]{width:100vw;height:200px;text-align:center;background-image:url(https://pic.kohaku.xin/images/2021/10/29/-2020-07-10-151533-Small.png);background-size:100% 100%}.me-head-pic[data-v-b5511392]{margin-top:5vh;display:inline-flex;width:80px;height:80px;\n\t/* border: 2px solid #000000; */border-radius:40px;background-color:#fff}.me-head-pic uni-image[data-v-b5511392]{width:100%;height:100%;border:2px solid #000;border-radius:40px}.me-head-id[data-v-b5511392]{font-size:20px;padding-top:5px;font-weight:400;color:#fff}.me-head-wave-1[data-v-b5511392]{height:40px;background:url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.5.1/img/Sakura/images/wave1.png) repeat-x;_filter:alpha(opacity=80);position:absolute;top:160px;width:1000%;left:0;z-index:5;opacity:1;transiton-property:opacity,bottom;transition-duration:.4s,.4s;-webkit-animation:wave-data-v-b5511392 250s alternate infinite;animation:wave-data-v-b5511392 250s alternate infinite}@-webkit-keyframes wave-data-v-b5511392{from{left:0}to{left:-2500px}}@keyframes wave-data-v-b5511392{from{left:0}to{left:-2500px}}.me-head-wave-2[data-v-b5511392]{height:35px;background:url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.5.1/img/Sakura/images/wave1.png) repeat-x;_filter:alpha(opacity=80);position:absolute;top:165px;width:1000%;left:-50px;z-index:5;opacity:1;transiton-property:opacity,bottom;transition-duration:.4s,.4s;-webkit-animation:wave2-data-v-b5511392 250s alternate infinite;animation:wave2-data-v-b5511392 250s alternate infinite}@-webkit-keyframes wave2-data-v-b5511392{from{left:-50px}to{left:-3500px}}@keyframes wave2-data-v-b5511392{from{left:-50px}to{left:-3500px}}.me-menu[data-v-b5511392]{margin-top:20px}.me-menu-item[data-v-b5511392]{padding-top:8px;padding-left:10px;padding-bottom:8px;font-size:17px}.me-menu-item[data-v-b5511392]::before{content:"";height:1px;width:100vw;position:absolute;left:0;margin-top:-8px;background-color:rgba(0,0,0,.07)}.me-menu-line[data-v-b5511392]{content:"";height:1px;width:100vw;background-color:rgba(0,0,0,.07)}.red[data-v-b5511392]{color:red}.login[data-v-b5511392]{width:100vw;height:50px;\n\t/* position: absolute; */\n\t/* bo.loginttom: 0rpx; */text-align:center;padding-top:10px;font-size:%?60?%;background-color:orange;color:#fff}',""]),e.exports=t},"861f":function(e,t,a){var n=a("7fa3");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("15a9c6e4",n,!0,{sourceMap:!1,shadowMode:!1})},"882b":function(e,t,a){"use strict";a.r(t);var n=a("e979"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},9523:function(e,t){function a(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}e.exports=a},a9bd:function(e,t,a){"use strict";(function(e){var n=a("4ea4");a("4de4"),a("7db0"),a("d81d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("3835")),r=[{uuid:"08c0a6ec-a42b",name:"Mattie",password:"123",avatar:"/static/images/Avatar-1.png"},{uuid:"3bb179af-bcc5",name:"Wallace",password:"123",avatar:"/static/images/Avatar-2.png"},{uuid:"fdee46b0-4b01-4590-bdba-6586d7617f95",name:"Tracy",password:"123",avatar:"/static/images/Avatar-3.png"},{uuid:"33c3693b-dbb0-4bc9-99c6-fa77b9eb763f",name:"Juanita",password:"123",avatar:"/static/images/Avatar-4.png"}],o=[{uuid:"group-a42b-47b2-bb1e-15e0f5f9a19a",name:"小程序交流群",avatar:"/static/images/wx.png",userList:["08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a","3bb179af-bcc5-4fe0-9dac-c05688484649","fdee46b0-4b01-4590-bdba-6586d7617f95","33c3693b-dbb0-4bc9-99c6-fa77b9eb763f"]},{uuid:"group-4b01-4590-bdba-6586d7617f95",name:"UniApp交流群",avatar:"/static/images/uniapp.png",userList:["08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a","fdee46b0-4b01-4590-bdba-6586d7617f95","33c3693b-dbb0-4bc9-99c6-fa77b9eb763f"]},{uuid:"group-dbb0-4bc9-99c6-fa77b9eb763f",name:"GoEasy交流群",avatar:"/static/images/goeasy.jpeg",userList:["08c0a6ec-a42b-47b2-bb1e-15e0f5f9a19a","3bb179af-bcc5-4fe0-9dac-c05688484649"]}];function s(){}s.prototype.findFriends=function(e){var t=r.filter((function(t){return t.uuid!=e.uuid}));return t},s.prototype.findGroups=function(e){var t=o.filter((function(t){return t.userList.find((function(t){return t==e.uuid}))}));return t},s.prototype.findUser=function(e,t){var a=r.find((function(a){return a.name===e&&a.password===t}));return a?{uuid:a.uuid,avatar:a.avatar,name:a.name}:a},s.prototype.findGroupById=function(e){var t=o.find((function(t){return t.uuid==e}));return t},s.prototype.findUserById=function(t){var a=r.find((function(e){return e.uuid==t})),n=uni.request({method:"GET",url:"https://wechat.api.kohaku.xin:11731/user/getuserbyid",data:{openID:t},success:function(t){return e("log",t.data," at lib/restapi.js:96"),a.uuid=t.data.uuid,a.name=t.data.name,a.avatar=t.data.avater,a}}),o=(0,i.default)(n,2);o[0],o[1];return e("log","..."," at lib/restapi.js:103"),a},s.prototype.findGroupMembers=function(e){var t=[],a=o.find((function(t){return t.uuid==e}));return r.map((function(e){a.userList.find((function(t){return t==e.uuid}))&&t.push(e)})),t};var c=new s;t.default=c}).call(this,a("0de9")["log"])},ad33:function(e,t,a){(function(n){var i;a("c975"),a("ac1f"),a("466d"),a("5319"),a("1276");var r=a("9523");!function(n,r){i=function(){return r(n)}.call(t,a,t,e),void 0===i||(e.exports=i)}(window,(function(e,t){if(!e.jWeixin){var a,i,o={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},s=function(){var e={};for(var t in o)e[o[t]]=t;return e}(),c=e.document,u=c.title,l=navigator.userAgent.toLowerCase(),d=navigator.platform.toLowerCase(),p=!(!d.match("mac")&&!d.match("win")),f=-1!=l.indexOf("wxdebugger"),g=-1!=l.indexOf("micromessenger"),m=-1!=l.indexOf("android"),v=-1!=l.indexOf("iphone")||-1!=l.indexOf("ipad"),h=(i=l.match(/micromessenger\/(\d+\.\d+\.\d+)/)||l.match(/micromessenger\/(\d+\.\d+)/))?i[1]:"",b={initStartTime:V(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},y={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:v?1:m?2:-1,clientVersion:h,url:encodeURIComponent(location.href)},w={},I={_completes:[]},_={state:0,data:{}};O((function(){b.initEndTime=V()}));var S=!1,x=[],k=(a={config:function(t){U("config",w=t);var a=!1!==w.check;O((function(){if(a)D(o.config,{verifyJsApiList:N(w.jsApiList),verifyOpenTagList:N(w.openTagList)},function(){I._complete=function(e){b.preVerifyEndTime=V(),_.state=1,_.data=e},I.success=function(e){y.isPreVerifyOk=0},I.fail=function(e){I._fail?I._fail(e):_.state=-1};var e=I._completes;return e.push((function(){!function(){if(!(p||f||w.debug||h<"6.0.2"||y.systemType<0)){var e=new Image;y.appId=w.appId,y.initTime=b.initEndTime-b.initStartTime,y.preVerifyTime=b.preVerifyEndTime-b.preVerifyStartTime,k.getNetworkType({isInnerInvoke:!0,success:function(t){y.networkType=t.networkType;var a="https://open.weixin.qq.com/sdk/report?v="+y.version+"&o="+y.isPreVerifyOk+"&s="+y.systemType+"&c="+y.clientVersion+"&a="+y.appId+"&n="+y.networkType+"&i="+y.initTime+"&p="+y.preVerifyTime+"&u="+y.url;e.src=a}})}}()})),I.complete=function(t){for(var a=0,n=e.length;a<n;++a)e[a]();I._completes=[]},I}()),b.preVerifyStartTime=V();else{_.state=1;for(var e=I._completes,t=0,n=e.length;t<n;++t)e[t]();I._completes=[]}})),k.invoke||(k.invoke=function(t,a,n){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,E(a),n)},k.on=function(t,a){e.WeixinJSBridge&&WeixinJSBridge.on(t,a)})},ready:function(e){0!=_.state?e():(I._completes.push(e),!g&&w.debug&&e())},error:function(e){h<"6.0.2"||(-1==_.state?e(_.data):I._fail=e)},checkJsApi:function(e){D("checkJsApi",{jsApiList:N(e.jsApiList)},(e._complete=function(e){if(m){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var a in t){var n=s[a];n&&(t[n]=t[a],delete t[a])}return e}(e)},e))},onMenuShareTimeline:function(e){T(o.onMenuShareTimeline,{complete:function(){D("shareTimeline",{title:e.title||u,desc:e.title||u,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){T(o.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?D("sendAppMessage",{title:e.title||u,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):D("sendAppMessage",{title:e.title||u,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){T(o.onMenuShareQQ,{complete:function(){D("shareQQ",{title:e.title||u,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){T(o.onMenuShareWeibo,{complete:function(){D("shareWeiboApp",{title:e.title||u,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){T(o.onMenuShareQZone,{complete:function(){D("shareQZone",{title:e.title||u,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){D("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){D("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){D("startRecord",{},e)},stopRecord:function(e){D("stopRecord",{},e)},onVoiceRecordEnd:function(e){T("onVoiceRecordEnd",e)},playVoice:function(e){D("playVoice",{localId:e.localId},e)},pauseVoice:function(e){D("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){D("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){T("onVoicePlayEnd",e)},uploadVoice:function(e){D("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){D("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){D("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){D("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(m){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){D(o.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){D("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){D("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===S?(S=!0,D("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(S=!1,0<x.length){var t=x.shift();wx.getLocalImgData(t)}},e))):x.push(e)},getNetworkType:function(e){D("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var a=e.subtype;if(delete e.subtype,a)e.networkType=a;else{var n=t.indexOf(":"),i=t.substring(n+1);switch(i){case"wifi":case"edge":case"wwan":e.networkType=i;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){D("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},r(a,"getLocation",(function(e){D(o.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),r(a,"hideOptionMenu",(function(e){D("hideOptionMenu",{},e)})),r(a,"showOptionMenu",(function(e){D("showOptionMenu",{},e)})),r(a,"closeWindow",(function(e){D("closeWindow",{},e=e||{})})),r(a,"hideMenuItems",(function(e){D("hideMenuItems",{menuList:e.menuList},e)})),r(a,"showMenuItems",(function(e){D("showMenuItems",{menuList:e.menuList},e)})),r(a,"hideAllNonBaseMenuItem",(function(e){D("hideAllNonBaseMenuItem",{},e)})),r(a,"showAllNonBaseMenuItem",(function(e){D("showAllNonBaseMenuItem",{},e)})),r(a,"scanQRCode",(function(e){D("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(v){var t=e.resultStr;if(t){var a=JSON.parse(t);e.resultStr=a&&a.scan_code&&a.scan_code.scan_result}}},e))})),r(a,"openAddress",(function(e){D(o.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),r(a,"openProductSpecificView",(function(e){D(o.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),r(a,"addCard",(function(e){for(var t=e.cardList,a=[],n=0,i=t.length;n<i;++n){var r=t[n],s={card_id:r.cardId,card_ext:r.cardExt};a.push(s)}D(o.addCard,{card_list:a},(e._complete=function(e){var t=e.card_list;if(t){for(var a=0,n=(t=JSON.parse(t)).length;a<n;++a){var i=t[a];i.cardId=i.card_id,i.cardExt=i.card_ext,i.isSuccess=!!i.is_succ,delete i.card_id,delete i.card_ext,delete i.is_succ}e.cardList=t,delete e.card_list}},e))})),r(a,"chooseCard",(function(e){D("chooseCard",{app_id:w.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),r(a,"openCard",(function(e){for(var t=e.cardList,a=[],n=0,i=t.length;n<i;++n){var r=t[n],s={card_id:r.cardId,code:r.code};a.push(s)}D(o.openCard,{card_list:a},e)})),r(a,"consumeAndShareCard",(function(e){D(o.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),r(a,"chooseWXPay",(function(e){D(o.chooseWXPay,C(e),e)})),r(a,"openEnterpriseRedPacket",(function(e){D(o.openEnterpriseRedPacket,C(e),e)})),r(a,"startSearchBeacons",(function(e){D(o.startSearchBeacons,{ticket:e.ticket},e)})),r(a,"stopSearchBeacons",(function(e){D(o.stopSearchBeacons,{},e)})),r(a,"onSearchBeacons",(function(e){T(o.onSearchBeacons,e)})),r(a,"openEnterpriseChat",(function(e){D("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),r(a,"launchMiniProgram",(function(e){D("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],a=e.split("?")[1];return t+=".html",void 0!==a?t+"?"+a:t}}(e.path),envVersion:e.envVersion},e)})),r(a,"openBusinessView",(function(e){D("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(m){var t=e.extraData;if(t)try{e.extraData=JSON.parse(t)}catch(t){e.extraData={}}}},e))})),r(a,"miniProgram",{navigateBack:function(e){e=e||{},O((function(){D("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){O((function(){D("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){O((function(){D("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){O((function(){D("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){O((function(){D("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){O((function(){D("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(t){O((function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),a),A=1,M={};return c.addEventListener("error",(function(e){if(!m){var t=e.target,a=t.tagName,n=t.src;if(("IMG"==a||"VIDEO"==a||"AUDIO"==a||"SOURCE"==a)&&-1!=n.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var i=t["wx-id"];if(i||(i=A++,t["wx-id"]=i),M[i])return;M[i]=!0,wx.ready((function(){wx.getLocalImgData({localId:n,success:function(e){t.src=e.localData}})}))}}}),!0),c.addEventListener("load",(function(e){if(!m){var t=e.target,a=t.tagName;if(t.src,"IMG"==a||"VIDEO"==a||"AUDIO"==a||"SOURCE"==a){var n=t["wx-id"];n&&(M[n]=!1)}}}),!0),t&&(e.wx=e.jWeixin=k),k}function D(t,a,n){e.WeixinJSBridge?WeixinJSBridge.invoke(t,E(a),(function(e){P(t,e,n)})):U(t,n)}function T(t,a,n){e.WeixinJSBridge?WeixinJSBridge.on(t,(function(e){n&&n.trigger&&n.trigger(e),P(t,e,a)})):U(t,n||a)}function E(e){return(e=e||{}).appId=w.appId,e.verifyAppId=w.appId,e.verifySignType="sha1",e.verifyTimestamp=w.timestamp+"",e.verifyNonceStr=w.nonceStr,e.verifySignature=w.signature,e}function C(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function P(e,t,a){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var n=t.errMsg;n||(n=t.err_msg,delete t.err_msg,n=function(e,t){var a=e,n=s[a];n&&(a=n);var i="ok";if(t){var r=t.indexOf(":");"confirm"==(i=t.substring(r+1))&&(i="ok"),"failed"==i&&(i="fail"),-1!=i.indexOf("failed_")&&(i=i.substring(7)),-1!=i.indexOf("fail_")&&(i=i.substring(5)),"access denied"!=(i=(i=i.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=i||(i="permission denied"),"config"==a&&"function not exist"==i&&(i="ok"),""==i&&(i="fail")}return a+":"+i}(e,n),t.errMsg=n),(a=a||{})._complete&&(a._complete(t),delete a._complete),n=t.errMsg||"",w.debug&&!a.isInnerInvoke&&alert(JSON.stringify(t));var i=n.indexOf(":");switch(n.substring(i+1)){case"ok":a.success&&a.success(t);break;case"cancel":a.cancel&&a.cancel(t);break;default:a.fail&&a.fail(t)}a.complete&&a.complete(t)}function N(e){if(e){for(var t=0,a=e.length;t<a;++t){var n=e[t],i=o[n];i&&(e[t]=i)}return e}}function U(e,t){if(!(!w.debug||t&&t.isInnerInvoke)){var a=s[e];a&&(e=a),t&&t._complete&&delete t._complete,n("log",'"'+e+'",',t||""," at static/jweixin.js:1")}}function V(){return(new Date).getTime()}function O(t){g&&(e.WeixinJSBridge?t():c.addEventListener&&c.addEventListener("WeixinJSBridgeReady",t,!1))}}))}).call(this,a("0de9")["log"])},e979:function(e,t,a){"use strict";(function(e){var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("201f")),r=(a("ad33"),{data:function(){return{userID:"",userName:"",avatarUrl:""}},onReady:function(){var e=this;e.userID=getApp().globalData.userID,e.userName=getApp().globalData.userName,e.avatarUrl=getApp().globalData.avaterUrl},onShow:function(){var e=this;e.userID=getApp().globalData.userID,e.userName=getApp().globalData.userName,e.avatarUrl=getApp().globalData.avaterUrl},methods:{setid:function(){var e=this;""!=e.userID&&""!=e.userName&&(getApp().globalData.userID=e.userID,getApp().globalData.userName=e.userName,getApp().globalData.avaterUrl="/static/images/Avatar-1.png",e.userID=getApp().globalData.userID)},connect:function(){"disconnected"===this.goEasy.getConnectionStatus()&&(getApp().globalData.imService=new i.default(this.goEasy,this.GoEasy),getApp().globalData.imService.connect({uuid:getApp().globalData.userID,avatar:getApp().globalData.avaterUrl,name:getApp().globalData.userName}),uni.setStorageSync("currentUser",{uuid:getApp().globalData.userID,avatar:getApp().globalData.avaterUrl,name:getApp().globalData.userName}))},toprofile:function(){uni.navigateTo({url:"/pages/me/editprofile/editprofile"})},login:function(){var e=this;getApp().globalData.userID="08c0a6ec-a42b",getApp().globalData.userName="Mattie",getApp().globalData.avaterUrl="/static/images/Avatar-1.png",e.userID=getApp().globalData.userID},login2:function(){var e=this;getApp().globalData.userID="3bb179af-bcc5",getApp().globalData.userName="Wallace",getApp().globalData.avaterUrl="/static/images/Avatar-2.png",e.userID=getApp().globalData.userID},loginmain:function(){var t=this;uni.request({method:"GET",url:"https://wechat.api.kohaku.xin:11731/login",data:{openID:getApp().globalData.userID,username:getApp().globalData.userName,avater:getApp().globalData.avaterUrl},success:function(a){uni.request({method:"GET",url:"https://wechat.api.kohaku.xin:11731/getprofile",data:{openid:getApp().globalData.userID},success:function(a){e("log",a," at pages/me/me.vue:140"),getApp().globalData.userName=a.data.name,getApp().globalData.avaterUrl=a.data.avatar,getApp().globalData.sex=a.data.sex,getApp().globalData.pre=a.data.pre,t.userName=getApp().globalData.userName,t.avatarUrl=getApp().globalData.avaterUrl,"disconnected"===t.goEasy.getConnectionStatus()&&(getApp().globalData.imService=new i.default(t.goEasy,t.GoEasy),getApp().globalData.imService.connect({uuid:getApp().globalData.userID,avatar:getApp().globalData.avaterUrl,name:getApp().globalData.userName}),uni.setStorageSync("currentUser",{uuid:getApp().globalData.userID,avatar:getApp().globalData.avaterUrl,name:getApp().globalData.userName})),""===getApp().globalData.pre&&uni.showModal({content:"看来您是首次登录匿名聊天\n先来设置个人资料吧",showCancel:!1,confirmText:"好耶！",success:function(e){e.confirm&&uni.navigateTo({url:"/pages/me/editprofile/editprofile"})}})}})}})}}});t.default=r}).call(this,a("0de9")["log"])}}]);