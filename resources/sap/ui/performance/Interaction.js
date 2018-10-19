/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Measurement","./ResourceTimings","./XHRInterceptor","sap/base/util/now","sap/base/Log","sap/ui/thirdparty/URI"],function(M,R,X,n,L,U){"use strict";var H=window.location.host,I="INTERACTION",a=[],p=c();function b(u){var i=new U(u).host();return i&&i!==H;}function c(t){return{event:"startup",trigger:"undetermined",component:"undetermined",appVersion:"undetermined",start:t||window.performance.timing.fetchStart,end:0,navigation:0,roundtrip:0,processing:0,duration:0,requests:[],measurements:[],sapStatistics:[],requestTime:0,networkTime:0,bytesSent:0,bytesReceived:0,requestCompression:undefined,busyDuration:0};}function d(i){if(i.start>p.start&&i.end<p.end){return i;}}function e(i){var l,E,t;l=i.startTime>0&&i.startTime<=i.requestStart&&i.requestStart<=i.responseEnd;if(i.encodedBodySize!==undefined&&i.transferSize!==undefined){E=i.encodedBodySize===0;t=i.transferSize<i.encodedBodySize;}return l&&!E&&!t;}function f(i){this.end=i.responseEnd>this.end?i.responseEnd:this.end;p.requestTime+=(i.responseEnd-i.startTime);if(this.roundtripHigherLimit<=i.startTime){p.navigation+=(this.navigationHigherLimit-this.navigationLowerLimit);p.roundtrip+=(this.roundtripHigherLimit-this.roundtripLowerLimit);this.navigationLowerLimit=i.startTime;this.roundtripLowerLimit=i.startTime;}if(i.responseEnd>this.roundtripHigherLimit){this.roundtripHigherLimit=i.responseEnd;}if(i.requestStart>this.navigationHigherLimit){this.navigationHigherLimit=i.requestStart;}}function g(i){var t={start:i[0].startTime,end:i[0].responseEnd,navigationLowerLimit:i[0].startTime,navigationHigherLimit:i[0].requestStart,roundtripLowerLimit:i[0].startTime,roundtripHigherLimit:i[0].responseEnd};i.forEach(f,t);p.navigation+=(t.navigationHigherLimit-t.navigationLowerLimit);p.roundtrip+=(t.roundtripHigherLimit-t.roundtripLowerLimit);if(p.networkTime){var T=p.requestTime-p.networkTime;p.networkTime=T/i.length;}else{p.networkTime=0;}if(p.processing===0){var l=p.start-window.performance.timing.fetchStart;p.duration=t.end-l;p.processing=t.start-l;}}function h(t){if(p){p.end=t;p.duration=p.processing;p.requests=R.getRequestTimings();p.completeRoundtrips=0;p.measurements=M.filterMeasurements(d,true);var i=p.requests.filter(e);if(i.length>0){g(i);}p.completeRoundtrips=i.length;var P=p.processing-p.navigation-p.roundtrip;p.processing=P>-1?P:0;a.push(p);L.info("Interaction step finished: trigger: "+p.trigger+"; duration: "+p.duration+"; requests: "+p.requests.length,"Interaction.js");p=null;}}function j(S){var i,v;if(S){var l,t;l=sap.ui.require("sap/ui/core/Component");while(l&&S&&S.getParent){t=l.getOwnerComponentFor(S);if(t||S instanceof l){t=t||S;var A=t.getManifestEntry("sap.app");i=A&&A.id||t.getMetadata().getName();v=A&&A.applicationVersion&&A.applicationVersion.version;}S=S.getParent();}}return{id:i?i:"undetermined",version:v?v:""};}var k=false,C,m,s=0;function r(){X.register(I,"send",function(){if(this.pendingInteraction){this.pendingInteraction.bytesSent+=arguments[0]?arguments[0].length*2:0;}});X.register(I,"setRequestHeader",function(i,v){if(!this.requestHeaderLength){this.requestHeaderLength=0;}this.requestHeaderLength+=((i+"").length+(v+"").length+3)*2;});X.register(I,"open",function(){if(!b(arguments[1])){this.addEventListener("readystatechange",o);}this.pendingInteraction=p;});}function o(){if(this.readyState===4&&this.pendingInteraction&&!this.pendingInteraction.completed){var i=this.getResponseHeader("content-length"),l=this.getResponseHeader("content-encoding")==="gzip",F=this.getResponseHeader("sap-perf-fesrec");this.pendingInteraction.bytesReceived+=i?parseInt(i,10):0;this.pendingInteraction.bytesReceived+=this.getAllResponseHeaders().length*2;this.pendingInteraction.bytesSent+=this.requestHeaderLength||0;this.pendingInteraction.requestCompression=l&&(this.pendingInteraction.requestCompression!==false);this.pendingInteraction.networkTime+=F?Math.round(parseFloat(F,10)/1000):0;var S=this.getResponseHeader("sap-statistics");if(S){var t=R.getRequestTimings();this.pendingInteraction.sapStatistics.push({url:this.responseURL,statistics:S,timing:t?t[t.length-1]:undefined});}delete this.requestHeaderLength;delete this.pendingInteraction;}}var q={getAll:function(F){if(F){q.end(true);}return a;},filter:function(F){var t=[];if(F){for(var i=0,l=a.length;i<l;i++){if(F(a[i])){t.push(a[i]);}}}return t;},getPending:function(){return p;},clear:function(){a=[];},start:function(t,S){var T=n();if(p){h(T);}R.clearRequestTimings();var i=j(S);p=c(T);p.event=t;p.component=i.id;p.appVersion=i.version;p.start=T;if(S&&S.getId){p.trigger=S.getId();}L.info("Interaction step started: trigger: "+p.trigger+"; type: "+p.event,"Interaction.js");},end:function(F){if(p){if(!F){p.processing=n()-p.start;}else{h(n());}}},getActive:function(){return k;},setActive:function(A){if(A&&!k){r();}k=A;},notifyStepStart:function(E,F){if(k){if(C||F){var t;if(F){t="startup";}else if(C.originalEvent){t=C.originalEvent.type;}else{t=C.type;}q.start(t,E);var i=q.getAll();var l=i[i.length-1];var P=q.getPending();p=P?P:p;if(q.onInteractionFinished&&l){q.onInteractionFinished(l);}C=null;}}},notifyStepEnd:function(){if(k){if(m){clearTimeout(m);}m=setTimeout(q.end,1);}},notifyEventStart:function(E){C=k?E:null;},notifyScrollEvent:function(E){if(k){if(!s){q.notifyEventStart(E);}else{clearTimeout(s);}s=setTimeout(function(){q.notifyStepStart();s=0;},250);}},notifyEventEnd:function(){if(C){if(C.type.match(/^(mousedown|touchstart|keydown)$/)){q.end(true);}}},onInteractionFinished:null,setStepComponent:function(i){if(k&&p&&i&&!p.stepComponent){p.stepComponent=i;}},addBusyDuration:function(D){if(k&&p){if(!p.busyDuration){p.busyDuration=0;}p.busyDuration+=D;}}};return q;});
