 window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

 var id;
 window.onload = function() {
     // Let's make our nice CT object we will be working with
     var ct = new CanvasTouch('canvas');

     // Make a new Entity->Rectangle drawable
     // param1 = x, param2 = y, param3 = width, param4 = height
     var rect1 = new Rectangle(10, 10, 50, 50);
     var rect1ScaleX = 3;
     // Let's set our stuff we want to happen when the Rectanle is clicked
     rect1.registerOnClick(function() {
         this.setColor("blue");
     });
     var rect2 = new Rectangle(65, 65, 50, 50);
     rect2.setDraggable(true);
     rect2.registerOnClick(function() {
         this.setColor("green");
     });
     // Make a new Entity->Circle drawable
     // param1 = x, param2 = y, param3 = radius
     var circ = new Circle(50, 50, 30);
     var angle = 45;
     circ.setDraggable(true);
     circ.registerOnClick(function() {
         this.setColor("red");
     });

     var poly = new Polygon(100, 100, [{
         x: 100,
         y: 100
     }, {
         x: 110,
         y: 70
     }, {
         x: 150,
         y: 80
     }, {
         x: 130,
         y: 140
     }, {
         x: 100,
         y: 140
     }]);
     poly.registerOnClick(function() {
         this.setColor("pink");
     });
     poly.setDraggable(true);
     // Make sure to attach your entities to the CT obj
     ct.attachEntity(rect2, rect1, circ, poly);
     // Basic draw function, not related to CT or Entities
     var count = 0;

     function draw() {
         ct.getContext().clearRect(0, 0, ct.getCanvas().width, ct.getCanvas().height);
         // Entities have an update() function that you can pass in what you want
         // to have happen to it on a redraw.
         // param1 = function with update logic, param2 = (true = fill object, false = stroke object)
         rect1.update(function(self, ctx) {
             self.moveX(self.dir * 1);
             if (self.x * rect1ScaleX >= self.canvas.width - self.w * rect1ScaleX || self.x <= 0) {
                 self.dir = -self.dir;
             }
             self.scale(rect1ScaleX, 1);
             self.render(ctx, true);
         }, true);

         rect2.update(function(self, ctx) {
             // self.moveX(self.dir * 2);
             // if (self.x >= self.canvas.width - self.w || self.x <= 0) {
             //     self.dir = -self.dir;
             // }
             self.translate((self.verticies[0].x + self.verticies[2].x) / 2, (self.verticies[0].y + self.verticies[2].y) / 2);
             self.rotate(angle * Math.PI / 180);
             self.translate(-(self.verticies[0].x + self.verticies[2].x) / 2, -(self.verticies[0].y + self.verticies[2].y) / 2);
             self.render(ctx, true);

         }, true);

         circ.update(function(self, ctx) {
             self.render(ctx, true);
         });

         poly.update(function(self, ctx) {
             //self.scale(2, 1);
             //self.translate(self.verticies[0].x, self.verticies[0].y);
             //self.rotate(45 * Math.PI / 180);
             //self.translate(-self.verticies[0].x, -self.verticies[0].y);
             self.render(ctx, true);
         }, true);
         // if (count++ < 10) {
         //     requestAnimationFrame(draw);
         // }
         requestAnimationFrame(draw);
     }
     id = requestAnimationFrame(draw);
 };
