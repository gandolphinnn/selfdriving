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
		walls.forEach(wall => { wall.draw() });
		car.drive();
		car.rays.forEach(ray => {
			ray.calculateEnd();
		});
		car.draw();
	}
	
	ctx.fillStyle = 'orange';
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = '3';
	walls.push(new Wall(new Point(400, 400), new Point(200, 200)));	
	let car = new Car(new Point(500, 300), 0, 10, 20, 50);
	animate();
}