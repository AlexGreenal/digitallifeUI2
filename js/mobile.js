var isMobile = false;

if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {isMobile = true}
if (typeof window.orientation !== 'undefined') {isMobile = true}
try {document.createEvent("TouchEvent");isMobile = true} catch(e) {console.log(e)}

if(isMobile){
	alert("本网站专为电脑端设计，需要使用键盘进行交互，移动端可能会出现显示错误或功能无法使用的情况");
	alert("了解本信息后，可以点击屏幕下方的文字进入界面");
}