/*!
 * jQuery Modal Plugin
 *
 * Copyright 2012, T. Zengerink
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
