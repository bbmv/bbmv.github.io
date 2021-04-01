function loadingProgress(percent) {
// console.log(percent);
	const progressbar = document.getElementById('progressbar');
	progressbar.style.background = 'linear-gradient(to right, #60abdf ' + percent + '%, #fff ' + percent + '%)';
}

function addSelector(s) {
// console.log(s);
	const tools = document.getElementById('tools');
	const el = document.createElement('div');
	el.className = 'btn';
	el.setAttribute('title', s.styleName);
	tools.appendChild(el);
	el.addEventListener('click', function() { s.selector(); }, false);
}

document.getElementById('shoot').addEventListener('click', function() { configurator.makePicture(); }, false);
// document.getElementById('top').addEventListener('click', function() { configurator.top(); }, false);
// document.getElementById('bottom').addEventListener('click', function() { configurator.bottom(); }, false);
document.getElementById('front').addEventListener('click', function() { configurator.front(); }, false);
document.getElementById('back').addEventListener('click', function() { configurator.back(); }, false);
document.getElementById('left').addEventListener('click', function() { configurator.left(); }, false);
document.getElementById('right').addEventListener('click', function() { configurator.right(); }, false);
document.getElementById('shadow').addEventListener('click', function() { configurator.toggleShadow(); }, false);
