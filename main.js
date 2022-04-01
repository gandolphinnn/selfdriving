window.onload = function() {
	document.addEventListener('mousedown', function(e) {
		copyclip += 'new Point(' + mouse.pos.x + ', ' + mouse.pos.y + '), ';
		if (cp.length != 0) {
			walls.push(new Wall(cp[cp.length-1], new Point(mouse.pos.x, mouse.pos.y)))
			cp.push(new Point(mouse.pos.x, mouse.pos.y));
		}
		else {
			cp.push(new Point(mouse.pos.x, mouse.pos.y));
		}
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
			navigator.clipboard.writeText(copyclip);
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
	function carCreate() {
		car = new Car(new Point(750, 900), 180, 0, 15, 25);
	}
	function animate() {
		if (gameover) {
			gameover = false;
			move.gas = false;
			move.left = false;
			move.right = false;
			move.reverse = false;
			carCreate();
		}
		requestAnimationFrame(animate);
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
		if (cp.length != 0) {
			ctx.beginPath();
			ctx.moveTo(cp[cp.length-1].x, cp[cp.length-1].y);
			ctx.lineTo(mouse.pos.x, mouse.pos.y);
			ctx.stroke();
		}
	}
	ctx.fillStyle = 'orange';
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = '3';
	const p = [[new Point(255, 12), new Point(146, 22), new Point(31, 48), new Point(9, 62), new Point(2, 95), new Point(16, 122), new Point(58, 151), new Point(71, 168), new Point(78, 193), new Point(165, 809), new Point(172, 848), new Point(188, 872), new Point(211, 899), new Point(251, 917), new Point(295, 923), new Point(325, 929), new Point(1685, 931), new Point(1744, 927), new Point(1795, 912), new Point(1837, 890), new Point(1872, 856), new Point(1897, 795), new Point(1907, 742), new Point(1907, 670), new Point(1902, 582), new Point(1883, 491), new Point(1857, 431), new Point(1819, 383), new Point(1757, 354), new Point(1696, 334), new Point(1641, 323), new Point(1572, 313), new Point(923, 314), new Point(869, 321), new Point(787, 347), new Point(745, 364), new Point(582, 231), new Point(438, 143), new Point(421, 132), new Point(407, 118), new Point(334, 26), new Point(319, 13), new Point(290, 10)],
	[new Point(277, 80), new Point(207, 84), new Point(130, 88), new Point(102, 92), new Point(97, 95), new Point(96, 99), new Point(108, 106), new Point(120, 112), new Point(141, 129), new Point(152, 150), new Point(248, 784), new Point(256, 811), new Point(269, 827), new Point(297, 840), new Point(339, 849), new Point(1678, 849), new Point(1736, 840), new Point(1772, 818), new Point(1794, 774), new Point(1809, 723), new Point(1811, 665), new Point(1806, 602), new Point(1789, 498), new Point(1778, 473), new Point(1742, 447), new Point(1677, 421), new Point(1598, 401), new Point(1566, 395), new Point(936, 399), new Point(897, 406), new Point(820, 431), new Point(862, 469), new Point(882, 488), new Point(920, 504), new Point(980, 505), new Point(1544, 507), new Point(1573, 513), new Point(1600, 527), new Point(1627, 545), new Point(1651, 579), new Point(1671, 622), new Point(1680, 667), new Point(1684, 718), new Point(1675, 763), new Point(1659, 794), new Point(1638, 817), new Point(1613, 832), new Point(1568, 841), new Point(673, 844), new Point(634, 839), new Point(613, 826), new Point(595, 809), new Point(576, 781), new Point(561, 736), new Point(540, 650), new Point(543, 605), new Point(560, 549), new Point(583, 511), new Point(608, 473), new Point(624, 453), new Point(661, 424), new Point(517, 304), new Point(432, 248), new Point(362, 191),new Point(282, 86)],
	[new Point(744, 490), new Point(804, 538), new Point(848, 566), new Point(900, 585), new Point(931, 591), new Point(1501, 592), new Point(1529, 595), new Point(1551, 604), new Point(1574, 629), new Point(1588, 680), new Point(1594, 719), new Point(1579, 757), new Point(1542, 774), new Point(709, 772), new Point(682, 765), new Point(670, 750), new Point(650, 716), new Point(626, 659), new Point(625, 620), new Point(642, 575), new Point(662, 537), new Point(689, 507), new Point(729, 474), ]];
	for (let sec = 0; sec < p.length; sec++) {
		for (let i = 0; i < p[sec].length; i++) {
			walls.push(new Wall(p[sec][i], p[sec][(i + 1) % p[sec].length]));
		}
	}
	let cp = new Array();
	let car; carCreate();
	autopilot = false;
	animate();
}