/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/ResizeHandler","./library","sap/ui/core/delegate/ScrollEnablement","./FixFlexRenderer"],function(q,C,E,R,l,S,F){"use strict";var a=C.extend("sap.ui.layout.FixFlex",{metadata:{library:"sap.ui.layout",properties:{vertical:{type:"boolean",group:"Appearance",defaultValue:true},fixFirst:{type:"boolean",group:"Misc",defaultValue:true},fixContentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},minFlexSize:{type:"int",defaultValue:0}},aggregations:{fixContent:{type:"sap.ui.core.Control",multiple:true,singularName:"fixContent"},flexContent:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/ui/layout/designtime/FixFlex.designtime"}});E.call(a.prototype);a.prototype.init=function(){this._scroller=new S(this,null,{scrollContainerId:this.getId()});this._innerScroller=new S(this,this.getId()+"-FlexibleContainer",{scrollContainerId:this.getId()+"-Flexible"});};a.prototype.getScrollDelegate=function(){return this._innerScroller;};a.prototype._handlerResizeNoFlexBoxSupport=function(){var c=this.$(),f,$;if(!c.is(":visible")){return;}f=this.$("Fixed");$=this.$("Flexible");f.removeAttr("style");$.removeAttr("style");if(this.getVertical()){if(this.getFixContentSize()!=='auto'){f.height(this.getFixContentSize());}$.height(Math.floor(c.height()-f.height()));}else{if(this.getFixContentSize()!=='auto'){f.width(this.getFixContentSize());$.width(Math.floor(c.width()-f.width()));}else{$.width(Math.floor(c.width()-f.width()));f.width(Math.floor(f.width()));}}};a.prototype._deregisterControl=function(){if(this.sResizeListenerNoFlexBoxSupportId){R.deregister(this.sResizeListenerNoFlexBoxSupportId);this.sResizeListenerNoFlexBoxSupportId=null;}if(this.sResizeListenerNoFlexBoxSupportFixedId){R.deregister(this.sResizeListenerNoFlexBoxSupportFixedId);this.sResizeListenerNoFlexBoxSupportFixedId=null;}if(this.sResizeListenerFixFlexScroll){R.deregister(this.sResizeListenerFixFlexScroll);this.sResizeListenerFixFlexScroll=null;}if(this.sResizeListenerFixFlexScrollFlexPart){R.deregister(this.sResizeListenerFixFlexScrollFlexPart);this.sResizeListenerFixFlexScrollFlexPart=null;}if(this.sResizeListenerFixFlexContainerScroll){R.deregister(this.sResizeListenerFixFlexContainerScroll);this.sResizeListenerFixFlexContainerScroll=null;}};a.prototype._changeScrolling=function(){var n,d,$=this.$(),b=this.getMinFlexSize(),i=this.getVertical();if(i){n=this.$().height()-this.$("Fixed").height();d="height";}else{n=this.$().width()-this.$("Fixed").width();d="width";}if(n<=parseInt(this.getMinFlexSize(),10)){$.addClass("sapUiFixFlexScrolling");$.removeClass("sapUiFixFlexInnerScrolling");if(i){this._scroller.setVertical(true);this._innerScroller.setVertical(false);}else{this._scroller.setHorizontal(true);this._innerScroller.setHorizontal(false);}if(this.$("FlexibleContainer").children().height()>b){this.$("Flexible").attr("style","min-"+d+":"+b+"px");}else{this.$("Flexible").attr("style",d+":"+b+"px");}}else{$.addClass("sapUiFixFlexInnerScrolling");$.removeClass("sapUiFixFlexScrolling");if(i){this._scroller.setVertical(false);this._innerScroller.setVertical(true);}else{this._scroller.setHorizontal(false);this._innerScroller.setHorizontal(true);}this._changeFlexibleContainerScroll();this.$("Flexible").removeAttr("style");}};a.prototype._changeFlexibleContainerScroll=function(){var $=this.$("FlexibleContainer"),c=$.height(),b=$.children().height();if(c==b){return;}if(c>b){$.removeClass('sapUiFixFlexFlexibleContainerGrowing');}else{$.addClass('sapUiFixFlexFlexibleContainerGrowing');}};a.prototype.exit=function(){this._deregisterControl();if(this._scroller){this._scroller.destroy();this._scroller=null;}if(this._innerScroller){this._innerScroller.destroy();this._innerScroller=null;}};a.prototype.onBeforeRendering=function(){var s=this._scroller,i=this._innerScroller,b=this.getMinFlexSize()!=0;this._deregisterControl();s.setVertical(false);s.setHorizontal(false);i.setVertical(b);i.setHorizontal(b);};a.prototype.onAfterRendering=function(){if(!q.support.hasFlexBoxSupport){this.sResizeListenerNoFlexBoxSupportFixedId=R.register(this.getDomRef("Fixed"),q.proxy(this._handlerResizeNoFlexBoxSupport,this));this.sResizeListenerNoFlexBoxSupportId=R.register(this.getDomRef(),q.proxy(this._handlerResizeNoFlexBoxSupport,this));this._handlerResizeNoFlexBoxSupport();}if(this.getMinFlexSize()!==0){this.sResizeListenerFixFlexScroll=R.register(this.getDomRef(),q.proxy(this._changeScrolling,this));this.sResizeListenerFixFlexScrollFlexPart=R.register(this.getDomRef("Fixed"),q.proxy(this._changeScrolling,this));var f=this.$("FlexibleContainer").children()[0];if(f){this.sResizeListenerFixFlexContainerScroll=R.register(f,q.proxy(this._changeFlexibleContainerScroll,this));}this._changeScrolling();}};return a;});
