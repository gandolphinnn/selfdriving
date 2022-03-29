class Ray {
	constructor(p, degr) {
		this.p = p;
		this.degr = degr;
		this.endP = new Point();
		this.length = undefined;
		this.calculateEnd();
	}
	draw(carL) {
		ctx.beginPath();
		ctx.moveTo(this.p.x, this.p.y);
		ctx.lineTo(this.endP.x, this.endP.y);
		if (this.length > carL * 3) {
			ctx.strokeStyle = 'green';
			ctx.stroke();
			ctx.strokeStyle = 'gray';
		}
		else {
			ctx.strokeStyle = 'red';
			ctx.stroke();
			ctx.strokeStyle = 'gray';
		}
	}
	calculateEnd() {
		let sin = Math.sin(formA(this.degr, 'rad'));
		let cos = Math.cos(formA(this.degr, 'rad'));
		this.endP.x = this.p.x + cos;
		this.endP.y = this.p.y - sin;
		do {
			this.endP.x += cos;
			this.endP.y -= sin;
		} while (!(this.endP.x < -5 || this.endP.x > cvs.width + 5 || this.endP.y < -5 || this.endP.y > cvs.height + 5));
		walls.forEach(wall => {
			let x1 = this.p.x, x2 = this.endP.x, x3 = wall.p1.x, x4 = wall.p2.x;
			let y1 = this.p.y, y2 = this.endP.y, y3 = wall.p1.y, y4 = wall.p2.y;
			let denom = (x1-x2)*(y3-y4) - (x3-x4)*(y1-y2);
			let t = ((x1-x3)*(y3-y4) - (x3-x4)*(y1-y3)) / denom;
			let u = ((x1-x3)*(y1-y2) - (x1-x2)*(y1-y3)) / denom;
			if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
				this.endP.x = x1 + t * (x2 - x1);
				this.endP.y = y1 + t * (y2 - y1);
			}
		});
		this.length = Math.sqrt((this.p.x - this.endP.x) ** 2 + (this.p.y - this.endP.y) ** 2);
	}
}
class Car {
	constructor(c, degr, speed, width, length) {
		this.c = c
		this.degr = degr;
		this.speed = speed; // value must stay between -10 and 100 and then divided for 10
		this.width = width; // view from the front
		this.length = length; // view from the side
		this.points = new Array(10);
		this.rays = new Array(8);
		this.calcPointsRays();
	}
	userDrive() {
		switch (move) {
			case 'gas': break;
			case 'left': break;
			case 'right': break;
			case 'reverse': break;
		}
	}
	autoDrive() {

	}
	updatePos() {
		if (this.speed > 100)
			this.speed = 100;
		if (this.speed < -20)
			this.speed = -20;
		let rad = formA(this.degr, 'rad');
		this.c.x += Math.cos(rad) * this.speed / 10;
		this.c.y -= Math.sin(rad) * this.speed / 10;
		this.calcPointsRays();
	}
	calcPointsRays() {
		this.points[0] = new Point(this.c.x+Math.cos(formA(this.degr, 'rad'))*this.length/2,this.c.y-Math.sin(formA(this.degr, 'rad'))*this.length/2);
		let rad = formA(this.degr + 90, 'rad'); 
		this.points[1] = new Point(this.points[0].x+Math.cos(rad)*this.width/6, this.points[0].y-Math.sin(rad)*this.width/6);
		this.points[2] = new Point(this.points[0].x-Math.cos(rad)*this.width/6, this.points[0].y+Math.sin(rad)*this.width/6);
		this.points[3] = new Point(this.points[1].x+Math.cos(rad)*this.width/6, this.points[1].y-Math.sin(rad)*this.width/6);
		this.points[4] = new Point(this.points[2].x-Math.cos(rad)*this.width/6, this.points[2].y+Math.sin(rad)*this.width/6);
		this.points[5] = new Point(this.points[3].x+Math.cos(rad)*this.width/6, this.points[3].y-Math.sin(rad)*this.width/6);
		this.points[6] = new Point(this.points[4].x-Math.cos(rad)*this.width/6, this.points[4].y+Math.sin(rad)*this.width/6);
		this.points[7] = new Point(this.c.x-Math.cos(formA(this.degr, 'rad'))*this.length/2,this.c.y+Math.sin(formA(this.degr, 'rad'))*this.length/2);
		this.points[8] = new Point(this.points[7].x+Math.cos(rad)*this.width/2, this.points[7].y-Math.sin(rad)*this.width/2);
		this.points[9] = new Point(this.points[7].x-Math.cos(rad)*this.width/2, this.points[7].y+Math.sin(rad)*this.width/2);
		let degrArr = [this.degr, formA(this.degr + 10), formA(this.degr - 10), formA(this.degr + 20),
			formA(this.degr - 20), formA(this.degr + 35), formA(this.degr - 35), formA(this.degr + 180)];
		for (let i = 0; i < 8; i++) {
			this.rays[i] = new Ray(this.points[i], degrArr[i]);
		}
	}
	draw() {		
		ctx.beginPath();
		ctx.moveTo(this.points[5].x, this.points[5].y);
		ctx.lineTo(this.points[6].x, this.points[6].y);
		ctx.lineTo(this.points[9].x, this.points[9].y);
		ctx.lineTo(this.points[8].x, this.points[8].y);
		ctx.lineTo(this.points[5].x, this.points[5].y);
		ctx.moveTo(this.c.x, this.c.y);
		ctx.lineTo(this.points[0].x, this.points[0].y);
		ctx.stroke();
		this.rays.forEach(ray => {
			ray.draw(this.length);
		});
	}
}