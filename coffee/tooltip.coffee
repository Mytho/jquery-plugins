# ## Plugins.Tooltip
#
# Plugin that shows a tooltip when the user invokes a configurable event on
# the `target`.
#
# *Example usage in your JavaScript:*
#
#     $("div").tooltip();
#
class Plugins.Tooltip extends Plugins.Plugin
  defaults:
    attr: "title"                  # DOM-attribute that containts content
    delay: 100                     # Delay in showing the tooltip
    fade:  100                     # Fade time in microseconds
    invokeHideEvent: "mouseleave"  # Event that hides the Tooltip
    invokeShowEvent: "mouseenter"  # Event that shows the Tooltip
    class: "tooltip"               # Class of the DOM-element
    margin: 3                      # Margin between Tooltip and target
    position: "top"                # Position of Tooltip relative to target
  timer: false

  # Reposition the tooltip when the element is to close to the border of the window.
  _reposition: (xy, position) ->
    switch position
      when "right"
        if (xy.left - $(win).scrollLeft() + @target.outerWidth() + $(@selector).outerWidth() + 15 > $(win).width()) then "left" else position
      when "bottom"
        if (xy.top - $(win).scrollTop() + @target.outerHeight() + $(@selector).outerHeight() + 15 > $(win).height()) then "top" else position
      when "left"
        if (xy.left - $(win).scrollLeft() < $(@selector).outerWidth() + 15) then "right" else position
      else
        if (xy.top - $(win).scrollTop() < $(@selector).outerHeight() + 15) then "bottom" else position

  # Bind events to show, hide or reposition the tooltip.
  bind: ->
    at = @
    @target.on @config.invokeShowEvent, -> at.show.apply at if not $(at.selector).is(":visible")
    @target.on @config.invokeHideEvent, -> at.hide.apply at if $(at.selector).is(":visible")
    $(win).on "scroll", @position.apply @

  # Build new dialog DOM-element and append it to the HTML body.
  build: ->
    Plugins.create("div", @config.class).attr("id", @elId).appendTo("body").hide()
    Plugins.create("div", "arrow").appendTo(@selector)
    Plugins.create("div", "content").html(@target.attr @config.attr).appendTo(@selector)
    @target.attr @config.attr, ""

  # Hide the tooltip using the `config`-ured `delay` and `fade` microseconds.
  hide: ->
    at = @
    clearTimeout @timer
    @timer = Plugins.delay at.config.delay, -> $(at.selector).fadeOut at.config.fade

  # Initialize the newly created Tooltip plugin.
  init: ->
    @build()
    @bind()

  # Position the element within the window. Reposition the tooltip when to close
  # to the border of the window.
  position: ->
    xy = @target.position()
    position = @_reposition xy, @config.position
    switch position
      when "right"
        top = xy.top + (@target.outerHeight() / 2) - ($(@selector).outerHeight() / 2)
        left = xy.left + @target.outerWidth() + (5 + @config.margin)
      when "bottom"
        top = xy.top + @target.outerHeight() + (5 + @config.margin)
        left = xy.left + (@target.outerWidth() / 2) - ($(@selector).outerWidth() / 2)
      when "left"
        top = xy.top + (@target.outerHeight() / 2) - ($(@selector).outerHeight() / 2)
        left = xy.left - $(@selector).outerWidth() - (5 + @config.margin)
      else
        top = xy.top - $(@selector).outerHeight() - (5 + @config.margin)
        left = xy.left + (@target.outerWidth() / 2) - ($(@selector).outerWidth() / 2)
    $(@selector).removeClass("top right bottom left").addClass(position).css
      left: left
      top: top

  # Show the tooltip using the `config`-ured `delay` and `fade` microseconds.
  show: ->
    at = @
    @position()
    @timer = Plugins.delay at.config.delay, -> 
      $(Plugins.cat ".", at.config.class).fadeOut at.config.fade
      $(at.selector).fadeIn at.config.fade

# Define the plugin as a jQuery-function.
$.fn.tooltip = (config) -> @.each -> new Plugins.Tooltip config, $(@)
