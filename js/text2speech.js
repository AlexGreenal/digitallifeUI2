var keyFlag = false;
var timePass = 0;
var isError = false;
var result = document.getElementById("msgInput");
var firstTime = true;
if(!(browser() == "Safari")){
	document.getElementById("inputFrame").style.setProperty('display','flex');
	document.getElementById("msgInput").style.setProperty('display','none');
	document.getElementById("send").addEventListener('click',function(){
		if(isLoad){
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
	});
}else{
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	if (typeof SpeechRecognition !== "undefined") {
		const recognition = new SpeechRecognition();
		setTimeout(function(){
			recognition.start();
			recognition.stop();
		},'1000');
		
		function startSpeech(recognition){
			recognition.start();
			if(firstTime){recognition.stop();firstTime = false;}
		}
		
		function finishSpeech(recognition){
			recognition.stop();
		}
		
		function onResult(e){
			result.innerHTML = "";
			for (const res of e.results) {
				result.innerHTML = res[0].transcript;
			}
		}
		
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.addEventListener("result", onResult);
		
		// setInterval(function(){
		// 	if(keyFlag){
		// 		timePass += 1;
		// 	}
		// },'1000');
		
		window.addEventListener('keydown',function(e){
			var keyNum = window.event ? e.keyCode : e.which;
			if(isLoad){
				if(keyNum==32){
					if (!keyFlag){
						console.log("space down");
						console.log(keyFlag);
						startSpeech(recognition);
						keyFlag = true;
					}
				}
			}
			// if(timePass>10){
			// 	isError = true;
			// 	finishSpeech(recognition);
			// 	//console.log("over");
			// }
		});

		window.addEventListener('keyup',function(e){
			var keyNum = window.event ? e.keyCode : e.which;
				if(isLoad){
					if(keyNum==32){
						if(!firstTime){
							// timePass = 0;
							//if(!isError){
								console.log("space up");
								finishSpeech(recognition);
								adjustContent();
								result.innerHTML = "";
							// }else{
							// 	result.innerHTML = "";
							// 	console.log("space up with invaild");
							// }
						}
					}
				}
				keyFlag = false;
		});
		
	}else{
		console.log("不支持语音识别Web Speech API");
	}
}

function adjustContent(){
	var text = result.innerHTML;
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
}

function getRequest(text){
	let url = "https://api.ownthink.com/bot?spoken=" + String(text);
	let httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', url, true);
	httpRequest.send();
	
	httpRequest.onreadystatechange = function () {
	  if (httpRequest.readyState === 4 && httpRequest.status === 200) {
		var json = httpRequest.responseText;
		var obj = JSON.parse(json);
		var reply = obj.data.info.text;
		console.log(obj);
		console.log(obj.data.info.text);
		var msgSpeak = new SpeechSynthesisUtterance(String(reply));
		window.speechSynthesis.speak(msgSpeak);
	  // }else{
		 //  console.log("API请求失败");
	  }
	};
}