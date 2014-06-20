Rectangle.prototype = Object.create(Entity.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(x, y, w, h) {
    Entity.call(this);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.setVerticies();
}

Rectangle.prototype.setVerticies = function() {
    this.verticies = [{
        x: this.x,
        y: this.y
    }, {
        x: this.x + this.w,
        y: this.y
    }, {
        x: this.x + this.w,
        y: this.y + this.h
    }, {
        x: this.x,
        y: this.y + this.h
    }];
};

Rectangle.prototype.updateBounds = function(flag) {
    if (flag) {
        this.setVerticies();
    }
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
        console.log(newVerts);
    }
    this.stateChange = false;
    console.log(this.currentTransformMatrix);
};

Rectangle.prototype.contains = function(point) {
    if (this.stateChange) {
        this.updateBounds();
    }
    var inside = false;
    var nVert = this.verticies.length;
    var verticies = this.verticies;
    console.log("p: " + point.x + ", " + point.y);
    for (var i = 0, j = nVert - 1; i < nVert; j = i++) {
        console.log("v: " + verticies[i].x + ", " + verticies[i].y);
        if ((verticies[i].y >= point.y) != (verticies[j].y >= point.y) &&
            (point.x <= (verticies[j].x - verticies[i].x) * (point.y - verticies[i].y) / (verticies[j].y - verticies[i].y) + verticies[i].x)) {
            inside = !inside;
        }
    }
    return inside;
};

Rectangle.prototype.render = function(ctx, fill) {
    if (!this.onStack) {
        this.stackPos = this.drawStack.push(this) - 1;
        this.onStack = true;
    }

    if (fill) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    } else {
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
};