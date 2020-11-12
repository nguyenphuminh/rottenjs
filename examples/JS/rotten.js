function rotten(selector){
	let prevDisplay='';
	const obj = {
		el: document.querySelectorAll(selector),
		attr: (attr, value) => {
			for (i=0;i<obj.el.length;i++){
				if (value == undefined){
					return obj.el[0].getAttribute(attr);
				} else {
					obj.el[i].setAttribute(attr, value);
				}
			}
		},
		prop: (attr, value) => {
			if (value == undefined){
				return obj.el[0].getAttribute(attr);
			} else {
				obj.el[0].setAttribute(attr, value);
			}
		},
		mount: (target,pos) => {
			if (target != undefined){
				if (pos == 'back'){
					let tg = document.querySelector(target);
					tg.innerHTML = obj.el[0].outerHTML + tg.innerHTML;
				} else {
					let tg = document.querySelector(target);
					tg.innerHTML = tg.innerHTML + obj.el[0].outerHTML;
				}
			}
		},
		removeAttr:(value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].removeAttribute(value);
			}
		},
		removeProp:(value) => {
			obj.el[0].removeAttribute(value);
		},
		css: (property, value) => {
			for (i=0;i<obj.el.length;i++){
				if (obj.el[i].getAttribute('style') == null){
					obj.el[i].setAttribute('style', '');
				}
				let new_value = `;${obj.el[i].getAttribute('style')};${property}:${value}`
				obj.el[i].setAttribute('style', new_value);
			}
		},
		style: (value) => {
			for (i=0;i<obj.el.length;i++){
				if (value == undefined){
					return obj.el[0].getAttribute('style');
				} else {
					obj.el[i].setAttribute('style', value);
				}
			}
		},
		hide: (time, callback) => {
				if (time == undefined){
					time=0;
				}
				setTimeout(function(){
					for (i=0;i<obj.el.length;i++){
						obj.el[i].style.display = 'none';
					}
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
				for (i=0;i<obj.el.length;i++){
					obj.el[i].style.display = prevDisplay;
				}
				if (callback != undefined){
					callback();
				}
			},time)
		},
		fadeOut: (time,callback) => {
			if (time == undefined) {
				time = 0;
			}
			for (i=0;i<obj.el.length;i++){
				obj.el[i].style.opacity ='0';
				obj.el[i].style.transition = `opacity ${time}ms`;
			}
			setTimeout(callback,time);
		},
		fadeIn: (time,callback) => {
			if (time == undefined) {
				time = 0;
			}
			for (i=0;i<obj.el.length;i++){
				obj.el[i].style.opacity = '1';
				obj.el[i].style.transition = `opacity ${time}ms`;
			}
			setTimeout(callback,time);
		},
		text: (value) => {
			for (i=0;i<obj.el.length;i++){
				if (value == undefined){
					return obj.el[0].innerText;
				} else {
					obj.el[i].innerText=value;
				}
			}
		},
		html: (value) => {
			for (i=0;i<obj.el.length;i++){
				if (value == undefined){
					return obj.el[0].innerHTML;
				} else {
					obj.el[i].innerHTML=value;
				}
			}
		},
		body: (value) => {
			for (i=0;i<obj.el.length;i++){
				if (value == undefined){
					return obj.el[0].outerHTML;
				} else {
					obj.el[i].outerHTML=value;
				}
			}
		},
		on: (event, callback) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].addEventListener(event, callback);
			}
		},
		off: (event, callback) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].removeEventListener(event, callback);
			}
		},
		append: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].innerHTML=`${obj.el[i].innerHTML}${value}`;
			}
		},
		prepend: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].innerHTML=`${value}${obj.el[i].innerHTML}`;
			}
		},
		remove: () => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].outerHTML='';
			}
		},
		empty: () => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].innerHTML='';
			}
		},
		input: (value,callback,other) => {
			let denied=false;
			if (value == undefined && callback == undefined && other == undefined){
				return obj.el[0].value;
			} else {
				if (typeof(value) == 'string'){
					if (value == obj.el[0].value){
						callback();
					} else {
						other();
					}
				} else if (typeof(value) == 'object'){
					for (i=0;i<value.length;i++){
						if (value[i] == obj.el[0].value){
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
					if (obj.el[0].value == option[i].value){
						option[i].callback();
						denied=true;
					}
				} else if (typeof(option[i].value) == 'object') {
					for (j=0;j<value.length;j++){
						if (option[i].value[j] == obj.el[0].value){
							denied=true;
							option[i].callback();
							break;
						}
					}
				}
			}
			if (denied == false && original != undefined){
				original();
			}
		},
		val: (value) => {
			if (value == undefined) {
				return obj.el[0].value;
			} else {
				obj.el[0].value = value;
			}
		},
		check: (checked,unchecked) => {
			if (checked != undefined && unchecked != undefined){
				if (obj.el[0].checked == true){
					checked();
				} else {
					unchecked();
				}
			}
		},
		click: (callback) => {
			if (callback == undefined) return null;
			for (i=0;i<obj.el.length;i++){
				obj.el[i].onclick = function(){
					callback();
				}
			}
		},
		hover: (outhover, onhover) => {
			if (outhover == undefined && onhover == undefined) return null;
			for (i=0;i<obj.el.length;i++){
				obj.el[i].onmouseleave = function(){
					outhover();
				}
				obj.el[i].onmouseenter = function(){
					onhover();
				}
			}
		},
		title: (value) => {
			for (i=0;i<obj.el.length;i++){
				if (title == undefined) {
					return obj.el[0].title;
				} else {
					obj.el[i].title = value;
				}
			}
		},
		newEl: (tag,content,pos) => {
			if (pos == undefined) pos = 'front';
			if (tag != undefined && content != undefined){
				let nel;
				if (pos == 'front') {
					for (i=0;i<obj.el.length;i++){
						nel = document.createElement(tag);
						nel.innerHTML = content;
						obj.el[i].append(nel);
					}
				} else if (pos == 'back'){
					for (i=0;i<obj.el.length;i++){
						nel = document.createElement(tag);
						nel.innerHTML = content;
						obj.el[i].prepend(nel);
					}
				}
			}
		},
		scroll: () => {
			obj.el[0].scrollIntoView({ behavior: 'smooth' });
		},
		first: () => obj.el[0],
		createEl: (tag, content) => {
			nel = document.createElement(tag);
			if (content != undefined) {
				nel.innerHTML = content;
			}
			return nel;
		},
		appendEl: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].append(value);
			}
		},
		prependEl: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].prepend(value);
			}
		},
		applyEl: (target,callback) => {
			if (target != undefined){
				setInterval(function(){
					document.querySelector(target).innerHTML = obj.el[0].value;
					if (callback != undefined){
						callback();
					}
				},1);
			}
		},
		aplCheckEl: (checked, unchecked) => {
			if (checked != undefined && unchecked != undefined){
				setInterval(function(){
					if (obj.el[0].checked == true){
						checked();
					} else {
						unchecked();
					}
				},1);
			}
		},
		saveState: () => {
			localStorage.setItem(selector, obj.el[0].innerHTML);
		},
		loadState: () => {
			obj.el[0].innerHTML = localStorage.getItem(selector);
		},
		clearState: () => {
			localStorage.removeItem(selector);
		},
		addClass: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].classList.add(value);
			}
		},
		removeClass: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].classList.remove(value);
			}
		},
		hasClass: (value) => obj.el[0].classList.contains(value),
		toggleClass: (value) => {
			for (i=0;i<obj.el.length;i++){
				obj.el[i].classList.toggle(value);
			}
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
					obj.el[0].style.transform = `rotate(${rotI}deg)`;
					rotI+=rotSp;
					if (rotCt == loop.count && loop.end != false) {
						clearInterval(obj.rot);
					};
				},loop.delay);
			} else {
				obj.el[0].style.transform = `rotate(${rotSp}deg)`;
			}
		},
		parent: () => obj.el[0].parentNode,
		child: () => obj.el[0].children,
		typing: (option) => {
			let i = 0;
			let text = option.str;
			let speed = option.speed;
			if (option.clrPrev == true) {
				obj.el[0].innerHTML='';
			}
			if (option.loop == true) {
				if (option.delay == undefined) option.delay=1000;
				function type() {
					if (i < text.length) {
						obj.el[0].innerHTML += text.charAt(i);
						i++;
						setTimeout(type, speed);
					}
				}
				type();
				setInterval(function(){
					i = 0;
					obj.el[0].innerHTML='';
					type();
				},speed*text.length+option.delay);
			} else {
				function type() {
					if (i < text.length) {
						obj.el[0].innerHTML += text.charAt(i);
						i++;
						setTimeout(type, speed);
					}
				}
				type();
			}
		},
		isArray: (arr) => Array.isArray(arr),
		parseJSON: (str) => JSON.parse(str),
		parseHTML: (str) => {
			var tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = str;
			return tmp.body.children;
		},
		siblings: () => {
			Array.prototype.filter.call(obj.el[0].parentNode.children, function(child){
				return child !== obj.el[0];
			});
		},
		now: () => Date.now()
	}
	return obj;
}
const rt = (selector) => rotten(selector);
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
const rUI = rottenUI;
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
const rDev = rotDev;