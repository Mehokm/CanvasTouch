function Entity(x, y) {
    this.x = x;
    this.y = y;
    this.dir = 1;
    this.color = "black";
    this.isDragged = false;
    this.currentTransformMatrix = [1, 0, 0, 1, 0, 0];
    this.transformations = [];
    this.stateChange = false;
    this.firstDraw = true;
    this.scaleX = 1;
    this.scaleY = 1;
}
Entity.prototype.renderStack = [];

Entity.prototype.setCanvas = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this._setContext();
};

Entity.prototype.getCanvas = function() {
    return this.canvas;
};


Entity.prototype._setContext = function() {
    this.ctx = this.canvas.getContext('2d');
};


Entity.prototype.getContext = function() {
    return this.ctx;
};

Entity.prototype.update = function(func, reset) {
    this.ctx.save();
    func(this, this.ctx);
    this.updateTransformation(reset);
    if (this.updateBounds) {
        this.updateBounds();
    }
    this.ctx.restore();
};

Entity.prototype.registerOnClick = function(clickFunc) {
    this.clickFunc = clickFunc;
};

Entity.prototype.onClick = function() {
    this.clickFunc();
};

Entity.prototype.registerOnHotspot = function(hotspotFunc) {
    this.hotspotFunc = hotspotFunc;
};

Entity.prototype.onHotspot = function() {
    this.hotspotFunc();
};

Entity.prototype.setDraggable = function(draggable) {
    this.draggable = draggable;
};

Entity.prototype.isDraggable = function() {
    return this.draggable;
};

Entity.prototype.setClicked = function(clicked) {
    this.clicked = clicked;
};

Entity.prototype.isClicked = function() {
    return this.clicked;
};

Entity.prototype.setHotspot = function(hotspot) {
    this.hotspot = hotspot;
};

Entity.prototype.isHotspot = function() {
    return this.hotspot;
};

Entity.prototype.setDeltaXY = function(deltaXY) {
    this.deltaXY = deltaXY;
};

Entity.prototype.getDeltaXY = function() {
    return this.deltaXY;
};

Entity.prototype.setColor = function(color) {
    this.color = color;
};

Entity.prototype.resetCurrentMatrix = function() {
    this.currentTransformMatrix = [1, 0, 0, 1, 0, 0];
};

Entity.prototype.updateTransformation = function(reset) {
    var that = this;
    var newMatrix = [1, 0, 0, 1, 0, 0];
    this.transformations.forEach(function(m) {
        newMatrix = that.multiplyMatrix(newMatrix, m);
    });
    if (!this.currentTransformMatrix.equals(newMatrix)) {
        this.currentTransformMatrix = newMatrix;
        this.stateChange = true;
    }
    if (reset) {
        this.transformations = [];
    }
};

Entity.prototype.moveX = function(x) {
    if (!this.isClicked()) {
        this.x += x;
        this.stateChange = true;
        if (this.updateBounds) {
            this.updateBounds(true);
        }
    }
};

Entity.prototype.moveY = function(y) {
    if (!this.isClicked()) {
        this.y += y;
        this.stateChange = true;
        if (this.updateBounds) {
            this.updateBounds(true);
        }
    }
};

Entity.prototype.translate = function(x, y) {
    this.ctx.translate(x, y);
    var matrix = [1, 0, 0, 1, x, y];
    this.transformations.push(matrix);
};

Entity.prototype.rotate = function(angle) {
    this.ctx.rotate(angle);
    var matrix = [Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0];
    this.transformations.push(matrix);
};

Entity.prototype.scale = function(x, y) {
    this.scaleX = x;
    this.scaleY = y;
    this.ctx.scale(x, y);
    var matrix = [x, 0, 0, y, 0, 0];
    this.transformations.push(matrix);
};

Entity.prototype.multiplyMatrix = function(m1, m2) {
    return [
        m1[0] * m2[0] + m1[2] * m2[1],
        m1[1] * m2[0] + m1[3] * m2[1],
        m1[0] * m2[2] + m1[2] * m2[3],
        m1[1] * m2[2] + m1[3] * m2[3],
        m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
        m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
    ];
};

Entity.prototype.transformPoint = function(px, py) {
    var x = px;
    var y = py;
    px = Math.round(x * this.currentTransformMatrix[0] + y * this.currentTransformMatrix[2] + this.currentTransformMatrix[4]);
    py = Math.round(x * this.currentTransformMatrix[1] + y * this.currentTransformMatrix[3] + this.currentTransformMatrix[5]);
    return [px, py];
};