$ = jQuery
uniq = -1
cat = () -> Array.prototype.slice.call(arguments).join("")
floor = Math.floor

Dialog = (target, config) ->
  id = ++uniq
  defaults =
    cancelText: "Cancel"
    confirmText: "OK"
    contentClass: "dialog-content"
    elClass: "dialog"
    onCancel: -> return
    onClose: -> return
    onConfirm: -> return
    onOpen: -> return
    showEvent: "click"
  config = $.extend {}, defaults, config
  selector = cat "#", config.elClass, "-", id

  # Build new dialog DOM-element and append it to the HTML body.
  build = ->
    $("<div />").addClass(config.elClass).attr("id", cat config.elClass, "-", id).appendTo("body")
    $("<div />").addClass("outer").appendTo(selector)
    $("<div />").addClass("inner").appendTo(selector)
    $("<div />").addClass("content").appendTo(cat selector, " .inner")
    $("<div />").addClass("actions").appendTo(cat selector, " .inner")
    $("<button />").html(config.cancelText).appendTo(cat selector, " .actions").on("click", cancel)
    $("<button />").html(config.confirmText).appendTo(cat selector, " .actions").on("click", confirm)
    content(target.next(cat ".", config.contentClass).html())

  # Close the dialog window and call the `onCancel` configuration callback is
  # when done.
  cancel = ->
    config.onCancel?()
    close()

  # Close the dialog window and excecute the `onClose` configuration callback
  # function when done.
  close = ->
    config.onClose?()
    $(selector).hide()

  # Close the dialog window and call the `onConfirm` configuration callback is
  # when done.
  confirm = ->
    config.onConfirm?()
    close()

  # Set the `html` for the dialog.
  content = (html) -> $(selector).find(".content").html(html)

  # Open the dialog window and execute the `onOpen` configuration callback
  # function when done.
  open = ->
    build() if not $(selector).length
    $(selector).show()
    position()
    config.onOpen?()

  # Position the dialog on the screen.
  position = ->
    ww = floor($(window).outerWidth() / 2)
    wh = floor($(window).outerHeight() / 2)
    iw = floor($(cat selector, " .inner").outerWidth() / 2)
    ih = floor($(cat selector, " .inner").outerHeight() / 2)
    $(cat selector, " .outer").css
      height: $(document).outerHeight()
      left: $(window).scrollLeft()
    $(cat selector, " .inner").css
      left: cat ww - iw + $(window).scrollLeft(), "px"
      top: cat wh - ih + $(window).scrollTop(), "px"

  # Return the public available dialog object.
  config: config
  open: open
  position: position

$.fn.dialog = (config) ->
  @.each ->
    dialog = new Dialog $(@), config
    $(@).on(dialog.config.showEvent, dialog.open)
    $(cat ".", dialog.config.contentClass).hide()
    $(window).on("scroll resize", dialog.position)
