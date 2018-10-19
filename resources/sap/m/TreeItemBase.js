/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library','sap/ui/core/IconPool','sap/ui/core/Icon','./TreeItemBaseRenderer','sap/base/events/KeyCodes'],function(q,L,l,I,a,T,K){"use strict";var b=l.ListMode;var c=L.extend("sap.m.TreeItemBase",{metadata:{library:"sap.m"}});c.prototype.ExpandedIconURI=I.getIconURI("navigation-down-arrow");c.prototype.CollapsedIconURI=I.getIconURI("navigation-right-arrow");c.prototype.getTree=function(){var p=this.getParent();if(p&&p.isA("sap.m.Tree")){return p;}};c.prototype.getList=c.prototype.getTree;c.prototype.informTree=c.prototype.informList;c.prototype.getItemNodeContext=function(){var t=this.getTree();var n=null;var B=t?t.getBinding("items"):null;if(t&&B){B=t.getBinding("items");n=B.getNodeByIndex(t.indexOfItem(this));}return n;};c.prototype.getParentNode=function(){if(this.isTopLevel()){return;}var t=this.getTree(),n=this.getLevel(),p=null,i=t.indexOfItem(this)-1,d=t.getItems(),e;while(i>=0){e=d[i].getLevel();if(e===n-1){p=d[i];break;}i--;}return p;};c.prototype.getParentNodeContext=function(){return this.getItemNodeContext().parent;};c.prototype.isLeaf=function(){var t=this.getTree(),n=this.getItemNodeContext();return n?!t.getBinding("items").nodeHasChildren(n):false;};c.prototype.isTopLevel=function(){return(this.getLevel()===0);};c.prototype.getLevel=function(){return(this.getItemNodeContext()||{}).level;};c.prototype.getExpanded=function(){var t=this.getTree();if(!t){return false;}var i=t.indexOfItem(this);var B=t.getBinding("items");return(B&&B.isExpanded(i));};c.prototype.setSelected=function(s){L.prototype.setSelected.apply(this,arguments);var t=this.getTree();var B=null;var i=-1;if(t){B=t.getBinding("items");i=t.indexOfItem(this);if(t.getMode()===b.SingleSelect){B.setSelectedIndex(i);}if(t.getMode()===b.MultiSelect){if(s){B.addSelectionInterval(i,i);}else{B.removeSelectionInterval(i,i);}}}return this;};c.prototype._getExpanderControl=function(){var s=this.CollapsedIconURI;if(this.getExpanded()){s=this.ExpandedIconURI;}if(this._oExpanderControl){this._oExpanderControl.setSrc(s);return this._oExpanderControl;}this._oExpanderControl=new a({id:this.getId()+"-expander",src:s,useIconTooltip:false,noTabStop:true}).setParent(this,null,true).addStyleClass("sapMTreeItemBaseExpander").attachPress(function(e){this.informTree("ExpanderPressed");},this);return this._oExpanderControl;};c.prototype._updateExpander=function(){if(this._oExpanderControl){var s=this.CollapsedIconURI;if(this.getExpanded()){s=this.ExpandedIconURI;}this._oExpanderControl.setSrc(s);this.$().attr("aria-expanded",this.getExpanded());var i=this._getPadding(),S=sap.ui.getCore().getConfiguration().getRTL()?"paddingRight":"paddingLeft";this.$().css(S,i+"rem");}};c.prototype.setBindingContext=function(){L.prototype.setBindingContext.apply(this,arguments);this._updateExpander();return this;};c.prototype._getPadding=function(){var t=this.getTree(),n=this.getLevel(),i=0,d;if(t){d=t.getDeepestLevel();}if(d<2){i=n*1.5;}else if(d===2){i=n*1;}else if(d<6){i=n*0.5;}else{i=n*0.25;}return i;};c.prototype.onsapplus=function(e){this.informTree("ExpanderPressed",true);};c.prototype.onsapminus=function(e){this.informTree("ExpanderPressed",false);};c.prototype.onsapright=function(e){if(this.isLeaf()){return;}if(!this.getExpanded()){this.informTree("ExpanderPressed",true);}else{e.keyCode=K.ARROW_DOWN;}};c.prototype.onsapleft=function(e){if(this.isTopLevel()&&!this.getExpanded()){return;}if(!this.isLeaf()){if(this.getExpanded()){this.informTree("ExpanderPressed",false);}else{this.getParentNode().focus();}}else{this.getParentNode().focus();}};c.prototype.onsapbackspace=function(e){if(!this.isTopLevel()){this.getParentNode().focus();}};c.prototype.getAccessibilityType=function(B){return B.getText("ACC_CTR_TYPE_TREEITEM");};c.prototype.exit=function(){L.prototype.exit.apply(this,arguments);this.destroyControls(["Expander"]);};c.prototype.onlongdragover=function(e){this.informTree("LongDragOver");};return c;});
