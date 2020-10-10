function rotten(selector){
	let prevDisplay='';
	const obj = {
		el: document.querySelector(selector),
		attr: (attr, value) => {
			if (value == undefined){
				return obj.el.getAttribute(attr);
			} else {
				obj.el.setAttribute(attr, value);
			}
		},
		css: (property, value) => {
			let new_value = `;${obj.el.getAttribute('style')};${property}:${value}`
			obj.el.style = new_value;
		},
		hide: (time, callback) => {
			if (time == undefined){
				prevDisplay = obj.el.style.display;
				obj.el.style.display = 'none';
				if (callback != undefined){
					callback();
				}
			} else {
				setTimeout(function(){
					obj.el.style.display = 'none';
					if (callback != undefined){
						callback();
					}
				},time)
			}
		},
		show: (time, callback) => {
			if (time == undefined){
				obj.el.style.display = prevDisplay;
				if (callback != undefined){
					callback();
				}
			} else {
				setTimeout(function(){
					obj.el.style.display = prevDisplay;
					if (callback != undefined){
						callback();
					}
				},time)
			}
		},
		text: (value) => {
			if (value == undefined){
				return obj.el.innerHTML;
			} else {
				obj.el.innerHTML=value;
			}
		},
		html: (value) => {
			if (value == undefined){
				return obj.el.outerHTML;
			} else {
				obj.el.outerHTML=value;
			}
		},
		on: (event, callback) => {
			document.addEventListener(event, callback);
		},
		append: (value) => {
			obj.el.innerHTML=`${obj.el.innerHTML}${value}`;
		},
		prepend: (value) => {
			obj.el.innerHTML=`${value}${obj.el.innerHTML}`;
		},
		remove: () => {
			obj.el.outerHTML='';
		},
		empty: () => {
			obj.el.innerHTML='';
		},
		input: (value,callback) => {
			if (value == undefined && callback == undefined){
				return obj.el.value;
			} else {
				if (value == obj.el.value){
					callback();
				}
			}
		},
		click: (callback) => {
			if (callback == undefined) return null;
			obj.el.onclick = function(){
				callback();
			}
		},
		hover: (outhover, onhover) => {
			if (outhover == undefined && onhover == undefined) return null;
			obj.el.onmouseleave = function(){
				outhover();
			}
			obj.el.onmouseenter = function(){
				onhover();
			}
		},
		saveState: () => {
			localStorage.setItem(selector, obj.el.innerHTML);
		},
		loadState: () => {
			obj.el.innerHTML = localStorage.getItem(selector);
		},
		clearState: () => {
			localStorage.removeItem(selector);
		},
		addClass: (value) => {
			if (obj.el.getAttribute('class') == undefined) obj.el.setAttribute('class', '');
			let newClass = `${obj.el.getAttribute('class')} ${value}`;
			obj.el.setAttribute('class', newClass);
		},
		removeClass: (value) => {
			if (obj.el.getAttribute('class') == undefined) return '';
			let newClass = `${obj.el.getAttribute('class').replace(value, '')}`;
			obj.el.setAttribute('class', newClass);
		}
	}
	return obj;
}
const rottenUI = {
	setBGVideo: function (obj){
		let a = document.querySelector("body");
		a.innerHTML = '<video style="position:fixed; right:0; top:0; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-1" autoplay loop class="baceo-vid" muted plays-inline><source src=' + obj.path + ' type=video/' + obj.type + '></video>' + a.innerHTML;
		if (obj.style != undefined){
			let b = document.querySelector(".baceo-vid").style;
			b = b + obj.style;
		}
	},
	setBGImage: function(path){
		let a = document.querySelector("body");
		a.innerHTML = `<img style="position:fixed; right:0; top:0; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-1" src="${path}"></img> ${a.innerHTML}`;
	},
	setTitle: function(title){
		let a = document.querySelector('head');
		if (a.innerHTML.indexOf('<title>') == -1){
			a.innerHTML = a.innerHTML + `<title>${title}</title>`;
		} else {
			let b = document.querySelector('title');
			b.innerHTML = title;
		}
	},
	setLogo: function(path){
		let a = document.querySelector('head');
		a.innerHTML = `<link rel='icon' href='${path}'></link>${a.innerHTML}`;
	},
	setLoadBar: function(obj){
		let a = document.querySelector("body");
		a.innerHTML = "<div class='processjs'></div>" + a.innerHTML;
		let b = document.querySelector(".processjs");
		if (obj.position == undefined) obj.position = "absolute";
		if (obj.size == undefined) obj.size = "5px";
		if (obj.color == undefined) obj.color = "red";
		b.style = `position: absolute;left: 0;right:0;height:${obj.size};background-color:${obj.color}`;
		if (obj.speed == undefined) obj.speed = 3;
		let c=0;
		let count = setInterval(function(){
			c++;
			b.style.width = c + "%";
			if (c==101){
				clearInterval(count);
				b.outerHTML = "";
			}
		},obj.speed);
	}
}