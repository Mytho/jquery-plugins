/*!
 * jQuery Accordion Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($){

		var Accordion = function( el, opts ){
			var accordion = {},
				active,
				defaults = {
					activeClass    : "active", // Class of active element
					activateFirst  : true,     // Activate first element initialy
					animationSpeed : 200       // Animation speed in miliseconds
				},
				options = $.extend({}, defaults, opts);

			// PRIVATE
			// -------

			var activate = function( hash ){
				var sel = [".", hash.replace("#", "")].join("");
				el.children(["a[href='", hash ,"']"].join("")).addClass(options.activeClass);
				el.children(sel).slideDown(options.animationSpeed);
				el.children(["a:not([href='", hash ,"'])"].join("")).removeClass(options.activeClass);
				el.children(["div:not(", sel ,")"].join("")).slideUp(options.animationSpeed);
			};

			var init = function(){
				el.children("div").hide();
				if (options.activateFirst) {
					activate(el.children(":first-child").attr("href"));
				}
			};

			// PUBLIC
			// ------
			
			accordion.click = function( e ){
				e.preventDefault();
				activate($(this).attr("href"));
			};

			// SETUP
			// -----
			
			init();

			return accordion;
			
		};

		$.fn.accordion = function( options ){
			return this.each(function(){
				var accordion = Accordion($(this), options);
				$(this).children("a").on("click", accordion.click);
			});
		};

})(jQuery);
