# Plugins.Dialog show a dialog box with optional `onCancel` and `onConfirm`
# callback function which can be set in the `config` object.
class Plugins.Dialog extends Plugins.Plugin
  defaults:
    cancelText: "Cancel"             # Cancel button text
    confirmText: "OK"                # Confirm button text
    contentClass: "dialog-content"   # Content DOM class
    headerText: "Confirm"            # Text for the dialog header
    invokeEvent: "click"             # Event that invokes the plugin
    klass: "dialog"                  # Class of the DOM element
    onCancel: -> return              # Callback on cancel
    onClose: -> return               # Callback on close
    onConfirm: -> return             # Callback on confirm
    onOpen: -> return                # Callback on open
    showClose: true                  # Show close button on top of dialog

  # Bind click/keyup events to the buttons of the dialog
  bind: ->
    at = @
    $(Plugins.cat at.selector, " .cancel").on("click", -> at.cancel.apply at)
    $(Plugins.cat at.selector, " .confirm").on("click", -> at.confirm.apply at)
    $(doc).keyup (e) ->
      if $(at.selector).is(":visible")
        at.confirm.apply at if e.keyCode is 13
        at.cancel.apply at if e.keyCode is 27
    $(win).on "resize scroll", -> at.position.apply at

  # Build new dialog DOM-element and append it to the HTML body.
  build: ->
    Plugins.create("div", @config.klass).attr("id", @elId).appendTo("body")
    Plugins.create("div", "overlay").appendTo(@selector)
    Plugins.create("div", "window").appendTo(@selector)
    Plugins.create("div", "header").appendTo(Plugins.cat @selector, " .window")
    Plugins.create("h3").html(@config.headerText).appendTo(Plugins.cat @selector, " .header")
    Plugins.create("button", "cancel").html("×").appendTo(Plugins.cat @selector, " .header") if @config.showClose
    Plugins.create("div", "clear").appendTo(Plugins.cat @selector, " .header")
    Plugins.create("div", "content").html(@invoker.next(Plugins.cat ".", @config.contentClass).html()).appendTo(Plugins.cat @selector, " .window")
    Plugins.create("div", "actions").appendTo(Plugins.cat @selector, " .window")
    Plugins.create("button", "cancel").html(@config.cancelText).appendTo(Plugins.cat @selector, " .actions")
    Plugins.create("button", "confirm").html(@config.confirmText).appendTo(Plugins.cat @selector, " .actions")

  # Close the dialog window and call the `onCancel` configuration callback is
  # when done.
  cancel: ->
    @config.onCancel?()
    @close()

  # Close the dialog window and excecute the `onClose` configuration callback
  # function when done.
  close: ->
    @config.onClose?()
    $(@selector).hide()

  # Close the dialog window and call the `onConfirm` configuration callback is
  # when done.
  confirm: ->
    @config.onConfirm?()
    @close()

  # Open the dialog window and execute the `onOpen` configuration callback
  # function when done.
  open: ->
    if not $(@selector).length
      @build()
      @bind.apply @
    $(@selector).show()
    @position()
    @config.onOpen?()

  # Position the dialog on the screen.
  position: ->
    ww = Math.floor($(win).outerWidth() / 2)
    wh = Math.floor($(win).outerHeight() / 2)
    iw = Math.floor($(Plugins.cat @selector, " .window").outerWidth() / 2)
    ih = Math.floor($(Plugins.cat @selector, " .window").outerHeight() / 2)
    $(Plugins.cat @selector, " .overlay").css
      height: $(doc).outerHeight()
      left: $(win).scrollLeft()
    $(Plugins.cat @selector, " .window").css
      left: Plugins.cat ww - iw + $(win).scrollLeft(), "px"
      top: Plugins.cat wh - ih + $(win).scrollTop(), "px"

# Define the plugin in as a jQuery function.
$.fn.dialog = (config) ->
  @.each ->
    dialog = new Plugins.Dialog config, $(@)
    dialog.invoker.next(Plugins.cat ".", dialog.config.contentClass).hide()
    dialog.invoker.on dialog.config.invokeEvent, -> dialog.open.apply dialog
