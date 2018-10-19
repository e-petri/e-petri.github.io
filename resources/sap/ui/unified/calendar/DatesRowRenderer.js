/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer','sap/ui/unified/calendar/CalendarDate','./MonthRenderer'],function(R,C,M){"use strict";var D=R.extend(M);D.getStartDate=function(d){return d._getStartDate();};D.getClass=function(r,d){var c="sapUiCalDatesRow sapUiCalRow";if(!d.getShowDayNamesLine()){c=c+" sapUiCalNoNameLine";}return c;};D.renderMonth=function(r,d,o){M.renderMonth.apply(this,arguments);this.renderWeekNumbers(r,d);};D.renderWeekNumbers=function(r,d){var o,i,a,w;if(d.getShowWeekNumbers()&&d.getPrimaryCalendarType()===sap.ui.core.CalendarType.Gregorian){o=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");r.write("<div id=\""+d.getId()+"-weeks\"");r.addClass("sapUiCalRowWeekNumbers");r.writeClasses();r.write(">");i=d.getDays();a=100/i;w=d.getWeekNumbers();w.forEach(function(W){r.write("<div");r.addClass('sapUiCalRowWeekNumber');r.writeClasses();r.addStyle("width",W.len*a+"%");r.writeStyles();r.writeAttribute("data-sap-ui-week",W.number);r.write(">"+o.getText('CALENDAR_DATES_ROW_WEEK_NUMBER',[W.number])+"</div>");});r.write("</div>");}};D.renderHeader=function(r,d,o){var l=d._getLocaleData();var i=d.getId();var a=d.getDays();var w="";if(d._getShowHeader()){r.write("<div id=\""+i+"-Head\">");this.renderHeaderLine(r,d,l,o);r.write("</div>");}w=(100/a)+"%";if(d.getShowDayNamesLine()){r.write("<div id=\""+i+"-Names\" style=\"display: inline;\">");this.renderDayNames(r,d,l,o.getDay(),a,false,w);r.write("</div>");}};D.renderHeaderLine=function(r,d,l,o){var I=d.getId();var a=d.getDays();var b=new C(o,d.getPrimaryCalendarType());var w="";var m=0;var c=[];var i=0;for(i=0;i<a;i++){m=b.getMonth();if(c.length>0&&c[c.length-1].iMonth==m){c[c.length-1].iDays++;}else{c.push({iMonth:m,iDays:1});}b.setDate(b.getDate()+1);}var e=l.getMonthsStandAlone("wide");for(i=0;i<c.length;i++){var f=c[i];w=(100/a*f.iDays)+"%";r.write("<div id=\""+I+"-Head"+i+"\"class=\"sapUiCalHeadText\" style=\"width:"+w+"\">");r.write(e[f.iMonth]);r.write("</div>");}};D.renderDays=function(r,d,o){var a=d.getDays();var w=(100/a)+"%";var s=d.getShowDayNamesLine();if(!o){o=d._getFocusedDate();}var h=this.getDayHelper(d,o);if(!s){if(d._bLongWeekDays||!d._bNamesLengthChecked){h.aWeekDays=h.oLocaleData.getDaysStandAlone("abbreviated");}else{h.aWeekDays=h.oLocaleData.getDaysStandAlone("narrow");}h.aWeekDaysWide=h.oLocaleData.getDaysStandAlone("wide");}var b=new C(o,d.getPrimaryCalendarType());for(var i=0;i<a;i++){this.renderDay(r,d,b,h,false,false,i,w,!s);b.setDate(b.getDate()+1);}};return D;},true);
