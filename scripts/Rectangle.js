Rectangle.prototype = Object.create(Polygon.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(x, y, w, h) {
    Polygon.call(this, x, y);

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

Rectangle.prototype.render = function(ctx, fill) {
    if (!this.onStack) {
        this.stackPos = this.renderStack.push(this) - 1;
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
