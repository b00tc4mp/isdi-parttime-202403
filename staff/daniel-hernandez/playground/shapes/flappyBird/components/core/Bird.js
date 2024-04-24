function Bird() {
    CollidableObject.call(this, 30, 30);
    this.removeClass('collision-block');
    this.addClass('bird');
    
    this.velocity = 0;
    this.velocityUp = 5;
    this.gravity = 0.1;
    this.previousFrame = 0;
    this.hasJumped = false;
}

Bird.prototype = Object.create(CollidableObject.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.jump = function () {
    this.velocity = -this.velocityUp
    this.hasJumped = true;
}

// Bird.prototype.update = function (timestamp) {
//     var deltaTime = timestamp - this.previousFrame;
//     this.previousFrame = timestamp;

//     if(this.hasJumped) {
//         this.velocity += this.gravity * deltaTime / 6;
//     }
    
//     var bottom = parseFloat(getComputedStyle(this.container).bottom);
//     var newBottom = bottom - this.velocity * deltaTime / 6;

//     this.container.style.bottom = newBottom + 'px';

//     requestAnimationFrame(this.update.bind(this));
// }