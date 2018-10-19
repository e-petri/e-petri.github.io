/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/core/Control','sap/ui/core/Locale','sap/ui/core/LocaleData','sap/ui/core/Renderer','sap/ui/core/format/DateFormat','./calendar/CalendarUtils','./calendar/Header','./calendar/MonthsRow','./calendar/YearPicker','./calendar/CalendarDate','./Calendar','./CalendarRenderer',"./CalendarMonthIntervalRenderer"],function(q,D,C,L,a,R,b,c,H,M,Y,d,e,f,g){"use strict";var h=C.extend("sap.ui.unified.CalendarMonthInterval",{metadata:{library:"sap.ui.unified",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},startDate:{type:"object",group:"Data"},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},months:{type:"int",group:"Appearance",defaultValue:12},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},header:{type:"sap.ui.unified.calendar.Header",multiple:false,visibility:"hidden"},monthsRow:{type:"sap.ui.unified.calendar.MonthsRow",multiple:false,visibility:"hidden"},yearPicker:{type:"sap.ui.unified.calendar.YearPicker",multiple:false,visibility:"hidden"},calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},cancel:{},startDateChange:{}}}});h.prototype.init=function(){this._iMode=0;this.data("sap-ui-fastnavgroup","true",true);this._oYearFormat=b.getDateInstance({format:"y"});this._oMinDate=c._minDate();this._oMaxDate=c._maxDate();this._initializeHeader();this._initializeMonthsRow();this._initilizeYearPicker();this._iDaysMonthsHead=15;};h.prototype.exit=function(){if(this._sInvalidateContent){q.sap.clearDelayedCall(this._sInvalidateContent);}};h.prototype.onBeforeRendering=function(){var J=this.getAggregation("monthsRow");var K=this._getFocusedDate();n.call(this);J.displayDate(K.toLocalJSDate());};h.prototype._initializeHeader=function(){var J=new H(this.getId()+"--Head",{visibleButton0:false,visibleButton1:false,visibleButton2:true});J.attachEvent("pressPrevious",this._handlePrevious,this);J.attachEvent("pressNext",this._handleNext,this);J.attachEvent("pressButton2",u,this);this.setAggregation("header",J);};h.prototype._initializeMonthsRow=function(){var J=new M(this.getId()+"--MonthsRow");J.attachEvent("focus",x,this);J.attachEvent("select",w,this);J._bNoThemeChange=true;this.setAggregation("monthsRow",J);};h.prototype._initilizeYearPicker=function(){this.setAggregation("yearPicker",this._createYearPicker());};h.prototype._createYearPicker=function(){var J=new Y(this.getId()+"--YP",{columns:0,years:6});J.attachEvent("select",z,this);J.attachEvent("pageChange",G,this);J._oMinDate.setYear(this._oMinDate.getYear());J._oMaxDate.setYear(this._oMaxDate.getYear());return J;};h.prototype._getCalendarPicker=function(){var J=this.getAggregation("calendarPicker");if(!J){J=new I(this.getId()+"--Cal");J.setPopupMode(true);J.attachEvent("select",y,this);J.attachEvent("cancel",function(K){this._oPopup.close();q.sap.focus(this.getAggregation("header").getDomRef("B2"));},this);this.setAggregation("calendarPicker",J);}return J;};h.prototype.setStartDate=function(S){c._checkJSDateObject(S);if(q.sap.equal(this.getStartDate(),S)){return this;}var J=S.getFullYear();c._checkYearInValidRange(J);this.setProperty("startDate",S,true);this._oStartDate=d.fromLocalJSDate(S);this._oStartDate.setDate(1);var K=this.getAggregation("monthsRow");K.setStartDate(S);n.call(this);var N=this._getFocusedDate().toLocalJSDate();if(!K.checkDateFocusable(N)){this._setFocusedDate(this._oStartDate);K.displayDate(S);}return this;};h.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&this._iMode==0&&!this._sInvalidateContent){this._sInvalidateContent=q.sap.delayedCall(0,this,A);}};h.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var J=this.removeAllAggregation("selectedDates");return J;};h.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var J=this.destroyAggregation("selectedDates");return J;};h.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var J=this.removeAllAggregation("specialDates");return J;};h.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var J=this.destroyAggregation("specialDates");return J;};h.prototype.setLocale=function(J){if(this._sLocale!=J){this._sLocale=J;this._oLocaleData=undefined;this.invalidate();}return this;};h.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};h.prototype._getFocusedDate=function(){if(!this._oFocusedDate){k.call(this);}return this._oFocusedDate;};h.prototype._setFocusedDate=function(J){c._checkCalendarDate(J);this._oFocusedDate=new d(J);};h.prototype.focusDate=function(J){var K=false;var N=this.getAggregation("monthsRow");if(J&&!N.checkDateFocusable(J)){B.call(this,d.fromLocalJSDate(J));K=true;}t.call(this,J,false);if(K){this.fireStartDateChange();}return this;};h.prototype.displayDate=function(J){t.call(this,J,true);return this;};h.prototype.setMonths=function(J){this.setProperty("months",J,true);J=this._getMonths();var K=this.getAggregation("monthsRow");K.setMonths(J);if(!K.checkDateFocusable(this._getFocusedDate().toLocalJSDate())){var S=i.call(this);this._setFocusedDate(this._oStartDate);K.setDate(S.toLocalJSDate());}if(!this.getPickerPopup()){var N=this.getAggregation("yearPicker");var O=Math.floor(J/2);if(O>20){O=20;}N.setYears(O);}n.call(this);if(this.getDomRef()){if(this._getShowItemHeader()){this.$().addClass("sapUiCalIntHead");}else{this.$().removeClass("sapUiCalIntHead");}}return this;};h.prototype._getMonths=function(){var J=this.getMonths();if(D.system.phone&&J>6){return 6;}else{return J;}};h.prototype._getLocaleData=function(){if(!this._oLocaleData){var J=this.getLocale();var K=new L(J);this._oLocaleData=a.getInstance(K);}return this._oLocaleData;};h.prototype.setPickerPopup=function(P){var J;this.setProperty("pickerPopup",P,true);if(P){if(this.getAggregation("yearPicker")){this.getAggregation("yearPicker").destroy();}}else{if(!this.getAggregation("yearPicker")){this.setAggregation("yearPicker",this._createYearPicker());}J=this.getAggregation("yearPicker");J.setColumns(0);J.setYears(6);}return this;};h.prototype.setMinDate=function(J){if(q.sap.equal(J,this.getMinDate())){return this;}if(!J){this._oMinDate=c._minDate();}else{c._checkJSDateObject(J);this._oMinDate=d.fromLocalJSDate(J);this._oMinDate.setDate(1);var K=this._oMinDate.getYear();c._checkYearInValidRange(K);if(this._oMaxDate.isBefore(this._oMinDate)){q.sap.log.warning("minDate > maxDate -> maxDate set to end of the month",this);this._oMaxDate=d.fromLocalJSDate(J);this._oMaxDate.setDate(c._daysInMonth(this._oMaxDate));this.setProperty("maxDate",this._oMaxDate.toLocalJSDate(),true);}if(this._oFocusedDate){if(this._oFocusedDate.isBefore(this._oMinDate)){q.sap.log.warning("focused date < minDate -> minDate focused",this);this.focusDate(J);}}if(this._oStartDate&&this._oStartDate.isBefore(this._oMinDate)){q.sap.log.warning("start date < minDate -> minDate set as start date",this);_.call(this,new d(this._oMinDate),true,true);}}this.setProperty("minDate",J,false);if(this.getPickerPopup()){var N=this._getCalendarPicker();N.setMinDate(J);}else{var O=this.getAggregation("yearPicker");O._oMinDate.setYear(this._oMinDate.getYear());}return this;};h.prototype.setMaxDate=function(J){if(q.sap.equal(J,this.getMaxDate())){return this;}if(!J){this._oMaxDate=c._maxDate();}else{c._checkJSDateObject(J);this._oMaxDate=d.fromLocalJSDate(J);this._oMaxDate.setDate(c._daysInMonth(this._oMaxDate));var K=this._oMaxDate.getYear();c._checkYearInValidRange(K);if(this._oMinDate.isAfter(this._oMaxDate)){q.sap.log.warning("maxDate < minDate -> minDate set to begin of the month",this);this._oMinDate=d.fromLocalJSDate(J);this._oMinDate.setDate(1);this.setProperty("minDate",this._oMinDate.toLocalJSDate(),true);}if(this._oFocusedDate){if(this._oFocusedDate.isAfter(this._oMaxDate)){q.sap.log.warning("focused date > maxDate -> maxDate focused",this);this.focusDate(J);}}if(this._oStartDate){var N=new d(this._oStartDate);N.setDate(1);N.setMonth(N.getMonth()+this._getMonths());N.setDate(0);if(N.isAfter(this._oMaxDate)){var S=new d(this._oMaxDate);S.setDate(1);S.setMonth(S.getMonth()-this._getMonths()+1);if(S.isSameOrAfter(this._oMinDate)){q.sap.log.warning("end date > maxDate -> maxDate set as end date",this);_.call(this,S,true,true);}}}}this.setProperty("maxDate",J,false);if(this.getPickerPopup()){var O=this._getCalendarPicker();O.setMaxDate(J);}else{var P=this.getAggregation("yearPicker");P._oMaxDate.setYear(this._oMaxDate.getYear());}return this;};h.prototype.onclick=function(J){if(J.isMarked("delayedMouseEvent")){return;}if(J.target.id==this.getId()+"-cancel"){this.onsapescape(J);}};h.prototype.onmousedown=function(J){J.preventDefault();J.setMark("cancelAutoClose");};h.prototype.onsapescape=function(J){if(this.getPickerPopup()){v.call(this);this.fireCancel();}else{switch(this._iMode){case 0:this.fireCancel();break;case 1:m.call(this);break;}}};h.prototype.onsaptabnext=function(J){var K=this.getAggregation("header"),N,O;if(q.sap.containsOrEquals(this.getDomRef("content"),J.target)){q.sap.focus(K.getDomRef("B2"));if(!this._bPoupupMode){O=this.getAggregation("monthsRow");q(O._oItemNavigation.getItemDomRefs()[O._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");if(!this.getPickerPopup()){N=this.getAggregation("yearPicker");if(N.getDomRef()){q(N._oItemNavigation.getItemDomRefs()[N._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}J.preventDefault();}};h.prototype.onsaptabprevious=function(J){var K=this.getAggregation("header"),N,O;if(q.sap.containsOrEquals(this.getDomRef("content"),J.target)){if(this._bPoupupMode){q.sap.focus(K.getDomRef("B2"));J.preventDefault();}}else if(J.target.id==K.getId()+"-B2"){switch(this._iMode){case 0:N=this.getAggregation("monthsRow");N._oItemNavigation.focusItem(N._oItemNavigation.getFocusedIndex());break;case 1:if(!this.getPickerPopup()){O=this.getAggregation("yearPicker");O._oItemNavigation.focusItem(O._oItemNavigation.getFocusedIndex());}break;}J.preventDefault();}};h.prototype.onfocusin=function(J){if(J.target.id==this.getId()+"-end"){var K=this.getAggregation("header"),N,O;q.sap.focus(K.getDomRef("B2"));if(!this._bPoupupMode){N=this.getAggregation("monthsRow");q(N._oItemNavigation.getItemDomRefs()[N._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");if(!this.getPickerPopup()){O=this.getAggregation("yearPicker");if(O.getDomRef()){q(O._oItemNavigation.getItemDomRefs()[O._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}}this.$("end").attr("tabindex","-1");};h.prototype.onsapfocusleave=function(J){var K,N;if(!J.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(J.relatedControlId).getFocusDomRef())){this.$("end").attr("tabindex","0");if(!this._bPoupupMode){switch(this._iMode){case 0:K=this.getAggregation("monthsRow");q(K._oItemNavigation.getItemDomRefs()[K._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");break;case 1:if(!this.getPickerPopup()){N=this.getAggregation("yearPicker");q(N._oItemNavigation.getItemDomRefs()[N._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;}}}};h.prototype._handlePrevious=function(J){var K,N,S,O;switch(this._iMode){case 0:K=this._getFocusedDate();N=this._getMonths();S=new d(i.call(this));S.setMonth(S.getMonth()-N);K.setMonth(K.getMonth()-N);this._setFocusedDate(K);_.call(this,S,true);break;case 1:if(!this.getPickerPopup()){O=this.getAggregation("yearPicker");O.previousPage();p.call(this);}break;}};h.prototype._handleNext=function(J){var K,N,S,O;switch(this._iMode){case 0:K=this._getFocusedDate();N=this._getMonths();S=new d(i.call(this));S.setMonth(S.getMonth()+N);K.setMonth(K.getMonth()+N);this._setFocusedDate(K);_.call(this,S,true);break;case 1:if(!this.getPickerPopup()){O=this.getAggregation("yearPicker");O.nextPage();p.call(this);}break;}};h.prototype._showOverlay=function(){this.$("contentOver").css("display","");};h.prototype._hideOverlay=function(){this.$("contentOver").css("display","none");};h.prototype._getShowItemHeader=function(){var J=this.getMonths();if(J>this._iDaysMonthsHead){return true;}else{return false;}};function _(S,J,K){var N=new d(this._oMaxDate);N.setDate(1);N.setMonth(N.getMonth()-this._getMonths()+1);if(N.isBefore(this._oMinDate)){N=new d(this._oMinDate);N.setMonth(N.getMonth()+this._getMonths()-1);}if(S.isBefore(this._oMinDate)){S=new d(this._oMinDate);}else if(S.isAfter(N)){S=N;}S.setDate(1);var O=S.toLocalJSDate();this.setProperty("startDate",O,true);this._oStartDate=S;var P=this.getAggregation("monthsRow");P.setStartDate(O);n.call(this);if(J){var Q=this._getFocusedDate().toLocalJSDate();if(!P.checkDateFocusable(Q)){this._setFocusedDate(S);P.setDate(O);}else{P.setDate(Q);}}if(!K){this.fireStartDateChange();}}function i(){if(!this._oStartDate){this._oStartDate=this._getFocusedDate();this._oStartDate.setDate(1);}return this._oStartDate;}function j(N){var J=this._getFocusedDate();var K=this.getAggregation("monthsRow");if(!N){K.setDate(J.toLocalJSDate());}else{K.displayDate(J.toLocalJSDate());}n.call(this);}function k(){var S=this.getSelectedDates();if(S&&S[0]&&S[0].getStartDate()){this._oFocusedDate=d.fromLocalJSDate(S[0].getStartDate());}else{this._oFocusedDate=new d();}this._oFocusedDate.setDate(1);if(this._oFocusedDate.isBefore(this._oMinDate)){this._oFocusedDate=new d(this._oMinDate);}else if(this._oFocusedDate.isAfter(this._oMaxDate)){this._oFocusedDate=new d(this._oMaxDate);}}function l(){var J=this._getFocusedDate();var K=this.getAggregation("yearPicker");if(K.getDomRef()){K.$().css("display","");}else{var N=sap.ui.getCore().createRenderManager();var $=this.$("content");N.renderControl(K);N.flush($[0],false,true);N.destroy();}this._showOverlay();K.setDate(J.toLocalJSDate());if(this._iMode==0){var O=this.getAggregation("monthsRow");q(O._oItemNavigation.getItemDomRefs()[O._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}p.call(this);this._iMode=1;}function m(N){this._iMode=0;var J=this.getAggregation("yearPicker");J.$().css("display","none");this._hideOverlay();if(!N){j.call(this);var K=this.getAggregation("monthsRow");q(K._oItemNavigation.getItemDomRefs()[K._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}function n(){r.call(this);o.call(this);}function o(){var J=new d(i.call(this));var K=this._getMonths();var N=J.getYear();var O=this._oMaxDate.getYear();var P=this._oMinDate.getYear();var Q=J.getMonth();var S=this._oMaxDate.getMonth();var T=this._oMinDate.getMonth();var U=this.getAggregation("header");if(N<P||(N==P&&Q<=T)){U.setEnabledPrevious(false);}else{U.setEnabledPrevious(true);}J.setMonth(J.getMonth()+K-1);N=J.getYear();Q=J.getMonth();if(N>O||(N==O&&Q>=S)){U.setEnabledNext(false);}else{U.setEnabledNext(true);}}function p(){var J=this.getAggregation("yearPicker");var K=J.getYears();var N=d.fromLocalJSDate(J.getFirstRenderedDate());N.setYear(N.getYear()+Math.floor(K/2));var O=this.getAggregation("header");var P=new d(this._oMaxDate);P.setYear(P.getYear()-Math.ceil(K/2));P.setMonth(11,31);var Q=new d(this._oMinDate);Q.setYear(Q.getYear()+Math.floor(K/2)+1);Q.setMonth(0,1);O.setEnabledNext(!N.isAfter(P));O.setEnabledPrevious(!N.isBefore(Q));}function r(){var T;var S=i.call(this);var J=this._oYearFormat.format(S.toUTCJSDate(),true);var K=new d(S);K.setMonth(K.getMonth()+this._getMonths()-1);var N=this._oYearFormat.format(K.toUTCJSDate(),true);if(J!=N){var O=this._getLocaleData();var P=O.getIntervalPattern();T=P.replace(/\{0\}/,J).replace(/\{1\}/,N);}else{T=J;}var Q=this.getAggregation("header");Q.setTextButton2(T);}function s(J,N){var K;var O=false;if(J.isBefore(this._oMinDate)){K=this._oMinDate;O=true;}else if(J.isAfter(this._oMaxDate)){K=this._oMaxDate;O=true;}else{K=J;}this._setFocusedDate(K);if(O||N){B.call(this,K);j.call(this,false);this.fireStartDateChange();}}function t(J,S){if(!J){return;}var K=d.fromLocalJSDate(J);if(this._oFocusedDate&&this._oFocusedDate.isSame(K)){return;}var N=K.getYear();c._checkYearInValidRange(N);if(c._isOutside(K,this._oMinDate,this._oMaxDate)){throw new Error("Date must not be in valid range (minDate and maxDate); "+this);}this._setFocusedDate(K);if(this.getDomRef()&&this._iMode==0){j.call(this,S);}}function u(J){if(this.getPickerPopup()){this._showCalendarPicker();}else{if(this._iMode!=1){l.call(this);}else{m.call(this);}}}h.prototype._showCalendarPicker=function(){var J=this._getFocusedDate(true).toLocalJSDate();var K=this._getCalendarPicker();var S=new sap.ui.unified.DateRange({startDate:J});K.displayDate(J,false);K.removeAllSelectedDates();K.addSelectedDate(S);K.setMinDate(this.getMinDate());K.setMaxDate(this.getMaxDate());E.call(this,K);this._showOverlay();};function v(N){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();}this._hideOverlay();if(!N){j.call(this);var J=this.getAggregation("monthsRow");q(J._oItemNavigation.getItemDomRefs()[J._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}function w(J){this.fireSelect();}function x(J){var K=d.fromLocalJSDate(J.getParameter("date"));var N=J.getParameter("notVisible");s.call(this,K,N);}function y(J){var K=new d(this._getFocusedDate());var N=this._getCalendarPicker();var S=N.getSelectedDates()[0].getStartDate();var O=d.fromLocalJSDate(S);O.setMonth(K.getMonth());O.setDate(K.getDate());s.call(this,O,true);v.call(this);}function z(J){var K=new d(this._getFocusedDate());var N=this.getAggregation("yearPicker");var O=d.fromLocalJSDate(N.getDate());O.setMonth(K.getMonth());O.setDate(K.getDate());K=O;s.call(this,K,true);m.call(this);}function A(){this._sInvalidateContent=undefined;var J=this.getAggregation("monthsRow");J._bDateRangeChanged=true;J._bInvalidateSync=true;J.invalidate();J._bInvalidateSync=undefined;this._bDateRangeChanged=undefined;}function B(J){var K=this.getAggregation("monthsRow");var S=i.call(this);var N=K._oItemNavigation.getFocusedIndex();S=new d(J);S.setMonth(S.getMonth()-N);_.call(this,S,false,true);}function E(P){if(!this._oPopup){q.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup();this._oPopup.setAutoClose(true);this._oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.setDurations(0,0);this._oPopup._oCalendar=this;this._oPopup.attachClosed(F,this);this._oPopup.onsapescape=function(N){this._oCalendar.onsapescape(N);};}this._oPopup.setContent(P);var J=this.getAggregation("header");var K=sap.ui.core.Popup.Dock;this._oPopup.open(0,K.CenterTop,K.CenterTop,J,null,"flipfit",true);}function F(J){v.call(this);}function G(J){p.call(this);}var I=e.extend("CustomYearPicker",{renderer:R.extend(f)});I.prototype._initializeHeader=function(){var J=new H(this.getId()+"--Head",{visibleButton1:false});J.attachEvent("pressPrevious",this._handlePrevious,this);J.attachEvent("pressNext",this._handleNext,this);J.attachEvent("pressButton2",this._handleButton2,this);this.setAggregation("header",J);};I.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);var J=this.getAggregation("header");J.$("B2").css("background-color","inherit").css("color","inherit").css("cursor","inherit").css("pointer-events","none");this._showYearPicker();};I.prototype.onThemeChanged=function(){e.prototype.onThemeChanged.apply(this,arguments);var J=this.getAggregation("header");J.$("B2").css("background-color","inherit").css("color","inherit").css("cursor","inherit").css("pointer-events","none");};I.prototype._selectYear=function(){var J=this.getAggregation("yearPicker");var K=this.getSelectedDates()[0];if(!K){K=new sap.ui.unified.DateRange();}K.setStartDate(J.getDate());this.addSelectedDate(K);this.fireSelect();};I.prototype.onsapescape=function(J){this.fireCancel();};I.prototype._shouldFocusB2OnTabPrevious=function(J){return false;};return h;});