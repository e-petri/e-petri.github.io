/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/layout/library','./FormLayoutRenderer'],function(q,C,l,F){"use strict";var B=l.BackgroundDesign;var a=C.extend("sap.ui.layout.form.FormLayout",{metadata:{library:"sap.ui.layout",properties:{backgroundDesign:{type:"sap.ui.layout.BackgroundDesign",group:"Appearance",defaultValue:B.Translucent}}}});a.prototype.contentOnAfterRendering=function(f,c){if(l.form.FormHelper.bArrowKeySupport){q(c.getFocusDomRef()).data("sap.InNavArea",true);}if(c.getWidth&&(!c.getWidth()||c.getWidth()=="auto")&&(!c.getFormDoNotAdjustWidth||!c.getFormDoNotAdjustWidth())){c.$().css("width","100%");}};a.prototype.toggleContainerExpanded=function(c){var e=c.getExpanded();if(this.getDomRef()){if(e){c.$("content").css("display","");}else{c.$("content").css("display","none");}}};a.prototype.getLayoutDataForElement=function(e,t){var L=e.getLayoutData();if(!L){return undefined;}else if(L.isA(t)){return L;}else if(L.isA("sap.ui.core.VariantLayoutData")){var b=L.getMultipleLayoutData();for(var i=0;i<b.length;i++){var o=b[i];if(o.isA(t)){return o;}}}};a.prototype.onsapright=function(e){if(l.form.FormHelper.bArrowKeySupport){var r=sap.ui.getCore().getConfiguration().getRTL();if(!r){this.navigateForward(e);}else{this.navigateBack(e);}}};a.prototype.onsapleft=function(e){if(l.form.FormHelper.bArrowKeySupport){var r=sap.ui.getCore().getConfiguration().getRTL();if(!r){this.navigateBack(e);}else{this.navigateForward(e);}}};a.prototype.onsapdown=function(e){if(l.form.FormHelper.bArrowKeySupport){var c=e.srcControl;var n;var r=this.findElement(c);var E=r.element;c=r.rootControl;if(E&&E.isA("sap.ui.layout.form.FormElement")){n=this.findFieldBelow(c,E);}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){n=this.findFirstFieldOfNextElement(E,0);}if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.onsapup=function(e){if(l.form.FormHelper.bArrowKeySupport){var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;c=r.rootControl;if(E&&E.isA("sap.ui.layout.form.FormElement")){n=this.findFieldAbove(c,E);}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){var f=E.getParent();i=f.indexOfFormContainer(E);n=this.findLastFieldOfLastElementInPrevContainer(f,i-1);}if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.onsaphome=function(e){if(l.form.FormHelper.bArrowKeySupport){var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;var o=E.getParent();var f=o.getParent();i=f.indexOfFormContainer(o);n=this.findFirstFieldOfFirstElementInNextContainer(f,i);if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.onsaptop=function(e){if(l.form.FormHelper.bArrowKeySupport){var c=e.srcControl;var r=this.findElement(c);var E=r.element;var n;var o;if(E&&E.isA("sap.ui.layout.form.FormElement")){o=E.getParent();}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){o=E;}var f=o.getParent();n=this.findFirstFieldOfForm(f);if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.onsapend=function(e){if(l.form.FormHelper.bArrowKeySupport){var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;var o=E.getParent();var f=o.getParent();i=f.indexOfFormContainer(o);n=this.findLastFieldOfLastElementInPrevContainer(f,i);if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.onsapbottom=function(e){if(l.form.FormHelper.bArrowKeySupport){var c=e.srcControl;var r=this.findElement(c);var E=r.element;var n;var o;if(E&&E.isA("sap.ui.layout.form.FormElement")){o=E.getParent();}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){o=E;}var f=o.getParent();var b=f.getFormContainers();var L=b.length;n=this.findLastFieldOfLastElementInPrevContainer(f,L-1);if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.onsapexpand=function(e){var c=e.srcControl;var r=this.findElement(c);var E=r.element;var o;if(E.isA("sap.ui.layout.form.FormContainer")){o=E;}else{o=E.getParent();}if(o.getExpandable()&&c===o._oExpandButton){o.setExpanded(true);}};a.prototype.onsapcollapse=function(e){var c=e.srcControl;var r=this.findElement(c);var E=r.element;var o;if(E.isA("sap.ui.layout.form.FormContainer")){o=E;}else{o=E.getParent();}if(o.getExpandable()&&c===o._oExpandButton){o.setExpanded(false);}};a.prototype.onsapskipforward=function(e){var c=e.srcControl;var r=this.findElement(c);var E=r.element;c=r.rootControl;var n;var o;if(E&&E.isA("sap.ui.layout.form.FormElement")){o=E.getParent();}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){o=E;}var f=o.getParent();var i=f.indexOfFormContainer(o);n=this.findFirstFieldOfFirstElementInNextContainer(f,i+1);if(n){q.sap.focus(n);e.preventDefault();}};a.prototype.onsapskipback=function(e){var c=e.srcControl;var r=this.findElement(c);var E=r.element;c=r.rootControl;var n;var o;if(E&&E.isA("sap.ui.layout.form.FormElement")){o=E.getParent();}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){o=E;}var f=o.getParent();var b=f.getFormContainers();var i=f.indexOfFormContainer(o);while(!n&&i>0){var p=b[i-1];if(!p.getExpandable()||p.getExpanded()){n=this.findFirstFieldOfFirstElementInPrevContainer(f,i-1);}i=i-1;}if(n){q.sap.focus(n);e.preventDefault();}};a.prototype.onBeforeFastNavigationFocus=function(e){if(q.contains(this.getDomRef(),e.source)){e.srcControl=q(e.source).control(0);if(e.forward){this.onsapskipforward(e);}else{this.onsapskipback(e);}}else{var n=e.forward?this.findFirstFieldOfForm(this.getParent()):this.findFirstFieldOfLastContainerOfForm(this.getParent());if(n){q.sap.focus(n);e.preventDefault();}}};a.prototype.findElement=function(c){var e=c.getParent();var r=c;while(e&&!(e.isA("sap.ui.layout.form.FormElement"))&&!(e.isA("sap.ui.layout.form.FormContainer"))&&!(e.isA("sap.ui.layout.form.Form"))){r=e;e=e.getParent();}return({rootControl:r,element:e});};a.prototype.navigateForward=function(e){var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;c=r.rootControl;if(E&&E.isA("sap.ui.layout.form.FormElement")){if(c==E.getLabelControl()){i=-1;}else{i=E.indexOfField(c);}n=this.findNextFieldOfElement(E,i+1);if(!n){var o=E.getParent();i=o.indexOfFormElement(E);n=this.findFirstFieldOfNextElement(o,i+1);if(!n){var f=o.getParent();i=f.indexOfFormContainer(o);n=this.findFirstFieldOfFirstElementInNextContainer(f,i+1);}}}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){n=this.findFirstFieldOfNextElement(E,0);}if(n){q.sap.focus(n);e.preventDefault();}};a.prototype.tabForward=function(e){var f;var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;c=r.rootControl;if(E&&E.isA("sap.ui.layout.form.FormElement")){if(c==E.getLabelControl()){i=-1;}else{i=E.indexOfField(c);}n=this.findNextFieldOfElement(E,i+1,true);if(!n){var o=E.getParent();i=o.indexOfFormElement(E);n=this.findFirstFieldOfNextElement(o,i+1,true);if(!n){f=o.getParent();i=f.indexOfFormContainer(o);n=this.findFirstFieldOfFirstElementInNextContainer(f,i+1,true);}}}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){n=this.findFirstFieldOfNextElement(E,0,true);if(!n){f=E.getParent();i=f.indexOfFormContainer(E);n=this.findFirstFieldOfFirstElementInNextContainer(f,i+1,true);}}if(n){q.sap.focus(n);e.preventDefault();}};a.prototype.findNextFieldOfElement=function(e,s,t){var f=e.getFields();var L=f.length;var n;for(var i=s;i<L;i++){var o=f[i];var d=this._getDomRef(o);if(t==true){if((!o.getEditable||o.getEditable())&&(!o.getEnabled||o.getEnabled())&&d){n=d;break;}}else{if((!o.getEnabled||o.getEnabled())&&d){n=d;break;}}}return n;};a.prototype.findFirstFieldOfNextElement=function(c,s,t){var e=c.getFormElements();var L=e.length;var n;var i=s;while(!n&&i<L){var E=e[i];if(t==true){n=this.findNextFieldOfElement(E,0,true);}else{n=this.findNextFieldOfElement(E,0);}i++;}return n;};a.prototype.findFirstFieldOfForm=function(f){var c=f.getFormContainers();var n;var o=c[0];if(!o.getExpandable()||o.getExpanded()){n=this.findFirstFieldOfNextElement(o,0);}return n;};a.prototype.findFirstFieldOfLastContainerOfForm=function(f){var n;var c=f.getFormContainers();var i=c.length;while(!n&&i>=0){var p=c[i-1];if(!p.getExpandable()||p.getExpanded()){n=this.findFirstFieldOfFirstElementInPrevContainer(f,i-1);}i=i-1;}return n;};a.prototype.findFirstFieldOfFirstElementInNextContainer=function(f,s,t){var c=f.getFormContainers();var L=c.length;var n;var i=s;while(!n&&i<L){var o=c[i];if(o.getExpandable()&&t){n=o._oExpandButton.getFocusDomRef();if(n){break;}}if(!o.getExpandable()||o.getExpanded()){if(t==true){n=this.findFirstFieldOfNextElement(o,0,true);}else{n=this.findFirstFieldOfNextElement(o,0);}}i++;}return n;};a.prototype.findFirstFieldOfFirstElementInPrevContainer=function(f,s){var c=f.getFormContainers();var L=c.length;var n;var i=s;while(!n&&i<L&&i>=0){var o=c[i];if(!o.getExpandable()||o.getExpanded()){n=this.findFirstFieldOfNextElement(o,0);}i++;}return n;};a.prototype.navigateBack=function(e){var f;var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;c=r.rootControl;if(E&&E.isA("sap.ui.layout.form.FormElement")){if(c==E.getLabelControl()){i=0;}else{i=E.indexOfField(c);}n=this.findPrevFieldOfElement(E,i-1);if(!n){var o=E.getParent();i=o.indexOfFormElement(E);n=this.findLastFieldOfPrevElement(o,i-1);if(!n){f=o.getParent();i=f.indexOfFormContainer(o);n=this.findLastFieldOfLastElementInPrevContainer(f,i-1);}}}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){f=E.getParent();i=f.indexOfFormContainer(E);n=this.findLastFieldOfLastElementInPrevContainer(f,i-1);}if(n){q.sap.focus(n);e.preventDefault();}};a.prototype.tabBack=function(e){var f;var c=e.srcControl;var i=0;var n;var r=this.findElement(c);var E=r.element;c=r.rootControl;if(E&&E.isA("sap.ui.layout.form.FormElement")){if(c==E.getLabelControl()){i=0;}else{i=E.indexOfField(c);}n=this.findPrevFieldOfElement(E,i-1,true);if(!n){var o=E.getParent();i=o.indexOfFormElement(E);n=this.findLastFieldOfPrevElement(o,i-1,true);if(!n){f=o.getParent();i=f.indexOfFormContainer(o);if(o.getExpandable()){n=o._oExpandButton.getFocusDomRef();}if(!n){n=this.findLastFieldOfLastElementInPrevContainer(f,i-1,true);}}}}else if(E&&E.isA("sap.ui.layout.form.FormContainer")){f=E.getParent();i=f.indexOfFormContainer(E);n=this.findLastFieldOfLastElementInPrevContainer(f,i-1,true);}if(n){q.sap.focus(n);e.preventDefault();}};a.prototype.findPrevFieldOfElement=function(e,s,t){var f=e.getFields();var n;for(var i=s;i>=0;i--){var o=f[i];var d=this._getDomRef(o);if(t==true){if((!o.getEditable||o.getEditable())&&(!o.getEnabled||o.getEnabled())&&d){n=d;break;}}else{if((!o.getEnabled||o.getEnabled())&&d){n=d;break;}}}return n;};a.prototype.findLastFieldOfPrevElement=function(c,s,t){var e=c.getFormElements();var n;var i=s;while(!n&&i>=0){var E=e[i];var L=E.getFields().length;if(t==true){n=this.findPrevFieldOfElement(E,L-1,true);}else{n=this.findPrevFieldOfElement(E,L-1);}i--;}return n;};a.prototype.findLastFieldOfLastElementInPrevContainer=function(f,s,t){var c=f.getFormContainers();var n;var i=s;while(!n&&i>=0){var o=c[i];if(o.getExpandable()&&!o.getExpanded()&&t){n=o._oExpandButton.getFocusDomRef();if(n){break;}}if(!o.getExpandable()||o.getExpanded()){var L=o.getFormElements().length;if(t==true){n=this.findLastFieldOfPrevElement(o,L-1,true);}else{n=this.findLastFieldOfPrevElement(o,L-1,0);}}i--;}return n;};a.prototype.findFieldBelow=function(c,e){var o=e.getParent();var i=o.indexOfFormElement(e);var n=this.findFirstFieldOfNextElement(o,i+1);if(!n){var f=o.getParent();i=f.indexOfFormContainer(o);n=this.findFirstFieldOfFirstElementInNextContainer(f,i+1);}return n;};a.prototype.findFieldAbove=function(c,e){var o=e.getParent();var b=o.indexOfFormElement(e);var E=o.getFormElements();var n;var i=b-1;while(!n&&i>=0){var m=E[i];n=this.findPrevFieldOfElement(m,0);i--;}if(!n){var f=o.getParent();b=f.indexOfFormContainer(o);n=this.findLastFieldOfLastElementInPrevContainer(f,b-1);}return n;};a.prototype._getDomRef=function(c){var d=c.getFocusDomRef();if(!q(d).is(":sapFocusable")){d=undefined;}return d;};a.prototype.getContainerRenderedDomRef=function(c){if(this.getDomRef()){return q.sap.domById(c.getId());}else{return null;}};a.prototype.getElementRenderedDomRef=function(e){if(this.getDomRef()){return q.sap.domById(e.getId());}else{return null;}};return a;});
