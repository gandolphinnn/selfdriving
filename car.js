class Ray {
	constructor(p, degr) {
		this.p = p;
		this.degr = degr;
		this.endP = new Point();
		this.length = undefined;
		this.calculateEnd();
	}
	draw(bestL, minTurn) {
		ctx.beginPath();
		ctx.moveTo(this.p.x, this.p.y);
		ctx.lineTo(this.endP.x, this.endP.y);
		if (this.length == bestL) {
			ctx.strokeStyle = 'blue';
		}
		else if (this.length > minTurn) {
			ctx.strokeStyle = 'green';
		}
		else {
			ctx.strokeStyle = 'red';
		}
		ctx.stroke();
		ctx.strokeStyle = 'gray';
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
		if (this.length <= 2) {
			gameover = true;
		}
	}
}
class Car {
	constructor(c, degr, speed, width, length) {
		this.c = c
		this.degr = degr;
		this.speed = speed; // value must stay between -10 and 100 and then divided for 10
		this.width = width; // view from the front
		this.length = length; // view from the side
		this.points = new Array(16);
		this.rays = new Array(16);
		this.calcPointsRays();
		this.bestRayLength;
		this.bestRayIndex;
		this.turnLength = 30;
	}
	userDrive() {
		//GR
		if (move.gas) {
			this.speed ++;
		}
		else if (move.reverse) {
			if (this.speed > 0) {
				this.speed --;
			}
			else {
				this.speed -= 2;
			}
		}
		else if (this.speed > 0) {
			this.speed --;
		}
		else if (this.speed < 0) {
			this.speed++;
		}
		//LR
		if (move.left && Math.abs(this.speed) > 5) {
			this.degr += 2;
		}
		else if (move.right && Math.abs(this.speed) > 5) {
			this.degr -= 2;
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
		this.calcBestray();
	}
	calcBestray() {
		this.bestRayLength = 0;
		let l;
		for (let i = 0; i < 13; i++) {
			l = this.rays[i].length;
			if (l > this.bestRayLength && l >= this.turnLength) {
				this.bestRayLength = this.rays[i].length;
				this.bestRayIndex = i;
			}				
		}
		if (this.bestRayLength == 0) {
			for (let i = 13; i < 16; i++) {
				l = this,rays[i].length;
				if (l > this.bestRayLength && l >= this.turnLength) {
					this.bestRayLength = this.rays[i].length;
					this.bestRayIndex = i;
				}				
			}
		}
	}
	calcPointsRays() {
		this.points[0] = new Point(this.c.x+Math.cos(formA(this.degr, 'rad'))*this.length/2,this.c.y-Math.sin(formA(this.degr, 'rad'))*this.length/2);
		let rad = formA(this.degr + 90, 'rad'); 
		this.points[1] = new Point(this.points[0].x+Math.cos(rad)*this.width/12, this.points[0].y-Math.sin(rad)*this.width/12);
		this.points[2] = new Point(this.points[0].x-Math.cos(rad)*this.width/12, this.points[0].y+Math.sin(rad)*this.width/12);
		this.points[3] = new Point(this.points[1].x+Math.cos(rad)*this.width/12, this.points[1].y-Math.sin(rad)*this.width/12);
		this.points[4] = new Point(this.points[2].x-Math.cos(rad)*this.width/12, this.points[2].y+Math.sin(rad)*this.width/12);
		this.points[5] = new Point(this.points[3].x+Math.cos(rad)*this.width/12, this.points[3].y-Math.sin(rad)*this.width/12);
		this.points[6] = new Point(this.points[4].x-Math.cos(rad)*this.width/12, this.points[4].y+Math.sin(rad)*this.width/12);
		this.points[7] = new Point(this.points[5].x+Math.cos(rad)*this.width/12, this.points[5].y-Math.sin(rad)*this.width/12);
		this.points[8] = new Point(this.points[6].x-Math.cos(rad)*this.width/12, this.points[6].y+Math.sin(rad)*this.width/12);
		this.points[9] = new Point(this.points[7].x+Math.cos(rad)*this.width/12, this.points[7].y-Math.sin(rad)*this.width/12);
		this.points[10]= new Point(this.points[8].x-Math.cos(rad)*this.width/12, this.points[8].y+Math.sin(rad)*this.width/12);
		this.points[11]= new Point(this.points[9].x+Math.cos(rad)*this.width/12, this.points[9].y-Math.sin(rad)*this.width/12);
		this.points[12]= new Point(this.points[10].x-Math.cos(rad)*this.width/12, this.points[10].y+Math.sin(rad)*this.width/12);

		this.points[13]= new Point(this.c.x-Math.cos(formA(this.degr, 'rad'))*this.length/2,this.c.y+Math.sin(formA(this.degr, 'rad'))*this.length/2);
		this.points[14]= new Point(this.points[13].x+Math.cos(rad)*this.width/2, this.points[13].y-Math.sin(rad)*this.width/2);
		this.points[15]= new Point(this.points[13].x-Math.cos(rad)*this.width/2, this.points[13].y+Math.sin(rad)*this.width/2);
		let degrArr = [this.degr, formA(this.degr + 10), formA(this.degr - 10), formA(this.degr + 20),
			formA(this.degr - 20), formA(this.degr + 30), formA(this.degr - 30), formA(this.degr + 40),
			formA(this.degr - 40), formA(this.degr + 50), formA(this.degr - 50), formA(this.degr + 60),
			formA(this.degr - 60), formA(this.degr + 180), formA(this.degr + 135), formA(this.degr + 225)];
		for (let i = 0; i < this.rays.length; i++) {
			this.rays[i] = new Ray(this.points[i], degrArr[i]);
		}
	}
	draw() {		
		ctx.beginPath();
		ctx.moveTo(this.points[11].x, this.points[11].y);
		ctx.lineTo(this.points[12].x, this.points[12].y);
		ctx.lineTo(this.points[15].x, this.points[15].y);
		ctx.lineTo(this.points[14].x, this.points[14].y);
		ctx.lineTo(this.points[11].x, this.points[11].y);
		ctx.moveTo(this.c.x, this.c.y);
		ctx.lineTo(this.points[0].x, this.points[0].y);
		ctx.stroke();
		this.rays.forEach(ray => {
			ray.draw(this.bestRayLength, this.turnLength);
		});
	}
}