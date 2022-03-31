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
		if ((e.code == 'KeyW' || e.code == 'ArrowUp') && !move.gas) {
			move.gas = true;
		}
		if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && !move.left) {
			move.left = true;
		}
		if ((e.code == 'KeyD' || e.code == 'ArrowRight') && !move.right) {
			move.right = true;
		}
		if ((e.code == 'KeyS' || e.code == 'ArrowDown') && !move.reverse) {
			move.reverse = true;
		}
		if (e.code == 'Enter') {
			autopilot = !autopilot;
			car.speed = 0;
		}
	});
	document.addEventListener('keyup', function(e) {
		if ((e.code == 'KeyW' || e.code == 'ArrowUp') && move.gas) {
			move.gas = false;
		}
		if ((e.code == 'KeyA' || e.code == 'ArrowLeft') && move.left) {
			move.left = false;
		}
		if ((e.code == 'KeyD' || e.code == 'ArrowRight') && move.right) {
			move.right = false;
		}
		if ((e.code == 'KeyS' || e.code == 'ArrowDown') && move.reverse) {
			move.reverse = false;
		}
	});
	let mouse = {
		pos: new Point(null, null),
		state: 0
	}
	function animate() {
		if (!gameover) {
			requestAnimationFrame(animate);
		}
		ctx.clearRect(0,0, innerWidth, innerHeight);
		walls.forEach(wall => { wall.draw()});
		if (autopilot) {
			car.autoDrive();
		}
		if (!autopilot) {
			car.userDrive();
		}
		car.updatePos();
		car.rays.forEach(ray => {ray.calculateEnd()});
		car.draw();
	}
	
	ctx.fillStyle = 'orange';
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = '3';
	const ep = [new Point(324, 58), new Point(190, 77), new Point(110, 170), new Point(75, 370),
			new Point(95, 676), new Point(271, 875), new Point(485, 900), new Point(1419, 894),
			new Point(1680, 870), new Point(1822, 773), new Point(1874, 595), new Point(1862, 304),
			new Point(1816, 115), new Point(1720, 69), new Point(1610, 60), new Point(1060, 150),
			new Point(760, 150), new Point(550, 120)];
	const ip = [new Point(500, 300), new Point(370, 227), new Point(295, 215), new Point(250, 240),
			new Point(244, 373), new Point(284, 648), new Point(400, 734), new Point(640, 760),
			new Point(1400, 750), new Point(1600, 730), new Point(1700, 600), new Point(1700, 360),
			new Point(1660, 280), new Point(1550, 250), new Point(1111, 317), new Point(824, 317)];
	for (let i = 0; i < ep.length; i++) {
		walls.push(new Wall(ep[i], ep[(i + 1) % ep.length]));
	}
	for (let i = 0; i < ip.length; i++) {
		walls.push(new Wall(ip[i], ip[(i + 1) % ip.length]));
	}
	let car = new Car(new Point(750, 830), 0, 0, 30, 50);
	autopilot = false;
	animate();
}