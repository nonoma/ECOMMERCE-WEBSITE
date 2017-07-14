window.onload = function () {
	mv.app.toTips();
	mv.app.toBanner();
	mv.app.toSort();
	mv.app.toRun();
}

var mv = {};

mv.tools = {};
mv.tools.getElementsByCls = function (oParent,cls) {
	var oParent = oParent || document;
	var aEles = oParent.getElementsByTagName("*");
	var tEles = [];

	for(var i = 0; i < aEles.length; i++) {
		if(aEles[i].className == cls) {
			tEles.push(aEles[i]);
		}
	}
	return tEles;
}

mv.ui = {};
mv.ui.textChange = function (obj,str) {
	obj.onfocus = function () {
		if(obj.value == str) {
			this.value = "";
		}
	}

	obj.onblur = function () {
		if(obj.value == "") {
			this.value = str;
		}
	}
}

mv.ui.fadeIn = function (obj) {
	 var value = 0;
	 var speed = 5;
	 clearInterval(obj.timer);
	 obj.timer = setInterval(function() {
	 	if(value == 100) {
	 		clearInterval(obj.timer);
	 	}else {
	 		value += speed;
	 		obj.style.filter = "alpha(opacity="+ value + ")";
	 		obj.style.opacity = value/100;
	 	}
	 },30);
}

mv.ui.fadeOut = function (obj) {
	 var value = 100;
	 var speed = -5;
	 clearInterval(obj.timer);
	 obj.timer = setInterval(function() {
	 	if(value == 0) {
	 		clearInterval(obj.timer);
	 	}else {
	 		value += speed;
	 		obj.style.filter = "alpha(opacity="+ value + ")";
	 		obj.style.opacity = value/100;
	 	}
	 },30);
}

mv.ui.moveLeft = function (obj, currentPos, targetPos) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var iSpeed = (targetPos - currentPos) / 10;

		iSpeed = iSpeed < 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if (targetPos == currentPos) {
			clearInterval(obj.timer); 
		}else {
			currentPos += iSpeed;
			obj.style.left = -currentPos + "px";
		}
		 
	}, 30);
}

mv.ui.moveRight = function (obj, currentPos, targetPos) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var iSpeed = (targetPos - currentPos) / 10;

		iSpeed = iSpeed < 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
		if (targetPos == currentPos) {
			clearInterval(obj.timer); 
		}else {
			currentPos += iSpeed;
			obj.style.left = currentPos + "px";
		}
		 
	}, 30);
}

mv.app = {};
mv.app.toTips = function () {
	var oText1 = document.getElementById ("oText1");
	var oText2 = document.getElementById("oText2");
	mv.ui.textChange(oText1,"Search website");
	mv.ui.textChange(oText2,"Search website");
}
mv.app.toBanner = function () {
	var oBanner = document.getElementById("banner");
	var oLi = oBanner.getElementsByTagName("li");

	var prevBtn = mv.tools.getElementsByCls(oBanner, "prev-btn")[0];
	var nextBtn = mv.tools.getElementsByCls(oBanner, "next-btn")[0];
	
	var prevBg = mv.tools.getElementsByCls(oBanner, "prev-bg")[0];
	var nextBg = mv.tools.getElementsByCls(oBanner, "next-bg")[0];
	var timer = setInterval(auto, 3000);
	var iNow = 0;

	//向前播放函数
	function auto () {	
		//判断是否到最后一张	
		if(iNow == oLi.length-1) {
			mv.ui.fadeOut(oLi[oLi.length-1]);
			mv.ui.fadeIn(oLi[0]);
			iNow = 0;
			return;
		}else {
			iNow++;
		}
		mv.ui.fadeOut(oLi[iNow-1]);
		mv.ui.fadeIn(oLi[iNow]);
	}

	//向后播放函数
	function prevAuto () {		
		//判断是否到第一张
		if(iNow == 0) {
			mv.ui.fadeOut(oLi[0]);
			mv.ui.fadeIn(oLi[oLi.length-1]);
			iNow = oLi.length-1;
			return;
		}else {
			iNow--;
		}

	
		mv.ui.fadeOut(oLi[iNow+1]);
		mv.ui.fadeIn(oLi[iNow]);
	}

	prevBg.onmouseover = prevBtn.onmouseover = function () {
		prevBtn.style.display = "block";
		clearInterval(timer);
	} 

	nextBg.onmouseover  = nextBtn.onmouseover = function () {
		nextBtn.style.display = "block";
		clearInterval(timer);
	}

	prevBg.onmouseout = prevBtn.onmouseout = function () {
		prevBtn.style.display = "none";
		timer = setInterval(auto, 3000);
	} 

	nextBg.onmouseout = nextBtn.onmouseout= function () {
		nextBtn.style.display = "none";
		timer = setInterval(auto, 3000);
	}

	prevBtn.onclick = function () {
		prevAuto();
	}

	nextBtn.onclick = function () {
		auto();
	}
}

