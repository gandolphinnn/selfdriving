class Ray {
	constructor(degr) {
		this.degr = degr;
		this.rad = this.degr * Math.PI / 180;
		this.endP = new Point();
	}
	draw() {
		ctx.beginPath();
		ctx.moveTo(origin.o.x, origin.o.y);
		ctx.lineTo(this.endP.x, this.endP.y);
		ctx.globalAlpha = '0.5';
		ctx.stroke();
	}
	calculateEnd() {
		let sin = Math.sin(this.rad);
		let cos = Math.cos(this.rad);
		let O = origin.o;
		this.endP.x = O.x + cos;
		this.endP.y = O.y - sin;
		do {
			this.endP.x += cos * 0.1;
			this.endP.y -= sin * 0.1;
		} while (!(this.endP.x < -5 || this.endP.x > cvs.x + 5 || this.endP.y < -5 || this.endP.y > cvs.y + 5));
		this.length = Math.sqrt((O.x - this.endP.x) ** 2 + (O.y - this.y) ** 2);
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
	constructor(c, degr) {
		this.c = c
		this.degr = degr;
		this.speed = 0;
		this.width = 10; // view from the front
		this.length = 15; // view from the side
		this.dist_c_ps = Math.sqrt((this.width ** 2) + (this.length ** 2));
		this.degr
	}
	draw() {
		let p = new Array(4);
		for (let i = 0; i < 4; i++) {
			p[i] = new Point(); // todo
		}
		ctx.beginPath();
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.lineTo(p3.x, p3.y);
		ctx.lineTo(p4.x, p4.y);
		ctx.lineTo(p1.x, p1.y);
		ctx.globalAlpha = '1';
		ctx.stroke();
	}
}