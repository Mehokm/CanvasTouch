function Entity() {
    this.dir = 1;
    this.color = "black";
    this.transformations = [];
}
Entity.prototype.drawStack = [];

Entity.prototype.setCanvas = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this._setContext();
};

Entity.prototype.setGCanvas = function(gCanvas) {
    this.gCanvas = gCanvas;
    this._setGContext();
};

Entity.prototype.getCanvas = function() {
    return this.canvas;
};

Entity.prototype.getGCanvas = function() {
    return this.gCanvas;
};

Entity.prototype._setContext = function() {
    this.ctx = this.canvas.getContext('2d');
};

Entity.prototype._setGContext = function() {
    this.gCtx = this.gCanvas.getContext('2d');
};

Entity.prototype.getContext = function() {
    return this.ctx;
};

Entity.prototype.getGContext = function() {
    return this.gCtx;
};

Entity.prototype.update = function(func) {
    this.ctx.save();
    this.gCtx.save();
    func(this, this.ctx, this.gCtx);
    this.ctx.restore();
    this.gCtx.restore();
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

Entity.prototype.getTransformations = function() {
    return this.transformations;
};

Entity.prototype.applyTransformations = function() {
    this.gCtx.save();
    this.transformations.forEach(function(func) {
        func();
    });
    this.gCtx.restore();
    this.transformations = [];
};
    
Entity.prototype.translate = function(x, y) {
    var that = this;
    this.ctx.translate(x, y);
    var trans = function() {
        that.gCtx.translate(x, y);
    };
    this.transformations.push(trans);
};

Entity.prototype.rotate = function(angle) {
    var that = this;
    this.ctx.rotate(angle);
    var rot = function() {
        that.gCtx.rotate(angle);
    };
    this.transformations.push(rot);
};