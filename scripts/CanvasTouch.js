function CanvasTouch(canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.gCanvas = document.createElement('canvas');
    this.gCanvas.width = this.canvas.width;
    this.gCanvas.height = this.canvas.height;
    this.gCtx = this.gCanvas.getContext('2d');
    
    this.entities = [];
    this.mousedown = false;
    this.mousemove = false;

    this.canvas.addEventListener('mousedown', this._handleDown.bind(this));
    this.canvas.addEventListener('mouseup', this._handleUp.bind(this));
    this.canvas.addEventListener('mousemove', this._handleDrag.bind(this));
}

CanvasTouch.prototype._handleDown = function(event) {
    this.mousedown = true;

    var that = this;
    var pageX = event.x;
    var pageY = event.y;
    var events = [];
    var pos = 0;
    var e = null;

    var clickPoint = {
        x: pageX - this.canvas.offsetLeft,
        y: pageY - this.canvas.offsetTop
    };

    this.gCtx.clearRect(0, 0, this.gCanvas.width, this.gCanvas.height);

    this.entities.forEach(function(entity) {
        entity.applyTransformations();
        entity.render(that.gCtx, true);
        var imageData = that.gCtx.getImageData(clickPoint.x, clickPoint.y, 1, 1);

        if (imageData.data[3] > 0) {
            events.push(entity);
            that.gCtx.clearRect(0, 0, that.gCanvas.width, that.gCanvas.height);
        }
    });
    
    events.forEach(function(entity) {
        if (entity.stackPos >= pos) {
            pos = entity.stackPos;
            e = entity;
        }
    });
    if (e !== null) {
        var deltaX = clickPoint.x - e.x;
        var deltaY = clickPoint.y - e.y;
        e.x = clickPoint.x - deltaX;
        e.y = clickPoint.y - deltaY;

        e.onClick();
        e.setClicked(true);
        e.setDeltaXY({x: deltaX, y: deltaY});
    }
    this.gCtx.clearRect(0, 0, this.gCanvas.width, this.gCanvas.height);
};

CanvasTouch.prototype._handleUp = function(event) {
    this.mousedown = false;

    this.entities.forEach(function(entity) {
        entity.setClicked(false);
    });
};

CanvasTouch.prototype._handleDrag = function(event) {
    if (this.mousedown) {
        var pageX = event.x;
        var pageY = event.y;
        var events = [];
        var e = null;

        var dragPoint = {
            x: pageX - this.canvas.offsetLeft,
            y: pageY - this.canvas.offsetTop
        };

        this.entities.forEach(function(entity) {
            if (entity.isClicked()) {
                e = entity;
            }
        });

        if (e !== null && e.isDraggable()) {
            e.update(function(self, ctx) {
                self.x = dragPoint.x - self.getDeltaXY().x;
                self.y = dragPoint.y - self.getDeltaXY().y;
                self.render(ctx, true);
            });
        }
    }
};

CanvasTouch.prototype.attachEntity = function(param) {
    var entity;
    if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            entity = arguments[i];
            entity.setCanvas(this.canvasId);
            entity.setGCanvas(this.gCanvas);
            this.entities.push(entity);
        }
    } else {
        entity = param;
        entity.setCanvas(this.canvasId);
        entity.setGCanvas(this.gCanvas);
        this.entities.push(entity);
    }
};

CanvasTouch.prototype.getCanvas = function() {
    return this.canvas;
};

CanvasTouch.prototype.getContext = function() {
    return this.ctx;
};