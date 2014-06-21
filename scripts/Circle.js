Circle.prototype = Object.create(Entity.prototype);
Circle.prototype.constructor = Circle;

function Circle(x, y, r) {
    Entity.call(this);

    this.x = x;
    this.y = y;
    this.r = r;
}

Circle.prototype.contains = function(point) {
    return Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) <= Math.pow(this.r, 2);
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
    this.firstDraw = false;
};
