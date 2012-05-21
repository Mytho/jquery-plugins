/*!
 * jQuery Tabs Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($){

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
				el.children(["li:not(:has(a[href='", hash ,"']))"].join("")).removeClass(options.activeClass);
				el.children("li").has(["a[href='", hash ,"']"].join("")).addClass(options.activeClass);
				content.children([":not([id='", hash ,"'])"].join("")).hide();
				content.children([".", hash.replace("#", "")].join("")).show();
			};
			
			var init = function(){
				content.children("div").hide();
				active = ["#", content.children(":first-child").attr("class")].join("");
				activate(active);
			};

			// PUBLIC
			// ------
			
			tabs.click = function(){
				activate($(this).children("a").attr("href"));
			};

			// SETUP
			// -----

			init();

			return tabs;

		};

		$.fn.tabs = function( options ){
			return this.each(function(){
				$(this).children("li").on("click", Tabs($(this), options).click);
			});
		};

})(jQuery);
