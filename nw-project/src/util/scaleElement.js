/**
 * 当屏幕宽高比 < 设计稿宽高比, 需要缩放的比例是屏幕宽度 / 设计稿宽度, 页面上下留白，左右占满并上下居中，显示比例保持 16:9
 * 当屏幕宽高比 > 设计稿宽高比, 需要缩放的比例是屏幕高度 / 设计稿高度, 页面左右留白，上下占满并居中，显示比例保持 16:9
 ***/
export function handleScreenAuto(editorDom) {
	let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
	let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
	// 屏幕宽高比
	const screenScale = screenWidth / screenHeight;

	// 设计稿的宽度
	const designDraftWidth = 1920;
	// 设计稿的高度
	const designDraftHeight = 960;
	const designDraftScale = designDraftWidth / designDraftHeight; // 设计稿宽高比 16:9
	const scale = screenScale < designDraftScale ? screenWidth / designDraftWidth : screenHeight / designDraftHeight;
	// 缩放比例
	editorDom.style.cssText += `;scale(${scale}) translate(-50%, -50%)`;
}

// 按屏幕等比缩放 会拉伸
export function screenSize(editorDom) {
	let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
	let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
	let defWidth = 1920;
	let defHeight = 1080;
	let xScale = screenWidth / defWidth;
	let yScale = screenHeight / defHeight;
	editorDom.style.cssText += ";transform: scale(" + xScale + "," + yScale + ")";

	window.addEventListener("resize", () => {
		let screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
		let screenHeight = document.body.clientHeight || document.documentElement.clientHeight;
		xScale = screenWidth / defWidth;
		yScale = screenHeight / defHeight;
		editorDom.style.cssText += ";transform: scale(" + xScale + "," + yScale + ")";
	});
}

// 设置根目录html font-size
export function setFontSize(defWidth = 1920, defHeight = 1080) {
	const screenRatioByDesign = defWidth / defHeight; // 设计稿比例

	// 浏览器屏幕尺寸
	let docEle = document.documentElement;
	let screenWidth = docEle.clientWidth;
	let screenHeight = docEle.clientHeight;
	const screenRatio = screenWidth / screenHeight; // 浏览器宽高比

	const fontSize = ((screenRatio > screenRatioByDesign ? screenRatioByDesign / screenRatio : 1) * screenWidth) / 10;
	docEle.style.fontSize = fontSize.toFixed(3) + "px";
}
