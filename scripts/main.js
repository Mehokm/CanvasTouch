 window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

 window.onload = function() {
    // Let's make our nice CT object we will be working with
     var ct = new CanvasTouch('canvas');

     // Make a new Entity->Rectangle drawable
     // param1 = x, param2 = y, param3 = width, param4 = height
     var rect1 = new Rectangle(10, 10, 50, 50);
     // Let's set our stuff we want to happen when the Rectanle is clicked
     rect1.registerOnClick(function() {
         this.setColor("blue");
     });
     var rect2 = new Rectangle(65, 65, 50, 50);
     rect2.registerOnClick(function() {
         this.setColor("green");
     });
     // Make a new Entity->Circle drawable
     // param1 = x, param2 = y, param3 = radius
     var circ = new Circle(50, 50, 30);
     circ.setDraggable(true);
     circ.registerOnClick(function() {
         this.setColor("red");
     });

     // Make sure to attach your entities to the CT obj
     ct.attachEntity(rect2, rect1, circ);

     // Basic draw function, not related to CT or Entities
     function draw() {
         ct.getContext().clearRect(0, 0, ct.getCanvas().width, ct.getCanvas().height);
         // Entities have an update() function that you can pass in what you want
         // to have happen to it on a redraw.
         // param1 = function with update logic, param2 = (true = fill object, false = stroke object)
         rect1.update(function(self, ctx, gCtx) {
             self.x += self.dir * 1;
             if (self.x >= self.canvas.width - self.w || self.x <= 0) {
                 self.dir = -self.dir;
             }
             self.render(ctx, true);
         });
         rect2.update(function(self, ctx, gCtx) {
             // self.x += self.dir * 2;
             // if (self.x >= self.canvas.width - self.w || self.x <= 0) {
             //     self.dir = -self.dir;
             // }
             self.translate(self.x, self.y);
             self.rotate(45 * Math.PI / 180);
             self.translate(-self.x, -self.y);
             self.render(ctx, true);

         });
         circ.update(function(self, ctx, gCtx) {
             self.render(ctx, true);
         });
         requestAnimationFrame(draw);
     }
     requestAnimationFrame(draw);
 };