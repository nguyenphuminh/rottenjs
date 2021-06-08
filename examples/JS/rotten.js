function rt(selector){
	"use strict";
	let prevDisplay='';
	const obj = {
		el: document.querySelectorAll(selector),
		attr: (attr, value) => {
			if (typeof value === "undefined" || value === null) return obj.el[0].getAttribute(attr);
			obj.el.forEach(item => item.setAttribute(attr, value));
		},
		mulAttr: (attr) => obj.el.forEach(item => attr.forEach(value => item.setAttribute(value[0],value[1]))),
		mulProp: (attr) => attr.forEach(value => obj.el[0].setAttribute(value[0],value[1])),
		prop: (attr, value) => {
			if (typeof value === "undefined" || value === null) return obj.el[0].getAttribute(attr);
			obj.el[0].setAttribute(attr, value);
		},
		mount: (target,pos) => {
			if (!(typeof target === "undefined" || target === null)){
				let tg = document.querySelector(target);
				tg.innerHTML = pos === "back" ? obj.el[0].outerHTML + tg.innerHTML : tg.innerHTML + obj.el[0].outerHTML;
			}
		},
		removeAttr:value => obj.el.forEach(item => item.removeAttribute(value)),
		removeProp:value => obj.el[0].removeAttribute(value),
		css: (property, value) => {
			obj.el.forEach(item => {
				if (item.getAttribute('style') === null) item.setAttribute('style', '');
				let new_value = `;${item.getAttribute('style')};${property}:${value}`
				item.setAttribute('style', new_value);
			});
		},
		mulCSS: (property) => {
			obj.el.forEach(item => property.forEach(value => {
				if (item.getAttribute('style') === null) item.setAttribute('style', '');
				let new_value = `;${item.getAttribute('style')};${value[0]}:${value[1]}`
				item.setAttribute('style', new_value);
			}));
		},
		style: value => {
			if (typeof value === "undefined" || value === null) return obj.el[0].getAttribute('style');
			obj.el.forEach(item => item.setAttribute('style', value));
		},
		hide: (time, callback) => {
			time = time || 0;
			setTimeout(()=>{
				obj.el.forEach(item => item.style.display = 'none')
				if (!(typeof callback === "undefined" || callback === null)) callback();
			},time)
		},
		show: (time, callback) => {
			time = time || 0;
			setTimeout(()=>{
				obj.el.forEach(item => item.style.display = prevDisplay);
				if (!(typeof callback === "undefined" || callback === null)) callback();
			},time)
		},
		fadeOut: (time,callback) => {
			if (typeof time === "undefined" || time === null) time = 0;
			obj.el.forEach(item => {
				item.style.opacity ='0';
				item.style.transition = `opacity ${time}ms`;
			});
			setTimeout(callback,time);
		},
		fadeIn: (time,callback) => {
			if (typeof time === "undefined" || time === null) time = 0;
			obj.el.forEach(item => {
				item.style.opacity = '1';
				item.style.transition = `opacity ${time}ms`;
			});
			setTimeout(callback,time);
		},
		text: value => {
			if (typeof value === "undefined" || value === null) return obj.el[0].innerText;
			obj.el.forEach(item => item.innerText=value);
		},
		html: value => {
			if (typeof value === "undefined" || value === null) return obj.el[0].innerHTML;
			obj.el.forEach(item => item.innerHTML=value);
		},
		body: value => {
			if (typeof value === "undefined" || value === null) return obj.el[0].outerHTML;
			obj.el.forEach(item => item.outerHTML=value);
		},
		on: (event, callback) => obj.el.forEach(item => item.addEventListener(event, callback)),
		off: (event, callback) => obj.el.forEach(item => item.removeEventListener(event, callback)),
		append: value => obj.el.forEach(item => item.innerHTML=`${item.innerHTML}${value}`),
		prepend: value => obj.el.forEach(item => item.innerHTML=`${value}${item.innerHTML}`),
		remove: () => obj.el.forEach(item => item.remove()),
		empty: () => obj.el.forEach(item => item.innerHTML=''),
		input: (value,callback,other) => {
			let denied = false;
			if (value == undefined && callback == undefined && other == undefined)
				return obj.el[0].value;
			else {
				if (typeof value === 'string'){
					if (value === obj.el[0].value)
						callback();
					else
						other();
				} else if (Array.isArray(value)){
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
			let denied = false;
			for (i=0;i<option.length;i++){
				if (typeof option[i].value === 'string'){
					if (obj.el[0].value === option[i].value){
						option[i].callback();
						denied=true;
					}
				} else if (Array.isArray(option[i].value)) {
					for (j=0;j<value.length;j++){
						if (option[i].value[j] === obj.el[0].value){
							denied=true;
							option[i].callback();
							break;
						}
					}
				}
			}
			if (!denied && !(typeof original === "undefined" || original === null)) original();
		},
		val: value => {
			if (typeof value === "undefined" || value === null)
				return obj.el[0].value;
			else
				obj.el[0].value = value;
		},
		check: (checked,unchecked) => {
			if (!(typeof checked === "undefined" || checked === null) && !(typeof unchecked === "undefined" || unchecked === null)){
				if (obj.el[0].checked)
					checked();
				else
					unchecked();
			}
		},
		click: callback => !(typeof callback === "undefined" || callback === null) && obj.el.forEach(item => item.onclick = () => callback()),
		hover: (outhover, onhover) => {
			if (!(typeof outhover === "undefined" || outhover === null) && !(typeof onhover === "undefined" || outhover === null)) {
				obj.el.forEach(item => {
					item.onmouseleave = () => outhover();
					item.onmouseenter = () => onhover();
				});
			}
		},
		title: value => {
			if (typeof title === "undefined" || title === null) return obj.el[0].title;
			obj.el.forEach(item => item.title = value);
		},
		scroll: () => obj.el[0].scrollIntoView({ behavior: 'smooth' }),
		newEl: (tag,content,pos,attr) => {
			if (typeof pos === "undefined" || pos === null) pos = 'front';
			if (!(typeof tag === "undefined" || tag === null) && !(content === "undefined" || content === null)){
				let nel = document.createElement(tag);
				nel.innerHTML = content;
				attr.forEach(value => nel.setAttribute(value[0],value[1]));
				if (pos === 'front')
					obj.el.forEach(item => item.append(nel));
				else if (pos === 'back')
					obj.el.forEach(item => item.prepend(nel));
			}
		},
		appendEl: (value,remove) => {
			if (remove) obj.el.forEach(item => item.innerHTML='');
			obj.el.forEach(item => item.append(value));
		},
		disableEl: value => obj.el.forEach(item => item.removeChild(value)),
		prependEl: value => obj.el.forEach(item => item.prepend(value)),
		sameEl: target => obj.el[0].outerHTML === target.outerHTML,
		addClass: value => obj.el.forEach(item => item.classList.add(value)),
		removeClass: value => obj.el.forEach(item => item.classList.remove(value)),
		hasClass: value => obj.el[0].classList.contains(value),
		toggleClass: value => obj.el.forEach(item => item.classList.toggle(value)),
		rotate: (deg,loop) => {
			if (typeof deg === "undefined" || deg === null) deg = 1;
			let rotSp=deg, rotI=0, rotCt=1;
			if (loop.loop){
				if (typeof loop.delay === "undefined" || loop.delay === null) loop.delay=1;
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
					if (rotCt === loop.count && loop.end) clearInterval(obj.rot);
				},loop.delay);
			} else {
				obj.el[0].style.transform = `rotate(${rotSp}deg)`;
			}
		},
		tclick: (callback) => !(typeof callback === "undefined" || callback === null) && obj.el.forEach(item => item.ondblclick = callback),
		parent: () => obj.el[0].parentNode,
		child: () => obj.el[0].children,
		first: () => obj.el[0],
		typing: option => {
			let i = 0, text = option.str, speed = option.speed;
			if (option.clrPrev) obj.el[0].innerHTML='';
			if (option.loop) {
				if (typeof option.delay === "undefined" || option.delay === null) option.delay=1000;
				let type=() => {
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
				let type=()=>{
					if (i < text.length) {
						obj.el[0].innerHTML += text.charAt(i);
						i++;
						setTimeout(type, speed);
					}
				}
				type();
			}
		},
		siblings: () => Array.prototype.filter.call(obj.el[0].parentNode.children, child => child !== obj.el[0]),
		switch: target => {
			let swap,tar;
			obj.el.forEach(item => {
				tar = document.querySelector(target);
				swap = item.outerHTML;
				item.outerHTML = tar.outerHTML;
				tar.outerHTML = swap;
			});
		},
		is: target => obj.el[0].outerHTML === target,
		next: () => obj.el[0].nextElementSibling,
		prev: () => obj.el[0].previousElementSibling
	}
	return obj;
}
const rdom = {
	el: (tag,content,attr) => {
		nel = document.createElement(tag);
		if (!(typeof content === "undefined" || content === null)) {
			if (typeof content === "string") 
				nel.innerHTML = content;
			else if (Array.isArray(content))
				content.forEach(item => nel.append(item));
		} 
		if (!(typeof attr === undefined || attr === null)) attr.forEach(value => nel.setAttribute(value[0],value[1]));
		return nel;
	},
	render: (value,target,pos,remove) => {
		if (remove) target.innerHTML = '';
		if (typeof pos === "undefined" || pos === null) pos = 'front';
		if (pos === 'front')
			target.append(value);
		else if (pos === 'back')
			target.prepend(value);
	},
	remove: (value,target) => target.removeChild(value),
	attr: (el, attribute) => attribute.forEach(value => el.setAttribute(value[0],value[1])),
	style: (el, property) => el.setAttribute('style',property),
	css: (el, property) => {
		property.forEach(value => {
			if (el.getAttribute('style') === null) el.setAttribute('style', '');
			let new_value = `${el.getAttribute('style')};${value[0]}:${value[1]}`
			el.setAttribute('style', new_value)
		});
	},
	contains: (el, child) => el !== child && el.contains(child),
	on: (el, event, callback) => el.addEventListener(event, callback),
	off: (el, event, callback) => el.removeEventListener(event, callback) 
};
const rUI = {
	setBGVideo: obj => {
		let a = document.querySelector("body");
		a.innerHTML = '<video style="position:fixed; right:0; top:0; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-1" autoplay loop class="baceo-vid" muted plays-inline><source src='+obj.path+' type=video/'+obj.type+'></video>'+a.innerHTML;
		if (!(typeof obj.style === "undefined" || obj.style === null)){
			let b = document.querySelector(".baceo-vid").style;
			b = b + obj.style;
		}
	},
	setBGImage: path => {
		let a = document.querySelector("body");
		a.innerHTML = `<img style="position:fixed; right:0; top:0; min-width:100%; min-height:100%; width:auto; height:auto; z-index:-1" src="${path}"></img> ${a.innerHTML}`;
	},
	setLoadBar: obj => {
		let opt = {};
		if (!(typeof obj === "undefined" || obj === null)) opt = obj; 
		let a = document.querySelector("body");
		a.innerHTML = "<div class='processjs'></div>" + a.innerHTML;
		let b = document.querySelector(".processjs");
		if (typeof opt.position === "undefined" || opt.position === null) opt.position = "absolute";
		if (typeof opt.size === "undefined" || opt.size === null) opt.size = "5px";
		if (typeof opt.color === "undefined" || opt.color === null) opt.color = "red";
		b.style = `position: absolute;left:0;right:0;top:0;height:${opt.size};background-color:${opt.color}`;
		if (typeof opt.speed === "undefined" || opt.speed === null) opt.speed = 3;
		let c=0;
		let count = setInterval(()=>{
			c++;
			b.style.width = c + "%";
			if (c === 101){
				clearInterval(count);
				b.outerHTML = "";
			}
		},opt.speed);
	}
}
const rDev = {
	mobile: callback => 
		((navigator.userAgent.match(/Android/i) 
		|| navigator.userAgent.match(/webOS/i) 
		|| navigator.userAgent.match(/iPhone/i) 
		|| navigator.userAgent.match(/iPad/i) 
		|| navigator.userAgent.match(/iPod/i) 
		|| navigator.userAgent.match(/BlackBerry/i) 
		|| navigator.userAgent.match(/Windows Phone/i))
		&& (typeof callback !== "undefined" || callback !== null)
		) && callback(),
	windows: callback => (~navigator.appVersion.indexOf("Win") && (typeof callback !== "undefined" || callback !== null)) && callback(),
	mac: callback => (~navigator.appVersion.indexOf("Mac") && (typeof callback !== "undefined" || callback !== null)) && callback(),
	linux: callback => (~navigator.appVersion.indexOf("Linux") && (typeof callback !== "undefined" || callback !== null)) && callback(),
	unix: callback => (~navigator.appVersion.indexOf("X11") && (typeof callback !== "undefined" || callback !== null)) && callback(),
	os: (os,callback) => (~navigator.appVersion.indexOf(os) && (typeof callback !== "undefined" || callback !== null)) && callback(),
	current: () => navigator.appVersion
}
const rUtils = {
	isArray: arr => Array.isArray(arr),
	inArray: (val, arr) => arr.indexOf(val),
	parseJSON: str => JSON.parse(str),
	parseHTML: str => {
		let tmp = document.implementation.createHTMLDocument();
		tmp.body.innerHTML = str;
		return tmp.body.children;
	},
	isEmptyObject: obj => Object.keys(obj).length === 0,
	isOdd: num => num % 2 !== 0,
	now: () => Date.now()
}
if (typeof module === "object" && typeof module.exports === "object") {
	module.exports.rt = rt;
	module.exports.rDev = rDev;
	module.exports.rUI = rUI;
	module.exports.rdom = rdom;
	module.exports.rUtils = rUtils;
}