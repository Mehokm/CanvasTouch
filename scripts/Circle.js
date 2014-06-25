Circle.prototype = Object.create(Entity.prototype);
Circle.prototype.constructor = Circle;

function Circle(x, y, r) {
    Entity.call(this, x, y);

    this.r = r;
}

Circle.prototype.containsPoint = function(point) {
    var normX = point.x - this.x;
    var normY = point.y - this.y;

    this.a = this.r * this.scaleX;
    this.b = this.r * this.scaleY;
    return ((normX * normX) / (this.a * this.a)) + ((normY * normY) / (this.b * this.b)) <= 1;
};

Circle.prototype.render = function(ctx, fill) {
    if (!this.onStack) {
        this.stackPos = this.renderStack.push(this) - 1;
        this.onStack = true;
    }

    if (fill) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
    }
};
