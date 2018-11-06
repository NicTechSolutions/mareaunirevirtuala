var canvas = document.getElementById('canvas');
var context = canvas.getContext ('2d');

var radius = 10;
var dragging = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius*2;
 
var putPoint = function(e){
	event.preventDefault(e); 
	if(dragging){
		context.lineTo(e.clientX, e.clientY);
		//context.lineTo(e.offsetX, e.offsetY);
		context.stroke();
		context.beginPath();
		context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
		//context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
		context.fill();
		context.beginPath();
		context.moveTo(e.clientX, e.clientY);
		//context.moveTo(e.offsetX, e.offsetY);
	}
}

var engage = function(e){
	//console.log(e.touches,e.type);
	dragging = true;
	putPoint(e);
}

var disengage = function(){
	dragging = false;
	context.beginPath();
}

canvas.addEventListener('touchstart', engage);
canvas.addEventListener('touchend', disengage);
canvas.addEventListener('touchcancel', disengage);
canvas.addEventListener('touchmove', putPoint);

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener ('mouseout',disengage);




   