sap.ui.define([
	], function () {
		"use strict";

		return {
			/**
			 * @public
			 * @param {boolean} bIsPhone the value to be checked
			 * @returns {string} path to image
			 */
			srcImageValue : function (bIsPhone) {
				var sImageSrc = "";
				if (bIsPhone === false) {
					sImageSrc = "./images/homeImage.jpg";
				} else {
					sImageSrc = "./images/homeImage.jpg";
				}
				return sImageSrc;
			},
			srcImageValueSecond : function (bIsPhone) {
				var sImageSrc = "";
				if (bIsPhone === false) {
					sImageSrc = "./images/secondBook.jpg";
				} else {
					sImageSrc = "./images/secondBook.jpg";
				}
				return sImageSrc;
			}
		};
	}
);