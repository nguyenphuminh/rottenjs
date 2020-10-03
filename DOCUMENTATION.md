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

	const obj = rotten('div');

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

For example:

	obj.hide(1000); // Hide the object after 1 second.

You can also show the object again, using:

	obj.show(millisecond);

### Working with attributes
You can change/create a new attribute by:

	obj.attr(attribute_name, value);

For example:

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

### Using normal Javascript methods
If you don't know, 'obj.el' is actually an object that targets to the previous object, so you can apply Javascript methods.

For examples:

	obj.el.innerHTML = 'Hello, World!';


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

### Change website/s logo

	rottenUI.setLogo(logo_path);