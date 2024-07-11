let check_CanvasObject = setInterval(() => {
if (true) {
	CanvasObject = class CanvasObject {
		constructor(x,y,color){
			this.x = x;
			this.y = y;
			this.color = color;
		}
	}
	load_CanvasObject = true;
	clearInterval(check_CanvasObject);
	}
else{
	console.log('wait');
}
},1);