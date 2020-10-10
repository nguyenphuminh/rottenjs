<div align="center">
	<img src='assets/logo.png'/>
	<br/>
	<p>A simple, light-weight (2kb) Javascript library for DOM</p>
</div>

## Getting started
### Installation
You can clone RottenJS with git:

	git clone https://github.com/nguyenphuminh/RottenJS.git

Or install it in npm:

	npm i rottenjs

### Add RottenJS to your project
Add this tag to the 'head' tag of your .html files:

	<script src='rotten.min.js' type='text/javascript'></script>


## Functions
### Create a Rotten object:
By using these codes, you can create a Rotten object!

HTML:

	<div></div>

JS:

	let obj = rotten('div');

### Adding texts to the object
You can change contents of a object by using:

	obj.text('Hello, World!');

Also, you can use Html tags too:

	obj.text('<b>Hello, World!</b>');

To change the outer content (outerHTML), use:

	obj.html('<div class='Text'>Hello,World</div>')

If no value has been given, it will print out the inner/outer HTML content of the object.

### Append/Prepend texts to the object
This is how you can append/prepend texts:

	obj.append(" <3");
	obj.prepend("I said ");

### Hide/Show object
You can hide the object with:
	
	obj.hide();

Notice that that will hide the object immediately, so to set the time for it to disapear, use:

	obj.hide(millisecond);

Example:

	obj.hide(1000); // Hide the object after 1 second.

You can also show the object again, using:

	obj.show(millisecond);

You can add some callback when the object is show and hide! For example, this will alert 'The text has been shown' when the object is shown:

	obj.show(3000, function(){
		alert('The text has been shown');
	});

### Working with attributes
You can change/create a new attribute by:

	obj.attr(attribute_name, value);

Example:

	obj.attr('class', 'Hello');

If no value was given to the attribute, it will return the current value of the attribute instead.

### EventListener
You can addEventListener by using:

	obj.on(event,callback)

### Remove elements of an object
You can remove all the child elements of an object using:

	obj.empty();

To remove the object entirely, use:

	obj.remove();

### Hover event
To create a hover effect, you can type:

	obj.hover(outhover, onhover);

Example:

	obj.hover(function(){
		console.log('Out of text');
	},function(){
		console.log('On text');
	});

### Taking inputs from HTML form
Taking input can be done by:

	obj.input(); //Would return the input of the HTML input form

If you want to compare this input to another input to do a callback, you can use:

	obj.input(value_to_compare, callback);

Example:

	obj.input('Hello', function(){
		alert('Have a good day');
	});

### Click event
You can add a click event for an object through:

	obj.click(callback);

Example:

	obj.click(function(){
		alert('You clicked me!');
	});

### Adding/Removing classes
Adding classes:
	
	obj.addClass(class_name);

Removing classes: 

	obj.removeClass(class_name);

Example:

	obj.addClass('hello'); 
	obj.addClass('object');
	obj.removeClass('hello');

### Using normal Javascript methods
If you don't know, 'obj.el' is actually an object that targets to the previous object, so you can apply Javascript methods.

Example:

	obj.el.innerHTML = 'Hello, World!';

### States of object
Save current state:

	obj.saveState();

Load saved state:

	obj.loadState();

Remove saved state: 

	obj.removeState();

<b>Note: All the states are stored in the 'localStorage' of the browser.</b>


## Some optional functions for UI development

You would need to use a new module called 'rottenUI'.

### Add a background video

	rottenUI.setBGVideo({
		path:/*Video file's path*/;
		type:/*File type(mp4,mov)*/;
		style:/*Optional style*/;
	});

### Add a background image

	rottenUI.setBGImage(img_path);

### Change website's title

	rottenUI.setTitle(title);

### Change website's logo

	rottenUI.setLogo(logo_path);

### Add a top loading bar

	rottenUI.setLoadBar({
		color:/*CSS Color*/,
		size:/*Size*/,
		speed:/*Millisecond*/,
		position:/*CSS Position*/
	});