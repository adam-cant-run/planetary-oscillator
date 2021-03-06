Oscillator = function() {
    var canvas;
    var ctx;

    var origin_x;
    var origin_y;
    var x;
    var y;

    var time;

    var rotation;
    var sin_rotation;
    var cos_rotation;

    var lastDx;
    var behind;
};

Oscillator.prototype.init = function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.origin_x = this.canvas.width / 2;
    this.origin_y = this.canvas.height / 2;
    this.x = this.origin_x;
    this.y = this.origin_y;
    this.time = 0;

    this.rotation = Math.PI / 6;
    this.sin_rotation = Math.sin(this.rotation);
    this.cos_rotation = Math.cos(this.rotation);

    this.lastDx = 0;
    this.behind = false;
};

Oscillator.prototype.run = function() {
    var self = this;
    window.setInterval(function() { self.main_loop.call(self); }, 20);
};

Oscillator.prototype.main_loop = function() {
    this.clear();

    if(this.behind == false) {
        this.drawSun();
        this.drawPlanet();
    }
    else {
        this.drawPlanet();
        this.drawSun();
    }

    this.movePlanet();
};

Oscillator.prototype.clear = function() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
};

Oscillator.prototype.drawSun = function() {
    this.ctx.fillStyle = '#ffff00';
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 40, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
};

Oscillator.prototype.drawPlanet = function() {
    this.ctx.fillStyle = '#ff0000';
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 8, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
};

Oscillator.prototype.movePlanet = function() {
    this.time += (Math.PI / 40);
    this.time = this.time % (2 * Math.PI);

    var delta = (100 * Math.sin(this.time));

    var dx = delta * this.sin_rotation;
    var dy = delta * this.cos_rotation;

    if(dx <= this.lastDx) {
        this.behind = true;
    }
    else {
        this.behind = false;
    }
    this.lastDx = dx;

    this.x = this.origin_x + dx;
    this.y = this.origin_y + dy;
};
