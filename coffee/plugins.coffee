$ = jQuery
doc = document
win = window

# Counter used to give each Plugin a `uniq` identifier.
uniq = -1

# Namespace used for the plugins.
Plugins = win.Plugins = {}

# Concatinate all `arguments` to a single string.
Plugins.cat = -> Array.prototype.slice.call(arguments).join("")

# Execute a function `fn` after a delay of microseconds `ms`.
Plugins.delay = (ms, fn) -> setTimeout fn, ms

# Log all `arguments` to the console if avaliable.
Plugins.log = -> win.console?.log arg for arg in Array.prototype.slice.call arguments

# Create a DOM-element of a given `type` and with a given DOM-`klass`.
Plugins.create = (type, klass) ->
  el = $(doc.createElement type)
  el.addClass klass if klass
  return el

# ## Plugins.Plugin
#
# The Plugin class can be extended to create a custom plugin. A configuration
# object `config` should be provided to configure the plugin and an optional
# `target` jQuery-object can be provided to know which element invoked the 
# plugin.
class Plugins.Plugin
  defaults:
    class: "plugin" # Class of the DOM-element

  # Construct a new Plugin, while providing  a `config` and `target` object.
  constructor: (config, target) ->
    @id = ++uniq
    @config = $.extend {}, @defaults, config
    @target = target
    @elId = Plugins.cat @config.class, "-", @id
    @selector = Plugins.cat "#", @elId
    @init()

  # Method that gets executed if the constructor is done constructing a new
  # Plugin.
  init: -> false
