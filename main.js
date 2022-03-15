window.onload = function() {
	document.addEventListener('mousedown', function(e) {
		if (e.button == 0) {
			mouse.state = 1;
		}
		if (e.button == 2) {
			mouse.state = 2;
		}
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
		origin.draw();
		if (mouse.state == 1) {
			origin.o.x = mouse.pos.x;
			origin.o.y = mouse.pos.y;
			origin.rays.forEach(ray => {
				ray.calculateEnd();
			});
		}
		if (mouse.state == 2) {
			if (drawLine != null) {
				walls.push(new Wall(new Point(drawLine.x, drawLine.y), new Point(mouse.pos.x, mouse.pos.y)));
				origin.rays.forEach(ray => {
					ray.calculateEnd();
				});
				drawLine = null;
			}
			else {
				drawLine = new Point(mouse.pos.x, mouse.pos.y);
			}
		}
	}
	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = '3';
	let drawLine = null;
	let cvs = { x: canvas.width, y: canvas.height };
	let walls = new Array();
	let origin = new Origin(new Point(canvas.width/2, canvas.height/2));
	walls.push(new Wall(new Point(200, 200), new Point(200, 800)));
	walls.push(new Wall(new Point(1500, 800), new Point(200, 800)));
	walls.push(new Wall(new Point(1500, 800), new Point(1500, 650)));
	walls.push(new Wall(new Point(1500, 200), new Point(1500, 350)));
	walls.push(new Wall(new Point(200, 200), new Point(1500, 200)));
	origin.rays.forEach(ray => {
		ray.calculateEnd();
	});
	animate();
}