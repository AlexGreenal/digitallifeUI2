var windowHeight = document.body.clientHeight;
var l2dSize = 500;
var offsetWidth = document.body.clientWidth/2 - l2dSize;

function getWidget(ow,h,ls){
	
	if(h>800){ls = 500}
	else if(h>500&&h<=800){ls = 400}
	else if(h>300&&h<=500){ls = 300}
	else{ls = 100}
	
	l2dSize = ls;
	
	L2Dwidget.init({
		"model": { "jsonPath":"https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json", "scale": 1, "hHeadPos":0.5, "vHeadPos":0.618 },
		//"model": { "jsonPath":"https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json", "scale": 1, "hHeadPos":0.5, "vHeadPos":0.618 },
		"display": { "position": "left", "width": ls, "height": ls, "hOffset": ow, "vOffset": -ls/5 },
		"mobile": { "show": true, "scale": 0.5 },
		"react": { "opacityDefault": 1, "opacityOnHover": 0.2 },
		"name": { "canvas": "live2dcanvas", "div": "live2d-widget" }
	});
}

window.addEventListener('resize',function(){
	windowHeight = document.body.clientHeight;
	offsetWidth = document.body.clientWidth/2 - l2dSize;
	getWidget(offsetWidth, windowHeight, l2dSize);
});