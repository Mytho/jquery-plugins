$ = jQuery
doc = document
uniq = -1
win = window

Plugins = win.Plugins = {}

Plugins.cat = -> Array.prototype.slice.call(arguments).join("")
Plugins.delay = (ms, fn) -> setTimeout fn, ms
Plugins.log = -> win.console?.log arg for arg in Array.prototype.slice.call arguments

# Create a DOM-element of a given `type` and width a given DOM-`klass`.
Plugins.create = (type, klass) ->
  el = $(doc.createElement type)
  el.addClass klass if klass
  return el

# Plugins class that can be extended by the different plugins. A configuration
# object `config` should be past to configure the plugin. A `invoker` jQuery
# object can be past to know which element invoked the plugin.
class Plugins.Plugin
  defaults:
    klass: "plugin" # Class of the DOM-element

  # Construct a new Plugin passing a `config` and `invoker` object.
  constructor: (config, invoker) ->
    @id = ++uniq
    @config = $.extend({}, @defaults, config)
    @invoker = invoker
    @elId = Plugins.cat @config.klass, "-", @id
    @selector = Plugins.cat "#", @elId
