# ## Plugins.Accordion
#
# Plugins that only show one content element at a time and animates witch a
# sliding effect once another content element must be displayed.
#
# *Example usage in your JavaScript:*
#
#     $('div').accordion();
#
class Plugins.Accordion extends Plugins.Plugin
  defaults:
    delay: 50           # Delay used when toggling elements
    class: 'accordion'  # Class of the DOM-element
    slide: 250          # Animation speed of the slide effect

  # Activate a given element `el` by adding a class.
  activate: (el) ->
    $(Plugins.cat @selector, ' a[href!=', el.attr('href'), ']').removeClass('active')
    el.toggleClass('active')

  # Bind click event to the varous anchors in the accordion plugin.
  bind: ->
    at = @
    $(Plugins.cat at.selector, ' a').on 'click', (e) ->
      e.preventDefault()
      at.activate $(@)
      at.toggle $(@).attr('href')

  # Initialize the accordion plugin by hiding all elements and binding any
  # necessary events to it's elements.
  init: ->
    $(@target).attr('id', @elId)
    $(Plugins.cat @selector, ' div').hide()
    @bind()

  # Toggle the accordion element with a given `id`. While also closing all
  # other element currently opened.
  toggle: (id) ->
    at = @
    Plugins.delay at.config.delay, ->
      $(Plugins.cat at.selector, ' div').slideUp at.config.slide
      if $(id).is(':visible')
        $(id).slideUp(at.config.slide)
      else
        $(id).slideDown(at.config.slide)

# Define the plugin as a jQuery-function.
$.fn.accordion = (config) -> @.each -> new Plugins.Accordion config, $(@)
