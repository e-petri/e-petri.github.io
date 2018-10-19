/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Input','./Tokenizer','./Token','./library','sap/ui/core/EnabledPropagator','sap/ui/base/ManagedObjectMetadata','sap/ui/Device','./MultiInputRenderer','jquery.sap.keycodes'],function(q,I,T,a,l,E,M,D,b){"use strict";var c=I.extend("sap.m.MultiInput",{metadata:{library:"sap.m",designtime:"sap/m/designtime/MultiInput.designtime",properties:{enableMultiLineMode:{type:"boolean",group:"Behavior",defaultValue:false},maxTokens:{type:"int",group:"Behavior"}},aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},tokenizer:{type:"sap.m.Tokenizer",multiple:false,visibility:"hidden"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},tokenUpdate:{allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}}}});E.apply(c.prototype,[true]);var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");c.prototype.init=function(){I.prototype.init.call(this);this._bIsValidating=false;this._tokenizer=new T();this.setAggregation("tokenizer",this._tokenizer);this._tokenizer.attachTokenChange(this._onTokenChange,this);this._tokenizer.attachTokenUpdate(this._onTokenUpdate,this);this.setShowValueHelp(true);this.setShowSuggestion(true);this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);this.attachValueHelpRequest(function(){this._bValueHelpOpen=true;},this);};c.prototype._onTokenChange=function(d){var t=this.getTokens(),L=t.length;this.fireTokenChange(d.getParameters());this.invalidate();if(this._bUseDialog&&this._tokenizer.getParent()instanceof sap.m.Dialog){this._showAllTokens();return;}var f=q.sap.containsOrEquals(this.getDomRef(),document.activeElement);if(d.getParameter("type")==="tokensChanged"&&d.getParameter("removedTokens").length>0&&f){this.focus();}if(d.getParameter("type")==="added"&&L>1&&this.getEditable()&&this._isMultiLineMode&&!this.$("border").hasClass("sapMMultiInputMultiModeBorder")){this._showIndicator();}if(d.getParameter("type")==="removed"&&this._isMultiLineMode){if(L<2){this._removeIndicator();}}};c.prototype._onTokenUpdate=function(d){var e=this.fireTokenUpdate(d.getParameters());if(!e){d.preventDefault();}else{this.invalidate();}};c.prototype._onSuggestionItemSelected=function(e){var i=null,t=null,d=this,o=this._tokenizer.getTokens().length;if(this.getMaxTokens()&&o>=this.getMaxTokens()||this._bValueHelpOpen){return;}if(this._hasTabularSuggestions()){i=e.getParameter("selectedRow");}else{i=e.getParameter("selectedItem");if(i){t=new a({text:i.getText(),key:i.getKey()});}}if(i){var f=this.getValue();this._tokenizer._addValidateToken({text:f,token:t,suggestionObject:i,validationCallback:function(v){if(v){d.setValue("");}}});}if(this._bUseDialog&&this._tokenizer.getParent()instanceof sap.m.Dialog){var n=this._tokenizer.getTokens().length;if(o<n){this.setValue("");}if(this._tokenizer.getVisible()===false){this._tokenizer.setVisible(true);}if(this._oList instanceof sap.m.Table){this._oList.addStyleClass("sapMInputSuggestionTableHidden");}else{this._oList.destroyItems();}var s=this._oSuggestionPopup.getScrollDelegate();if(s){s.scrollTo(0,0,0);}this._oPopupInput.focus();}};c.prototype._onLiveChange=function(e){this._tokenizer._removeSelectedTokens();if(this._bUseDialog&&this._isMultiLineMode){var v=e.getParameter("newValue");if(this._oSuggestionPopup&&this._oSuggestionPopup.getContent().length>1&&v.length>0){this._tokenizer.setVisible(false);}else{this._tokenizer.setVisible(true);}}};c.prototype._showIndicator=function(){var t=this.getTokens(),i=t.length;this._tokenizer.setVisible(true);if(i>1){if(this.$().find(".sapMMultiInputIndicator").length!==0){this._removeIndicator();}var s="<span class=\"sapMMultiInputIndicator\">"+r.getText("MULTIINPUT_SHOW_MORE_TOKENS",i-1)+"</span>";this.$().find(".sapMMultiInputInputContainer").prepend(s);this._setValueInvisible();this._bShowIndicator=true;}};c.prototype._setValueInvisible=function(){this.$("inner").css("opacity","0");};c.prototype._setValueVisible=function(){this.$("inner").css("opacity","1");};c.prototype._showAllTokens=function(){this._tokenizer.setVisible(true);this._removeIndicator();};c.prototype._removeIndicator=function(){this.$().find(".sapMMultiInputIndicator").remove();this._bShowIndicator=false;};c.prototype.setEnableMultiLineMode=function(m){this.setProperty("enableMultiLineMode",m,true);if(m){this.$().addClass("sapMMultiInputMultiLine");}else{this.$().removeClass("sapMMultiInputMultiLine");}this.closeMultiLine();var t=this;if(this._bUseDialog){m=true;}if(m){if(this.getEditable()){this._showIndicator();}this._isMultiLineMode=true;if(this.getDomRef()){setTimeout(function(){t._tokenizer.scrollToEnd();},0);}}else{this._isMultiLineMode=false;this._showAllTokens();this._setValueVisible();if(this.getDomRef()){setTimeout(function(){t._tokenizer.scrollToEnd();},0);}}return this;};c.prototype._openMultiLineOnPhone=function(){var t=this;if(!this.getEditable()){return;}this._oSuggestionPopup.open();this._oSuggestionPopup.insertContent(this._tokenizer,0);this._tokenizer.setReverseTokens(true);var v=this._oPopupInput.getValue();if(this._oSuggestionPopup&&this._oSuggestionPopup.getContent().length>1&&v.length>0){this._tokenizer.setVisible(false);}else{this._tokenizer.setVisible(true);}this._tokenizer._oScroller.setHorizontal(false);this._tokenizer.addStyleClass("sapMTokenizerMultiLine");if(this._oSuggestionTable.getItems().length===0){this._oPopupInput.onsapenter=function(e){t.onChange(e,null,this.getValue());t._validateCurrentText();t._setValueInvisible();};}};c.prototype.onmousedown=function(e){if(e.target==this.getDomRef('border')){e.preventDefault();e.stopPropagation();}};c.prototype._openMultiLineOnDesktop=function(){var t=this;this._setValueVisible();this.$("border").addClass("sapMMultiInputMultiModeBorder");if(this._$input){this._$input.parents('.sapMMultiInputBorder').addClass("sapMMultiInputMultiModeInputContainer");}this.$().find(".sapMInputValHelp").attr("tabindex","-1");var p=this.getParent();this._originalOverflow=null;if(p&&p.$&&p.$().css("overflow")==="hidden"){this._originalOverflow=p.$().css("overflow");p.$().css("overflow","visible");}var P;if(this.$().closest('.sapUiVlt').length!==0){P=this.$().closest('.sapUiVlt');}else if(this.$().parent('[class*="sapUiRespGridSpan"]').length!==0){P=this.$().parent('[class*="sapUiRespGridSpan"]');}else if(this.$().parents(".sapUiRFLContainer").length!==0){P=this.$().parents(".sapUiRFLContainer");}if(P&&P.length>0&&P.css("overflow")==="hidden"){P.css("overflow","visible");}t._showAllTokens();t._tokenizer.scrollToStart();};c.prototype.openMultiLine=function(){var t=this.getTokens();if(!this.getEditable()){return;}if(this.getEnableMultiLineMode()&&t.length>0&&!D.system.phone){this._openMultiLineOnDesktop();}};c.prototype.closeMultiLine=function(){if(!this.getEditable()){return;}if(this._bUseDialog){this._oSuggestionPopup.close();this._tokenizer.setVisible(true);}else{this.$("border").removeClass("sapMMultiInputMultiModeBorder");if(this._$input){this._$input.parents('.sapMMultiInputBorder').removeClass("sapMMultiInputMultiModeInputContainer");}this.$().find(".sapMInputValHelp").removeAttr("tabindex");if(this._originalOverflow){var p=this.getParent();p.$().css("overflow",this._originalOverflow);}}if(this.getTokens().length>1&&this._isMultiLineMode){this._showIndicator();}};c.prototype.getScrollDelegate=function(){return this._tokenizer._oScroller;};c.prototype.onBeforeRendering=function(){var t=this.getAggregation("tokenizer");if(t){t.toggleStyleClass("sapMTokenizerEmpty",t.getTokens().length===0);}I.prototype.onBeforeRendering.apply(this,arguments);};c.prototype.onAfterRendering=function(){this._tokenizer.scrollToEnd();I.prototype.onAfterRendering.apply(this,arguments);};c.prototype.addValidator=function(v){this._tokenizer.addValidator(v);};c.prototype.removeValidator=function(v){this._tokenizer.removeValidator(v);};c.prototype.removeAllValidators=function(){this._tokenizer.removeAllValidators();};c.prototype.onsapnext=function(e){if(e.isMarked()){return;}var f=q(document.activeElement).control()[0];if(!f){return;}if(this._tokenizer===f||this._tokenizer.$().find(f.$()).length>0){this._scrollAndFocus();}};c.prototype.onsapbackspace=function(e){if(this.getCursorPosition()>0||!this.getEditable()||this.getValue().length>0){return;}T.prototype.onsapbackspace.apply(this._tokenizer,arguments);e.preventDefault();e.stopPropagation();};c.prototype.onsapdelete=function(e){if(!this.getEditable()){return;}if(this.getValue()&&!this._completeTextIsSelected()){return;}T.prototype.onsapdelete.apply(this._tokenizer,arguments);};c.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.TAB){this._tokenizer._changeAllTokensSelection(false);}if((e.ctrlKey||e.metaKey)&&e.which===q.sap.KeyCodes.A){if(this._tokenizer.getTokens().length>0){this._tokenizer.focus();this._tokenizer._changeAllTokensSelection(true);e.preventDefault();}}if((e.ctrlKey||e.metaKey)&&(e.which===q.sap.KeyCodes.C||e.which===q.sap.KeyCodes.INSERT)){this._tokenizer._copy();}if(((e.ctrlKey||e.metaKey)&&e.which===q.sap.KeyCodes.X)||(e.shiftKey&&e.which===q.sap.KeyCodes.DELETE)){if(this.getEditable()){this._tokenizer._cut();}else{this._tokenizer._copy();}}};c.prototype.onpaste=function(e){var o,i,v=[],A=[];if(this.getValueHelpOnly()){return;}if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=e.originalEvent.clipboardData.getData('text/plain');}var s=this._tokenizer._parseString(o);if(s.length<=1){return;}setTimeout(function(){if(s){if(this.fireEvent("_validateOnPaste",{texts:s},true)){var d="";for(i=0;i<s.length;i++){if(s[i]){var t=this._convertTextToToken(s[i],true);if(t){v.push(t);}else{d=s[i];}}}this.updateDomValue(d);for(i=0;i<v.length;i++){if(this._tokenizer._addUniqueToken(v[i])){A.push(v[i]);}}if(A.length>0){this.fireTokenUpdate({addedTokens:A,removedTokens:[],type:T.TokenUpdateType.Added});}}if(A.length){this.cancelPendingSuggest();}}}.bind(this),0);};c.prototype._convertTextToToken=function(t,C){var d=null,i=null,e=null,o=this._tokenizer.getTokens().length;if(!this.getEditable()){return null;}t=t.trim();if(!t){return null;}if(this._getIsSuggestionPopupOpen()||C){if(this._hasTabularSuggestions()){i=this._oSuggestionTable._oSelectedItem;}else{i=this._getSuggestionItem(t);}}if(i&&i.getText&&i.getKey){e=new a({text:i.getText(),key:i.getKey()});}var f=this;d=this._tokenizer._validateToken({text:t,token:e,suggestionObject:i,validationCallback:function(v){f._bIsValidating=false;if(v){f.setValue("");if(f._bUseDialog&&f._isMultiLineMode&&f._oSuggestionTable.getItems().length===0){var n=f._tokenizer.getTokens().length;if(o<n){f._oPopupInput.setValue("");}if(f._tokenizer.getVisible()===false){f._tokenizer.setVisible(true);}f._setAllTokenVisible();}}}});return d;};c.prototype.onsapprevious=function(e){if(this._getIsSuggestionPopupOpen()){return;}if(this.getCursorPosition()===0){if(e.srcControl===this){T.prototype.onsapprevious.apply(this._tokenizer,arguments);e.preventDefault();}}};c.prototype._scrollAndFocus=function(){this._tokenizer.scrollToEnd();this.$().find("input").focus();};c.prototype.onsaphome=function(e){if(this._tokenizer._checkFocus()){T.prototype.onsaphome.apply(this._tokenizer,arguments);}};c.prototype.onsapend=function(e){if(this._tokenizer._checkFocus()){T.prototype.onsapend.apply(this._tokenizer,arguments);e.preventDefault();}};c.prototype.onsapenter=function(e){if(I.prototype.onsapenter){I.prototype.onsapenter.apply(this,arguments);}var v=true;if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){if(this._hasTabularSuggestions()){v=!this._oSuggestionTable.getSelectedItem();}else{v=!this._oList.getSelectedItem();}}if(v){this._validateCurrentText();}this.focus();};c.prototype._checkFocus=function(){return this.getDomRef()&&q.sap.containsOrEquals(this.getDomRef(),document.activeElement);};c.prototype.onsapfocusleave=function(e){var p=this._oSuggestionPopup,n=false,N=false,d=this._checkFocus(),R;if(p instanceof sap.m.Popover){if(e.relatedControlId){R=sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef();n=q.sap.containsOrEquals(p.getFocusDomRef(),R);N=q.sap.containsOrEquals(this._tokenizer.getFocusDomRef(),R);}}if(!N&&!n&&!this._isMultiLineMode){this._tokenizer.scrollToEnd();}I.prototype.onsapfocusleave.apply(this,arguments);if(this._bIsValidating||this._bValueHelpOpen){return;}if(!this._bUseDialog&&!n&&e.relatedControlId!==this.getId()&&e.relatedControlId!==this._tokenizer.getId()&&!N&&!(this._isMultiLineMode&&this._bShowIndicator)){this._validateCurrentText(true);}if(!this._bUseDialog&&this._isMultiLineMode&&this.getDomRef("inner").style.opacity=="1"&&this.getEditable()){if(d||n){return;}this.closeMultiLine();this._showIndicator();}T.prototype.onsapfocusleave.apply(this._tokenizer,arguments);if(!this._bUseDialog&&this._isMultiLineMode&&this._bShowIndicator){var $=this.$().find(".sapMMultiInputBorder");$.scrollTop(0);}};c.prototype._onDialogClose=function(){this._validateCurrentText();this._tokenizer._oScroller.setHorizontal(true);this._tokenizer.removeStyleClass("sapMTokenizerMultiLine");this.setAggregation("tokenizer",this._tokenizer);this._tokenizer.setReverseTokens(false);this._tokenizer.invalidate();};c.prototype.ontap=function(e){if(document.activeElement===this._$input[0]||document.activeElement===this._tokenizer.getDomRef()){this._tokenizer.selectAllTokens(false);}if(e&&e.isMarked("tokenDeletePress")){return;}I.prototype.ontap.apply(this,arguments);};c.prototype._onclick=function(e){if(this._bUseDialog){this._openMultiLineOnPhone();}};c.prototype.onfocusin=function(e){this._bValueHelpOpen=false;if(this.getEditable()&&this.getEnableMultiLineMode()&&(!e.target.classList.contains("sapMInputValHelp")&&!e.target.classList.contains("sapMInputValHelpInner"))){this.openMultiLine();}if(e.target===this.getFocusDomRef()){I.prototype.onfocusin.apply(this,arguments);}};c.prototype.onsapescape=function(e){this._tokenizer.selectAllTokens(false);this.selectText(0,0);I.prototype.onsapescape.apply(this,arguments);};c.prototype._validateCurrentText=function(e){var o=this._tokenizer.getTokens().length;var t=this.getValue();if(!t||!this.getEditable()){return;}t=t.trim();if(!t){return;}var i=null;if(e||this._getIsSuggestionPopupOpen()){if(this._hasTabularSuggestions()){i=this._oSuggestionTable._oSelectedItem;}else{i=this._getSuggestionItem(t,e);}}var d=null;if(i&&i.getText&&i.getKey){d=new a({text:i.getText(),key:i.getKey()});}var f=this;if(!this.getMaxTokens()||this.getTokens().length<this.getMaxTokens()){this._bIsValidating=true;this._tokenizer._addValidateToken({text:t,token:d,suggestionObject:i,validationCallback:function(v){f._bIsValidating=false;if(v){f.setValue("");if(f._bUseDialog&&f._isMultiLineMode&&f._oSuggestionTable.getItems().length===0){var n=f._tokenizer.getTokens().length;if(o<n){f._oPopupInput.setValue("");}if(f._tokenizer.getVisible()===false){f._tokenizer.setVisible(true);}}}}});}};c.prototype.getCursorPosition=function(){return this._$input.cursorPos();};c.prototype._completeTextIsSelected=function(){var i=this._$input[0];if(i.selectionStart!==0){return false;}if(i.selectionEnd!==this.getValue().length){return false;}return true;};c.prototype._getIsSuggestionPopupOpen=function(){return this._oSuggestionPopup&&this._oSuggestionPopup.isOpen();};c.prototype.setEditable=function(e){e=this.validateProperty("editable",e);if(e===this.getEditable()){return this;}if(e&&(this.getEnableMultiLineMode()||this._bUseDialog)&&this.getTokens().length>1){this._bShowIndicator=true;}else{this._bShowIndicator=false;}if(I.prototype.setEditable){I.prototype.setEditable.apply(this,arguments);}this._tokenizer.setEditable(e);return this;};c.prototype._findItem=function(t,d,e,g){if(!t){return;}if(!(d&&d.length)){return;}t=t.toLowerCase();var f=d.length;for(var i=0;i<f;i++){var h=d[i];var j=g(h);if(!j){continue;}j=j.toLowerCase();if(j===t){return h;}if(!e&&j.indexOf(t)===0){return h;}}};c.prototype._getSuggestionItem=function(t,e){var d=null;var f=null;if(this._hasTabularSuggestions()){d=this.getSuggestionRows();f=this._findItem(t,d,e,function(R){var g=R.getCells();var h=null;if(g){var i;for(i=0;i<g.length;i++){if(g[i].getText){h=g[i].getText();break;}}}return h;});}else{d=this.getSuggestionItems();f=this._findItem(t,d,e,function(f){return f.getText();});}return f;};c.getMetadata().forwardAggregation("tokens",{getter:function(){return this._tokenizer;},aggregation:"tokens",forwardBinding:true});c.prototype.clone=function(){var C,t;this.detachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.detachLiveChange(this._onLiveChange,this);this._tokenizer.detachTokenChange(this._onTokenChange,this);this._tokenizer.detachTokenUpdate(this._onTokenUpdate,this);C=I.prototype.clone.apply(this,arguments);C.destroyAggregation("tokenizer");C._tokenizer=null;t=this._tokenizer.clone();C._tokenizer=t;C.setAggregation("tokenizer",t,true);this._tokenizer.attachTokenChange(this._onTokenChange,this);this._tokenizer.attachTokenUpdate(this._onTokenUpdate,this);C._tokenizer.attachTokenChange(C._onTokenChange,C);C._tokenizer.attachTokenUpdate(C._onTokenUpdate,C);this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);return C;};c.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("border");};c.prototype.setTokens=function(t){var v,V=[],i;if(Array.isArray(t)){for(i=0;i<t.length;i++){v=this.validateAggregation("tokens",t[i],true);M.addAPIParentInfo(t[i],this,"tokens");V.push(v);}this._tokenizer.setTokens(V);}else{throw new Error("\""+t+"\" is of type "+typeof t+", expected array for aggregation tokens of "+this);}return this;};c.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};c.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";c.prototype.getDomRefForValueStateMessage=c.prototype.getPopupAnchorDomRef;c.prototype.updateInputField=function(n){I.prototype.updateInputField.call(this,n);this.setDOMValue('');};c.prototype.getAccessibilityInfo=function(){var t=this.getTokens().map(function(o){return o.getText();}).join(" ");var i=I.prototype.getAccessibilityInfo.apply(this,arguments);i.type=r.getText("ACC_CTR_TYPE_MULTIINPUT");i.description=((i.description||"")+" "+t).trim();return i;};return c;});