<div align="center">
	<img src='assets/logo.png'/>
	<br/>
	<p>A simple, light-weight (5kb) Javascript library for DOM manipulation and UI development</p>
	<br/>
	<a href="https://github.com/nguyenphuminh/rottenjs/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-orange.svg"/></a>
	<a href="https://npmcharts.com/compare/rottenjs?minimal=true"><img src="https://img.shields.io/npm/dm/rottenjs.svg?sanitize=true" alt="Downloads"></a>
	<a href="https://www.npmjs.com/package/rottenjs"><img src="https://img.shields.io/npm/v/rottenjs.svg?sanitize=true" alt="Version"></a>
	<a href="https://github.com/nguyenphuminh/rottenjs/blob/main/.github/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
	<a href="https://github.com/nguyenphuminh/rottenjs/search?l=javascript"><img alt="language" src="https://img.shields.io/badge/language-Javascript-purple.svg"></a>
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


## DOM manipulation using 'rt'
### Create a Rotten object:
By using these codes, you can create a Rotten object!

HTML:

	<div></div>

JS:

	let obj = rt('div');

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

But, all of the methods above will targets all the elements, to only targets one element that is found first, use:

	obj.prop(attribute_name, value);
	obj.removeProp(attribute_name);

To works with multiple attributes, you can use:

	obj.mulAttr([
		[attribute1, value1],
		[attribute2, value2]
	]);
	obj.mulProp([
		[attribute1, value1],
		[attribute2, value2]
	]);

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

To works with multiple css properties, you can use:

	obj.mulCSS([
		[property1, value1],
		[property2, value2]
	]);

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

### Mount a element onto another element

	obj.mount(target,position);

Example:

	// Append current element to the front of 'h1'
	obj.mount('h1');

	// Prepend current element to the back of 'h1'
	obj.mount('h1','back');

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

### Scroll to an element smoothly

	obj.scroll();

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

	obj.newEl(tag_name,HTML_content,position,attributes);

Example:

	obj.newEl('p','Hello guys'); //Append <p>Hello guys</p> to the parent node.

Prepend:

	obj.newEl('p','Hello guys','back'); //Prepend <p>Hello guys</p> to the parent node.

You can also set attributes for it, example:

	obj.newEl('p','Hello guys','front',[
		['class','title']
	]);

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

### Siblings

	obj.siblings();

### Return the number of milliseconds elapsed since January 1

	obj.now();

### Fade in and fade out animation

	obj.fadeIn(time,callback);
	obj.fadeOut(time,callback);

### Child and Parent nodes

	obj.parent() - Return the parent node
	obj.child() - Return the child node

### Condition checking

	// Only render this element with the innerHTML of "data" if condition is true. If it is true, executes iftrue(), else, executes iffalse()
	obj.renderIf(condition,data,iftrue,iffalse);

Example:

	obj.renderIf((obj.html() == "Stupid")),"Not stupid");

### Using normal Javascript methods
If you don't know, 'obj.el' is actually an array of DOM elements that was targetted, so you can apply Javascript methods.

Example:

	// Change the innerHTML of the first elements that it meets
	obj.el[0].innerHTML = 'Hello, World!';

	// Change all the innerHTML of all the elements that it meets
	obj.el.forEach(item => {
		item.innerHTML = "Hello, World!";
	})

In 1.2.x, 'obj.el' is just a variable that holds a single DOM element, but in 1.3.x, it is now an array containing multiple DOM elements that it founds.

### Grabbing the next node found

	obj.next()

### Grabbing the previous node found

	obj.prev()

### Check if the current node is the same as the other node

	obj.is(other);

### Grabbing the first node found
You can use:

	obj.el[0]

Or:

	obj.first();

### Parse datas
Parse HTML string:

	obj.parseHTML(string);

Parse JSON string:

	obj.parseJSON(string);

### Check if it's an array

	obj.isArray(arr);


## DOM rendering using 'rdom'

### Create a new HTML element
Create a HTML element:

	let newElement = rdom.el(tagname,content,attributes);

Render that element:

	rdom.render(newElement,parent_node,position,remove);
	// Position can be "front" or "back" to render the element to the front of back of the parent node. If being left blank or null, it will automatically set to 'front'.
	// Remove can be either true or false or blank. If true, it will replace the old element with the new one, if false, it will append/prepend it to the parent node.

Example:

	// Create new element consist of a "p" tag with innerHTML of 'Hello'. It also has 'class' set to 'hello'.
	let newElement = rdom.el('p',['Hello', rdom.el('span', 'World')],[
		['class', 'hello']
	]);

Render it to the front of the body tag:

	rdom.render(newElement,document.body,'front',true);

You can also mount that element onto another element using appendEl and prependEl of rt():

	obj.appendEl(newElement);
	obj.prependEl(newElement);

The differences between append() and appendEl() is that append() can insert text to the innerHTML of the element, while appendEl() can HTML elements we have created!

To remove an element, use:
	
	rdom.remove(element,parent_node);

Remove in rt:

	obj.disableEl(element);

You can set attribute using:

	rdom.attr(el, [
		[attribute1, value1],
		[attribute2, value2]
	]);

Set style attribute:

	rdom.style(el, style);

Using css:

	rdom.css(el, [
		[property1, value1],
		[property2, value2]
	]);

Add/Remove events to the element:

	rdom.on(el, event, callback);
	rdom.off(el, event, callback);

### Check if a parent node contains a child node

	obj.contains(child, parent);

## Components in 'rdom'
Example:
	
	class Hello {
		constructor () {
			this.el = rdom.el('p', 'Hello, World!);
		}
		update(data){
			this.el.innerHTML = data;
		}
	}
	const hello = new Hello();
	rdom.render(hello.el, document.body);

## Custom apis for web development using 'rUI'

### Add a background video

	rUI.setBGVideo({
		path:/*Video file's path*/,
		type:/*File type(mp4,mov)*/,
		style:/*Optional style*/,
	});

### Add a background image

	rUI.setBGImage(img_path);

### Change website's title

	rUI.setTitle(title);

### Change website's logo

	rUI.setLogo(logo_path);

### Add a top loading (intro) bar

	rUI.setLoadBar({
		color:/*CSS Color*/,
		size:/*Size*/,
		speed:/*Millisecond*/,
		position:/*CSS Position*/
	});

## Device detections using 'rDev'

	rDev.mobile(function(){
		//Execute if the user is using a mobile devive
	});
	rDev.windows(function(){
		//Execute if the user is using a Windows devive
	});
	rDev.mac(function(){
		//Execute if the user is using a Mac devive
	});
	rDev.linux(function(){
		//Execute if the user is using a Linux devive
	});
	rDev.unix(function(){
		//Execute if the user is using a Unix devive
	});
	rDev.os(os_name,function(){
		//Execute if the user is using a the option "os_name" device
	});