function add() {
	name.input('',function(){
		alert('Task is empty!');
	},function(){
		content = content + "<div class='taskbox' onmouseleave='this.style.backgroundColor=\"white\"' onmouseenter='this.style.backgroundColor=\"#efefef\"' onclick=\"this.outerHTML='';content=tasklist.html();localStorage.setItem('stuff', tasklist.html());\">" + name.input() + "<br/></div>";
	});
    tasklist.html(content);
    localStorage.setItem('stuff', content);
}