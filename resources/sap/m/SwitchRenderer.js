/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library"],function(D,l){"use strict";var S=l.SwitchType;var a={};a.CSS_CLASS="sapMSwt";a.render=function(r,s){var b=s.getState(),c=b?s._sOn:s._sOff,t=s.getTooltip_AsString(),e=s.getEnabled(),n=s.getName(),A=sap.ui.getCore().getConfiguration().getAccessibility(),C=a.CSS_CLASS;r.write("<div");r.addClass(C+"Cont");if(!e){r.addClass(C+"ContDisabled");}r.writeClasses();r.writeStyles();r.writeControlData(s);if(e){r.writeAttribute("tabindex","0");}if(t){r.writeAttributeEscaped("title",t);}if(A){this.writeAccessibilityState(r,s);}r.write("><div");r.writeAttribute("id",s.getId()+"-switch");r.writeAttribute("aria-hidden","true");r.addClass(C);r.addClass(b?C+"On":C+"Off");r.addClass(C+s.getType());if(D.system.desktop&&e){r.addClass(C+"Hoverable");}if(!e){r.addClass(C+"Disabled");}r.writeClasses();r.write("><div");r.addClass(C+"Inner");r.writeAttribute("id",s.getId()+"-inner");r.writeClasses();r.write(">");this.renderText(r,s);this.renderHandle(r,s,c);r.write("</div>");r.write("</div>");if(n){this.renderCheckbox(r,s,c);}if(A){this.renderInvisibleElement(r,s,{id:s.getInvisibleElementId(),text:s.getInvisibleElementText(b)});}r.write("</div>");};a.renderText=function(r,s){var C=a.CSS_CLASS,d=s.getType()===S.Default;r.write("<div");r.addClass(C+"Text");r.addClass(C+"TextOn");r.writeAttribute("id",s.getId()+"-texton");r.writeClasses();r.write(">");r.write("<span");r.addClass(C+"Label");r.addClass(C+"LabelOn");r.writeClasses();r.write(">");if(d){r.writeEscaped(s._sOn);}r.write("</span>");r.write("</div>");r.write("<div");r.addClass(C+"Text");r.addClass(C+"TextOff");r.writeAttribute("id",s.getId()+"-textoff");r.writeClasses();r.write(">");r.write("<span");r.addClass(C+"Label");r.addClass(C+"LabelOff");r.writeClasses();r.write(">");if(d){r.writeEscaped(s._sOff);}r.write("</span>");r.write("</div>");};a.renderHandle=function(r,s,b){var C=a.CSS_CLASS;r.write("<div");r.writeAttribute("id",s.getId()+"-handle");r.writeAttributeEscaped("data-sap-ui-swt",b);r.addClass(C+"Handle");r.writeClasses();r.write("></div>");};a.renderCheckbox=function(r,s,b){r.write('<input type="checkbox"');r.writeAttribute("id",s.getId()+"-input");r.writeAttributeEscaped("name",s.getName());r.writeAttributeEscaped("value",b);if(s.getState()){r.writeAttribute("checked","checked");}if(!s.getEnabled()){r.writeAttribute("disabled","disabled");}r.write(">");};a.writeAccessibilityState=function(r,s){var A=s.getAriaLabelledBy(),m;if(A){A={value:s.getInvisibleElementId(),append:true};}m={role:"checkbox",checked:s.getState(),labelledby:A};r.writeAccessibilityState(s,m);};a.renderInvisibleElement=function(r,s,o){r.write("<span");r.writeAttribute("id",o.id);r.writeAttribute("aria-hidden","true");r.addClass("sapUiInvisibleText");r.writeClasses();r.write(">");r.writeEscaped(o.text);r.write("</span>");};return a;},true);
