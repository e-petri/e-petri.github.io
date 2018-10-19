/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/library'],function(l){"use strict";var I=l.IconTabFilterDesign;var a={};a.render=function(r,c){if(!c.getVisible()){return;}var b=c.getItems(),d=b.length,v=c.getVisibleTabFilters(),V=v.length,e=0,t=c._checkTextOnly(b),n=c._checkNoText(b),f=c._checkInLine(b)||c.isInlineMode(),s=c.getShowOverflowSelectList(),o,g,h;var j=c.getParent();var u=j&&j instanceof sap.m.IconTabBar&&j.getUpperCase();r.write("<div role='tablist' ");r.addClass("sapMITH");r.addClass("sapContrastPlus");r.addClass("sapMITHBackgroundDesign"+c.getBackgroundDesign());if(s){r.addClass("sapMITHOverflowList");}if(c._scrollable){r.addClass("sapMITBScrollable");if(c._bPreviousScrollForward){r.addClass("sapMITBScrollForward");}else{r.addClass("sapMITBNoScrollForward");}if(c._bPreviousScrollBack){r.addClass("sapMITBScrollBack");}else{r.addClass("sapMITBNoScrollBack");}}else{r.addClass("sapMITBNotScrollable");}if(u){r.addClass("sapMITBTextUpperCase");}r.writeControlData(c);r.writeClasses();r.write(">");r.renderControl(c._getScrollingArrow("left"));r.write("<div id='"+c.getId()+"-scrollContainer' class='sapMITBScrollContainer'>");r.write("<div id='"+c.getId()+"-head'");r.addClass("sapMITBHead");if(t){r.addClass("sapMITBTextOnly");}if(n){r.addClass("sapMITBNoText");}if(f){r.addClass("sapMITBInLine");}r.writeClasses();r.write(">");for(var i=0;i<d;i++){o=b[i];o.render(r,e,V);if(o instanceof sap.m.IconTabFilter){g=o.getDesign()===I.Horizontal;if(g){h=true;}if(o.getVisible()){e++;}}}r.write("</div>");r.write("</div>");r.renderControl(c._getScrollingArrow("right"));if(s){var O=c._getOverflowButton();if(f){O.addStyleClass('sapMBtnInline');}else if(t){O.addStyleClass('sapMBtnTextOnly');}else if(n||h){O.addStyleClass('sapMBtnNoText');}r.renderControl(O);}r.write("</div>");};return a;},true);
