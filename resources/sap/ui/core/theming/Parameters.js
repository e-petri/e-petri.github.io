/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/thirdparty/URI','../Element','jquery.sap.sjax','jquery.sap.script'],function(q,U,E){"use strict";var c=window["sap-ui-config"]||{};var s=0;if(c['xx-nosync']==='warn'||/(?:\?|&)sap-ui-xx-nosync=(?:warn)/.exec(window.location.search)){s=1;}if(c['xx-nosync']===true||c['xx-nosync']==='true'||/(?:\?|&)sap-ui-xx-nosync=(?:x|X|true)/.exec(window.location.search)){s=2;}var P={};var p=null;var t=null;var a=[];var r=/url[\s]*\('?"?([^\'")]*)'?"?\)/;var u=q.sap.getUriParameters().get("sap-ui-xx-no-inline-theming-parameters")!=="true";function b(){p=null;}function d(i,T){var M=r.exec(i);if(M){var j=new U(M[1]);if(j.is("relative")){var N=j.absoluteTo(T).normalize().path();i="url('"+N+"')";}}return i;}function m(C,N,T){for(var i in N){if(typeof C[i]==="undefined"){C[i]=d(N[i],T);}}return C;}function e(N,T){if(typeof N["default"]!=="object"){N={"default":N,"scopes":{}};}p=p||{};p["default"]=p["default"]||{};p["scopes"]=p["scopes"]||{};m(p["default"],N["default"],T);if(typeof N["scopes"]==="object"){for(var S in N["scopes"]){p["scopes"][S]=p["scopes"][S]||{};m(p["scopes"][S],N["scopes"][S],T);}}}function f(C){q("link[id^=sap-ui-theme-]").each(function(){C(this.getAttribute("id"));});}function l(i){var L=document.getElementById(i);if(!L){q.sap.log.warning("Could not find stylesheet element with ID",i,"sap.ui.core.theming.Parameters");return;}var S=L.href;var T=new U(S).filename("").query("").toString();var k=sap.ui.getCore().isThemeApplied();if(!k){q.sap.log.warning("Parameters have been requested but theme is not applied, yet.","sap.ui.core.theming.Parameters");}if(k&&u){var $=q(L);var D=$.css("background-image");var v=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(D);if(v&&v.length>=2){var w=v[1];if(w.charAt(0)!=="{"&&w.charAt(w.length-1)!=="}"){try{w=decodeURIComponent(w);}catch(x){q.sap.log.warning("Could not decode theme parameters URI from "+S);}}try{var y=q.parseJSON(w);e(y,T);return;}catch(x){q.sap.log.warning("Could not parse theme parameters from "+S+". Loading library-parameters.json as fallback solution.");}}}var R,z;var A=S.replace(/\/library([^\/.]*)\.(?:css|less)($|[?#])/,function(B,C,F){return"/library-parameters.json"+(F?F:"");});if(s===2){q.sap.log.error("[nosync] Loading library-parameters.json ignored",A,"sap.ui.core.theming.Parameters");return;}else if(s===1){q.sap.log.error("[nosync] Loading library-parameters.json with sync XHR",A,"sap.ui.core.theming.Parameters");}R=q.sap.sjax({url:A,dataType:'json'});if(R.success){z=R.data;if(Array.isArray(z)){for(var j=0;j<z.length;j++){var y=z[j];e(y,T);}}else{e(z,T);}}else{q.sap.log.error("Could not load theme parameters from: "+A,R.error);}}function g(){if(!p){e({},"");t=sap.ui.getCore().getConfiguration().getTheme();f(l);}return p;}function h(){a.forEach(l);a=[];}P._addLibraryTheme=function(L){if(p){a.push("sap-ui-theme-"+L);}};function n(O){var i=g();if(O.scopeName){i=i["scopes"][O.scopeName];}else{i=i["default"];}var j=i[O.parameterName];if(typeof j==="undefined"&&typeof O.parameterName==="string"){var I=O.parameterName.indexOf(":");if(I!==-1){O.parameterName=O.parameterName.substr(I+1);}j=i[O.parameterName];}if(O.loadPendingParameters&&typeof j==="undefined"){h();j=n({parameterName:O.parameterName,scopeName:O.scopeName,loadPendingParameters:false});}return j;}function o(j,S){for(var i=0;i<S.length;i++){var C=S[i];for(var k=0;k<C.length;k++){var v=C[k];var w=n({parameterName:j,scopeName:v});if(w){return w;}}}return n({parameterName:j});}P._getScopes=function(A){if(A&&!p){return;}var i=g();var S=Object.keys(i["scopes"]);return S;};P.getActiveScopesFor=function(i){var S=[];if(i instanceof E){var j=i.getDomRef();h();var k=this._getScopes();if(j){var N=function(v){var w=j.classList;return w&&w.contains(v);};while(j){var F=k.filter(N);if(F.length>0){S.push(F);}j=j.parentNode;}}else{var C=function(v){return typeof i.hasStyleClass==="function"&&i.hasStyleClass(v);};while(i){var F=k.filter(C);if(F.length>0){S.push(F);}i=typeof i.getParent==="function"&&i.getParent();}}}return S;};P.get=function(N,k){var v;if(!sap.ui.getCore().isInitialized()){q.sap.log.warning("Called sap.ui.core.theming.Parameters.get() before core has been initialized. "+"This could lead to bad performance and sync XHR as inline parameters might not be available, yet. "+"Consider using the API only when required, e.g. onBeforeRendering.");}if(arguments.length===0){h();var w=g();return q.extend({},w["default"]);}if(!N){return undefined;}if(k instanceof E){h();var S=this.getActiveScopesFor(k);if(typeof N==="string"){return o(N,S);}else if(Array.isArray(N)){var x={};for(var j=0;j<N.length;j++){var y=N[j];x[y]=o(y,S);}return x;}}else{if(typeof N==="string"){v=n({parameterName:N,loadPendingParameters:true});return v;}else if(Array.isArray(N)){var x={};for(var i=0;i<N.length;i++){var y=N[i];x[y]=P.get(y);}return x;}}};P._setOrLoadParameters=function(L){p={"default":{},"scopes":{}};t=sap.ui.getCore().getConfiguration().getTheme();f(function(i){var j=i.substr(13);if(L[j]){q.extend(p["default"],L[j]);}else{l(i);}});};P.reset=function(){var O=arguments[0]===true;if(!O||sap.ui.getCore().getConfiguration().getTheme()!==t){b();}};P._getThemeImage=function(i,F){i=i||"sapUiGlobalLogo";var j=P.get(i);if(j){var k=r.exec(j);if(k){j=k[1];}else if(j==="''"||j==="none"){j=null;}}if(!!F&&!j){return sap.ui.resource('sap.ui.core','themes/base/img/1x1.gif');}return j;};return P;},true);
