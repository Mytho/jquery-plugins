/*!
 * jQuery Tabs Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jquery.tabs.js/master/license.txt
 */
;(function($, win){

		var Tabs = function( el, opts ){
			
			var tabs = {},
				active,
				defaults = {
					activeClass  : "active",      // Class name for active tab
					contentClass : "tabs-content" // Selector for the content element
				},
				options = $.extend({}, defaults, options),
				content = $([".", options.contentClass].join(""));

			// PRIVATE
			// -------

			var activate = function( hash ){
				el.find(["li:not(:has(a[href='", hash ,"']))"].join("")).removeClass(options.activeClass);
				el.find("li").has(["a[href='", hash ,"']"].join("")).addClass(options.activeClass);
				content.find(["*:not([id='", hash ,"'])"].join("")).hide();
				content.find([".", hash.replace("#", "")].join("")).show();
			};
			
			var init = function(){
				content.find("*").hide();
				active = ["#", content.find(":first-child").attr("class")].join("");
				activate(active);
			};

			// PUBLIC
			// ------
			
			tabs.click = function(){
				activate($(this).find("a").attr("href"));
			};

			// SETUP
			// -----

			init();

			return tabs;

		};

		$.fn.tabs = function( options ){
			return this.each(function(){
				$(this).find("li").bind("click", Tabs($(this), options).click);
			});
		};

})(jQuery, window);
