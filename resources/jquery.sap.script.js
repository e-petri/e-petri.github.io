/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/base/util/uid','sap/base/util/hashCode','sap/base/util/unique','sap/base/util/equal','sap/base/util/each','sap/base/util/arraySymbolDiff','sap/base/util/JSTokenizer','sap/base/util/extend','sap/base/util/UriParameters','sap/base/util/arrayDiff'],function(q,u,h,a,e,b,c,J,d,U,f){"use strict";q.sap.uid=u;q.sap.hashCode=h;q.sap.unique=a;q.sap.equal=e;q.sap.each=b;q.sap.arraySymbolDiff=c;q.sap._createJSTokenizer=J;q.sap.parseJS=J().parseJS;q.sap.extend=d;q.sap.getUriParameters=function getUriParameters(s){s=s?s:window.location.href;return new U(s);};q.sap.delayedCall=function delayedCall(D,o,m,p){return setTimeout(function(){if(q.type(m)=="string"){m=o[m];}m.apply(o,p||[]);},D);};q.sap.clearDelayedCall=function clearDelayedCall(D){clearTimeout(D);return this;};q.sap.intervalCall=function intervalCall(i,o,m,p){return setInterval(function(){if(q.type(m)=="string"){m=o[m];}m.apply(o,p||[]);},i);};q.sap.clearIntervalCall=function clearIntervalCall(i){clearInterval(i);return this;};q.sap.forIn=b;q.sap.arrayDiff=f;return q;});
