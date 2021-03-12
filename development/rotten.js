function rt(selector){
	let prevDisplay='';
	const obj = {
		el: document.querySelectorAll(selector),
		attr: (attr, value) => {
			if (value == undefined) return obj.el[0].getAttribute(attr);
			obj.el.forEach(item => item.setAttribute(attr, value));
		},
		mulAttr: (attr) => obj.el.forEach(item => attr.forEach(value => item.setAttribute(value[0],value[1]))),
		mulProp: (attr) => attr.forEach(value => obj.el[0].setAttribute(value[0],value[1])),
		prop: (attr, value) => {
			if (value == undefined) return obj.el[0].getAttribute(attr);
			obj.el[0].setAttribute(attr, value);
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
		removeAttr:value => obj.el.forEach(item => item.removeAttribute(value)),
		removeProp:value => obj.el[0].removeAttribute(value),
		css: (property, value) => {
			obj.el.forEach(item => {
				if (item.getAttribute('style') == null) item.setAttribute('style', '');
				let new_value = `;${item.getAttribute('style')};${property}:${value}`
				item.setAttribute('style', new_value);
			});
		},
		mulCSS: (property) => {
			obj.el.forEach(item => property.forEach(value => {
				if (item.getAttribute('style') == null) item.setAttribute('style', '');
				let new_value = `;${item.getAttribute('style')};${value[0]}:${value[1]}`
				item.setAttribute('style', new_value);
			}));
		},
		style: value => {
			if (value == undefined) return obj.el[0].getAttribute('style');
			obj.el.forEach(item => item.setAttribute('style', value));
		},
		hide: (time, callback) => {
			if (time == undefined) time=0;
			setTimeout(()=>{
				obj.el.forEach(item => item.style.display = 'none');
				if (callback != undefined) callback();
			},time)
		},
		show: (time, callback) => {
			if (time == undefined) time=0;
			setTimeout(()=>{
				obj.el.forEach(item => item.style.display = prevDisplay);
				if (callback != undefined) callback();
			},time)
		},
		fadeOut: (time,callback) => {
			if (time == undefined) time = 0;
			obj.el.forEach(item => {
				item.style.opacity ='0';
				item.style.transition = `opacity ${time}ms`;
			});
			setTimeout(callback,time);
		},
		fadeIn: (time,callback) => {
			if (time == undefined) time = 0;
			obj.el.forEach(item => {
				item.style.opacity = '1';
				item.style.transition = `opacity ${time}ms`;
			});
			setTimeout(callback,time);
		},
		text: value => {
			if (value == undefined) return obj.el[0].innerText;
			obj.el.forEach(item => item.innerText=value);
		},
		html: value => {
			if (value == undefined) return obj.el[0].innerHTML;
			obj.el.forEach(item => item.innerHTML=value);
		},
		body: value => {
			if (value == undefined) return obj.el[0].outerHTML;
			obj.el.forEach(item => item.outerHTML=value);
		},
		on: (event, callback) => obj.el.forEach(item => item.addEventListener(event, callback)),
		off: (event, callback) => obj.el.forEach(item => item.removeEventListener(event, callback)),
		append: value => obj.el.forEach(item => item.innerHTML=`${item.innerHTML}${value}`),
		prepend: value => obj.el.forEach(item => item.innerHTML=`${value}${item.innerHTML}`),
		remove: () => obj.el.forEach(item => item.remove()),
		empty: () => obj.el.forEach(item => item.innerHTML=''),
		input: (value,callback,other) => {
			let denied=false;
			if (value == undefined && callback == undefined && other == undefined)
				return obj.el[0].value;
			else {
				if (typeof value == 'string'){
					if (value == obj.el[0].value)
						callback();
					else
						other();
				} else if (typeof value == 'object'){
					for (i=0;i<value.length;i++){
						if (value[i] == obj.el[0].value){
							denied=true;
							callback();
							break;
						}
					}	
					if (!denied) other();
				}
			}
		},
		inputs: (option,original) => {
			let denied=false;
			for (i=0;i<option.length;i++){
				if (typeof option[i].value == 'string'){
					if (obj.el[0].value == option[i].value){
						option[i].callback();
						denied=true;
					}
				} else if (typeof option[i].value == 'object') {
					for (j=0;j<value.length;j++){
						if (option[i].value[j] == obj.el[0].value){
							denied=true;
							option[i].callback();
							break;
						}
					}
				}
			}
			if (!denied && original != undefined) original();
		},
		val: value => {
			if (value == undefined)
				return obj.el[0].value;
			else
				obj.el[0].value = value;
		},
		check: (checked,unchecked) => {
			if (checked != undefined && unchecked != undefined){
				if (obj.el[0].checked == true)
					checked();
				else
					unchecked();
			}
		},
		click: callback => {
			if (callback == undefined) return null;
			obj.el.forEach(item => item.onclick = () => callback());
		},
		hover: (outhover, onhover) => {
			if (outhover == undefined && onhover == undefined) return null;
			obj.el.forEach(item => {
				item.onmouseleave = () => outhover();
				item.onmouseenter = () => onhover();
			});
		},
		title: value => {
			if (title == undefined) return obj.el[0].title;
			obj.el.forEach(item => item.title = value);
		},
		scroll: () => obj.el[0].scrollIntoView({ behavior: 'smooth' }),
		newEl: (tag,content,pos,attr) => {
			if (pos == undefined) pos = 'front';
			if (tag != undefined && content != undefined){
				let nel = document.createElement(tag);
				nel.innerHTML = content;
				attr.forEach(value => nel.setAttribute(value[0],value[1]));
				if (pos == 'front')
					obj.el.forEach(item => item.append(nel));
				else if (pos == 'back')
					obj.el.forEach(item => item.prepend(nel));
			}
		},
		appendEl: (value,remove) => {
			if (remove) obj.el.forEach(item => item.innerHTML='');
			obj.el.forEach(item => item.append(value));
		},
		disableEl: value => obj.el.forEach(item => item.removeChild(value)),
		prependEl: value => obj.el.forEach(item => item.prepend(value)),
		applyEl: (target,callback) => {
			if (target != undefined){
				setInterval(()=>{
					let tar=document.querySelector(target);
					tar.innerHTML = obj.el[0].value;
					tar.value = obj.el[0].value;
					if (callback != undefined) callback();
				},1);
			}
		},
		aplCheckEl: (checked, unchecked) => {
			if (checked != undefined && unchecked != undefined){
				setInterval(()=>{
					if (obj.el[0].checked == true)
						checked();
					else 
						unchecked();
				},1);
			}
		},
		renderIf: (condition,data,iftrue,iffalse) => {
			setInterval(()=>{
				if (!condition) {
					obj.el.forEach(item => item.innerHTML="");
					if (iffalse != undefined) iffalse();
				} else {
					obj.el.forEach(item => item.innerHTML=data);
					if (iftrue != undefined) iftrue();
				}
			},1); 
		},
		addClass: value => obj.el.forEach(item => item.classList.add(value)),
		removeClass: value => obj.el.forEach(item => item.classList.remove(value)),
		hasClass: value => obj.el[0].classList.contains(value),
		toggleClass: value => obj.el.forEach(item => item.classList.toggle(value)),
		rotate: (deg,loop) => {
			if (deg == undefined) deg = 1;
			let rotSp=deg, rotI=0, rotCt=1;
			if (loop.loop){
				if (loop.delay == undefined) loop.delay=1;
				obj.rot = setInterval(()=>{
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
					if (rotCt == loop.count && loop.end != false) clearInterval(obj.rot);
				},loop.delay);
			} else {
				obj.el[0].style.transform = `rotate(${rotSp}deg)`;
			}
		},
		tclick: (callback) => obj.el.forEach(item => item.ondblclick = callback),
		parent: () => obj.el[0].parentNode,
		child: () => obj.el[0].children,
		first: () => obj.el[0],
		typing: option => {
			let i = 0, text = option.str, speed = option.speed;
			if (option.clrPrev) obj.el[0].innerHTML='';
			if (option.loop) {
				if (option.delay == undefined) option.delay=1000;
				type=() => {
					if (i < text.length) {
						obj.el[0].innerHTML += text.charAt(i);
						i++;
						setTimeout(type, speed);
					}
				}
				type();
				setInterval(()=>{
					i = 0;
					obj.el[0].innerHTML='';
					type();
				},speed*text.length+option.delay);
			} else {
				type=()=>{
					if (i < text.length) {
						obj.el[0].innerHTML += text.charAt(i);
						i++;
						setTimeout(type, speed);
					}
				}
				type();
			}
		},
		isArray: arr => Array.isArray(arr),
		parseJSON: str => JSON.parse(str),
		parseHTML: str => {
			let tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = str;
			return tmp.body.children;
		},
		siblings: () => Array.prototype.filter.call(obj.el[0].parentNode.children, child => child !== obj.el[0]),
		now: () => Date.now(),
		switch: target => {
			let swap,tar;
			obj.el.forEach(item => {
				tar = document.querySelector(target);
				swap = item.outerHTML;
				item.outerHTML = tar.outerHTML;
				tar.outerHTML = swap;
			});
		},
		is: target => obj.el[0].outerHTML == target,
		next: () => obj.el[0].nextElementSibling,
		prev: () => obj.el[0].previousElementSibling
	}
	return obj;
}
const rdom = {};
rdom.el = (tag,content,attr) => {
	nel = document.createElement(tag);
	if (content != undefined) {
		if (typeof content == "string") 
			nel.innerHTML = content;
		else if (Array.isArray(content))
			content.forEach(item => nel.append(item));
	} 
	if (attr != undefined) attr.forEach(value => nel.setAttribute(value[0],value[1]));
	return nel;
}
rdom.render = (value,target,pos,remove) => {
	if (remove) target.innerHTML = '';
	if (pos == undefined) pos = 'front';
	if (pos == 'front')
		target.append(value);
	else if (pos == 'back')
		target.prepend(value);
}
rdom.remove = (value,target) => target.removeChild(value);
rdom.attr = (el, attribute) => attribute.forEach(value => el.setAttribute(value[0],value[1]));
rdom.style = (el, property) => el.setAttribute('style',property);
rdom.css = (el, property) => {
	property.forEach(value => {
		if (el.getAttribute('style') == null) el.setAttribute('style', '');
		let new_value = `${el.getAttribute('style')};${value[0]}:${value[1]}`
		el.setAttribute('style', new_value);
	});
}
rdom.contains = (el, child) => el !== child && el.contains(child);
rdom.on = (el, event, callback) => el.addEventListener(event, callback);
rdom.off = (el, event, callback) => el.removeEventListener(event, callback); 
const rUI = {
	setBGVideo: obj => {
		let a = document.querySelector("body");
		a.innerHTML = '<video style="position:fixed; right:0; top:0; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-1" autoplay loop class="baceo-vid" muted plays-inline><source src='+obj.path+' type=video/'+obj.type+'></video>'+a.innerHTML;
		if (obj.style != undefined){
			let b = document.querySelector(".baceo-vid").style;
			b = b + obj.style;
		}
	},
	setBGImage: path => {
		let a = document.querySelector("body");
		a.innerHTML = `<img style="position:fixed; right:0; top:0; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-1" src="${path}"></img> ${a.innerHTML}`;
	},
	setTitle: title => {
		let a = document.querySelector('head');
		if (a.innerHTML.indexOf('<title>') == -1)
			a.innerHTML = a.innerHTML + `<title>${title}</title>`;
		else {
			let b = document.querySelector('title');
			b.innerHTML = title;
		}
	},
	setLogo: path => {
		let a = document.querySelector('head');
		a.innerHTML = `<link rel='icon' href='${path}'></link>${a.innerHTML}`;
	},
	setLoadBar: obj => {
		let a = document.querySelector("body");
		a.innerHTML = "<div class='processjs'></div>" + a.innerHTML;
		let b = document.querySelector(".processjs");
		if (obj.position == undefined) obj.position = "absolute";
		if (obj.size == undefined) obj.size = "5px";
		if (obj.color == undefined) obj.color = "red";
		b.style = `position: absolute;left: 0;right:0;height:${obj.size};background-color:${obj.color}`;
		if (obj.speed == undefined) obj.speed = 3;
		let c=0;
		let count = setInterval(()=>{
			c++;
			b.style.width = c + "%";
			if (c==101){
				clearInterval(count);
				b.outerHTML = "";
			}
		},obj.speed);
	}
}
const rDev = {
	mobile: callback => {
		if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) callback();
	},
	windows: callback => {
		if (navigator.appVersion.indexOf("Win") != -1) callback();
	},
	mac: callback => {
		if (navigator.appVersion.indexOf("Mac") != -1) callback();
	},
	linux: callback => {
		if (navigator.appVersion.indexOf("Linux") != -1) callback();
	},
	unix: callback => {
		if (navigator.appVersion.indexOf("X11") != -1) callback();
	},
	os: (os,callback) => {
		if (navigator.appVersion.indexOf(os) != -1) callback();
	}
}