/*!
 * JQUERY DIALOG PLUGIN
 * --------------------
 * Copyright (c) 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($, win, doc){
    var cat, Dialog, unique;

    unique = -1;

    cat = function(){
        return Array.prototype.slice.call(arguments).join("");
    };

    Dialog = function( target, options ){
        var cancel, factory, dialog, defaults, ok, open, position, uniqueId;

        dialog = {};
        defaults = {
            cancelText:   "Cancel",           // Text in cancel button
            confirmText:  "OK",               // Text in confirm button
            contentClass: "dialog-content",   // Class of the dialog content element
            elClass:      "dialog-container", // Class of the dialog DOM Element
            onCancel:     function(){},       // Callback on cancel
            onConfirm:    function(){},       // Callback on confirm
            onOpen:       function(){},       // Callback on open
            showEvent:    "click"             // Event that triggers showing the dialog
        };
        options = $.extend({}, defaults, options);
        uniqueId = cat(options.elClass, "-", (++unique).toString());
        selector = cat("#", uniqueId);

        cancel = function(){
            options.onCancel();
            $(selector).hide();
        };

        factory = function(){
            var content = target.next(cat(".", options.contentClass)).html();
            $("<div />").addClass(options.elClass).attr("id", uniqueId).appendTo("body");
            $("<div />").addClass("outer").appendTo(selector);
            $("<div />").addClass("inner").appendTo(selector);
            $("<div />").addClass("content").html(content).appendTo(cat(selector, " .inner"));
            $("<div />").addClass("action").appendTo(cat(selector, " .inner"));
            $("<button />").html(options.cancelText).appendTo(cat(selector, " .action")).on("click", cancel);
            $("<button />").html(options.confirmText).appendTo(cat(selector, " .action")).on("click", ok);
        };

        ok = function(){
            options.onConfirm();
            $(selector).hide();
        };

        open = function(){
            if ( ! $(selector).length) {
                factory();
            }
            position();
            $(selector).show();
            options.onOpen();
        };

        position = function(){
            var mf = Math.floor;

            $(cat(selector, " .outer")).css({
                height: $(doc).height(),
                left:   $(win).scrollLeft()
            });

            $(cat(selector, " .inner")).css({
                left: mf($(win).width() / 2) - mf($(cat(selector, " .inner")).outerWidth() / 2) + $(win).scrollLeft() + "px",
                top:  mf($(win).height() / 2) - mf($(cat(selector, " .inner")).outerHeight() / 2) + $(win).scrollTop() + "px"
            });
        };

        return {
            open:     open,
            options:  options,
            position: position
        };
    };

    $.fn.dialog = function( options ){
        return this.each(function(){
            var dialog = Dialog($(this), options);
            $(this).bind(dialog.options.showEvent, dialog.open);
            $(win).bind("scroll resize", dialog.position);
        });
    };
})(jQuery, window, document);
