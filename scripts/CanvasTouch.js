function CanvasTouch(canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    
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
    this.entities.forEach(function(entity) {
        if (entity.contains(clickPoint)) {
            events.push(entity);
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
};

CanvasTouch.prototype._handleUp = function(event) {
    this.mousedown = false;

    var releasePoint = {
        x: event.x - this.canvas.offsetLeft,
        y: event.y - this.canvas.offsetTop
    };

    this.entities.forEach(function(entity) {
        if (entity.isClicked()) {
            //entity.x = releasePoint.x - entity.getDeltaXY().x;
            //entity.y = releasePoint.y - entity.getDeltaXY().y;
            if (entity.isDragged && entity.updateBounds) {
                console.log("That");
                entity.updateBounds(true);
            }
        }
        entity.setClicked(false);
        entity.isDragged = false;
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
            e.isDragged = true;
            e.update(function(self, ctx) {
                self.x = dragPoint.x - self.getDeltaXY().x;
                self.y = dragPoint.y - self.getDeltaXY().y;
                self.render(ctx, true);
            }, false);
        }
    }
};

CanvasTouch.prototype.attachEntity = function(param) {
    var entity;
    if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            entity = arguments[i];
            entity.setCanvas(this.canvasId);
            this.entities.push(entity);
        }
    } else {
        entity = param;
        entity.setCanvas(this.canvasId);
        this.entities.push(entity);
    }
};

CanvasTouch.prototype.getCanvas = function() {
    return this.canvas;
};

CanvasTouch.prototype.getContext = function() {
    return this.ctx;
};