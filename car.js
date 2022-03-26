class Ray {
	constructor(degr, origin) {
		this.degr = degr;
		this.rad = this.degr * Math.PI / 180;
		this.endP = new Point();
		this.o = origin;
	}
	draw() {
		ctx.beginPath();
		ctx.moveTo(this.o.x, this.o.y);
		ctx.lineTo(this.endP.x, this.endP.y);
		ctx.globalAlpha = '0.5';
		ctx.stroke();
	}
	calculateEnd() {
		let sin = Math.sin(this.rad);
		let cos = Math.cos(this.rad);
		this.endP.x = this.o.x + cos;
		this.endP.y = this.o.y - sin;
		do {
			this.endP.x += cos * 0.1;
			this.endP.y -= sin * 0.1;
		} while (!(this.endP.x < -5 || this.endP.x > cvs.x + 5 || this.endP.y < -5 || this.endP.y > cvs.y + 5));
		this.length = Math.sqrt((this.o.x - this.endP.x) ** 2 + (this.o.y - this.y) ** 2);
		/*walls.forEach(wall => {
			let x1 = O.x, x2 = this.endP.x, x3 = wall.p1.x, x4 = wall.p2.x;
			let y1 = O.y, y2 = this.endP.y, y3 = wall.p1.y, y4 = wall.p2.y;
			let denom = (x1-x2)*(y3-y4) - (x3-x4)*(y1-y2);
			let t = ((x1-x3)*(y3-y4) - (x3-x4)*(y1-y3)) / denom;
			let u = ((x1-x3)*(y1-y2) - (x1-x2)*(y1-y3)) / denom;
			if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
				this.endP.x = x1 + t * (x2 - x1);
				this.endP.y = y1 + t * (y2 - y1);
			}
		});*/
	}
}
class Car {
	constructor(c, degr, speed, width, length) {
		this.c = c
		this.degr = degr;
		this.speed = speed; // value must stay between -10 and 100 and then divided for 10
		this.width = width; // view from the front
		this.length = length; // view from the side
		this.dist_c_ps = Math.sqrt(((this.width / 2) ** 2) + ((this.length / 2) ** 2));
		this.degr_c_ps = formA(Math.asin((this.width / 2)/this.dist_c_ps), 'degr');
		this.rays = new Array(8);
		this.castRays();
	}
	drive() {
		if (this.speed > 100)
			this.speed = 100;
		if (this.speed < -10)
			this.speed = -10;
		let rad = formA(this.degr, 'rad');
		this.c.x += Math.cos(rad) * this.speed / 10;
		this.c.y -= Math.sin(rad) * this.speed / 10;
	}
	castRays() {	
		let degrArr = [this.degr, formA(this.degr + 10), formA(this.degr - 10), formA(this.degr + 20),
			formA(this.degr - 20), formA(this.degr + 35), formA(this.degr - 35), formA(this.degr + 180)];
		//let originArr = new Array(8);
		for (let i = 0; i < 8; i++) {
			this.rays.push(new Ray(degrArr[i], this.c));
		}
	}
	draw() {
		let p = new Array(4);
		let rad = formA(this.degr, 'rad');
		p[0] = new Point(this.c.x + Math.cos(rad) * this.length / 2,
						this.c.y + Math.sin(rad) * -this.length / 2); 
		rad = formA(this.degr + this.degr_c_ps, 'rad');
		p[1] = new Point(this.c.x + Math.cos(rad) * this.dist_c_ps,
						this.c.y + Math.sin(rad) * -this.dist_c_ps);
		rad = formA(this.degr - this.degr_c_ps, 'rad');
		p[2] = new Point(this.c.x + Math.cos(rad) * this.dist_c_ps,
						this.c.y + Math.sin(rad) * -this.dist_c_ps);
		rad = formA(this.degr + 180 + this.degr_c_ps, 'rad');
		p[3] = new Point(this.c.x + Math.cos(rad) * this.dist_c_ps,
						this.c.y + Math.sin(rad) * -this.dist_c_ps);
		rad = formA(this.degr + 180 - this.degr_c_ps, 'rad');
		p[4] = new Point(this.c.x + Math.cos(rad) * this.dist_c_ps,
						this.c.y + Math.sin(rad) * -this.dist_c_ps);
		ctx.beginPath();
		ctx.moveTo(p[1].x, p[1].y);
		ctx.lineTo(p[2].x, p[2].y);
		ctx.lineTo(p[3].x, p[3].y);
		ctx.lineTo(p[4].x, p[4].y);
		ctx.lineTo(p[1].x, p[1].y);
		ctx.moveTo(this.c.x, this.c.y);
		ctx.lineTo(p[0].x, p[0].y)
		this.rays.forEach(ray => {
			ray.calculateEnd();
			ray.draw();
		});
		ctx.globalAlpha = '1';
		ctx.stroke();
	}
}