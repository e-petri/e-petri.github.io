/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/json/JSONModel","sap/ui/fl/Utils","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/Change","sap/ui/fl/changeHandler/Base","sap/ui/core/BusyIndicator","sap/ui/fl/variants/util/VariantUtil"],function(q,J,U,a,C,B,b,V){"use strict";var c=J.extend("sap.ui.fl.variants.VariantModel",{constructor:function(d,f,o,O){this.pSequentialImportCompleted=Promise.resolve();J.apply(this,arguments);this.bObserve=O;this.oFlexController=f;this.oComponent=o;this.oVariantController=undefined;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");if(f&&f._oChangePersistence){this.oVariantController=f._oChangePersistence._oVariantController;this.sVariantTechnicalParameterName=this.oVariantController.sVariantTechnicalParameterName;}V.initializeHashRegister.call(this);if(d&&typeof d=="object"){Object.keys(d).forEach(function(k){d[k].variants.forEach(function(v){if(!d[k].currentVariant&&(v.key===d[k].defaultVariant)){d[k].currentVariant=v.key;}v.originalTitle=v.title;v.originalFavorite=v.favorite;});d[k].originalCurrentVariant=d[k].currentVariant;d[k].originalDefaultVariant=d[k].defaultVariant;});this.setData(d);}}});c.prototype.updateCurrentVariant=function(v,n){var s,m;var d;s=this.oData[v].originalCurrentVariant;if(this.oData[v].modified){d=this.oVariantController.getVariantChanges(v,s);this._removeDirtyChanges(d,v,s);this.oData[v].modified=false;}m=this.oFlexController._oChangePersistence.loadSwitchChangesMapForComponent(v,s,n);var A=U.getAppComponentForControl(this.oComponent);return Promise.resolve().then(this.oFlexController.revertChangesOnControl.bind(this.oFlexController,m.aRevert,A)).then(this.oFlexController.applyVariantChanges.bind(this.oFlexController,m.aNew,this.oComponent)).then(function(){this.oData[v].originalCurrentVariant=n;this.oData[v].currentVariant=n;if(this.oData[v].updateVariantInURL){this._updateVariantInURL(v,n);this.oVariantController.updateCurrentVariantInMap(v,n);}this.checkUpdate();}.bind(this));};c.prototype._updateVariantInURL=function(v,n){var t=this.getVariantIndexInURL(v);if(!t.parameters){return;}var p=Array.isArray(t.parameters[this.sVariantTechnicalParameterName])?t.parameters[this.sVariantTechnicalParameterName].slice(0):[];var i=t.index;if(n===this.oData[v].defaultVariant){if(i===-1){return;}p.splice(i,1);}else{i===-1?p.push(n):(p[i]=n);}this.updateHasherEntry({parameters:p,updateURL:!this._bAdaptationMode});};c.prototype.updateHasherEntry=function(){V.updateHasherEntry.apply(this,arguments);};c.prototype.getVariantIndexInURL=function(v){var h=U.getParsedURLHash().params;var p=-1;if(h){if(this._bAdaptationMode){h={};h[this.sVariantTechnicalParameterName]=V.getCurrentHashParamsFromRegister.call(this);}if(!q.isEmptyObject(h)&&Array.isArray(h[this.sVariantTechnicalParameterName])){h[this.sVariantTechnicalParameterName].some(function(P,i){if(!!this.oVariantController.getVariant(v,P)){p=i;return true;}}.bind(this));}}return{parameters:h,index:p};};c.prototype.getCurrentVariantReference=function(v){return this.oData[v].currentVariant;};c.prototype.getVariantManagementReference=function(v){var s="";var i=-1;Object.keys(this.oData).some(function(k){return this.oData[k].variants.some(function(o,d){if(o.key===v){s=k;i=d;return true;}});}.bind(this));return{variantManagementReference:s,variantIndex:i};};c.prototype.getVariant=function(v,s){return this.oVariantController.getVariant(s?s:this.getVariantManagementReference(v).variantManagementReference,v);};c.prototype.getVariantProperty=function(v,p){return this.getVariant(v).content.content[p];};c.prototype._addChange=function(o){var v=o.getVariantReference();var s=this.getVariantManagementReference(v).variantManagementReference;this.oData[s].modified=!!this.oData[s].variantsEditable;this.checkUpdate(true);return this.oVariantController.addChangeToVariant(o,s,v);};c.prototype._removeChange=function(o){var v=o.getVariantReference();var s=this.getVariantManagementReference(v).variantManagementReference;return this.oVariantController.removeChangeFromVariant(o,s,v);};c.prototype._removeDirtyChanges=function(v,s,d){var A=U.getAppComponentForControl(this.oComponent);var e=v.map(function(o){return o.fileName;});var f;var D=this.oFlexController._oChangePersistence.getDirtyChanges().filter(function(o){f=e.indexOf(o.getDefinition().fileName)>-1;if(f){this.oVariantController.removeChangeFromVariant(o,s,d);}return f;}.bind(this));D.forEach(function(o){this.oFlexController.deleteChange(o,A);}.bind(this));return this.oFlexController.revertChangesOnControl(D.reverse(),A);};c.prototype._getVariantTitleCount=function(n,v){var d=this.getData();return d[v].variants.reduce(function(i,o){if(n===o.title&&o.visible){i++;}return i;},0);};c.prototype._duplicateVariant=function(p){var n=p.newVariantReference,s=p.sourceVariantReference,S=this.getVariant(s);var d={content:{},controlChanges:JSON.parse(JSON.stringify(S.controlChanges)),variantChanges:{}};var i=U.isLayerAboveCurrentLayer(S.content.layer);Object.keys(S.content).forEach(function(k){if(k==="fileName"){d.content[k]=n;}else if(k==="variantReference"){if(i===0){d.content[k]=S.content["variantReference"];}else if(i===-1){d.content[k]=s;}}else if(k==="content"){d.content[k]=JSON.parse(JSON.stringify(S.content[k]));d.content.content.title=p.title;}else{d.content[k]=S.content[k];}});d.content["layer"]=p.layer;var v=d.controlChanges.slice();var D={};d.controlChanges=v.reduce(function(e,o){if(U.isLayerAboveCurrentLayer(o.layer)===0){D=q.extend(true,{},o);D.fileName=U.createDefaultFileName(o.changeType);D.variantReference=d.content.fileName;if(!D.support){D.support={};}D.support.sourceChangeFileName=o.fileName;e.push(D);}return e;},[]);return d;};c.prototype._copyVariant=function(p){var d=this._duplicateVariant(p);var v={key:d.content.fileName,layer:p.layer,title:d.content.content.title,originalTitle:d.content.content.title,favorite:true,originalFavorite:true,rename:true,change:true,remove:true,visible:true};var o=this.oFlexController.createVariant(d,this.oComponent);var e=[];[o].concat(o.getControlChanges()).forEach(function(f){e.push(this.oFlexController._oChangePersistence.addDirtyChange(f));}.bind(this));var i=this.oVariantController.addVariantToVariantManagement(o.getDefinitionWithChanges(),p.variantManagementReference);this.oData[p.variantManagementReference].variants.splice(i,0,v);return this.updateCurrentVariant(p.variantManagementReference,o.getId()).then(function(){return e;});};c.prototype.removeVariant=function(v,s,d){var e=this.oFlexController._oChangePersistence.getDirtyChanges().filter(function(o){return(o.getVariantReference&&o.getVariantReference()===v.getId())||o.getId()===v.getId();});e.forEach(function(o){this.oFlexController._oChangePersistence.deleteChange(o);}.bind(this));return this.updateCurrentVariant(d,s).then(function(){var i=this.oVariantController.removeVariantFromVariantManagement(v,d);this.oData[d].variants.splice(i,1);this.checkUpdate();}.bind(this));};c.prototype.collectModelChanges=function(v,l){var d=this.getData()[v];var m=d.variants;var e=[];var p={};m.forEach(function(o){if(o.originalTitle!==o.title){p={variantReference:o.key,changeType:"setTitle",title:o.title,originalTitle:o.originalTitle,layer:l};e.push(p);}if(o.originalFavorite!==o.favorite){p={variantReference:o.key,changeType:"setFavorite",favorite:o.favorite,originalFavorite:o.originalFavorite,layer:l};e.push(p);}if(!o.visible){p={variantReference:o.key,changeType:"setVisible",visible:false,layer:l};e.push(p);}});if(d.originalDefaultVariant!==d.defaultVariant){p={variantManagementReference:v,changeType:"setDefault",defaultVariant:d.defaultVariant,originalDefaultVariant:d.originalDefaultVariant,layer:l};e.push(p);}return e;};c.prototype.manageVariants=function(v,s,l){return new Promise(function(r){v.attachManage({resolve:r,variantManagementReference:s,layer:l},this.fnManageClickRta,this);v.openManagementDialog(true);}.bind(this));};c.prototype._setVariantProperties=function(v,p,A){var i=-1;var o;var d=null;var D=this.getData();if(p.variantReference){i=this.getVariantManagementReference(p.variantReference).variantIndex;o=D[v].variants[i];}var n={};var m={};switch(p.changeType){case"setTitle":m.title=p.title;o.title=p.title;o.originalTitle=o.title;break;case"setFavorite":m.favorite=p.favorite;o.favorite=p.favorite;o.originalFavorite=o.favorite;break;case"setVisible":m.visible=p.visible;m.createdByReset=false;o.visible=p.visible;break;case"setDefault":m.defaultVariant=p.defaultVariant;D[v].defaultVariant=p.defaultVariant;D[v].originalDefaultVariant=D[v].defaultVariant;break;default:break;}if(i>-1){var s=this.oVariantController._setVariantData(m,v,i);D[v].variants.splice(i,1);D[v].variants.splice(s,0,o);}else if(this.oVariantController._mVariantManagement[v]){this.oVariantController._mVariantManagement[v].defaultVariant=p.defaultVariant;}if(A){n.changeType=p.changeType;n.layer=p.layer;if(p.changeType==="setDefault"){n.fileType="ctrl_variant_management_change";n.selector={id:v};}else{if(p.changeType==="setTitle"){B.setTextInChange(n,"title",p.title,"XFLD");}n.fileType="ctrl_variant_change";n.selector={id:p.variantReference};}d=this.oFlexController.createBaseChange(n,p.appComponent);d.setContent(m);this.oVariantController._updateChangesForVariantManagementInMap(d.getDefinition(),v,true);this.oFlexController._oChangePersistence.addDirtyChange(d);}else{if(p.change){this.oVariantController._updateChangesForVariantManagementInMap(p.change.getDefinition(),v,false);this.oFlexController._oChangePersistence.deleteChange(p.change);}}this.setData(D);this.checkUpdate(true);return d;};c.prototype._ensureStandardVariantExists=function(v){var d=this.getData();if(!d[v]){d[v]={currentVariant:v,originalCurrentVariant:v,defaultVariant:v,originalDefaultVariant:v,variants:[{key:v,title:this._oResourceBundle.getText("STANDARD_VARIANT_TITLE"),originalTitle:this._oResourceBundle.getText("STANDARD_VARIANT_ORIGINAL_TITLE"),favorite:true,originalFavorite:true,visible:true}]};this.setData(d);if(this.oVariantController){var o={changes:{variantSection:{}}};var D={defaultVariant:v,variantManagementChanges:{},variants:[{content:{fileName:v,fileType:"ctrl_variant",variantManagementReference:v,variantReference:"",content:{title:this._oResourceBundle.getText("STANDARD_VARIANT_TITLE")}},controlChanges:[],variantChanges:{}}]};o.changes.variantSection[v]=D;this.oVariantController._setChangeFileContent(o,{});}}};c.prototype._setModelPropertiesForControl=function(v,A,o){var r=function(d,v,A){if((d.layer===U.getCurrentLayer(!A))&&(d.key!==v)){return true;}else{return false;}};this.oData[v].modified=false;this.oData[v].showFavorites=true;if(this._bAdaptationMode!==A){var p={};if(A){p={parameters:[],updateURL:true,ignoreRegisterUpdate:true};}else if(this._bAdaptationMode){p={parameters:V.getCurrentHashParamsFromRegister.call(this),updateURL:true,ignoreRegisterUpdate:true};}this.updateHasherEntry(p);this._bAdaptationMode=A;}if(!(typeof this.fnManageClick==="function"&&typeof this.fnManageClickRta==="function")){this._initializeManageVariantsEvents();}o.detachManage(this.fnManageClick,this);o.detachManage(this.fnManageClickRta,this);if(A){this.oData[v].variantsEditable=false;this.oData[v].variants.forEach(function(d){d.rename=true;d.change=true;d.remove=r(d,v,A);});}else{if(this.oData[v]._isEditable){o.attachManage({variantManagementReference:v},this.fnManageClick,this);this.oData[v].variantsEditable=true;this.oData[v].variants.forEach(function(d){d.remove=r(d,v,A);if(d.layer===U.getCurrentLayer(true)){d.rename=true;d.change=true;}else{d.rename=false;d.change=false;}});}else{this.oData[v].variantsEditable=false;this.oData[v].variants.forEach(function(d){d.remove=false;d.rename=false;d.change=false;});}}};c.prototype._initializeManageVariantsEvents=function(){this.fnManageClickRta=function(e,d){var f=this.collectModelChanges(d.variantManagementReference,d.layer);d.resolve(f);};this.fnManageClick=function(e,d){if(!this.oFlexController||!this.oVariantController){return;}var f=this.collectModelChanges(d.variantManagementReference,U.getCurrentLayer(true));f.forEach(function(o){o.appComponent=this.oComponent;this._setVariantProperties(d.variantManagementReference,o,true);}.bind(this));this.oFlexController._oChangePersistence.saveDirtyChanges();};};c.prototype._handleCurrentVariantChange=function(e){var p=e.getSource();var v=p.getContext().getPath().replace(/^\//,'');if(this.oData[v].currentVariant!==this.oData[v].originalCurrentVariant){this.updateCurrentVariant(v,p.getValue());}};c.prototype._handleSave=function(e){var v=e.getSource();var s=e.getParameter("def");var A=U.getAppComponentForControl(this.oComponent)||U.getAppComponentForControl(v);var d=this._getLocalId(v.getId(),A);var S=this.getCurrentVariantReference(d);var f=this.oVariantController.getVariantChanges(d,S);if(e.getParameter("overwrite")){var g=this.oFlexController._oChangePersistence.getDirtyChanges();var h=f.map(function(o){return o.fileName;});var D=g.reduce(function(r,o){if(h.indexOf(o.getId())>-1){return r.concat(o);}else{return r;}},[]);this.oFlexController._oChangePersistence.saveSequenceOfDirtyChanges(D);this.oData[d].modified=false;this.checkUpdate(true);return Promise.resolve();}else{var n=U.createDefaultFileName("Copy");var p={variantManagementReference:d,appComponent:A,layer:U.getCurrentLayer(true),title:e.getParameter("name"),sourceVariantReference:S,newVariantReference:n};return this._copyVariant(p).then(function(D){return this._removeDirtyChanges(f,d,S).then(function(){if(s){var P={changeType:"setDefault",defaultVariant:n,originalDefaultVariant:this.oData[d].defaultVariant,appComponent:A,layer:U.getCurrentLayer(true),variantManagementReference:d};var o=this._setVariantProperties(d,P,true);D.push(o);}this.oFlexController._oChangePersistence.saveSequenceOfDirtyChanges(D);this.oData[d].modified=false;this.checkUpdate(true);return Promise.resolve();}.bind(this));}.bind(this));}};c.prototype._getLocalId=function(i,A){return a.getSelector(i,A).id;};c.prototype.switchToDefaultForVariantManagement=function(v){b.show(200);this.updateCurrentVariant(v,this.oData[v].defaultVariant).then(function(){b.hide();});};c.prototype.switchToDefaultForVariant=function(v){Object.keys(this.oData).forEach(function(s){if(!v||this.oData[s].currentVariant===v){this.switchToDefaultForVariantManagement.call(this,s);}}.bind(this));};c.prototype.registerToModel=function(v){var s=this._getLocalId(v,U.getAppComponentForControl(v)||this.oComponent);this._ensureStandardVariantExists(s);if(v){this.oData[s]._isEditable=v.getEditable();v.getTitle().getBinding("text").attachChange(this._handleCurrentVariantChange,this);this._setModelPropertiesForControl(s,false,v);v.attachSave(this._handleSave,this);if(v.getUpdateVariantInURL()){this.oData[s].updateVariantInURL=true;V.attachHashHandlers.call(this,s);}}};return c;},true);
