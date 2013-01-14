# ## Plugins.Message
#
# Plugin that displays a simple message bar on top of the screen. An callback
# function can be bound to the `onOpen` and `onClose` events.
#
# *Example usage in your JavaScript:*
#
#     $("div").message({
#         onClose: function(){ alert("Closed!"); },
#         onOpen: function(){ alert("Opened!"); },
#         type: "warning"
#     });
#
class Plugins.Message extends Plugins.Plugin
  defaults:
    class: "message"
    containerId: "messages-container"
    delay: 100
    speed: 250
    onClose: -> false
    onOpen: -> false
    type: "alert"

  # Initialize the message by building the DOM-element and calling the open
  # method.
  init: ->
    at = @
    @target.hide()
    Plugins.create("div").attr("id", @config.containerId).appendTo("body") if not $(Plugins.cat "#", @config.containerId).length
    Plugins.create("div", Plugins.cat "message message-", @config.type).html(@target.html()).attr("id", @elId).on("click", -> at.close.apply(at)).hide().appendTo(Plugins.cat "#", @config.containerId)
    Plugins.create("div", "close").html("×").appendTo(@selector)
    @target.remove()
    @open()

  # Method that executes the `onOpen` configuration method.
  open: ->
    at = @
    Plugins.delay @config.delay, ->
      $(at.selector).slideDown(at.config.speed)
      at.config.onOpen?.apply(at.target)

  # Method that executes the `onClose` configuration method.
  close: ->
    at = @
    Plugins.delay @config.delay, ->
      $(at.selector).slideUp(at.config.speed)
      at.config.onClose?.apply(at.target)

# Define the plugin as a jQuery-function.
$.fn.message = (config) -> @.each -> new Plugins.Message config, $(@)
