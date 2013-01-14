# ## Plugins.Tabs
#
# Plugin that shows only one content element at a time and displays the
# elemants in a tab-like mannor.
#
# *Example usage in your JavaScript:*
#
#     $("div").tabs();
#
class Plugins.Tabs extends Plugins.Plugin
  defaults:
    class: "tabs"  # Class of the DOM-element

  # Activate the content of a given tab element.
  activate: (el) ->
    @invoker.find(Plugins.cat " a[href!=", el.attr("href"), "]").removeClass("active")
    @toggle el.attr("href")
    el.toggleClass("active")

  # Bind click functionality to the anchors in the tab bar.
  bind: ->
    at = @
    at.invoker.find("a").on "click", (e) ->
      e.preventDefault()
      at.activate $(@)

  # Initialize the newly created Tabs plugin.
  init: ->
    @activate @invoker.find("a:first")
    @bind()

  # Toggle the tab element with a given `id`. Close all other content
  # elements.
  toggle: (id) ->
    @invoker.find("div.content div").hide()
    @invoker.find(id).show()

# Define the plugin as a jQuery-function.
$.fn.tabs = (config) -> @.each -> new Plugins.Tabs config, $(@)
