Polygon.prototype = Object.create(Entity.prototype);
Polygon.prototype.constructor = Polygon;

function Polygon(x, y, verticies) {
    Entity.call(this, x, y);
    this.prevX = x;
    this.prevY = y;
    this.verticies = verticies;
    this.bounds = verticies;
}

Polygon.prototype.setVerticies = function() {
    this.x /= this.scaleX;
    this.y /= this.scaleY;
    
    var diffX = this.x - this.prevX;
    var diffY = this.y - this.prevY;
    this.verticies.forEach(function(v) {
        v.x += diffX;
        v.y += diffY;
    });
    this.prevX = this.x;
    this.prevY = this.y;
};

Polygon.prototype.updateBounds = function(flag) {
    if (flag) {
        this.setVerticies();
    }
    if (this.stateChange) {
        var that = this;
        var newBounds = [];

        this.verticies.forEach(function(v) {
            v = that.transformPoint(v.x, v.y);
            newBounds.push({
                x: v[0],
                y: v[1]
            });
        });

        this.bounds = newBounds;
        this.stateChange = false;
    }
};

Polygon.prototype.contains = function(point) {
    var inside = false;
    var nVert = this.bounds.length;
    var verticies = this.bounds;

    for (var i = 0, j = nVert - 1; i < nVert; j = i++) {
        if ((verticies[i].y >= point.y) != (verticies[j].y >= point.y) &&
            (point.x <= (verticies[j].x - verticies[i].x) * (point.y - verticies[i].y) / (verticies[j].y - verticies[i].y) + verticies[i].x)) {
            inside = !inside;
        }
    }
    return inside;
};

Polygon.prototype.getArea = function() {
	var area = 0;
	var v = this.verticies;
	var n = v.length;
	for (var i = 0, j = n - 1; i < n; i++) {
		area += (v[i].x + v[j].x) * (v[i].y - v[j].y);
		j = i;
	}
	return area / 2;
};

Polygon.prototype.getCenterpoint = function() {
	var x = 0;
    var y = 0;
    var v = this.verticies;
    var n = v.length;
    for (var i = 0; i < n; i++) {
        x += v[i].x;
        y += v[i].y;
    }
    return {'x': x / n, 'y': y / n};
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
};
