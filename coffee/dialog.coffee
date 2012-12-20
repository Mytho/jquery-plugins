$ = jQuery
uniq = -1
cat = () -> Array.prototype.slice.call(arguments).join("")
floor = Math.floor

Dialog = (target, config) ->
  id = ++uniq
  defaults =
    cancelText: "Cancel"             # Cancel button text
    confirmText: "OK"                # Confirm button text
    headerText: "Confirm"            # Text for the dialog header
    contentClass: "dialog-content"   # Content DOM class
    elClass: "dialog"                # Dialog DOM class
    onCancel: -> return              # Callback on cancel
    onClose: -> return               # Callback on close
    onConfirm: -> return             # Callback on confirm
    onOpen: -> return                # Callback on open
    showClose: true                  # Show close button on op of dialog
    onEvent: "click"                 # Show dialog on event
  config = $.extend {}, defaults, config
  selector = cat "#", config.elClass, "-", id

  # Bind click events to the buttons of the dialog
  bind = ->
    $(cat selector, " .cancel").on("click", cancel)
    $(cat selector, " .confirm").on("click", confirm)

  # Build new dialog DOM-element and append it to the HTML body.
  build = ->
    $("<div />").addClass(config.elClass).attr("id", cat config.elClass, "-", id).appendTo("body")
    $("<div />").addClass("outer").appendTo(selector)
    $("<div />").addClass("inner").appendTo(selector)
    $("<div />").addClass("header").appendTo(cat selector, " .inner")
    $("<h3 />").html(config.headerText).appendTo(cat selector, " .header")
    $("<button />").addClass("cancel").html("×").appendTo(cat selector, " .header")
    $("<div />").addClass("clear").appendTo(cat selector, " .header")
    $("<div />").addClass("content").html(target.next(cat ".", config.contentClass).html()).appendTo(cat selector, " .inner")
    $("<div />").addClass("actions").appendTo(cat selector, " .inner")
    $("<button />").addClass("cancel").html(config.cancelText).appendTo(cat selector, " .actions")
    $("<button />").addClass("confirm").html(config.confirmText).appendTo(cat selector, " .actions")

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

  # Open the dialog window and execute the `onOpen` configuration callback
  # function when done.
  open = ->
    if not $(selector).length
      build()
      bind()
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
    $(@).on(dialog.config.onEvent, dialog.open)
    $(cat ".", dialog.config.contentClass).hide()
    $(window).on("scroll resize", dialog.position)
