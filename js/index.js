var flag = true;
var isDark = false;
var isInit = false;
var isLoad = false;
			
function isWeChat() {
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}
		 
function browser() {
	//取得浏览器的userAgent字符串
	var userAgent = navigator.userAgent;
	var isIE = window.ActiveXObject != undefined && userAgent.indexOf("MSIE") > -1;
	var isEdge = userAgent.indexOf("Edge") > -1; 
	var isFirefox = userAgent.indexOf("Firefox") > -1;
	var isOpera = window.opr != undefined;
	var isChrome = userAgent.indexOf("Chrome") && window.chrome;
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Version") > -1;
	if(isIE) {
		return "IE";
	} else if(isEdge) {
		return "Edge";
	} else if(isFirefox) {
		return "Firefox";
	} else if(isOpera) {
		return "Opera";
	} else if(isChrome) {
		return "Chrome";
	} else if(isSafari) {
		return "Safari";
	} else {
		return "500B";
	}
}

function randomNum(min = 0, max = 0, decimal=0) {
	let min_z = Math.trunc(min); // 最小值的整数部分
	let max_z = Math.trunc(max); // 最大值的整数部分
	// 判断是否存在小数部分，不存在的话为0
	let min_x = isNaN(getDecimalNum(min)) ? 0 : getDecimalNum(min);  // 最小值的小数部分
	let max_x = isNaN(getDecimalNum(max)) ? 0 : getDecimalNum(max);  // 最大值的小数部分
	
	// 区分有小数和没小数的情况
	if (min_x > 0 || max_x > 0 || decimal > 0) {
		// 整数部分随机数
		let z = parseInt(Math.random() * (max_z - min_z + 1) + min_z, 10);
		// 小数部分随机数
		let x = 0;
		// 小数部分随机数最大位数
		let max_decimal = min_x.toString().length > max_x.toString().length ? min_x.toString().length : max_x.toString().length;
		max_decimal = decimal > max_decimal ? decimal : max_decimal;
		// 判断随机出的整数部分，是否等于最小值或者最大值
		if(z == min_z || z == max_z){
			if(z == min_z){
				// 整数部分随机数等于最小值，那么应该从最小值的小数部分开始，到小数位数的最大值随机就可以
				x = parseInt(Math.random() * (Math.pow(10, max_decimal) - min_x) + min_x, 10);
			}else{
				// 整数部分随机数等于最大值，那么应该从0开始，到最大值小数部分
				x = parseInt(Math.random() * (max_x + 1), 10);
			}
		}else{
			// 整数部分在最大最小值区间的，就从0到小数位数的最大值随机就可以
			x = parseInt(Math.random() * (Math.pow(10, max_decimal)), 10);
		}
		return Number(`${z}.${x}`);
	} else {
		return parseInt(Math.random() * (max_z - min_z + 1) + min_z, 10);
	}
}

// 获取数值的小数部分
function getDecimalNum(data){
	return Number(data.toString().split('.')[1]);
}

var progress = document.getElementsByTagName("progress")[0];


var time = document.querySelector("#timer");
var oldtime = new Date(); //传入的时间
oldtime = oldtime.setDate(oldtime.getDate() + 1);//模拟24小时后的时间

//时间换算
function timer(oldtime) {
	var newtime = new Date();
	var time = (oldtime - newtime) / 1000;
	var h = parseInt(time / 60 / 60 % 24);
	var m = parseInt(time / 60 % 60);
	var s = parseInt(time % 60);
	return isOne(h) + ":" + isOne(m) + ":" + isOne(s);
}

//如果时间是个位数
function isOne(num){
	var l;
	if(num<=9) l = "0" + String(num);
	else l = String(num);
	return l;
} 

//数据变化
setInterval(function(){
	if(flag){
	　　 time.innerHTML = timer(oldtime);
		document.getElementById("useInfo").innerHTML = String(randomNum(50, 70, 0)+"%");
		document.getElementById("muInfo").innerHTML = String(randomNum(30, 60, 0)+"%");
		document.getElementById("lossInfo").innerHTML = String(randomNum(90.0001, 99.9999, 4)+"%");
		document.getElementById("neuronInfo").innerHTML = String(randomNum(30, 100, 0)+"%");
		document.getElementById("mrInfo").innerHTML = String(randomNum(30, 100, 0)+"%");
		document.getElementById("mcInfo").innerHTML = String(randomNum(60, 90, 0)+"Pb");
	}else{
		document.getElementById("useInfo").innerHTML = '-';
		document.getElementById("muInfo").innerHTML = '-';
		document.getElementById("lossInfo").innerHTML = '-';
		document.getElementById("neuronInfo").innerHTML = '-';
		document.getElementById("mrInfo").innerHTML = '-';
		document.getElementById("mcInfo").innerHTML = '-';
	}
}, 1000);

