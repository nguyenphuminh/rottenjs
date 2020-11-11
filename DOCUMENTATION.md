<div align="center">
	<img src='assets/logo.png'/>
	<br/>
	<p>A simple, light-weight (5kb) Javascript library for DOM</p>
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
You can change text contents of a object by using:

	obj.text('Hello, World!');

Also, you can change the innerHTML property too:

	obj.html('<b>Hello, World!</b>');

To change the outer content (outerHTML), use:

	obj.body('<div class='Text'>Hello,World</div>')

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

You can remove attributes with:

	obj.removeAttr(attribute_name);

### Working with styles and CSS
You can easily change css property of an object using:

	obj.css(property,value);

Example:

	obj.css('font-size', '100px');

You can change the whole css style of an object:

	obj.style(value);

Example:

	obj.style(`
		font-size:20px;
		font-family:Arial;
	`);

### Events
You can add an event by using:

	obj.on(event,eventHandler)

Remove an event can be done by:

	obj.off(event,eventHandler)

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

Or you can use:

	obj.val(); //Would return the input of the HTML input form

If you want to compare this input to another input to do a callback, you can use:

	obj.input(value_to_compare, callback, other);
	//If the input is the 'value_to_compare', executes callback(), or else, executes other().

To compare the input with multiple values which all executes one callback, you can insert an array like this:

	obj.input([value1,value2,value3], callback, other);
	//If the input is 'value1','value2' or 'value3', executes callback(), or else, executes other().

To compare the input with multiple values, each having different callbacks, do this:

	obj.inputs([
		{
			value:value1,
			callback:callback1,
		},
		{
			value:value2,
			callback:callback2,
		},
		{
			value:[value3_1,value3_2,value3_3],
			callback:callback3,
		}
	],original);

It will compare user's input with different values, then executes its callback. The "original" function will be execute if the input doesn't match any values listed.

If you want to set the value of the input tag, you can type in:

	obj.val(value);

Example:

	obj.input('Hello', function(){
		alert('Have a good day');
	},function(){
		obj.val('Hello');
	});

### HTML form checkbox

	// If checked, then executes checked()
	// If not checked, then executes unchecked()
	obj.check(checked,unchecked);

### Two ways binding in HTML form (sort of)
Binding with inputs:
	
	// Every times data changes, it will be inserted to 'target' and callback() will be executed.
	obj.applyEl(target,callback);

Binding with checkboxs:

	// If checked, then executes checked().
	// If not checked, then executes unchecked().
	obj.aplCheckEl(checked,unchecked);

### Click event
You can add a click event for an object through:

	obj.click(callback);

Example:

	obj.click(function(){
		alert('You clicked me!');
	});

### Classes
Adding classes:
	
	obj.addClass(class_name);

Removing classes: 

	obj.removeClass(class_name);

Check classes existence:

	obj.hasClass(class_name);

Toggle classes:

	obj.toggleClass(class_name);

Example:

	obj.addClass('hello'); 
	obj.addClass('object');
	obj.removeClass('hello');

### Create new child element

	obj.newEl(tag_name,HTML_content);

Example:

	obj.newEl('p','Hello guys'); //Append <p>Hello guys</p> to the parent node.

Prepend:

	obj.newEl('p','Hello guys','back'); //Prepend <p>Hello guys</p> to the parent node.

### Element's title
Return element's title attribute:

	obj.title();

Change element's title attribute:

	obj.title(content);

### Rotate object
Rotate object can be easily done by:

	obj.rotate(deg,{
		loop:/*true or false*/,
		delay:/*millisecond*/,
		count:/*number*/,
		end:/*true or false*/,
	});

The object will be rotated by 'deg' degree after 'delay'. It will rotate 'count' times. If 'loop' is set to false, then it will only rotate 'deg' one time only. If 'end' is set to false, then it will rotates endlessly. 

### Typing animation
Proceeding typing animations can be done with:

	obj.typing({
		str:/*String to type*/,
		speed:/*Typing speed - millisecond*/,
		clrPrev:/*true or false*/,
		loop:/*true or false*/,
		delay:/*true or false*/
	});

Set 'clrPrev' to <b>true</b> if you want to clear the previous content before typing. If you set 'loop' to true, then it will write the string endlessly after 'delay' millisecond(s).

### States of object
Save current state:

	obj.saveState();

Load saved state:

	obj.loadState();

Remove saved state: 

	obj.removeState();

### Siblings

	obj.siblings();

### Return current time

	obj.now();

### Fade in and fade out animation

	obj.fadeIn(time,callback);
	obj.fadeOut(time,callback);

### Child and Parent nodes

	obj.parent() - Return the parent node
	obj.child() - Return the child node

### Using normal Javascript methods
If you don't know, 'obj.el' is actually an array of DOM elements that targets to the previous object, so you can apply Javascript methods.

Example:

	// Change the innerHTML of the first elements that it meets
	obj.el[0].innerHTML = 'Hello, World!';

	// Change all the innerHTML of all the elements that it meets
	for (i=0;i<obj.el.length;i++) {
		obj.el[i].innerHTML = "Hello, World!";
	}

In 1.2.x, 'obj.el' is just a variable that holds a single DOM element, but in 1.3.x, it is now an array containing multiple DOM elements that it founds.

<b>Note: All the states are stored in the 'localStorage' of the browser.</b>

### Parse
Parse HTML string:

	obj.parseHTML(string);

Parse JSON string:

	obj.parseJSON(string);

### Check if it's an array

	obj.isArray(arr);


## Develop UI using rottenUI

### Add a background video

	rottenUI.setBGVideo({
		path:/*Video file's path*/,
		type:/*File type(mp4,mov)*/,
		style:/*Optional style*/,
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

## Device detections using rotDev

	rotDev.mobile(function(){
		//Execute if the user is using a mobile devive
	});
	rotDev.windows(function(){
		//Execute if the user is using a Windows devive
	});
	rotDev.mac(function(){
		//Execute if the user is using a Mac devive
	});
	rotDev.linux(function(){
		//Execute if the user is using a Linux devive
	});
	rotDev.unix(function(){
		//Execute if the user is using a Unix devive
	});
	rotDev.os(os_name,function(){
		//Execute if the user is using a the option "os_name" device
	});

## Shorter RottenJS

	// let obj = rotten('div');
	let obj = rt('');

	// rottenUI.setTitle('Rotten App');
	rUI.setTitle('Rotten App');

	/* 
	rotDev.mobile(function(){
		alert('This is a mobile device!');
	});
	*/
	rDev.mobile(function(){
		alert('This is a mobile device!');
	});