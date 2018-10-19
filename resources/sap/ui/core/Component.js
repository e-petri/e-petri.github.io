/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Manifest','./ComponentMetadata','./Core','sap/base/util/extend','sap/ui/base/ManagedObject','sap/ui/thirdparty/URI','jquery.sap.trace'],function(q,M,C,a,b,c,U){"use strict";var V={JSON:"JSON",XML:"XML",HTML:"HTML",JS:"JS",Template:"Template"};function d(u){['sap-client','sap-server'].forEach(function(N){if(!u.hasSearch(N)){var v=sap.ui.getCore().getConfiguration().getSAPParam(N);if(v){u.addSearch(N,v);}}});}function f(D,m,s,S){if(s){for(var N in D){if(!m[N]&&s[N]&&s[N].uri){m[N]=S;}}}}function g(m,e,K,i){var D=e.getEntry(K);if(D!==undefined&&!q.isPlainObject(D)){return D;}var P,s;if(i&&(P=m.getParent())instanceof C){s=P.getManifestEntry(K,i);}if(s||D){D=q.extend(true,{},s,D);}return D;}function h(e,i){var s=Object.create(Object.getPrototypeOf(e));s._oMetadata=e;s._oManifest=i;for(var m in e){if(!/^(getManifest|getManifestObject|getManifestEntry|getMetadataVersion)$/.test(m)&&typeof e[m]==="function"){s[m]=e[m].bind(e);}}s.getManifest=function(){return i&&i.getJson();};s.getManifestObject=function(){return i;};s.getManifestEntry=function(K,t){return g(e,i,K,t);};s.getMetadataVersion=function(){return 2;};return s;}function r(e,O,t){var i=c._sOwnerId;try{c._sOwnerId=O;return e.call(t);}finally{c._sOwnerId=i;}}var j=c.extend("sap.ui.core.Component",{constructor:function(i,s){var e=Array.prototype.slice.call(arguments);if(typeof i!=="string"){s=i;i=undefined;}if(s&&typeof s._metadataProxy==="object"){this._oMetadataProxy=s._metadataProxy;this._oManifest=s._metadataProxy._oManifest;delete s._metadataProxy;this.getMetadata=function(){return this._oMetadataProxy;};}if(s&&typeof s._cacheTokens==="object"){this._mCacheTokens=s._cacheTokens;delete s._cacheTokens;}if(s&&typeof s._manifestModels==="object"){this._mManifestModels=s._manifestModels;delete s._manifestModels;}else{this._mManifestModels={};}this._mServices={};c.apply(this,e);},metadata:{stereotype:"component","abstract":true,specialSettings:{componentData:'any'},version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},C);j.prototype.getManifest=function(){if(!this._oManifest){return this.getMetadata().getManifest();}else{return this._oManifest.getJson();}};j.prototype.getManifestEntry=function(K){return this._getManifestEntry(K);};j.prototype._getManifestEntry=function(K,m){if(!this._oManifest){return this.getMetadata().getManifestEntry(K,m);}else{return g(this.getMetadata(),this._oManifest,K,m);}};j.prototype.getManifestObject=function(){if(!this._oManifest){return this.getMetadata().getManifestObject();}else{return this._oManifest;}};j.prototype._isVariant=function(){if(this._oManifest){var m=this._oMetadataProxy._oMetadata.getManifestEntry("/sap.app/id");return m!==this.getManifestEntry("/sap.app/id");}else{return false;}};j.activateCustomizing=function(s){};j.deactivateCustomizing=function(s){};j.getOwnerIdFor=function(O){var s=(O instanceof c)&&O._sOwnerId;return s||undefined;};j.getOwnerComponentFor=function(O){return j.get(j.getOwnerIdFor(O));};j.prototype.runAsOwner=function(e){return r(e,this.getId());};j.prototype.getInterface=function(){return this;};j.prototype._initCompositeSupport=function(s){this.oComponentData=s&&s.componentData;if(!this._isVariant()){this.getMetadata().init();}else{this._oManifest.init(this);}this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=q.proxy(function(e){var E=e.originalEvent;this.onWindowError(E.message,E.filename,E.lineno);},this);q(window).bind("error",this._fnWindowErrorHandler);}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=q.proxy(this.onWindowBeforeUnload,this);q(window).bind("beforeunload",this._fnWindowBeforeUnloadHandler);}if(this.onWindowUnload){this._fnWindowUnloadHandler=q.proxy(this.onWindowUnload,this);q(window).bind("unload",this._fnWindowUnloadHandler);}};j.prototype.destroy=function(){for(var L in this._mServices){if(this._mServices[L].instance){this._mServices[L].instance.destroy();}}delete this._mServices;for(var m in this._mManifestModels){this._mManifestModels[m].destroy();}delete this._mManifestModels;if(this._fnWindowErrorHandler){q(window).unbind("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler;}if(this._fnWindowBeforeUnloadHandler){q(window).unbind("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler;}if(this._fnWindowUnloadHandler){q(window).unbind("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler;}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus;}c.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);if(!this._isVariant()){this.getMetadata().exit();}else{this._oManifest.exit(this);delete this._oManifest;}};j.prototype.getComponentData=function(){return this.oComponentData;};j.prototype.getEventBus=function(){if(!this._oEventBus){var E=sap.ui.requireSync("sap/ui/core/EventBus");this._oEventBus=new E();}return this._oEventBus;};j.prototype.initComponentModels=function(){var m=this.getMetadata();if(m.isBaseClass()){return;}var e=this._getManifestEntry("/sap.app/dataSources",true)||{};var i=this._getManifestEntry("/sap.ui5/models",true)||{};this._initComponentModels(i,e,this._mCacheTokens);};j.prototype._initComponentModels=function(m,D,e){var A=j._createManifestModelConfigurations({models:m,dataSources:D,component:this,mergeParent:true,cacheTokens:e});if(!A){return;}var i={};for(var s in A){if(!this._mManifestModels[s]){i[s]=A[s];}}var t=j._createManifestModels(i,this.toString());for(var s in t){this._mManifestModels[s]=t[s];}for(var s in this._mManifestModels){var u=this._mManifestModels[s];this.setModel(u,s||undefined);}};j.prototype.getService=function(L){if(!this._mServices[L]){this._mServices[L]={};this._mServices[L].promise=new Promise(function(R,e){sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"],function(S){var s=this.getManifestEntry("/sap.ui5/services/"+L);var i=s&&s.factoryName;if(!i){e(new Error("Service "+L+" not declared!"));return;}var m=S.get(i);if(m){m.createInstance({scopeObject:this,scopeType:"component",settings:s.settings||{}}).then(function(t){if(!this.bIsDestroyed){this._mServices[L].instance=t;this._mServices[L].interface=t.getInterface();R(this._mServices[L].interface);}else{e(new Error("Service "+L+" could not be loaded as its Component was destroyed."));}}.bind(this)).catch(e);}else{var E="The ServiceFactory "+i+" for Service "+L+" not found in ServiceFactoryRegistry!";var O=this.getManifestEntry("/sap.ui5/services/"+L+"/optional");if(!O){q.sap.log.error(E);}e(new Error(E));}}.bind(this));}.bind(this));}return this._mServices[L].promise;};function k(e){var s=e.getManifestEntry("/sap.ui5/services");for(var S in s){if(s[S].lazy===false){e.getService(S);}}}j.prototype.createComponent=function(u){var m={async:true};if(u&&typeof u==="object"){m.usage=u.usage;["id","async","settings","componentData"].forEach(function(N){if(u[N]!==undefined){m[N]=u[N];}});}else if(typeof u==="string"){m.usage=u;}return this._createComponent(m);};j.prototype._createComponent=function(m){if(m&&m.usage){var u=m.usage;var e=this.getManifestEntry("/sap.ui5/componentUsages/"+u);if(!e){throw new Error("Component usage \""+u+"\" not declared in Component \""+this.getManifestObject().getComponentName()+"\"!");}m=q.extend(true,e,m);}return this.runAsOwner(function(){if(m.async===true){return j.create(m);}else{return sap.ui.component(m);}});};j._createManifestModelConfigurations=function(O){var e=O.component;var m=O.manifest||e.getManifestObject();var s=O.mergeParent;var t=O.cacheTokens||{};var L=e?e.toString():m.getComponentName();var u=sap.ui.getCore().getConfiguration();if(!O.models){return null;}var v={models:O.models,dataSources:O.dataSources||{},origin:{dataSources:{},models:{}}};if(e&&s){var w=e.getMetadata();while(w instanceof C){var x=w.getManifestObject();var y=w.getManifestEntry("/sap.app/dataSources");f(v.dataSources,v.origin.dataSources,y,x);var z=w.getManifestEntry("/sap.ui5/models");f(v.models,v.origin.models,z,x);w=w.getParent();}}var A={};for(var B in v.models){var D=v.models[B];var I=false;var E=null;if(typeof D==='string'){D={dataSource:D};}if(D.dataSource){var F=v.dataSources&&v.dataSources[D.dataSource];if(typeof F==='object'){if(F.type===undefined){F.type='OData';}if(!D.type){switch(F.type){case'OData':if(F.settings&&F.settings.odataVersion==="4.0"){D.type='sap.ui.model.odata.v4.ODataModel';}else{D.type='sap.ui.model.odata.v2.ODataModel';}break;case'JSON':D.type='sap.ui.model.json.JSONModel';break;case'XML':D.type='sap.ui.model.xml.XMLModel';break;default:}}if(D.type==='sap.ui.model.odata.v4.ODataModel'&&F.settings&&F.settings.odataVersion){D.settings=D.settings||{};D.settings.odataVersion=F.settings.odataVersion;}if(!D.uri){D.uri=F.uri;I=true;}if(F.type==='OData'&&F.settings&&typeof F.settings.maxAge==="number"){D.settings=D.settings||{};D.settings.headers=D.settings.headers||{};D.settings.headers["Cache-Control"]="max-age="+F.settings.maxAge;}if(F.type==='OData'&&F.settings&&F.settings.annotations){var G=F.settings.annotations;for(var i=0;i<G.length;i++){var H=v.dataSources[G[i]];if(!H){q.sap.log.error("Component Manifest: ODataAnnotation \""+G[i]+"\" for dataSource \""+D.dataSource+"\" could not be found in manifest","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);continue;}if(H.type!=='ODataAnnotation'){q.sap.log.error("Component Manifest: dataSource \""+G[i]+"\" was expected to have type \"ODataAnnotation\" but was \""+H.type+"\"","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);continue;}if(!H.uri){q.sap.log.error("Component Manifest: Missing \"uri\" for ODataAnnotation \""+G[i]+"\"","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);continue;}var J=new U(H.uri);if(D.type==='sap.ui.model.odata.v2.ODataModel'){["sap-language","sap-client"].forEach(function(a1){if(!J.hasQuery(a1)&&u.getSAPParam(a1)){J.setQuery(a1,u.getSAPParam(a1));}});var K=t.dataSources&&t.dataSources[H.uri];if(K){var N=function(){if(!J.hasQuery("sap-language")){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for ODataAnnotation \""+G[i]+"\" ("+J.toString()+"). "+"Missing \"sap-language\" URI parameter","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);return;}if(!J.hasQuery("sap-client")){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for ODataAnnotation \""+G[i]+"\" ("+J.toString()+"). "+"Missing \"sap-client\" URI parameter","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);return;}if(!J.hasQuery("sap-client",u.getSAPParam("sap-client"))){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for ODataAnnotation \""+G[i]+"\" ("+J.toString()+"). "+"URI parameter \"sap-client="+J.query(true)["sap-client"]+"\" must be identical with configuration \"sap-client="+u.getSAPParam("sap-client")+"\"","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);return;}if(J.hasQuery("sap-context-token")&&!J.hasQuery("sap-context-token",K)){var a1=J.query(true)["sap-context-token"];q.sap.log.warning("Component Manifest: Overriding existing \"sap-context-token="+a1+"\" with provided value \""+K+"\" for ODataAnnotation \""+G[i]+"\" ("+J.toString()+").","[\"sap.app\"][\"dataSources\"][\""+G[i]+"\"]",L);}J.setQuery("sap-context-token",K);};N();}}var P=v.origin.dataSources[G[i]]||m;var Q=P.resolveUri(J).toString();D.settings=D.settings||{};D.settings.annotationURI=D.settings.annotationURI||[];D.settings.annotationURI.push(Q);}}}else{q.sap.log.error("Component Manifest: dataSource \""+D.dataSource+"\" for model \""+B+"\" not found or invalid","[\"sap.app\"][\"dataSources\"][\""+D.dataSource+"\"]",L);}}if(!D.type){q.sap.log.error("Component Manifest: Missing \"type\" for model \""+B+"\"","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);continue;}if(D.type==='sap.ui.model.odata.ODataModel'&&(!D.settings||D.settings.json===undefined)){D.settings=D.settings||{};D.settings.json=true;}if(D.uri){var R=new U(D.uri);var S=(I?v.origin.dataSources[D.dataSource]:v.origin.models[B])||m;R=S.resolveUri(R);if(D.dataSource){d(R);if(D.type==='sap.ui.model.odata.v2.ODataModel'){E=D.settings&&D.settings.metadataUrlParams;if((!E||typeof E['sap-language']==='undefined')&&!R.hasQuery('sap-language')&&u.getSAPParam('sap-language')){D.settings=D.settings||{};E=D.settings.metadataUrlParams=D.settings.metadataUrlParams||{};E['sap-language']=u.getSAPParam('sap-language');}if(t.dataSources){var K=t.dataSources[F.uri];if(K){var T=function(){if(R.hasQuery("sap-context-token")){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for model \""+B+"\" ("+R.toString()+"). "+"Model URI already contains parameter \"sap-context-token="+R.query(true)["sap-context-token"]+"\"","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);return;}if((!E||typeof E["sap-language"]==="undefined")&&!R.hasQuery("sap-language")){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for model \""+B+"\" ("+R.toString()+"). "+"Missing \"sap-language\" parameter","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);return;}if(!R.hasQuery("sap-client")){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for model \""+B+"\" ("+R.toString()+"). "+"Missing \"sap-client\" parameter","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);return;}if(!R.hasQuery("sap-client",u.getSAPParam("sap-client"))){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for model \""+B+"\" ("+R.toString()+"). "+"URI parameter \"sap-client="+R.query(true)["sap-client"]+"\" must be identical with configuration \"sap-client="+u.getSAPParam("sap-client")+"\"","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);return;}if(E&&typeof E["sap-client"]!=="undefined"){if(E["sap-client"]!==u.getSAPParam("sap-client")){q.sap.log.warning("Component Manifest: Ignoring provided \"sap-context-token="+K+"\" for model \""+B+"\" ("+R.toString()+"). "+"Parameter metadataUrlParams[\"sap-client\"] = \""+E["sap-client"]+"\" must be identical with configuration \"sap-client="+u.getSAPParam("sap-client")+"\"","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);return;}}if(E&&E["sap-context-token"]&&E["sap-context-token"]!==K){q.sap.log.warning("Component Manifest: Overriding existing \"sap-context-token="+E["sap-context-token"]+"\" with provided value \""+K+"\" for model \""+B+"\" ("+R.toString()+").","[\"sap.ui5\"][\"models\"][\""+B+"\"]",L);}if(!E){D.settings=D.settings||{};E=D.settings.metadataUrlParams=D.settings.metadataUrlParams||{};}E["sap-context-token"]=K;};T();}}}}D.uri=R.toString();}if(D.uriSettingName===undefined){switch(D.type){case'sap.ui.model.odata.ODataModel':case'sap.ui.model.odata.v2.ODataModel':case'sap.ui.model.odata.v4.ODataModel':D.uriSettingName='serviceUrl';break;case'sap.ui.model.resource.ResourceModel':D.uriSettingName='bundleUrl';break;default:}}var W;var X;if(e){X=e.getComponentData();}else{X=O.componentData;}W=X&&X.startupParameters&&X.startupParameters["sap-system"];if(!W){W=u.getSAPParam("sap-system");}var Y=false;var Z;if(W&&["sap.ui.model.odata.ODataModel","sap.ui.model.odata.v2.ODataModel"].indexOf(D.type)!=-1){Y=true;Z=sap.ui.requireSync("sap/ui/model/odata/ODataUtils");}if(D.uri){if(Y){D.preOriginBaseUri=D.uri.split("?")[0];D.uri=Z.setOrigin(D.uri,{alias:W});D.postOriginBaseUri=D.uri.split("?")[0];}if(D.uriSettingName!==undefined){D.settings=D.settings||{};if(!D.settings[D.uriSettingName]){D.settings[D.uriSettingName]=D.uri;}}else if(D.settings){D.settings=[D.uri,D.settings];}else{D.settings=[D.uri];}}else{if(Y&&D.uriSettingName!==undefined&&D.settings&&D.settings[D.uriSettingName]){D.preOriginBaseUri=D.settings[D.uriSettingName].split("?")[0];D.settings[D.uriSettingName]=Z.setOrigin(D.settings[D.uriSettingName],{alias:W});D.postOriginUri=D.settings[D.uriSettingName].split("?")[0];}}if(Y&&D.settings&&D.settings.annotationURI){var $=[].concat(D.settings.annotationURI);var _=[];for(var i=0;i<$.length;i++){_.push(Z.setAnnotationOrigin($[i],{alias:W,preOriginBaseUri:D.preOriginBaseUri,postOriginBaseUri:D.postOriginBaseUri}));}D.settings.annotationURI=_;}if(D.type==='sap.ui.model.resource.ResourceModel'&&D.settings&&Array.isArray(D.settings.enhanceWith)){D.settings.enhanceWith.forEach(function(a1){if(a1.bundleUrl){a1.bundleUrl=m.resolveUri(new U(a1.bundleUrl),a1.bundleUrlRelativeTo).toString();}});}if(D.settings&&!Array.isArray(D.settings)){D.settings=[D.settings];}A[B]=D;}return A;};j._createManifestModels=function(m,L){var e={};for(var s in m){var i=m[s];try{q.sap.require(i.type);}catch(E){q.sap.log.error("Component Manifest: Class \""+i.type+"\" for model \""+s+"\" could not be loaded. "+E,"[\"sap.ui5\"][\"models\"][\""+s+"\"]",L);continue;}var t=q.sap.getObject(i.type);if(!t){q.sap.log.error("Component Manifest: Class \""+i.type+"\" for model \""+s+"\" could not be found","[\"sap.ui5\"][\"models\"][\""+s+"\"]",L);continue;}var A=[null].concat(i.settings||[]);var F=t.bind.apply(t,A);var u=new F();e[s]=u;}return e;};function l(m,e,i){var s={afterManifest:{},afterPreload:{}};var t=q.extend(true,{},m.getEntry("/sap.app/dataSources"));var u=q.extend(true,{},m.getEntry("/sap.ui5/models"));var A=j._createManifestModelConfigurations({models:u,dataSources:t,manifest:m,componentData:e,cacheTokens:i});var P=q.sap.getUriParameters().get("sap-ui-xx-preload-component-models-"+m.getComponentName());var v=P&&P.split(",");for(var w in A){var x=A[w];if(!x.preload&&v&&v.indexOf(w)>-1){x.preload=true;q.sap.log.warning("FOR TESTING ONLY!!! Activating preload for model \""+w+"\" ("+x.type+")",m.getComponentName(),"sap.ui.core.Component");}if(x.type==="sap.ui.model.resource.ResourceModel"&&Array.isArray(x.settings)&&x.settings.length>0&&x.settings[0].async!==true){s.afterPreload[w]=x;}else if(x.preload){if(q.sap.isDeclared(x.type,true)){s.afterManifest[w]=x;}else{q.sap.log.warning("Can not preload model \""+w+"\" as required class has not been loaded: \""+x.type+"\"",m.getComponentName(),"sap.ui.core.Component");}}}return s;}function n(R,e){var m=[];var s=[];function t(i,u){if(!i._oManifest){var N=i.getComponentName();var D=q.sap.getModulePath(N,"/manifest.json");var v;if(u){v=Promise.resolve(JSON.parse(JSON.stringify(u.getRawJson())));}else{v=q.sap.loadResource({url:D,dataType:"json",async:true}).catch(function(E){q.sap.log.error("Failed to load component manifest from \""+D+"\" (component "+N+")! Reason: "+E);return{};});}m.push(v);s.push(i);}var P=i.getParent();if(P&&(P instanceof C)&&!P.isBaseClass()){t(P);}}t(R,e);return Promise.all(m).then(function(u){for(var i=0;i<u.length;i++){if(u[i]){s[i]._applyManifest(u[i]);}}});}j._fnLoadComponentCallback=null;j._fnOnInstanceCreated=null;j.create=function(O){if(O==null||typeof O!=="object"){throw new TypeError("Component.create() must be called with a configuration object.");}var P=b(true,{},O);P.async=true;if(P.manifest===undefined){P.manifest=true;}return o(P);};sap.ui.component=function(v){if(!v){throw new Error("sap.ui.component cannot be called without parameter!");}if(typeof v==='string'){q.sap.log.warning("Do not use deprecated function 'sap.ui.component' for Component instance lookup. Use 'Component.get' instead");return sap.ui.getCore().getComponent(v);}if(v.async){q.sap.log.info("Do not use deprecated factory function 'sap.ui.component'. Use 'Component.create' instead");}else{q.sap.log.warning("Do not use synchronous component creation! Use the new asynchronous factory 'Component.create' instead");}return o(v);};function o(v){function e(m){var N=v.name,I=v.id,t=v.componentData,u=N+'.Component',S=v.settings;var w=new m(q.extend({},S,{id:I,componentData:t,_cacheTokens:v.asyncHints&&v.asyncHints.cacheTokens}));q.sap.log.info("Component instance Id = "+w.getId());var H=w.getMetadata().handleValidation()!==undefined||v.handleValidation;if(H){if(w.getMetadata().handleValidation()!==undefined){H=w.getMetadata().handleValidation();}else{H=v.handleValidation;}sap.ui.getCore().getMessageManager().registerObject(w,H);}k(w);if(typeof j._fnOnInstanceCreated==="function"){var P=j._fnOnInstanceCreated(w,v);if(v.async&&P instanceof Promise){return P.then(function(){return w;});}}return w;}var i=p(v,{failOnError:true,createModels:true,waitFor:v.asyncHints&&v.asyncHints.waitFor});if(v.async){var s=c._sOwnerId;return i.then(function(m){return r(function(){return e(m);},s);});}else{return e(i);}}j.load=function(O){var P=b(true,{},O);P.async=true;if(P.manifest===undefined){P.manifest=true;}return p(P,{preloadOnly:P.asyncHints&&P.asyncHints.preloadOnly});};j.get=function(i){return sap.ui.getCore().getComponent(i);};sap.ui.component.load=function(e,F){q.sap.log.warning("Do not use deprecated function 'sap.ui.component.load'! Use 'Component.load' instead");return p(e,{failOnError:F,preloadOnly:e.asyncHints&&e.asyncHints.preloadOnly});};function p(m,O){var N=m.name,u=m.url,s=sap.ui.getCore().getConfiguration(),t=/^(sync|async)$/.test(s.getComponentPreload()),w=m.manifest,x,y,z,A,B,D;function E(e){var z=new M(JSON.parse(JSON.stringify(e)));return m.async?Promise.resolve(z):z;}if(w===undefined){x=m.manifestFirst===undefined?s.getManifestFirst():!!m.manifestFirst;y=m.manifestUrl;}else{if(m.async===undefined){m.async=true;}x=!!w;y=w&&typeof w==='string'?w:undefined;z=w&&typeof w==='object'?E(w):undefined;}q.sap.interaction.setStepComponent(N);if(!z&&y){z=M.load({manifestUrl:y,componentName:N,async:m.async});}if(z&&!m.async){N=z.getComponentName();}if(!(z&&m.async)){if(!N){throw new Error("The name of the component is undefined.");}}if(N&&u){q.sap.registerModulePath(N,u);}if(x&&!z){z=M.load({manifestUrl:q.sap.getModulePath(N,"/manifest.json"),componentName:N,async:m.async,failOnError:false});}function F(){return q.sap.getResourceName(N+".Component","");}function G(e){var i=N+'.Component';if(!e){var v="The specified component controller '"+i+"' could not be found!";if(O.failOnError){throw new Error(v);}else{q.sap.log.warning(v);}}if(z){var W=h(e.getMetadata(),z);var X=function(){var Y=Array.prototype.slice.call(arguments);var Z;if(Y.length===0||typeof Y[0]==="object"){Z=Y[0]=Y[0]||{};}else if(typeof Y[0]==="string"){Z=Y[1]=Y[1]||{};}Z._metadataProxy=W;if(A){Z._manifestModels=A;}var $=Object.create(e.prototype);e.apply($,Y);return $;};X.getMetadata=function(){return W;};X.extend=function(){throw new Error("Extending Components created by Manifest is not supported!");};return X;}else{return e;}}function H(v,i){if(typeof v==='object'){if(v.url){q.sap.registerModulePath(v.name,v.url);}return(v.lazy&&i!==true)?undefined:v.name;}return v;}function I(i,v){var W=i+'.Component',X=sap.ui.getCore().getConfiguration().getDepCache(),Y;if(t&&i!=null&&!q.sap.isDeclared(W,true)){if(v){Y=q.sap.getResourceName(W,X?'-h2-preload.js':'-preload.js');return q.sap._loadJSResourceAsync(Y,true);}try{Y=W+'-preload';q.sap.require(Y);}catch(e){q.sap.log.warning("couldn't preload component from "+Y+": "+((e&&e.message)||e));}}else if(v){return Promise.resolve();}}function J(e,z,i){var v=[];var W=i?function(d1){v.push(d1);}:q.noop;z.defineResourceRoots();var X=z.getEntry("/sap.ui5/dependencies/libs");if(X){var Y=[];for(var Z in X){if(!X[Z].lazy){Y.push(Z);}}if(Y.length>0){q.sap.log.info("Component \""+e+"\" is loading libraries: \""+Y.join(", ")+"\"");W(sap.ui.getCore().loadLibraries(Y,{async:i}));}}var $=z.getEntry("/sap.ui5/extends/component");if($){W(I($,i));}var _=[];var a1=z.getEntry("/sap.ui5/dependencies/components");if(a1){for(var e in a1){if(!a1[e].lazy){_.push(e);}}}var b1=z.getEntry("/sap.ui5/componentUsages");if(b1){for(var c1 in b1){if(b1[c1].lazy===false&&_.indexOf(b1[c1].name)===-1){_.push(b1[c1].name);}}}if(_.length>0){_.forEach(function(e){W(I(e,i));});}return i?Promise.all(v):undefined;}if(m.async){var K=m.asyncHints||{},L=[],P=function(e){e=e.then(function(v){return{result:v,rejected:false};},function(v){return{result:v,rejected:true};});return e;},Q=function(e){if(e){L.push(P(e));}},R=function($){return $;},S,T;if(z&&O.createModels){Q(z.then(function(z){B=l(z,m.componentData,K.cacheTokens);return z;}).then(function(z){if(Object.keys(B.afterManifest).length>0){A=j._createManifestModels(B.afterManifest,z.getComponentName());}return z;}));}S=[];if(Array.isArray(K.preloadBundles)){K.preloadBundles.forEach(function(v){S.push(q.sap._loadJSResourceAsync(H(v,true),true));});}if(Array.isArray(K.libs)){T=K.libs.map(H).filter(R);S.push(sap.ui.getCore().loadLibraries(T,{preloadOnly:true}));}S=Promise.all(S);if(T&&!O.preloadOnly){S=S.then(function(){return sap.ui.getCore().loadLibraries(T);});}Q(S);if(!z){Q(I(N,true));}else{Q(z.then(function(z){var e=z.getComponentName();if(u){q.sap.registerModulePath(e,u);}return I(e,true).then(function(){return z._processI18n(true);}).then(function(){if(!O.createModels){return null;}var i=Object.keys(B.afterPreload);if(i.length===0){return null;}return new Promise(function(v){sap.ui.require(["sap/ui/model/resource/ResourceModel"],function(W){v(W);});}).then(function(v){function W(X){var Y=B.afterPreload[X];if(Array.isArray(Y.settings)&&Y.settings.length>0){var Z=Y.settings[0];return v.loadResourceBundle(Z,true).then(function($){Z.bundle=$;},function($){q.sap.log.error("Component Manifest: Could not preload ResourceBundle for ResourceModel. "+"The model will be skipped here and tried to be created on Component initialization.","[\"sap.ui5\"][\"models\"][\""+X+"\"]",e);q.sap.log.error($);delete B.afterPreload[X];});}else{return Promise.resolve();}}return Promise.all(i.map(W)).then(function(){if(Object.keys(B.afterPreload).length>0){var X=j._createManifestModels(B.afterPreload,z.getComponentName());if(!A){A={};}for(var Y in X){A[Y]=X[Y];}}});});});}));D=function(e){if(typeof j._fnLoadComponentCallback==="function"){var i=q.extend(true,{},m);var v=q.extend(true,{},e);try{j._fnLoadComponentCallback(i,v);}catch(W){q.sap.log.error("Callback for loading the component \""+z.getComponentName()+"\" run into an error. The callback was skipped and the component loading resumed.",W,"sap.ui.core.Component");}}};}if(K.components){q.each(K.components,function(i,v){Q(I(H(v),true));});}return Promise.all(L).then(function(v){var e=[],i=false,W;i=v.some(function(X){if(X&&X.rejected){W=X.result;return true;}e.push(X.result);});if(i){return Promise.reject(W);}return e;}).then(function(v){if(z&&D){z.then(D);}return v;}).then(function(v){q.sap.log.debug("Component.load: all promises fulfilled, then "+v);if(z){return z.then(function(e){z=e;N=z.getComponentName();return J(N,z,true);});}else{return v;}}).then(function(){if(O.preloadOnly){return true;}return new Promise(function(e,i){sap.ui.require([F()],function(v){e(v);});}).then(function(e){var i=e.getMetadata();var N=i.getComponentName();var v=q.sap.getModulePath(N,"/manifest.json");var W;if(z&&typeof w!=="object"&&(typeof y==="undefined"||y===v)){W=n(i,z);}else{W=n(i);}return W.then(function(){return G(e);});});}).then(function(e){if(!z){return e;}var i=[];var v;var W=z.getEntry("/sap.ui5/rootView");if(typeof W==="string"){v="XML";}else if(W&&typeof W==="object"&&W.type){v=W.type;}if(v&&V[v]){var X="sap/ui/core/mvc/"+V[v]+"View";i.push(X);}var Y=z.getEntry("/sap.ui5/routing");if(Y&&Y.routes){var Z=z.getEntry("/sap.ui5/routing/config/routerClass")||"sap.ui.core.routing.Router";var $=q.sap.getResourceName(Z,"");i.push($);}var _=q.extend(true,{},z.getEntry("/sap.ui5/models"));var a1=q.extend(true,{},z.getEntry("/sap.app/dataSources"));var b1=j._createManifestModelConfigurations({models:_,dataSources:a1,manifest:z,cacheTokens:K.cacheTokens});for(var c1 in b1){if(!b1.hasOwnProperty(c1)){continue;}var d1=b1[c1];if(!d1.type){continue;}var e1=q.sap.getResourceName(d1.type,"");if(i.indexOf(e1)===-1){i.push(e1);}}if(i.length>0){return Promise.all(i.map(function(e1){return new Promise(function(f1,g1){var h1=false;function i1(j1){if(h1){return;}q.sap.log.warning("Can not preload module \""+e1+"\". "+"This will most probably cause an error once the module is used later on.",z.getComponentName(),"sap.ui.core.Component");q.sap.log.warning(j1);h1=true;f1();}sap.ui.require([e1],f1,i1);});})).then(function(){return e;});}else{return e;}}).then(function(e){var i=O.waitFor;if(i){var v=Array.isArray(i)?i:[i];return Promise.all(v).then(function(){return e;});}return e;}).catch(function(e){if(A){for(var N in A){var i=A[N];if(i&&typeof i.destroy==="function"){i.destroy();}}}throw e;});}if(z){J(N,z);}I(N);return G(sap.ui.requireSync(F()));}return j;});
