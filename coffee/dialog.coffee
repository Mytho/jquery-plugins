# ## Plugins.Dialog 
#
# Plugin that shows a dialog box with optional `onCancel`, `onConfirm`, 
# `onOpen` and `onClose` callback functions which can be set in the 
# `config`-object.
#
# *Example usage in your JavaScript:*
#
#     $("div").dialog({
#         onCancel: function(){ alert("Canceled!"); },
#         onConfirm: function(){ alert("Confirmed!"); }
#     });
#
class Plugins.Dialog extends Plugins.Plugin
  defaults:
    cancelText: "Cancel"            # Cancel button text
    confirmText: "OK"               # Confirm button text
    contentClass: "dialog-content"  # Content DOM class
    headerText: "Confirm"           # Text for the dialog header
    invokeEvent: "click"            # Event that invokes the plugin
    klass: "dialog"                 # Class of the DOM element
    onCancel: -> return             # Callback on cancel
    onClose: -> return              # Callback on close
    onConfirm: -> return            # Callback on confirm
    onOpen: -> return               # Callback on open
    showClose: true                 # Show close button on top of dialog

  # Construct a new Dialog passing a `config` and `invoker` object.
  constructor: (config, invoker) ->
    super config, invoker
    @build()
    @bind()

  # Bind click/keyup events to the buttons of the dialog.
  bind: ->
    at = @
    $(Plugins.cat at.selector, " .cancel").on("click", -> at.cancel.apply at)
    $(Plugins.cat at.selector, " .confirm").on("click", -> at.confirm.apply at)
    $(doc).keyup (e) ->
      if $(at.selector).is(":visible")
        at.confirm.apply at if e.keyCode is 13
        at.cancel.apply at if e.keyCode is 27
    $(win).on "resize scroll", -> at.position.apply at
    @invoker.on at.config.invokeEvent, -> at.open.apply at

  # Build new dialog DOM-element and append it to the HTML body.
  build: ->
    content = @invoker.next(Plugins.cat ".", @config.contentClass).html()
    @invoker.next(Plugins.cat ".", @config.contentClass).hide()
    Plugins.create("div", @config.klass).attr("id", @elId).appendTo("body").hide()
    Plugins.create("div", "overlay").appendTo(@selector)
    Plugins.create("div", "window").appendTo(@selector)
    Plugins.create("div", "header").appendTo(Plugins.cat @selector, " .window")
    Plugins.create("h3").html(@config.headerText).appendTo(Plugins.cat @selector, " .header")
    Plugins.create("button", "cancel").html("×").appendTo(Plugins.cat @selector, " .header") if @config.showClose
    Plugins.create("div", "clear").appendTo(Plugins.cat @selector, " .header")
    Plugins.create("div", "content").html(content).appendTo(Plugins.cat @selector, " .window")
    Plugins.create("div", "actions").appendTo(Plugins.cat @selector, " .window")
    Plugins.create("button", "cancel").html(@config.cancelText).appendTo(Plugins.cat @selector, " .actions")
    Plugins.create("button", "confirm").html(@config.confirmText).appendTo(Plugins.cat @selector, " .actions")

  # Close the dialog window and call the `onCancel` configuration callback when 
  # done.
  cancel: ->
    @config.onCancel?()
    @close()

  # Close the dialog window and call the `onClose` configuration callback when 
  # done.
  close: ->
    @config.onClose?()
    $(@selector).hide()

  # Close the dialog window and call the `onConfirm` configuration callback when 
  # done.
  confirm: ->
    @config.onConfirm?()
    @close()

  # Close the dialog window and call the `onOpen` configuration callback when 
  # done.
  open: ->
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

# Define the plugin in as a jQuery-function.
$.fn.dialog = (config) -> @.each -> new Plugins.Dialog config, $(@)
