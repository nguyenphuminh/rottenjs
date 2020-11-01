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
		removeAttr:(value) => {
			obj.el.removeAttribute(value);
		},
		css: (property, value) => {
			let new_value = `;${obj.el.getAttribute('style')};${property}:${value}`
			obj.el.style = new_value;
		},
		hide: (time, callback) => {
			if (time == undefined){
				time=0;
			}
			setTimeout(function(){
				obj.el.style.display = 'none';
				if (callback != undefined){
					callback();
				}
			},time)
		},
		show: (time, callback) => {
			if (time == undefined){
				time=0;
			}
			setTimeout(function(){
				obj.el.style.display = prevDisplay;
				if (callback != undefined){
					callback();
				}
			},time)
		},
		fadeOut: (time,callback) => {
			if (time == undefined) {
				time = 0;
			}
			obj.el.style.opacity ='0';
			obj.el.style.transition = `opacity ${time}ms`;
			setTimeout(callback,time);
		},
		fadeIn: (time,callback) => {
			if (time == undefined) {
				time = 0;
			}
			obj.el.style.opacity = '1';
			obj.el.style.transition = `opacity ${time}ms`;
			setTimeout(callback,time);
		},
		text: (value) => {
			if (value == undefined){
				return obj.el.innerText;
			} else {
				obj.el.innerText=value;
			}
		},
		html: (value) => {
			if (value == undefined){
				return obj.el.innerHTML;
			} else {
				obj.el.innerHTML=value;
			}
		},
		body: (value) => {
			if (value == undefined){
				return obj.el.outerHTML;
			} else {
				obj.el.outerHTML=value;
			}
		},
		on: (event, callback) => {
			obj.el.addEventListener(event, callback);
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
		input: (value,callback,other) => {
			let denied=false;
			if (value == undefined && callback == undefined && other == undefined){
				return obj.el.value;
			} else {
				if (typeof(value) == 'string'){
					if (value == obj.el.value){
						callback();
					} else {
						other();
					}
				} else if (typeof(value) == 'object'){
					for (i=0;i<value.length;i++){
						if (value[i] == obj.el.value){
							denied=true;
							callback();
							break;
						}
					}	
					if (denied == false) {
						other();
					}
				}
			}
		},
		inputs: (option,original) => {
			let denied=false;
			for (i=0;i<option.length;i++){
				if (typeof(option[i].value) == 'string'){
					if (obj.el.value == option[i].value){
						option[i].callback();
						denied=true;
					}
				} else if (typeof(option[i].value) == 'object') {
					for (j=0;j<value.length;j++){
						if (option[i].value[j] == obj.el.value){
							denied=true;
							option[i].callback();
							break;
						}
					}
				}
			}
			if (denied == false){
				original();
			}
		},
		val: (value) => {
			if (value == undefined) {
				return obj.el.value;
			} else {
				obj.el.value = value;
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
			obj.el.classList.add(value);
		},
		removeClass: (value) => {
			obj.el.classList.remove(value);
		},
		hasClass: (value) => {
			return obj.el.classList.contains(value);
		},
		toggleClass: (value) => {
			obj.el.classList.toggle(value);
		},
		rotate: (deg,loop) => {
			if (deg == undefined) {
				deg = 1;
			}
			let rotSp=deg;
			let rotI=0;
			let rotCt=1;
			if (loop.loop == true){
				if (loop.delay == undefined) {
					loop.delay=1;
				}
				obj.rot = setInterval(function(){
					if (rotSp >= 1){
						if (rotI >= 360) {
							rotI=0;
							rotCt++;
						}
					} else {
						if (rotI <= -360) {
							rotI=0;
							rotCt++;
						}
					}
					obj.el.style.transform = `rotate(${rotI}deg)`;
					rotI+=rotSp;
					if (rotCt == loop.count && loop.end != false) {
						clearInterval(obj.rot);
					};
				},loop.delay);
			} else {
				obj.el.style.transform = `rotate(${rotSp}deg)`;
			}
		},
		parent: () => {
			return obj.el.parentNode;
		},
		child: () => {
			return obj.el.children;
		},
		typing: (option) => {
			let i = 0;
			let text = option.str;
			let speed = option.speed;
			if (option.clrPrev == true) {
				obj.el.innerHTML='';
			}
			function type() {
				if (i < text.length) {
					obj.el.innerHTML += text.charAt(i);
					i++;
					setTimeout(type, speed);
				}
			}
			type();
		},
		isArray: (arr) => {
			return Array.isArray(arr);
		},
		parseJSON: (str) => {
			return JSON.parse(str);
		},
		parseHTML: (str) => {
			var tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = str;
			return tmp.body.children;
		},
		siblings: () => {
			Array.prototype.filter.call(obj.el.parentNode.children, function(child){
				return child !== obj.el;
			});
		},
		now: () => {
			return Date.now();
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
const rotDev = {
	mobile: (callback) => {
		if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) callback();
	},
	windows: (callback) => {
		if (navigator.appVersion.indexOf("Win") != -1) callback();
	},
	mac: (callback) => {
		if (navigator.appVersion.indexOf("Mac") != -1) callback();
	},
	linux: (callback) => {
		if (navigator.appVersion.indexOf("Linux") != -1) callback();
	},
	unix: (callback) => {
		if (navigator.appVersion.indexOf("X11") != -1) callback();
	},
	os: (os,callback) => {
		if (navigator.appVersion.indexOf(os) != -1) callback();
	}
}