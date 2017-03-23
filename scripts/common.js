// add function
function addLoadEvent(func) {
	var oldOnlaod=window.onload;
	if(typeof window.onload!='function')
	{
		window.onload=func;
	}
	else
	{
		window.onload=function() {
			oldOnlaod();
			func();
		}
	}
}

//add class
function addClass(which,value) {
	if(!which.className) 
	{
		which.className=value;
	}
	else
	{
		newclassName=which.className;
		newclassName+=' ';
		newclassName+=value;
		which.className=newclassName;

	}
}
//remove class
function removeClass(obj, cls){
    var obj_class = ' '+obj.className+' ';
    obj_class = obj_class.replace(/(\s+)/gi, ' ');
    var removed = obj_class.replace(' '+cls+' ', ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
}

//menu dropdown
function menuDropdown() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementsByClassName) return false;
	var submenu=document.getElementsByClassName("public-nav")[0].getElementsByTagName("li");
	var dropFlag=false;
	for (var i = 0; i < submenu.length; i++) {
		if(submenu[i].getElementsByTagName("ul").length==0) continue;
		else {
			submenu[i].onclick=function() {
				if(!dropFlag){
					var links=this.getElementsByTagName("ul")[0];
					links.style.display='block';
					dropFlag=true;
				}
				else
				{
					var links=this.getElementsByTagName("ul")[0];
					links.style.display='none';
					dropFlag=false
				}
			}
		}
	}
}
//当前页面所对导航
function  linePage() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByClassName) return false;
	var nav=document.getElementsByClassName("public-nav");
	if (nav.length==0)  return false;
	var links=nav[0].getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var linkurl=links[i].getAttribute("href");
		if (linkurl=="#")  continue;
		else {

			if(window.location.href.indexOf(linkurl)!=-1)
			{
				links[i].parentNode.parentNode.style.display="block";
				addClass(links[i],"current");

			}	
		}
	}
}

//wechat pop up
function wechatPop() {
	var wechat=document.getElementsByClassName("wechat")[0];
	var icon=document.getElementsByTagName("footer")[0].getElementsByClassName("icon2")[0];
	var isPop=false;
	icon.onclick=function () {
		if(!isPop)
		{
			wechat.style.display="block";
			isPop=true;
		}
		else
		{
			wechat.style.display="none";
			isPop=false;
		}

	}
	return false;
		
}
//show pic
function showpic(whicpic) {
	var source=whicpic.getAttribute("href");
	var picContaine=document.getElementsByClassName("infoT_pic")[0];
	picContaine.setAttribute("src",source);
	showLine();
	return false;
}

//switch pic
function changePic() {
	if (!document.getElementsByClassName) return false;
	if(!document.getElementsByClassName("infoT-small").length) return false;
	var thum=document.getElementsByClassName("infoT-small")[0];
	var picContaine=document.getElementsByClassName("infoT_pic")[0];
	var thumbnails=thum.getElementsByTagName("a");
	for (var i = 0; i < thumbnails.length; i++) {
		thumbnails[i].onclick=function() {
			return showpic(this);
		}
	}

}

//show artbag
function openBag() {
	if(!document.getElementById) return false;
	if(!document.getElementById("openArt"))  return false;
	if(!document.getElementsByClassName("artBag").length) return false;
	var open=document.getElementById("openArt");
	var bag=document.getElementsByClassName("artBag")[0];
	open.onclick=function () {
		bag.style.display="block";
	}
}
//close artbag
function closeBag() {
	if(!document.getElementsByClassName) return false;
	if(!document.getElementById("openArt"))  return false;
	if(!document.getElementsByClassName("close").length)  return false;
	if(!document.getElementsByClassName("artBag").length) return false;
	var bag=document.getElementsByClassName("artBag")[0];
	var close=document.getElementsByClassName("close")[0];
	close.onclick=function () {
		bag.style.display="none";
	}
}

function animate(offset) {
	var list = document.getElementById('list');
    var newLeft = parseInt(list.style.left) + offset;
  	list.style.left = newLeft + 'px';
    if(newLeft<-600){
      list.style.left = 0 + 'px';
	 }
	 if(newLeft>0){
	      list.style.left = -600 + 'px';
	 }

}

//show line under  t_shirt
function showLine() {
	if(!document.getElementsByClassName) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementsByClassName("infoT_pic")) return false;
	if(!document.getElementsByClassName("infoT-small")[0])  return false;
	var image=document.getElementsByClassName("infoT_pic");
	var address=image[0].getAttribute("src");
	var thumb=document.getElementsByClassName("infoT-small")[0];
	var thumbnails=thumb.getElementsByTagName("a");
	for (var i = 0; i <thumbnails.length; i++) {
		var link=thumbnails[i].getAttribute("href");
		if(address.indexOf(link)!=-1)
		{
			addClass(thumbnails[i],"infoT-fouce");
		}
		else
		{
			removeClass(thumbnails[i],"infoT-fouce");
		}
	}
}
//slideShow
function displayPic() {
	if(!document.getElementById('prev'))  return false;
	if(!document.getElementById('next'))  return false;
 	var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    prev.onclick = function() {             
        animate(600);
	}
    next.onclick = function() {  
        animate(-600);
    }

 } 

//pop up slide
function elementControl(element,active) {
	if(active==0)
	{
		element.style.display="none";
		return flase;
	}
	else
	{
		element.style.display="block";
		return false;
	}
}
//pop t-shirt
function slideShow() {
	if(!document.getElementsByClassName) return false;
	if(!document.getElementsByClassName("s-skin-container")) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imageGallery")) return false;
	if(!document.getElementById("homeRotatingImage"))  return false;
	var openClick=document.getElementsByClassName("s-skin-container");
	var image=document.getElementById("imageGallery");
	var homeBackground=document.getElementById("homeRotatingImage");
	for (var i = 0; i <openClick.length; i++) {
		 openClick[i].onclick=function () {
		 	homeBackground.style.display="none";
		 	return elementControl(image,1);
		 }
	}
}

//close pop t-shirt
function closeSlideShow() {
	if(!document.getElementsByClassName) return false;
	if(!document.getElementsByClassName("closePop")) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imageGallery")) return false;
	if(!document.getElementById("homeRotatingImage"))  return false;
	var closePop=document.getElementsByClassName("closePop");
	var image=document.getElementById("imageGallery");
	var homeBackground=document.getElementById("homeRotatingImage");
	for (var i = 0; i <closePop.length; i++) {
		 closePop[i].onclick=function () {
		 	homeBackground.style.display="block";
		 	return elementControl(image,0);
		 }
	}
}
addLoadEvent(menuDropdown);
addLoadEvent(linePage);
addLoadEvent(wechatPop);
addLoadEvent(changePic);
addLoadEvent(openBag);
addLoadEvent(closeBag);
addLoadEvent(showLine);
addLoadEvent(slideShow);
addLoadEvent(displayPic);
addLoadEvent (closeSlideShow);