// document.getElementById("yearValue").innerHTML = randomNum(65, 79, 0);
document.getElementById("yearValue").innerHTML = randomNum(8, 14, 0);

setInterval(function(){
	if(flag){progress.value = randomNum(0.01, 99.99, 2);}
	else{progress.value = 0;}
	try{if(document.getElementById("live2dcanvas").style.zIndex != '0'){document.getElementById("live2dcanvas").style.zIndex = '0';}}catch(e){}
	try{if(isInit){initSpeak(startCov);}isInit = false;}catch(e){}
		
　　}, '100');

window.onload = function () {
	var brow = browser();
	if("Chrome" == brow) {
		document.getElementById("deviceInfo").innerHTML = "CHROME RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "CHROME MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "CHROME OPTIMAL LOSS";
	}
	if("Edge" == brow) {
		document.getElementById("deviceInfo").innerHTML = "EDGE RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "EDGE MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "EDGE OPTIMAL LOSS";
	}
	if("Firefox" == brow) {
		document.getElementById("deviceInfo").innerHTML = "FIREFOX RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "FIREFPOX MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "FIREFOX OPTIMAL LOSS";
	}
	if("Opera" == brow) {
		document.getElementById("deviceInfo").innerHTML = "OPERA RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "OPERA MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "OPERA OPTIMAL LOSS";
	}
	if("Safari" == brow) {
		document.getElementById("deviceInfo").innerHTML = "SAFARI RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "SAFARI MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "SAFARI OPTIMAL LOSS";
	}
	if("IE" == brow) {
		document.getElementById("deviceInfo").innerHTML = "EXPLORER RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "EXPLORER MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "EXPLORER OPTIMAL LOSS";
	}
	
	if(isWeChat()){
		document.getElementById("deviceInfo").innerHTML = "WEIXIN RESOURCE USAGE";
		document.getElementById("deviceInfo2").innerHTML = "WEIXIN MEMORY USAGE";
		document.getElementById("deviceInfo3").innerHTML = "WEIXIN OPTIMAL LOSS";
	}
	
//-----------------------------------------------------------------------------------------
	//访问用户媒体设备的兼容方法
	function getUserMedia(constraints, success, error) {
		if (navigator.mediaDevices.getUserMedia) {
			//最新的标准API
			navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
		} else if (navigator.webkitGetUserMedia) {
			//webkit核心浏览器
			navigator.webkitGetUserMedia(constraints, success, error)
		} else if (navigator.mozGetUserMedia) {
			//firfox浏览器
			navigator.mozGetUserMedia(constraints, success, error);
		} else if (navigator.getUserMedia) {
			//旧版API
			navigator.getUserMedia(constraints, success, error);
		}
	}

	let video = document.getElementById('video');
	function success(stream) {
		video.srcObject = stream;
		video.play();
	}
	function error(error) {
		console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
		console.log("用户主动关闭了摄像头与麦克风权限");
		document.getElementById("usrImg").style = "display:block";
		document.getElementById("errorNum").innerHTML = "1";
		//document.getElementById("btnIcon").innerHTML = '<svg style="width: 80%;height: 80%;" t="1682319037760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610" width="200" height="200"><path d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z" p-id="2611" fill="#ffffff"></path></svg>';
		//flag = false;
	}

	if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
		if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			console.log("enumerateDevices() not supported.");
			document.getElementById("usrImg").style = "display:block";
			document.getElementById("errorNum").innerHTML = "1";
			document.getElementById("btnIcon").innerHTML = '<svg style="width: 80%;height: 80%;" t="1682319037760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610" width="200" height="200"><path d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z" p-id="2611" fill="#ffffff"></path></svg>';
			flag = false;
			return;
		}
		// 列出摄像头和麦克风
		var exArray = [];
		navigator.mediaDevices.enumerateDevices()
			.then(function (devices) {
				devices.forEach(function (device) {
					if (device.kind == "videoinput") {
						exArray.push(device.deviceId);
					}
				});
				//var mediaOpts = { video: { width: 420, height: 120 } };
				var mediaOpts = { video: { facingMode: "user" }, audio: false };
				// var mediaOpts =
				// {
				// 	video:
				// 	{
				// 		deviceId: { exact: exArray[1] }
				// 	},
				// 	audio: true
				// };
				//调用用户媒体设备, 访问摄像头
				getUserMedia(mediaOpts, success, error);
			})
			.catch(function (err) {
				console.log(err.name + ": " + err.message);
				document.getElementById("usrImg").style = "display:block";
				document.getElementById("errorNum").innerHTML = "1";
				document.getElementById("btnIcon").innerHTML = '<svg style="width: 80%;height: 80%;" t="1682319037760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610" width="200" height="200"><path d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z" p-id="2611" fill="#ffffff"></path></svg>';
				flag = false;
			});
			window.addEventListener("keypress",function(e){
				var keyNum = window.event ? e.keyCode : e.which;
				if(keyNum == 13){
					if(!isLoad){
						document.getElementById("mask").style.setProperty('display','none');
						isInit = true;isLoad = true;
						getWidget(offsetWidth, windowHeight, l2dSize);
					}else{
						if(!(browser() == "Safari")){
							var text = document.getElementById("textInput").value;
							if(text == ""){
								initSpeak(questCov);
								console.log(questCov);
							}else if(text == "你是谁"){
								initSpeak(imWhoCov);
								console.log(imWhoCov);
							}else{
								console.log(text);
								getRequest(text);
							}
							document.getElementById("textInput").value = "";
						}
					}
				}
			});
			try{
				if(isMobile){
					document.getElementById("init").addEventListener("click",function(){
						document.getElementById("mask").style.setProperty('display','none');
						isInit = true;isLoad = true;
						getWidget(offsetWidth, windowHeight, l2dSize);
					});
				}
			}catch(e){console.log(e)}
	} else {
		alert('不支持访问用户媒体');
		document.getElementById("usrImg").style = "display:block";
		document.getElementById("errorNum").innerHTML = "1";
		document.getElementById("btnIcon").innerHTML = '<svg style="width: 80%;height: 80%;" t="1682319037760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610" width="200" height="200"><path d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z" p-id="2611" fill="#ffffff"></path></svg>';
		flag = false;
		document.getElementById("init").innerText = "0 DEVICE DETECTED, INSERT THE CARD AND RETRY";
	}
