window.onload = function() {
	document.addEventListener('mousedown', function(e) {
		if (e.button == 0)
			mouse.state = 1;
		if (e.button == 2)
			mouse.state = 2;
	});
	document.addEventListener('contextmenu', event => event.preventDefault());
	document.addEventListener('mouseup', function(e) {
		mouse.state = 0;
	});
	document.addEventListener('mousemove', function(e) {
		mouse.pos.y = e.clientY;
		mouse.pos.x = e.clientX;
	});
    let mouse = {
		pos: new Point(null, null),
		state: 0
	}
    function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0,0, innerWidth, innerHeight);
		//walls.forEach(wall => { wall.draw() });
		car.draw();
	}
	let canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = 'orange';
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = '3';
	let cvs = { x: canvas.width, y: canvas.height };
	let walls = new Array();
	let car = new Car();
	animate();
}