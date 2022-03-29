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
	document.addEventListener('keydown', function(e) {
		switch(e.code){
			case 'KeyW': case 'ArrowUp': // gas pedal
				break;
			case 'KeyA': case 'ArrowLeft': // left
				break;
			case 'KeyD': case 'ArrowRight': // right
				break;
			case 'KeyS': case 'ArrowDown': // break pedal / reverse gear
				break;
			case 'Enter': //switch mode
				mode = false; //! change this in a boolean variable
				break;
			default: break;
		}
	});
	let mouse = {
		pos: new Point(null, null),
		state: 0
	}
	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0,0, innerWidth, innerHeight);
		walls.forEach(wall => { wall.draw() });
		if (mode == 'auto') { //!
			car.autoDrive();
		}
		if (mode == 'user') {
			car.userDrive();
		}
		car.rays.forEach(ray => {
			ray.calculateEnd();
		});
		car.draw();
	}
	
	ctx.fillStyle = 'orange';
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = '3';
	walls.push(new Wall(new Point(400, 400), new Point(200, 200)));	
	walls.push(new Wall(new Point(1000, 400), new Point(1000, 200)));	
	let car = new Car(new Point(500, 300), 0, 0, 30, 50);
	
	animate();
}