/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/SyncPromise","./lib/_Helper"],function(S,_){"use strict";var c="sap.ui.model.odata.v4.ODataBinding";function O(){}O.prototype.checkSuspended=function(){var r=this.getRootBinding();if(r&&r.isSuspended()){throw new Error("Must not call method when the binding's root binding is suspended: "+this);}};O.prototype.fetchCache=function(C){var o,a={},b,p,t=this;if(!this.bRelative){C=undefined;}if(this.oCachePromise.isFulfilled()){b=this.oCachePromise.getResult();if(b){b.setActive(false);}}p=[this.fetchQueryOptionsForOwnCache(C),this.oModel.oRequestor.ready()];this.mCacheQueryOptions=undefined;o=S.all(p).then(function(r){var v,q=r[0];if(q&&!(C&&C.getIndex&&C.getIndex()===-2)){v=S.resolve(C&&(C.fetchCanonicalPath?C.fetchCanonicalPath():C.getPath()));return v.then(function(s){var d,e;if(!o||t.oFetchCacheCallToken===a){t.mCacheQueryOptions=jQuery.extend(true,{},t.oModel.mUriParameters,q);if(s){t.mCacheByContext=t.mCacheByContext||{};d=t.mCacheByContext[s];if(d){d.setActive(true);}else{d=t.doCreateCache(_.buildPath(s,t.sPath).slice(1),t.mCacheQueryOptions,C);t.mCacheByContext[s]=d;d.$canonicalPath=s;}}else{d=t.doCreateCache(t.sPath.slice(1),t.mCacheQueryOptions,C);}return d;}else{e=new Error("Cache discarded as a new cache has been created");e.canceled=true;throw e;}});}});o["catch"](function(e){t.oModel.reportError("Failed to create cache for binding "+t,c,e);});this.oCachePromise=o;this.oFetchCacheCallToken=a;};O.prototype.fetchQueryOptionsForOwnCache=function(C){var h,q,t=this;if(this.oOperation){return S.resolve(undefined);}if(this.bRelative&&!C){return S.resolve(undefined);}q=this.doFetchQueryOptions(C);if(this.oModel.bAutoExpandSelect&&this.aChildCanUseCachePromises){q=S.all([q,Promise.resolve().then(function(){return S.all(t.aChildCanUseCachePromises);})]).then(function(r){t.aChildCanUseCachePromises=[];t.updateAggregatedQueryOptions(r[0]);return t.mAggregatedQueryOptions;});}if(!this.bRelative||!C.fetchValue){return q;}if(this.oModel.bAutoExpandSelect){h=t.mParameters&&Object.keys(t.mParameters).some(function(k){return k[0]!=="$"||k[1]==="$";});if(h){return q;}return C.getBinding().fetchIfChildCanUseCache(C,t.sPath,q).then(function(b){return b?undefined:q;});}if(this.mParameters&&Object.keys(this.mParameters).length){return q;}return q.then(function(Q){return Object.keys(Q).length===0?undefined:Q;});};O.prototype.getGroupId=function(){return this.sGroupId||(this.bRelative&&this.oContext&&this.oContext.getGroupId&&this.oContext.getGroupId())||this.oModel.getGroupId();};O.prototype.getRelativePath=function(p){var P,r;if(p[0]==="/"){r=this.oModel.resolve(this.sPath,this.oContext);if(p.indexOf(r)===0){P=r;}else if(this.oReturnValueContext&&p.indexOf(this.oReturnValueContext.getPath())===0){P=this.oReturnValueContext.getPath();}else{return undefined;}p=p.slice(P.length);if(p[0]==="/"){p=p.slice(1);}}return p;};O.prototype.getRootBinding=function(){if(this.bRelative&&this.oContext&&this.oContext.getBinding){return this.oContext.getBinding().getRootBinding();}return this.bRelative&&!this.oContext?undefined:this;};O.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId||(this.bRelative&&this.oContext&&this.oContext.getUpdateGroupId&&this.oContext.getUpdateGroupId())||this.oModel.getUpdateGroupId();};O.prototype.hasPendingChanges=function(){return this.hasPendingChangesForPath("")||this.hasPendingChangesInDependents();};O.prototype.hasPendingChangesForPath=function(p){var t=this,P=this.withCache(function(C,s){return C.hasPendingChangesForPath(s);},p).catch(function(e){t.oModel.reportError("Error in hasPendingChangesForPath",c,e);return false;});return P.isFulfilled()?P.getResult():false;};O.prototype.hasPendingChangesInDependents=function(){return this.oModel.getDependentBindings(this).some(function(d){var C,h;if(d.oCachePromise.isFulfilled()){C=d.oCachePromise.getResult();if(C&&C.hasPendingChangesForPath("")){return true;}}if(d.mCacheByContext){h=Object.keys(d.mCacheByContext).some(function(p){return d.mCacheByContext[p].hasPendingChangesForPath("");});if(h){return true;}}return d.hasPendingChangesInDependents();});};O.prototype.isInitial=function(){throw new Error("Unsupported operation: isInitial");};O.prototype.isRefreshable=function(){return(!this.bRelative||this.oContext&&!this.oContext.getBinding)&&!this.isSuspended();};O.prototype.refresh=function(g){if(!this.isRefreshable()){throw new Error("Refresh on this binding is not supported");}if(this.hasPendingChanges()){throw new Error("Cannot refresh due to pending changes");}this.oModel.checkGroupId(g);this.refreshInternal(g,true);};O.prototype.resetChanges=function(){this.checkSuspended();this.resetChangesForPath("");this.resetChangesInDependents();this.resetInvalidDataState();};O.prototype.resetChangesForPath=function(p){var P=this.withCache(function(C,s){C.resetChangesForPath(s);},p),t=this;P.catch(function(e){t.oModel.reportError("Error in resetChangesForPath",c,e);});if(P.isRejected()){throw P.getResult();}};O.prototype.resetChangesInDependents=function(){this.oModel.getDependentBindings(this).forEach(function(d){var C;if(d.oCachePromise.isFulfilled()){C=d.oCachePromise.getResult();if(C){C.resetChangesForPath("");}d.resetInvalidDataState();}if(d.mCacheByContext){Object.keys(d.mCacheByContext).forEach(function(p){d.mCacheByContext[p].resetChangesForPath("");});}d.resetChangesInDependents();});};O.prototype.resetInvalidDataState=function(){};O.prototype.toString=function(){return this.getMetadata().getName()+": "+(this.bRelative?this.oContext+"|":"")+this.sPath;};O.prototype.withCache=function(p,P){var r,t=this;P=P||"";return this.oCachePromise.then(function(C){if(C){r=t.getRelativePath(P);if(r!==undefined){return p(C,r,t);}}else if(t.oOperation){return undefined;}if(t.oContext&&t.oContext.withCache){return t.oContext.withCache(p,P[0]==="/"?P:_.buildPath(t.sPath,P));}return undefined;});};return function(p){jQuery.extend(p,O.prototype);};},false);
