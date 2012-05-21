/*!
 * jQuery Tooltip Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jquery.tooltip.js/master/license.txt
 */
;(function($, win, doc){

	var unique = -1;

	var Tooltip = function( target, options ){

		var tooltip = {},
			defaults = {
				elClass  : "tooltip", // Class of the DOM-element
				delay    : 100,       // Delay in showing the tooltip
				fade     : 100,       // Fade time in microseconds
				margin   : 3,         // Space surrounding target element
				position : "top",     // Position in relation to target element (top, right, bottom or left)
				size     : "normal"   // Size of the tooltip (normal or large)
			},
			options = $.extend({}, defaults, options),
			uniqueId = [options.elClass, "-", (++unique).toString()].join(""),
			selector = ["#", uniqueId].join(""),
			timer;

		// PRIVATE
		// -------

		var construct = function(){
			var txt = target.attr("title");
			target.attr("title", "");
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
			$(this).bind("mouseenter", tooltip.show);
			$(this).bind("mouseleave click", tooltip.hide);
			$(doc).bind("keyup", tooltip.hide);
			$(win).bind("scroll", tooltip.position);
		});
	};

})(jQuery, window, document);
