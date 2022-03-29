function formA(angle, type = '') {
	if (type == 'rad') {
		angle %= 360; // turn in |0 - 360| range
		if (angle < 0)
			angle += 360 // turn in positive angle
		angle *= Math.PI / 180;
	}
	if (type == 'degr') {
		angle *= 180 / Math.PI;
		angle %= 360; // turn in |0 - 360| range
		if (angle < 0)
			angle += 360 // turn in positive angle
	}
	if (type == '') {
		angle %= 360; // turn in |0 - 360| range
		if (angle < 0)
			angle += 360 // turn in positive angle
	}
	return angle;
}
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
class Wall {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
	draw() {
		ctx.beginPath();
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.stroke();
	}
}