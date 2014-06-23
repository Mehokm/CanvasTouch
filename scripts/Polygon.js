Polygon.prototype = Object.create(Entity.prototype);
Polygon.prototype.constructor = Polygon;

function Polygon(x, y, verticies) {
	Entity.call(this, x, y);
	this.x = x;
	this.y = y;
	this.verticies = verticies;
}

Polygon.prototype.updateBounds = function(flag) {
	// if (flag) {
	//     this.setVerticies();
	// }
	if (this.stateChange) {
		var that = this;
		var newVerts = [];

		this.verticies.forEach(function(v) {
			v = that.transformPoint(v.x, v.y);
			newVerts.push({
				x: v[0],
				y: v[1]
			});
		});
		this.verticies = newVerts;
	}
	this.stateChange = false;
};

Polygon.prototype.contains = function(point) {
	var inside = false;
	var nVert = this.verticies.length;
	var verticies = this.verticies;

	for (var i = 0, j = nVert - 1; i < nVert; j = i++) {
		if ((verticies[i].y >= point.y) != (verticies[j].y >= point.y) &&
			(point.x <= (verticies[j].x - verticies[i].x) * (point.y - verticies[i].y) / (verticies[j].y - verticies[i].y) + verticies[i].x)) {
			inside = !inside;
		}
	}
	return inside;
};

Polygon.prototype.render = function(ctx, fill) {
	if (!this.onStack) {
		this.stackPos = this.renderStack.push(this) - 1;
		this.onStack = true;
	}

	if (fill) {
		ctx.fillStyle = this.color;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		for (var i = 0; i < this.verticies.length; i++) {
			ctx.lineTo(this.verticies[i].x, this.verticies[i].y);
		}
		ctx.lineTo(this.x, this.y);
		ctx.fill();
		ctx.restore();
	} else {
		ctx.strokeStyle = this.color;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		for (var i = 0; i < this.verticies.length; i++) {
			ctx.lineTo(this.verticies[i].x, this.verticies[i].y);
		}
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
		ctx.restore();
	}
	this.firstDraw = false;
};