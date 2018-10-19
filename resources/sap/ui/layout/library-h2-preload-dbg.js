/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/layout/library',['sap/ui/base/DataType','sap/ui/core/library'],function(D){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.layout",version:"1.56.13",dependencies:["sap.ui.core"],designtime:"sap/ui/layout/designtime/library.designtime",types:["sap.ui.layout.BackgroundDesign","sap.ui.layout.GridIndent","sap.ui.layout.GridPosition","sap.ui.layout.GridSpan","sap.ui.layout.BlockBackgroundType","sap.ui.layout.form.GridElementCells","sap.ui.layout.form.SimpleFormLayout","sap.ui.layout.form.ColumnsXL","sap.ui.layout.form.ColumnsL","sap.ui.layout.form.ColumnsM","sap.ui.layout.form.ColumnCells","sap.ui.layout.form.EmptyCells"],interfaces:[],controls:["sap.ui.layout.AlignedFlowLayout","sap.ui.layout.DynamicSideContent","sap.ui.layout.FixFlex","sap.ui.layout.Grid","sap.ui.layout.HorizontalLayout","sap.ui.layout.ResponsiveFlowLayout","sap.ui.layout.ResponsiveSplitter","sap.ui.layout.ResponsiveSplitterPage","sap.ui.layout.Splitter","sap.ui.layout.VerticalLayout","sap.ui.layout.BlockLayoutCell","sap.ui.layout.BlockLayoutRow","sap.ui.layout.BlockLayout","sap.ui.layout.form.Form","sap.ui.layout.form.FormLayout","sap.ui.layout.form.GridLayout","sap.ui.layout.form.ColumnLayout","sap.ui.layout.form.ResponsiveGridLayout","sap.ui.layout.form.ResponsiveLayout","sap.ui.layout.form.SimpleForm"],elements:["sap.ui.layout.GridData","sap.ui.layout.ResponsiveFlowLayoutData","sap.ui.layout.SplitterLayoutData","sap.ui.layout.form.FormContainer","sap.ui.layout.form.FormElement","sap.ui.layout.form.GridContainerData","sap.ui.layout.PaneContainer","sap.ui.layout.SplitPane","sap.ui.layout.form.GridElementData","sap.ui.layout.form.ColumnElementData","sap.ui.layout.form.ColumnContainerData"],extensions:{flChangeHandlers:{"sap.ui.layout.BlockLayout":{"moveControls":"default"},"sap.ui.layout.BlockLayoutRow":{"moveControls":"default","hideControl":"default","unhideControl":"default"},"sap.ui.layout.BlockLayoutCell":"sap/ui/layout/flexibility/BlockLayoutCell","sap.ui.layout.DynamicSideContent":{"moveControls":"default","hideControl":"default","unhideControl":"default"},"sap.ui.layout.form.SimpleForm":"sap/ui/layout/flexibility/SimpleForm","sap.ui.layout.Grid":{"moveControls":"default","hideControl":"default","unhideControl":"default"},"sap.ui.layout.FixFlex":{"moveControls":"default","hideControl":"default","unhideControl":"default"},"sap.ui.layout.form.Form":"sap/ui/layout/flexibility/Form","sap.ui.layout.form.FormContainer":"sap/ui/layout/flexibility/FormContainer","sap.ui.layout.form.FormElement":"sap/ui/layout/flexibility/FormElement","sap.ui.layout.HorizontalLayout":{"moveControls":"default","hideControl":"default","unhideControl":"default"},"sap.ui.layout.Splitter":{"moveControls":"default","hideControl":"default","unhideControl":"default"},"sap.ui.layout.VerticalLayout":{"moveControls":"default","hideControl":"default","unhideControl":"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});sap.ui.layout.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};sap.ui.layout.GridIndent=D.createType('sap.ui.layout.GridIndent',{isValid:function(v){return/^(([Xx][Ll](?:[0-9]|1[0-1]))? ?([Ll](?:[0-9]|1[0-1]))? ?([Mm](?:[0-9]|1[0-1]))? ?([Ss](?:[0-9]|1[0-1]))?)$/.test(v);}},D.getType('string'));sap.ui.layout.GridPosition={Left:"Left",Right:"Right",Center:"Center"};sap.ui.layout.GridSpan=D.createType('sap.ui.layout.GridSpan',{isValid:function(v){return/^(([Xx][Ll](?:[1-9]|1[0-2]))? ?([Ll](?:[1-9]|1[0-2]))? ?([Mm](?:[1-9]|1[0-2]))? ?([Ss](?:[1-9]|1[0-2]))?)$/.test(v);}},D.getType('string'));sap.ui.layout.BlockBackgroundType={Default:"Default",Light:"Light",Mixed:"Mixed",Accent:"Accent",Dashboard:"Dashboard"};sap.ui.layout.BlockRowColorSets={ColorSet1:"ColorSet1",ColorSet2:"ColorSet2",ColorSet3:"ColorSet3",ColorSet4:"ColorSet4"};sap.ui.layout.BlockLayoutCellColorSet={ColorSet1:"ColorSet1",ColorSet2:"ColorSet2",ColorSet3:"ColorSet3",ColorSet4:"ColorSet4",ColorSet5:"ColorSet5",ColorSet6:"ColorSet6",ColorSet7:"ColorSet7",ColorSet8:"ColorSet8",ColorSet9:"ColorSet9",ColorSet10:"ColorSet10",ColorSet11:"ColorSet11"};sap.ui.layout.BlockLayoutCellColorShade={ShadeA:"ShadeA",ShadeB:"ShadeB",ShadeC:"ShadeC",ShadeD:"ShadeD"};sap.ui.layout.form=sap.ui.layout.form||{};sap.ui.layout.form.GridElementCells=D.createType('sap.ui.layout.form.GridElementCells',{isValid:function(v){return/^(auto|full|([1-9]|1[0-6]))$/.test(v);}},D.getType('string'));sap.ui.layout.form.SimpleFormLayout={ResponsiveLayout:"ResponsiveLayout",GridLayout:"GridLayout",ResponsiveGridLayout:"ResponsiveGridLayout",ColumnLayout:"ColumnLayout"};sap.ui.layout.SideContentVisibility={AlwaysShow:"AlwaysShow",ShowAboveL:"ShowAboveL",ShowAboveM:"ShowAboveM",ShowAboveS:"ShowAboveS",NeverShow:"NeverShow"};sap.ui.layout.SideContentFallDown={BelowXL:"BelowXL",BelowL:"BelowL",BelowM:"BelowM",OnMinimumWidth:"OnMinimumWidth"};sap.ui.layout.SideContentPosition={End:"End",Begin:"Begin"};sap.ui.layout.form.ColumnsXL=D.createType('sap.ui.layout.form.ColumnsXL',{isValid:function(v){if(v>0&&v<=4){return true;}else{return false;}}},D.getType('int'));sap.ui.layout.form.ColumnsL=D.createType('sap.ui.layout.form.ColumnsL',{isValid:function(v){if(v>0&&v<=3){return true;}else{return false;}}},D.getType('int'));sap.ui.layout.form.ColumnsM=D.createType('sap.ui.layout.form.ColumnsM',{isValid:function(v){if(v>0&&v<=2){return true;}else{return false;}}},D.getType('int'));sap.ui.layout.form.ColumnCells=D.createType('sap.ui.layout.form.ColumnCells',{isValid:function(v){if(v>0&&v<=12){return true;}else{return false;}}},D.getType('int'));sap.ui.layout.form.EmptyCells=D.createType('sap.ui.layout.form.EmptyCells',{isValid:function(v){if(v>=0&&v<12){return true;}else{return false;}}},D.getType('int'));if(!sap.ui.layout.form.FormHelper){sap.ui.layout.form.FormHelper={createLabel:function(t){throw new Error("no Label control available!");},createButton:function(i,p,c){throw new Error("no Button control available!");},setButtonContent:function(b,t,T,i,I){throw new Error("no Button control available!");},addFormClass:function(){return null;},setToolbar:function(t){return t;},bArrowKeySupport:true,bFinal:false};}return sap.ui.layout;});
sap.ui.require.preload({
	"sap/ui/layout/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.layout","type":"library","embeds":[],"applicationVersion":{"version":"1.56.13"},"title":"SAPUI5 library with layout controls.","description":"SAPUI5 library with layout controls.","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.56","libs":{"sap.ui.core":{"minVersion":"1.56.13"}}},"library":{"i18n":"messagebundle.properties","content":{"controls":["sap.ui.layout.AlignedFlowLayout","sap.ui.layout.DynamicSideContent","sap.ui.layout.FixFlex","sap.ui.layout.Grid","sap.ui.layout.HorizontalLayout","sap.ui.layout.ResponsiveFlowLayout","sap.ui.layout.ResponsiveSplitter","sap.ui.layout.ResponsiveSplitterPage","sap.ui.layout.Splitter","sap.ui.layout.VerticalLayout","sap.ui.layout.BlockLayoutCell","sap.ui.layout.BlockLayoutRow","sap.ui.layout.BlockLayout","sap.ui.layout.form.Form","sap.ui.layout.form.FormLayout","sap.ui.layout.form.GridLayout","sap.ui.layout.form.ColumnLayout","sap.ui.layout.form.ResponsiveGridLayout","sap.ui.layout.form.ResponsiveLayout","sap.ui.layout.form.SimpleForm"],"elements":["sap.ui.layout.GridData","sap.ui.layout.ResponsiveFlowLayoutData","sap.ui.layout.SplitterLayoutData","sap.ui.layout.form.FormContainer","sap.ui.layout.form.FormElement","sap.ui.layout.form.GridContainerData","sap.ui.layout.PaneContainer","sap.ui.layout.SplitPane","sap.ui.layout.form.GridElementData","sap.ui.layout.form.ColumnElementData","sap.ui.layout.form.ColumnContainerData"],"types":["sap.ui.layout.BackgroundDesign","sap.ui.layout.GridIndent","sap.ui.layout.GridPosition","sap.ui.layout.GridSpan","sap.ui.layout.BlockBackgroundType","sap.ui.layout.form.GridElementCells","sap.ui.layout.form.SimpleFormLayout","sap.ui.layout.form.ColumnsXL","sap.ui.layout.form.ColumnsL","sap.ui.layout.form.ColumnsM","sap.ui.layout.form.ColumnCells","sap.ui.layout.form.EmptyCells"],"interfaces":[]}}}}'
},"sap/ui/layout/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/layout/AlignedFlowLayout.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/AlignedFlowLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/AlignedFlowLayoutRenderer.js":["sap/ui/layout/library.js"],
"sap/ui/layout/AssociativeSplitter.js":["jquery.sap.global.js","sap/ui/layout/Splitter.js","sap/ui/layout/SplitterRenderer.js"],
"sap/ui/layout/BlockLayout.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/BlockLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/BlockLayoutCell.js":["sap/ui/core/Control.js","sap/ui/layout/BlockLayoutCellRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/BlockLayoutCellData.js":["sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/BlockLayoutCellRenderer.js":["jquery.sap.global.js","sap/ui/core/library.js","sap/ui/layout/library.js"],
"sap/ui/layout/BlockLayoutRenderer.js":["sap/ui/layout/library.js"],
"sap/ui/layout/BlockLayoutRow.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/layout/BlockLayoutCellData.js","sap/ui/layout/BlockLayoutRowRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/BlockLayoutRowRenderer.js":["sap/ui/layout/library.js"],
"sap/ui/layout/DynamicSideContent.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/DynamicSideContentRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/DynamicSideContentRenderer.js":["sap/ui/Device.js","sap/ui/layout/library.js"],
"sap/ui/layout/FixFlex.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/EnabledPropagator.js","sap/ui/core/ResizeHandler.js","sap/ui/core/delegate/ScrollEnablement.js","sap/ui/layout/FixFlexRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/FixFlexRenderer.js":["jquery.sap.global.js"],
"sap/ui/layout/Grid.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/GridRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/GridData.js":["jquery.sap.global.js","sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/GridRenderer.js":["sap/ui/Device.js","sap/ui/layout/library.js"],
"sap/ui/layout/HorizontalLayout.js":["sap/ui/core/Control.js","sap/ui/layout/HorizontalLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/PaneContainer.js":["sap/ui/core/Element.js","sap/ui/core/library.js","sap/ui/layout/AssociativeSplitter.js","sap/ui/layout/library.js"],
"sap/ui/layout/ResponsiveFlowLayout.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/ResponsiveFlowLayoutData.js","sap/ui/layout/ResponsiveFlowLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/ResponsiveFlowLayoutData.js":["jquery.sap.global.js","sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/ResponsiveSplitter.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/core/delegate/ItemNavigation.js","sap/ui/layout/PaneContainer.js","sap/ui/layout/ResponsiveSplitterPage.js","sap/ui/layout/ResponsiveSplitterRenderer.js","sap/ui/layout/ResponsiveSplitterUtilities.js","sap/ui/layout/SplitPane.js","sap/ui/layout/library.js"],
"sap/ui/layout/ResponsiveSplitterPage.js":["sap/ui/core/Control.js","sap/ui/layout/library.js"],
"sap/ui/layout/ResponsiveSplitterRenderer.js":["sap/ui/core/IconPool.js"],
"sap/ui/layout/SplitPane.js":["sap/ui/core/Element.js","sap/ui/layout/library.js"],
"sap/ui/layout/Splitter.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/RenderManager.js","sap/ui/core/ResizeHandler.js","sap/ui/core/library.js","sap/ui/layout/SplitterRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/SplitterLayoutData.js":["sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/SplitterRenderer.js":["sap/ui/core/library.js"],
"sap/ui/layout/VerticalLayout.js":["sap/ui/core/Control.js","sap/ui/core/EnabledPropagator.js","sap/ui/layout/VerticalLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/changeHandler/AddFormContainer.js":["jquery.sap.global.js","sap/ui/core/util/reflection/JsControlTreeModifier.js","sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/Base.js"],
"sap/ui/layout/changeHandler/AddFormField.js":["sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/ChangeHandlerMediator.js"],
"sap/ui/layout/changeHandler/AddSimpleFormField.js":["sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/ChangeHandlerMediator.js"],
"sap/ui/layout/changeHandler/AddSimpleFormGroup.js":["sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/Base.js","sap/ui/fl/changeHandler/JsControlTreeModifier.js"],
"sap/ui/layout/changeHandler/HideSimpleForm.js":["sap/ui/fl/changeHandler/JsControlTreeModifier.js"],
"sap/ui/layout/changeHandler/MoveSimpleForm.js":["jquery.sap.global.js","sap/ui/core/util/reflection/JsControlTreeModifier.js"],
"sap/ui/layout/changeHandler/RenameFormContainer.js":["sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/Base.js"],
"sap/ui/layout/changeHandler/RenameSimpleForm.js":["sap/ui/core/util/reflection/JsControlTreeModifier.js","sap/ui/fl/Utils.js","sap/ui/fl/changeHandler/Base.js"],
"sap/ui/layout/changeHandler/UnhideSimpleForm.js":["sap/ui/core/util/reflection/JsControlTreeModifier.js"],
"sap/ui/layout/designtime/form/FormContainer.designtime.js":["sap/ui/fl/changeHandler/ChangeHandlerMediator.js"],
"sap/ui/layout/designtime/form/FormElement.designtime.js":["sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/ResponsiveGridLayout.js"],
"sap/ui/layout/designtime/form/SimpleForm.designtime.js":["sap/ui/fl/changeHandler/ChangeHandlerMediator.js"],
"sap/ui/layout/flexibility/BlockLayoutCell.flexibility.js":["sap/ui/fl/changeHandler/BaseRename.js"],
"sap/ui/layout/flexibility/Form.flexibility.js":["sap/ui/layout/changeHandler/AddFormContainer.js","sap/ui/layout/changeHandler/AddFormField.js"],
"sap/ui/layout/flexibility/FormContainer.flexibility.js":["sap/ui/layout/changeHandler/AddFormField.js","sap/ui/layout/changeHandler/RenameFormContainer.js"],
"sap/ui/layout/flexibility/FormElement.flexibility.js":["sap/ui/fl/changeHandler/BaseRename.js"],
"sap/ui/layout/flexibility/SimpleForm.flexibility.js":["sap/ui/layout/changeHandler/AddSimpleFormField.js","sap/ui/layout/changeHandler/AddSimpleFormGroup.js","sap/ui/layout/changeHandler/HideSimpleForm.js","sap/ui/layout/changeHandler/MoveSimpleForm.js","sap/ui/layout/changeHandler/RenameSimpleForm.js","sap/ui/layout/changeHandler/UnhideSimpleForm.js"],
"sap/ui/layout/form/ColumnContainerData.js":["sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/ColumnElementData.js":["sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/ColumnLayout.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/form/ColumnLayoutRenderer.js","sap/ui/layout/form/FormLayout.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/ColumnLayoutRenderer.js":["sap/ui/Device.js","sap/ui/core/Renderer.js","sap/ui/layout/form/FormLayoutRenderer.js"],
"sap/ui/layout/form/Form.js":["sap/ui/core/Control.js","sap/ui/layout/form/FormRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/FormContainer.js":["jquery.sap.global.js","sap/ui/core/Element.js","sap/ui/core/theming/Parameters.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/FormElement.js":["jquery.sap.global.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/Element.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/FormLayout.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/layout/form/FormLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/FormLayoutRenderer.js":["sap/ui/core/library.js","sap/ui/core/theming/Parameters.js","sap/ui/layout/form/Form.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/FormRenderer.js":["jquery.sap.global.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/GridContainerData.js":["sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/GridElementData.js":["sap/ui/core/LayoutData.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/GridLayout.js":["jquery.sap.global.js","sap/ui/layout/form/FormLayout.js","sap/ui/layout/form/GridLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/GridLayoutRenderer.js":["jquery.sap.global.js","sap/ui/core/Renderer.js","sap/ui/layout/form/FormLayoutRenderer.js"],
"sap/ui/layout/form/ResponsiveGridLayout.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/Grid.js","sap/ui/layout/GridData.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/FormLayout.js","sap/ui/layout/form/ResponsiveGridLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/ResponsiveGridLayoutRenderer.js":["sap/ui/core/Renderer.js","sap/ui/layout/form/FormLayoutRenderer.js"],
"sap/ui/layout/form/ResponsiveLayout.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/layout/ResponsiveFlowLayout.js","sap/ui/layout/ResponsiveFlowLayoutData.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/FormLayout.js","sap/ui/layout/form/ResponsiveLayoutRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/form/ResponsiveLayoutRenderer.js":["sap/ui/core/Renderer.js","sap/ui/layout/form/FormLayoutRenderer.js"],
"sap/ui/layout/form/SimpleForm.js":["jquery.sap.global.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js","sap/ui/layout/form/FormLayout.js","sap/ui/layout/form/SimpleFormRenderer.js","sap/ui/layout/library.js"],
"sap/ui/layout/library.js":["sap/ui/base/DataType.js","sap/ui/core/library.js"],
"sap/ui/layout/library.support.js":["sap/ui/layout/rules/Form.support.js"],
"sap/ui/layout/rules/Form.support.js":["jquery.sap.global.js","sap/ui/support/library.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map