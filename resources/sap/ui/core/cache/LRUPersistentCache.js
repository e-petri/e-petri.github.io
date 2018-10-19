/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*!
 * Portions of this module ("Least Recently Used" logic) are taken from the node-lru-cache project (see https://github.com/isaacs/node-lru-cache/blob/v2.7.3/README.md),
 * but modified. Please see the OpenUI5 LICENSE file for license information respecting node-lru-cache.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var L={name:"LRUPersistentCache",defaultOptions:{databaseName:"ui5-cachemanager-db",_contentStoreName:"content-store",_metadataStoreName:"metadata-store",_metadataKey:"metadataKey"},_db:{},init:function(){this._metadata={};this._mru=-1;this._lru=-1;return j(this);},_destroy:function(){if(this._db.close){this._db.close();}this._metadata=null;this._ui5version=null;},set:function(e,i){if(D(e)){q.sap.log.warning("Cache Manager ignored 'set' for key ["+e+"]");return Promise.resolve();}if(e==null){return Promise.reject("Cache Manager does not accept undefined or null as key");}if(typeof i==="undefined"){return Promise.reject("Cache Manager does not accept undefined as value");}q.sap.log.debug("Cache Manager LRUPersistentCache: adding item with key ["+e+"]...");var p=this,G="[sync ] fnSet: total[sync]  key ["+e+"]",H="[sync ] fnSet: txStart[sync]  key ["+e+"]",J="[sync ] fnSet: storeOpen[sync]  key ["+e+"]",K="[sync ] fnSet: putContent[sync]  key ["+e+"]",N="[sync ] fnSet: putMetadata[sync]  key ["+e+"]",O="[sync ] fnSet: serialize[sync]  key ["+e+"]";return new Promise(function fnSet(P,Q){q.sap.measure.start(G,"CM",M);var R,S,T,U,V;V=n(p._metadata);U=new k(e,i,typeof i,++p._mru,O,M).serialize();q.sap.measure.start(H,"CM",M);var W=p._db.transaction([p.defaultOptions._contentStoreName,p.defaultOptions._metadataStoreName],"readwrite");q.sap.measure.end(H);W.onerror=function(X){var Y="Cache Manager cannot complete add/put transaction for entry with key: "+U.oData.key+". Details: "+A(X);q.sap.log.error(Y);p._metadata=V;o(p);Q(Y);};W.onabort=function(X){p._metadata=V;o(p);var Y=r(p);if(x(X)&&Y>0){q.sap.log.warning("Cache Manager is trying to free some space to add/put new item");w(p,e,i).then(function(){q.sap.log.debug("Cache Manager LRUPersistentCache: set completed after freeing space. ItemCount changed from "+Y+" to "+r(p));P();},function($){var _="Cache Manager LRUPersistentCache: set unsuccessful. Cannot free space to add/put entry. Details: "+$;q.sap.log.error(_);Q(_);});}else{var Z="Cache Manager LRUPersistentCache: set failed: "+A(X);q.sap.log.error(Z);Q(Z);}};W.oncomplete=function(){q.sap.log.debug("Cache Manager LRUPersistentCache: adding item with key ["+e+"]... done");P();};q.sap.measure.start(J,"CM",M);R=W.objectStore(p.defaultOptions._contentStoreName);T=W.objectStore(p.defaultOptions._metadataStoreName);q.sap.measure.end(J);q.sap.measure.start(K,"CM",M);S=R.put(U.oData,U.oData.key);q.sap.measure.end(K);q.sap.measure.end(G);S.onsuccess=function(){u(p,U);q.sap.measure.start(N,"CM",M);T.put(p._metadata,p.defaultOptions._metadataKey);q.sap.measure.end(N);};if(q.sap.log.getLevel()>=q.sap.log.LogLevel.DEBUG){q.sap.log.debug("Cache Manager LRUPersistentCache: measurements: "+G+": "+q.sap.measure.getMeasurement(G).duration+"; "+O+": "+q.sap.measure.getMeasurement(O).duration+"; "+H+": "+q.sap.measure.getMeasurement(H).duration+"; "+J+": "+q.sap.measure.getMeasurement(J).duration+"; "+K+": "+q.sap.measure.getMeasurement(K).duration+"; "+N+": "+q.sap.measure.getMeasurement(N).duration);}});},has:function(e){if(D(e)){q.sap.log.warning("Cache Manager ignored 'has' for key ["+e+"]");return Promise.resolve(false);}return this.get(e).then(function(i){return typeof i!=="undefined";});},_getCount:function(){return Promise.resolve(r(this));},_getAll:function(e){var i=this,p,G="[sync ] _getAll: deserialize";return new Promise(function(H,J){var K=[],N=i._db.transaction([i.defaultOptions._contentStoreName],"readonly"),O=N.objectStore(i.defaultOptions._contentStoreName);N.onerror=function(P){J(A(P));};N.oncomplete=function(P){H(K);};O.openCursor().onsuccess=function(P){var Q=P.target.result;if(Q&&Q.value){p=new k(Q.value,G,m).deserialize();K.push({key:p.oData.key,value:p.oData.value});Q.continue();}};});},_loadMetaStructure:function(){var i=this;return new Promise(function(p,G){var H=i._db.transaction([i.defaultOptions._metadataStoreName],"readonly");H.onerror=function(N){if(!H.errorHandled){H.errorHandled=true;var O="Cache Manager cannot complete transaction for read metadata. Details: "+H.error;q.sap.log.error(O);G(O);}};var J=H.objectStore(i.defaultOptions._metadataStoreName);try{var K=J.get(i.defaultOptions._metadataKey);K.onsuccess=function(N){i._metadata=K.result?K.result:l(i._ui5version);if(i._metadata.__ui5version!==i._ui5version){i.reset().then(p,function(e){q.sap.log.error("Cannot reset the cache. Details:"+e);H.abort();});}else{p();}};K.onerror=function(N){q.sap.log.error("Cache Manager cannot complete transaction for read metadata items. Details: "+N.message);G(N.message);};}catch(e){q.sap.log.error("Cache Manager cannot read metadata entries behind key: "+i.defaultOptions._metadataKey+". Details: "+e.message);G(e.message);}});},get:function(e){if(D(e)){q.sap.log.warning("Cache Manager ignored 'get' for key ["+e+"]");return Promise.resolve();}return g(this,e);},del:function(e){if(D(e)){q.sap.log.warning("Cache Manager ignored 'del' for key ["+e+"]");return Promise.resolve();}return d(this,e);},reset:function(){var i=this;return new Promise(function(p,G){var H,J,K,N,O;O=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");O.onerror=O.onabort=function(P){if(!O.errorHandled){O.errorHandled=true;var Q="Cache Manager LRUPersistentCache: transaction for reset() failed. Details: "+O.error;q.sap.log.error(Q);G(Q);}};O.oncomplete=function(P){p();};H=O.objectStore(i.defaultOptions._contentStoreName);J=O.objectStore(i.defaultOptions._metadataStoreName);try{K=H.clear();K.onerror=function(){O.abort();};K.onsuccess=function(){N=J.clear();N.onerror=function(){O.abort();};N.onsuccess=function(){i._metadata=l(sap.ui.version);o(i);};};}catch(e){O.abort();}});}};var m="LRUPersistentCache,get",M="LRUPersistentCache,set",a=0;function s(i){var p=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");p.onerror=p.onabort=function(G){q.sap.log.warning("Cache Manager cannot persist the information about usage of an entry. This may lead to earlier removal of the entry if browser storage space is over. Details: "+p.error);};try{p.objectStore(i.defaultOptions._metadataStoreName).put(i._metadata,i.defaultOptions._metadataKey);}catch(e){q.sap.log.warning("Cache Manager cannot persist the information about usage of an entry. This may lead to earlier removal of the entry if browser storage space is over. Details: "+e.message);}}function d(e,i){return new Promise(function(p,G){var H,J;H=e._db.transaction([e.defaultOptions._contentStoreName,e.defaultOptions._metadataStoreName],"readwrite");J=n(e._metadata);function K(O){e._metadata=J;o(e);var P="Cache Manager LRUPersistentCache: cannot delete item with key: "+i+". Details: "+A(O);q.sap.log.error(P);G(P);}H.onerror=K;H.onabort=K;H.oncomplete=function(){if(r(e)===0){e._lru=-1;e._mru=-1;e._metadata=l(e._ui5version);}q.sap.log.debug("Cache Manager LRUPersistentCache: item with key "+i+" deleted");p();};q.sap.log.debug("Cache Manager LRUPersistentCache: deleting item ["+i+"]");var N=H.objectStore(e.defaultOptions._contentStoreName).delete(i);N.onsuccess=function(){q.sap.log.debug("Cache Manager LRUPersistentCache: request for deleting item ["+i+"] is successful, updating metadata...");y(e,i);H.objectStore(e.defaultOptions._metadataStoreName).put(e._metadata,e.defaultOptions._metadataKey);};});}function g(i,G){if(i.getCounter===undefined){i.getCounter=0;}i.getCounter++;var H="[sync ] fnGet"+i.getCounter+": total[sync]  key ["+G+"]",J="[sync ] fnGet"+i.getCounter+": txStart[sync]  key ["+G+"]",K="[sync ] fnGet"+i.getCounter+": storeOpen[sync]  key ["+G+"]",N="[sync ] fnGet"+i.getCounter+": access result[sync]  key ["+G+"]",O="[sync ] fnGet"+i.getCounter+": putMetadata[sync]  key ["+G+"]",P="[sync ] fnGet"+i.getCounter+": deserialize[sync]  key ["+G+"]",Q="[sync ]  _instance.get",R="[sync ]  getRequest.onSuccess";q.sap.log.debug("Cache Manager LRUPersistentCache: get for key ["+G+"]...");q.sap.measure.start(Q,"CM",m);var p=new Promise(function fnGet(S,T){var U,V,W,X;q.sap.measure.start(H,"CM",m);q.sap.measure.start(J,"CM",m);V=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");q.sap.measure.end(J);V.onerror=function(Y){var Z="Cache Manager cannot complete delete transaction for entry with key: "+G+". Details: "+V.error;q.sap.log.error(Z);T(Z);};try{q.sap.measure.start(K,"CM",m);W=V.objectStore(i.defaultOptions._contentStoreName).get(G);q.sap.measure.end(K);W.onsuccess=function(Y){q.sap.measure.start(R,"CM",m);q.sap.measure.start(N,"CM",m);X=new k(W.result,P,m);q.sap.measure.end(N);F("Cache Manager LRUPersistentCache: accessing the result",G,N);if(X.oData){q.sap.measure.start(O,"CM",m);if(X.oData.lu!==i._mru){X.oData.lu=++i._mru;u(i,X);s(i);}q.sap.measure.end(O);U=X.deserialize().oData.value;}q.sap.measure.end(R);q.sap.log.debug("Cache Manager LRUPersistentCache: get for key ["+G+"]...done");S(U);};W.onerror=function(Y){q.sap.log.error("Cache Manager cannot get entry with key: "+G+". Details: "+Y.message);T(Y.message);};}catch(e){q.sap.log.error("Cache Manager cannot get entry with key: "+G+". Details: "+e.message);T(e.message);return;}q.sap.measure.end(H);});q.sap.measure.end(Q);return p;}function b(e){var K=t(e);if(K==undefined){var i="Cache Manager LRUPersistentCache: deleteItemAndUpdateMetadata cannot find item to delete";q.sap.log.debug(i);return Promise.reject(i);}return f(e,K).then(function(){return Promise.resolve().then(function(){y(e,K);return c(e).then(function(){return K;},function(){q.sap.log.warning("Cache Manager LRUPersistentCache: Free space algorithm deleted item "+"but the metadata changes could not be persisted. This won't break the functionality.");return K;});});});}function c(i){return new Promise(function(p,G){try{var H=i._db.transaction([i.defaultOptions._contentStoreName,i.defaultOptions._metadataStoreName],"readwrite");H.onerror=J;H.onabort=J;H.oncomplete=function(){q.sap.log.debug("Cache Manager LRUPersistentCache: persistMetadata - metadata was successfully updated");p();};H.objectStore(i.defaultOptions._metadataStoreName).put(i._metadata,i.defaultOptions._metadataKey);}catch(e){J(null,e);}function J(K,N){var O="Cache Manager LRUPersistentCache: persistMetadata error - metadata was not successfully persisted. Details: "+A(K)+". Exception: "+(N?N.message:"");q.sap.log.debug(O);G(O);}});}function f(e,i){return new Promise(function(p,G){var H=e._db.transaction([e.defaultOptions._contentStoreName,e.defaultOptions._metadataStoreName],"readwrite");function J(K){var N="Cache Manager LRUPersistentCache: internalDel cannot complete delete transaction for entry with key: "+i+". Details: "+A(K);q.sap.log.warning(N);G(K);}H.onerror=J;H.onabort=J;H.oncomplete=function(){if(r(e)===0){e._lru=0;e._mru=0;e._metadata=l(e._ui5version);}q.sap.log.debug("Cache Manager LRUPersistentCache: internalDel deleting item ["+i+"]...done");p();};q.sap.log.debug("Cache Manager LRUPersistentCache: internalDel deleting item ["+i+"]...");H.objectStore(e.defaultOptions._contentStoreName).delete(i);});}function h(e,i,p){return new Promise(function(G,H){var J,K,N,O="[sync ] internalSet: serialize[sync]  key ["+i+"]";N=n(e._metadata);var P=new k(i,p,typeof p,++e._mru,O,M).serialize();q.sap.log.debug("Cache Manager: LRUPersistentCache: internal set with parameters: key ["+P.oData.key+"], access index ["+P.oData.lu+"]");K=e._db.transaction([e.defaultOptions._contentStoreName,e.defaultOptions._metadataStoreName],"readwrite");K.onerror=Q;K.onabort=Q;function Q(R){q.sap.log.debug("Cache Manager: LRUPersistentCache: internal set failed. Details: "+A(R));e._metadata=N;o(e);H(R);}K.oncomplete=function(){q.sap.log.debug("Cache Manager: LRUPersistentCache: Internal set transaction completed. ItemCount: "+r(e));G();};J=K.objectStore(e.defaultOptions._contentStoreName).put(P.oData,P.oData.key);J.onsuccess=function(){u(e,P);K.objectStore(e.defaultOptions._metadataStoreName).put(e._metadata,e.defaultOptions._metadataKey);};});}function u(e,i){if(e._metadata.__byKey__[i.oData.key]!=null){var p=e._metadata.__byKey__[i.oData.key];delete e._metadata.__byIndex__[p];q.sap.log.debug("Cache Manager LRUPersistentCache: set/internalset - item already exists, so its indexes are updated");}e._metadata.__byIndex__[i.oData.lu]=i.oData.key;e._metadata.__byKey__[i.oData.key]=i.oData.lu;z(e);}function j(i){i._ui5version=sap.ui.version;return new Promise(function executorInitIndexedDB(p,G){var H;q.sap.log.debug("Cache Manager "+"_initIndexedDB started");function J(){try{H=window.indexedDB.open(i.defaultOptions.databaseName,1);}catch(e){q.sap.log.error("Could not open Cache Manager database. Details: "+e.message);G(e.message);}}J();H.onerror=function(e){q.sap.log.error("Could not initialize Cache Manager database. Details: "+e.message);G(e.error);};H.onsuccess=function(e){var K=E("init_onsuccess");i._db=H.result;i._db.onversionchange=function(e){if(!e.newVersion){e.target.close();}};i._loadMetaStructure().then(function(){q.sap.log.debug("Cache Manager "+" metadataLoaded. Serialization support: "+B()+", resolving initIndexDb promise");p(i);},G);K.endSync();};H.onupgradeneeded=function(K){var N=K.target.result;N.onerror=function(K){q.sap.log.error("Cache Manager error. Details: "+K.message);G(N.error);};try{var O=N.createObjectStore(i.defaultOptions._contentStoreName);N.createObjectStore(i.defaultOptions._metadataStoreName);}catch(e){q.sap.log.error("Could not initialize Cache Manager object store. Details: "+e.message);throw e;}O.createIndex("ui5version","ui5version",{unique:false});};});}function I(e,i,p,G){this.key=e;this.sOrigType=p;this.value=i;this.lu=G;}function k(e,i,p,G,H,J){if(arguments.length===3){this.oData=e;this.sMeasureId=i;this.sMsrCat=p;}else{this.oData=new I(e,i,p,G);}}k.prototype.deserialize=function(){if(B()&&this.oData.sOrigType==="object"){q.sap.measure.start(this.sMeasureId,this.sMeasureId,this.sMsrCat);this.oData.value=JSON.parse(this.oData.value);q.sap.measure.end(this.sMeasureId);F("Cache Manager LRUPersistentCache: de-serialization the result",this.oData.key,this.sMeasureId);}return this;};k.prototype.serialize=function(){if(B()&&this.oData.sOrigType==="object"){q.sap.measure.start(this.sMeasureId,this.sMeasureId,this.sMsrCat);this.oData.value=JSON.stringify(this.oData.value);q.sap.measure.end(this.sMeasureId);F("Cache Manager LRUPersistentCache: serialization of the value",this.oData.key,this.sMeasureId);}return this;};function l(e){return{__byKey__:{},__byIndex__:{},__ui5version:e};}function n(e){var i=l(e.__ui5version);for(var p in e.__byIndex__){i.__byIndex__[p]=e.__byIndex__[p];}for(var G in e.__byKey__){i.__byKey__[G]=e.__byKey__[G];}return i;}function o(e){var i=v(e._metadata.__byIndex__);e._mru=i.mru;e._lru=i.lru;q.sap.log.debug("Cache Manager LRUPersistentCache: LRU counters are assigned to the CM: "+JSON.stringify(i));}function r(e){return Object.keys(e._metadata.__byKey__).length;}function t(e){var K=e._metadata.__byIndex__[e._lru];if(K==undefined&&!z(e)){return null;}else{return e._metadata.__byIndex__[e._lru];}}function v(e){var i=-1,p=-1,G=Number.MAX_VALUE,H=Object.keys(e),J=H.length;if(J===0){return{mru:-1,lru:-1};}else{while(++i<J){var K=parseInt(H[i],10);if(p<K){p=K;}if(G>K){G=K;}}return{mru:p,lru:G};}}function w(e,i,p){return new Promise(function(G,H){var J=0;_(e,i,p);function _(e,i,p){J++;q.sap.log.debug("Cache Manager LRUPersistentCache: cleanAndStore: freeing space attempt ["+(J)+"]");b(e).then(function(K){q.sap.log.debug("Cache Manager LRUPersistentCache: cleanAndStore: deleted item with key ["+K+"]. Going to put "+i);return h(e,i,p).then(G,function(N){if(x(N)){q.sap.log.debug("Cache Manager LRUPersistentCache: cleanAndStore: QuotaExceedError during freeing up space...");if(r(e)>0){_(e,i,p);}else{H("Cache Manager LRUPersistentCache: cleanAndStore: even when the cache is empty, the new item with key ["+i+"] cannot be added");}}else{H("Cache Manager LRUPersistentCache: cleanAndStore: cannot free space: "+A(N));}});},H);}});}function x(e){return(e&&e.target&&e.target.error&&e.target.error.name==="QuotaExceededError");}function y(e,i){var p=e._metadata.__byKey__[i];delete e._metadata.__byKey__[i];delete e._metadata.__byIndex__[p];z(e);}function z(e){while(e._lru<=e._mru&&e._metadata.__byIndex__[e._lru]==undefined){e._lru++;}return(e._lru<=e._mru);}function A(e){if(!e){return"";}var R=e.message;if(e.target&&e.target.error&&e.target.error.name){R+=" Error name: "+e.target.error.name;}return R;}function B(){return sap.ui.getCore().getConfiguration().isUI5CacheSerializationSupportOn();}function C(){return sap.ui.getCore().getConfiguration().getUI5CacheExcludedKeys();}function D(e){return C().some(function(i){return e.indexOf(i)>-1;});}function E(O,e){a++;var i="[async]  "+O+"["+e+"]- #"+(a),p="[sync ]  "+O+"["+e+"]- #"+(a);q.sap.measure.start(i,"CM",["LRUPersistentCache",O]);q.sap.measure.start(p,"CM",["LRUPersistentCache",O]);return{sMeasureAsync:i,sMeasureSync:p,endAsync:function(){q.sap.measure.end(this.sMeasureAsync);},endSync:function(){q.sap.measure.end(this.sMeasureSync);}};}function F(e,K,i){if(q.sap.log.getLevel()>=q.sap.log.LogLevel.DEBUG){q.sap.log.debug(e+" for key ["+K+"] took: "+q.sap.measure.getMeasurement(i).duration);}}return L;},false);
