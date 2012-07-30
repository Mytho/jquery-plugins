/*!
 * JQUERY ACCORDION PLUGIN
 * -----------------------
 * Copyright (c) 2012, T. Zengerink
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
					animationSpeed : 100       // Animation speed in miliseconds
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
/*!
 * JQUERY MODAL PLUGIN
 * -------------------
 * Copyright (c) 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($, win, doc){

		var unique = -1;

		var Modal = function( el, opts ){

			var modal = {},
				defaults = {
					close  : true,    // Show a close button
					prefix : "modal", // Prefix used for element id
					height : "80%",   // Modal window height
					width  : "80%"    // Modal window width
				},
				mf = Math.floor,
				options = $.extend({}, defaults, opts),
				uid = (++unique).toString();

			// PRIVATE
			// -------

			var create = function( url ){
				$("<div />")
					.attr("id", getSelector("outer", false))
					.addClass([options.prefix, "-outer"].join(""))
					.appendTo("body")
					.hide();
				$("<div />")
					.attr("id", getSelector("inner", false))
					.addClass([options.prefix, "-inner"].join(""))
					.css({ height:options.height, width:options.width })
					.appendTo("body")
					.hide();
				$("<div />")
					.addClass("content")
					.appendTo(getSelector("inner"));
				$("<iframe />")
					.attr({ frameBorder:0, src:url })
					.height("100%")
					.width("100%")
					.appendTo([getSelector("inner"), " > .content"].join(""));
				if (options.close) {
					$(getSelector("outer")).click(hide);
					$("<div />")
						.attr("id", getSelector("close", false))
						.addClass([options.prefix, "-close"].join(""))
						.html("&times;")
						.appendTo("body")
						.click(hide)
						.hide();
				}
			};

			var getSelector = function( str, hash ){
				return [(hash == false ? "" : "#"), options.prefix, "-", str, "-", uid].join("");
			};

			var hide = function(){
				$([getSelector("outer"), ",", getSelector("inner"), ", ", getSelector("close")].join("")).hide();
			};

			var show = function(){
				$([getSelector("outer"), ",", getSelector("inner"), ", ", getSelector("close")].join("")).show();
			};

			var position = function(){
				$(getSelector("outer")).css({
					height: $(doc).height(),
					left:   $(win).scrollLeft(),
					top:    0,
					width:  "100%"
				});
				$(getSelector("inner")).css({
					left: mf($(win).width() / 2) - mf($(getSelector("inner")).outerWidth() / 2) + $(win).scrollLeft() + "px",
					top:  mf($(win).height() / 2) - mf($(getSelector("inner")).outerHeight() / 2) + $(win).scrollTop() + "px"
				});
				options.close && $(getSelector("close")).css({
					left: mf($(win).width() / 2) + mf($(getSelector("inner")).outerWidth() / 2) - mf($(getSelector("close")).outerWidth() / 2) + $(win).scrollLeft() + "px",
					top:  mf($(win).height() / 2) - mf($(getSelector("inner")).outerHeight() / 2) - mf($(getSelector("close")).outerHeight() / 2) + $(win).scrollTop() + "px"
				});
			};

			// PUBLIC
			// ------

			modal.close = function(){
				hide();
			};

			modal.open = function( e ){
				e.preventDefault();
				if ( ! $(getSelector("outer")).length && $(this).attr("href")) {
					create($(this).attr("href"));
				}
				position();
				show();
			};

			modal.position = function(){
				position();
			};

			// SETUP
			// -----

			return modal;

		};

		$.fn.modal = function( options ){
			return this.each(function(){
				var modal = Modal($(this), options);
				$(this).on("click", modal.open);
				$(win).on("scroll resize", modal.position);
			});
		};

})(jQuery, window, document);
/*!
 * JQUERY TABS PLUGIN
 * ------------------
 * Copyright (c) 2012, T. Zengerink
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
/*!
 * JQUERY TOOLTIP PLUGIN
 * ---------------------
 * Copyright (c) 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($, win, doc){

	var unique = -1;

	var Tooltip = function( target, options ){

		var tooltip = {},
			defaults = {
				elAttr    : "title",      // Attribute to get content from
				elClass   : "tooltip",    // Class of the DOM-element
				delay     : 100,          // Delay in showing the tooltip
				fade      : 100,          // Fade time in microseconds
				hideEvent : "mouseleave", // Events that hide the tooltip
				margin    : 3,            // Space surrounding target element
				position  : "top",        // Position in relation to target element (top, right, bottom or left)
				showEvent : "mouseenter", // Events that show the tooltip
				size      : "normal"      // Size of the tooltip (normal or large)
			},
			options = $.extend({}, defaults, options),
			uniqueId = [options.elClass, "-", (++unique).toString()].join(""),
			selector = ["#", uniqueId].join(""),
			timer;

		// PRIVATE
		// -------

		var construct = function(){
			var txt = target.attr(options.elAttr);
			target.attr(options.elAttr, "");
			$("<div />").attr("id", uniqueId).addClass([options.elClass, options.size].join(" ")).appendTo("body").hide();
			$("<div />").addClass("arrow").appendTo(selector);
			$("<div />").addClass("content").appendTo(selector);
			$(selector).find(".content").html(txt);
		};

		var clear = function(){
			clearTimeout(timer);
		};

		var hide = function( fn ){
			clear();
			timer = setTimeout(function(){
				$(selector).fadeOut(options.fade, function(){
					typeof fn === "function" && fn();
				});
			}, options.delay);
		};

		var position = function(){
			var pos = target.position();
			var align = reposition(pos, options.position);
			switch (align) {
				case "right":
					var pt = pos.top + (target.outerHeight() / 2) - ($(selector).outerHeight() / 2);
					var pl = pos.left + target.outerWidth() + (5 + options.margin);
					break;
				case "bottom":
					var pt = pos.top + target.outerHeight() + (5 + options.margin);
					var pl = pos.left + (target.outerWidth() / 2) - ($(selector).outerWidth() / 2);
					break;
				case "left":
					var pt = pos.top + (target.outerHeight() / 2) - ($(selector).outerHeight() / 2);
					var pl = pos.left - $(selector).outerWidth() - (5 + options.margin);
					break;
				default:
					var pt = pos.top - $(selector).outerHeight() - (5 + options.margin);
					var pl = pos.left + (target.outerWidth() / 2) - ($(selector).outerWidth() / 2);
					break;
			}
			$(selector).removeClass(["top", "right", "bottom", "left"].join(" ")).addClass(align).css({ "left":pl, "top":pt });
		};

		var reposition = function( position, alignment ){
			switch (alignment) {
				case "right":
					alignment = (position.left - $(win).scrollLeft() + target.outerWidth() + $(selector).outerWidth() + 15 > $(win).width()) ? "left" : alignment;
					break;
				case "bottom":
					alignment = (position.top - $(win).scrollTop() + target.outerHeight() + $(selector).outerHeight() + 15 > $(win).height()) ? "top" : alignment
					break;
				case "left":
					alignment = (position.left - $(win).scrollLeft() < $(selector).outerWidth() + 15) ? "right" : alignment;
					break;
				default:
					alignment = (position.top - $(win).scrollTop() < $(selector).outerHeight() + 15) ? "bottom" : alignment;
				 break;
			}
			return alignment;
		};

		var show = function(){
			timer = setTimeout(function(){
				$(selector).fadeIn(options.fade);
			}, options.delay);
		};

		// PUBLIC
		// ------

		tooltip.hide = function(){
			hide(clear);
		};

		tooltip.position = function(){
			position();
		};

		tooltip.show = function(){
			( ! $(selector).length) && construct();
			position();
			show();
		};

		return tooltip;
	};

	$.fn.tooltip = function( options ){
		return this.each(function(){
			var tooltip = Tooltip($(this), options);
			$(this).bind(options.showEvent || "mouseenter", tooltip.show);
			$(this).bind(options.hideEvent || "mouseleave", tooltip.hide);
			options.hideOnKeyUp && $(doc).bind("keyup", tooltip.hide);
			$(win).bind("scroll", tooltip.position);
		});
	};

})(jQuery, window, document);
