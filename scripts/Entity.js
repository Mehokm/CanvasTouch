function Entity() {
    this.dir = 1;
    this.color = "black";
    this.currentTransformMatrix = [1, 0, 0, 1, 0, 0];
    this.currentTranslateMatrix = [1, 0, 0, 1, 0, 0];
    this.currentRotateMatrix = [1, 0, 0, 1, 0, 0];
}
Entity.prototype.drawStack = [];

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

Entity.prototype.update = function(func) {
    this.ctx.save();
    func(this, this.ctx);
    this.ctx.restore();

    // if (this.updateBounds) {
    //     this.updateBounds();
    // }
};

Entity.prototype.registerOnClick = function(func) {
    this.func = func;
};

Entity.prototype.onClick = function() {
    this.func();
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
    
Entity.prototype.translate = function(x, y) {
    this.ctx.translate(x, y);
    var matrix = [1, 0, 0, 1, x, y];
    if (!this.currentTranslateMatrix.equals(matrix)) {
        this.currentTransformMatrix = this.multiplyMatrix(this.currentTransformMatrix, matrix);
        this.currentTranslateMatrix = matrix;
    }
};

Entity.prototype.rotate = function(angle) {
    this.ctx.rotate(angle);
    var matrix = [Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle), 0, 0];
    if (!this.currentRotateMatrix.equals(matrix)) {
        this.currentTransformMatrix = this.multiplyMatrix(this.currentTransformMatrix, matrix);
        this.currentRotateMatrix = matrix;
    }
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