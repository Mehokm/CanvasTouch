Rectangle.prototype = Object.create(Entity.prototype);
Rectangle.prototype.constructor = Rectangle;

function Rectangle(x, y, w, h) {
    Entity.call(this);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Rectangle.prototype.contains = function(point) {
    return (point.x >= this.x && point.x <= this.x + this.w) &&
            (point.y >= this.y && point.y <= this.y + this.h);
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
