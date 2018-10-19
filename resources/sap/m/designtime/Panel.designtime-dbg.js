/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.Panel control
sap.ui.define([],
	function() {
	"use strict";

	return {
		name: {
			singular: "PANEL_NAME",
			plural: "PANEL_NAME_PLURAL"
		},
		palette: {
			group: "CONTAINER",
			icons: {
				svg: "sap/m/designtime/Panel.icon.svg"
			}
		},
		actions: {
			remove: {
				changeType: "hideControl"
			},
			rename: function (oPanel) {
				// When a header toolbar is added the header text is not visualized and we do not need a rename action.
				if (oPanel.getHeaderToolbar()) {
					return;
				}

				return {
					changeType: "rename",
					domRef: ".sapMPanelHdr"
				};
			},
			reveal: {
				changeType: "unhideControl"
			}
		},
		aggregations: {
			headerToolbar: {
				// When we have an expandable panel we need an additional selector, because the toolbar is wrapped in additional sapMPanelWrappingDivTb div.
				domRef: ":sap-domref > .sapMPanelHeaderTB, :sap-domref > .sapMPanelWrappingDivTb .sapMPanelHeaderTB, :sap-domref > .sapUiDtEmptyHeader"
			},
			infoToolbar: {
				domRef: ":sap-domref > .sapMPanelInfoTB, :sap-domref > .sapUiDtEmptyInfoToolbar"
			},
			content: {
				domRef: ":sap-domref > .sapMPanelContent",
				show: function () {
					this.setExpanded(true);
				},
				actions: {
					move: "moveControls"
				}
			}
		},
		templates: {
			create: "sap/m/designtime/Panel.create.fragment.xml"
		}
	};

}, /* bExport= */ false);