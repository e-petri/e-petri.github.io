/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','./FormattedTextAnchorGenerator','./FormattedTextRenderer'],function(q,l,C,F,a){"use strict";var L=l.LinkConversion;var b=C.extend("sap.m.FormattedText",{metadata:{library:"sap.m",properties:{htmlText:{type:"string",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:L.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null}}}});var _={ATTRIBS:{'style':1,'class':1,'a::href':1,'a::target':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'abbr':1,'blockquote':1,'br':1,'cite':1,'code':1,'em':1,'h1':{cssClass:'sapMTitle sapMTitleStyleH1'},'h2':{cssClass:'sapMTitle sapMTitleStyleH2'},'h3':{cssClass:'sapMTitle sapMTitleStyleH3'},'h4':{cssClass:'sapMTitle sapMTitleStyleH4'},'h5':{cssClass:'sapMTitle sapMTitleStyleH5'},'h6':{cssClass:'sapMTitle sapMTitleStyleH6'},'p':1,'pre':1,'strong':1,'span':1,'u':1,'dl':1,'dt':1,'dd':1,'ol':1,'ul':1,'li':1}},c={ATTRIBS:{'a::href':1,'a::target':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'em':1,'strong':1,'u':1}};b.prototype._renderingRules=_;b.prototype.init=function(){};function s(t,e){var w;var f,v,g=t==="a";var h=this._renderingRules.ELEMENTS[t].cssClass||"";for(var i=0;i<e.length;i+=2){f=e[i];v=e[i+1];if(!this._renderingRules.ATTRIBS[f]&&!this._renderingRules.ATTRIBS[t+"::"+f]){w='FormattedText: <'+t+'> with attribute ['+f+'="'+v+'"] is not allowed';q.sap.log.warning(w,this);e[i+1]=null;continue;}if(f=="href"){if(!q.sap.validateUrl(v)){q.sap.log.warning("FormattedText: incorrect href attribute:"+v,this);e[i+1]="#";g=false;}}if(f=="target"){g=false;}if(h&&f.toLowerCase()=="class"){e[i+1]=h+" "+v;h="";}}if(g){e.push("target");e.push("_blank");}if(h){e.push("class");e.push(h);}return e;}function p(t,e){if(this._renderingRules.ELEMENTS[t]){return s.call(this,t,e);}else{var w='<'+t+'> is not allowed';q.sap.log.warning(w,this);}}function d(t){return q.sap._sanitizeHTML(t,{tagPolicy:p.bind(this),uriRewriter:function(u){if(q.sap.validateUrl(u)){return u;}}});}function o(e){var n=window.open();n.opener=null;n.location=e.currentTarget.href;e.preventDefault();}b.prototype.onAfterRendering=function(){this.$().find('a[target="_blank"]').on("click",o);};b.prototype._getDisplayHtml=function(){var t=this.getHtmlText(),A=this.getConvertLinksToAnchorTags();if(A===l.LinkConversion.None){return t;}t=F.generateAnchors(t,A,this.getConvertedLinksDefaultTarget());return d.call(this,t);};b.prototype.setHtmlText=function(t){return this.setProperty("htmlText",d.call(this,t));};b.prototype._setUseLimitedRenderingRules=function(e){this._renderingRules=e?c:_;};return b;});