mv.app.toSort = function () { 
	var aSort = document.getElementById("sort");
	var aDd = aSort.getElementsByTagName("dd");
	var aUl = aSort.getElementsByTagName("ul");
	

	for(var i = 0; i < aDd.length; i++) {
		(function (aDd) {
			aDd.onclick = function (ev) {
				// var ev = ev || window.event;
				var This = this;
				for(var i = 0; i < aUl.length; i++) {
					aUl[i].style.display = "none";
				}
				this.getElementsByTagName("ul")[0].style.display = "block";
				document.onclick = function () {
					This.getElementsByTagName("ul")[0].style.display = "none";
				}
				window.event? window.event.cancelBubble = true : e.stopPropagation();
			}
		})(aDd[i])
	}

	for(var i = 0; i < aUl.length; i++) {
		(function (ul) {
			var oLi = ul.getElementsByTagName("li");
			for(var i =0; i < oLi.length; i++) {
				(function (li) {
				li.onmouseover = function () {
					this.className = "active";
				}
				li.onclick = function (e) {
					this.parentNode.parentNode.getElementsByTagName("h2")[0].innerHTML = this.innerHTML;
					this.parentNode.style.display = "none";
					window.event? window.event.cancelBubble = true : e.stopPropagation();
				}
				li.onmouseout = function () {
					this.className = "";
				}
			})(oLi[i])
			}
		})(aUl[i])
	}
}
mv.app.toRun = function () {
	var oRun = document.getElementById("run");
	var oUl = oRun.getElementsByTagName("ul");
	var aLi = oRun.getElementsByTagName("li");
	var prev = mv.tools.getElementsByCls(oRun,"prev")[0];
	var next = mv.tools.getElementsByCls(oRun,"next")[0];
	var iNow = 0;

	//向前播放函数
	function nextRun () {
		if (iNow == aLi.length / 2) {
			iNow = 0;
			oUl[0].style.left = 0;
		}
			mv.ui.moveRight(oUl[0],-iNow*aLi[0].offsetWidth,(-iNow-1)*aLi[0].offsetWidth);
			iNow++;
	}
	//向后播放函数
	function prevRun () {
		if (iNow == 0 ) {
			iNow = aLi.length / 2;
			oUl[0].style.left = -iNow * aLi[0].offsetWidth + "px";
		}
		mv.ui.moveRight(oUl[0],-iNow*aLi[0].offsetWidth,(-iNow+1)*aLi[0].offsetWidth);
		iNow--;
	}

	// oUl.innerHTML += oUl.innerHTML;
	// oUl.style.width = aLi.length * aLi[0].offsetWidth + "px"; 

	//自动循环播放
	var timer = setInterval(nextRun, 3000);
	
	//点击“prev”按钮向后播放，点击“next”按钮向前播放
	prev.onclick = prevRun;
	next.onclick = nextRun;
	
	//鼠标经过时停止播放，离开时继续播放
	oRun.onmouseover = function () {
		clearInterval(timer);
	}
	oRun.onmouseout = function () {
		timer = setInterval(nextRun, 3000);
	}
}