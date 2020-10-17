function add() {
    content = content + "<div class='taskbox' onmouseleave='this.style.backgroundColor=\"white\"' onmouseenter='this.style.backgroundColor=\"#efefef\"' onclick=\"this.outerHTML='';content=tasklist.text();localStorage.setItem('stuff', tasklist.text());\">" + name.input() + "<br/></div>";
    tasklist.text(content);
    localStorage.setItem('stuff', content);
}
