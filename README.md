jQuery Plugin Collection
========================

A collection of jQuery plugins.

jquery.tabs.js
--------------

Example HTML:

	<ul class="tabs">
		<li><a href="#tab1">Tab 1</a></li>
		<li><a href="#tab2">Tab 2</a></li>
		<li><a href="#tab3">Tab 3</a></li>
		<li><a href="#tab4">Tab 4</a></li>
	</ul>
	<div class="tabs-content">
		<div class="tab1">Some content for tab 1.</div>	
		<div class="tab2">Some content for tab 2.</div>	
		<div class="tab3">Some content for tab 3.</div>	
		<div class="tab4">Some content for tab 4.</div>	
	</div>

and JavaScript / jQuery:

	$(".tabs").tabs({
		activeClass  : "active",      // Class for the active list-element
		contentClass : "tabs-content" // Class for the content element
	});

jquery.tooltip.js
-----------------

Example usage:

    $("jQuery Selector").tooltip({
		cls      : "tooltip",       // Class of the DOM-element
		text     : ".tooltip-text", // Selector of the tooltip text element
		delay    : 100,             // Delay in showing the tooltip
		fade     : 100,             // Fade time in microseconds
		margin   : 3,               // Space surrounding target element
		position : "top",           // Position in relation to target element (top, right, bottom or left)
		size     : "normal"         // Size of the tooltip (normal or large)
    });

To see the source code, visit the [Github Repository](https://github.com/Mytho/jquery.plugins.js).