//-----------------------------------------------------------------------------------------*/
}

//按钮动作
document.getElementById("ctrlBtn").addEventListener('click',function(){
	if(flag){
		video.pause();
		flag = false;
		document.getElementById("errorVideo").style = "display:flex";
		document.getElementById("live2dcanvas").style.setProperty('visibility','hidden');
		document.getElementById("btnIcon").innerHTML = '<svg style="width: 80%;height: 80%;" t="1682319037760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610" width="200" height="200"><path d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z" p-id="2611" fill="#ffffff"></path></svg>';
	}else{
		video.play();
		flag = true;
		document.getElementById("errorVideo").style = "display:none";
		document.getElementById("live2dcanvas").style.setProperty('visibility','visible');
		document.getElementById("btnIcon").innerHTML = '<svg style="width: 80%;height: 80%;" t="1682266762445" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2815" width="200" height="200"><path d="M319.618435 145.655358c-30.518061 0-55.258535 24.740474-55.258535 55.258535l0 622.170169c0 30.518061 24.740474 55.258535 55.258535 55.258535s55.258535-24.740474 55.258535-55.258535l0-622.170169C374.876969 170.395832 350.136495 145.655358 319.618435 145.655358z" p-id="2816" fill="#ffffff"></path><path d="M704.381565 145.655358c-30.518061 0-55.258535 24.740474-55.258535 55.258535l0 622.170169c0 30.518061 24.740474 55.258535 55.258535 55.258535s55.258535-24.740474 55.258535-55.258535l0-622.170169C759.6401 170.395832 734.899626 145.655358 704.381565 145.655358z" p-id="2817" fill="#ffffff"></path></svg>';
	}
});

document.getElementById("iconBtn").addEventListener('click',function(){
	console.log("icon clicked");
	if(isDark){
		document.getElementById("ui").style.setProperty('color','white');
		document.getElementById("frame1").style.setProperty('border-color','white');
		document.getElementById("frame2").style.setProperty('border-color','white');
		document.getElementById("frame3").style.setProperty('border-color','white');
		document.getElementById("frame4").style.setProperty('border-color','white');
		document.getElementById("bar1").style.setProperty('background-color','white');
		document.getElementById("bar2").style.setProperty('background-color','white');
		isDark = false;
	}else{
		document.getElementById("ui").style.setProperty('color','black');
		document.getElementById("frame1").style.setProperty('border-color','black');
		document.getElementById("frame2").style.setProperty('border-color','black');
		document.getElementById("frame3").style.setProperty('border-color','black');
		document.getElementById("frame4").style.setProperty('border-color','black');
		document.getElementById("bar1").style.setProperty('background-color','black');
		document.getElementById("bar2").style.setProperty('background-color','black');
		isDark = true;
	}
});