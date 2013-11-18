// Center scaled canvas on screen using CSS3

var Game = {

    init: function () {
        // Get DOM elements
        this.element = document.getElementById('game');
        this.canvas = this.element.firstElementChild;
        
        // Original content size
        this.content = [this.canvas.width, this.canvas.height];

        // Setting up the canvas
        var ctx = this.ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#6f8ed9';
        ctx.fillRect(0, 0, this.content[0], this.content[1]);
        
        // Create image on click
        this.element.addEventListener('click', this, false);
        
        // Load image to draw on click
        this.loader = new Image();
        this.loader.addEventListener('load', this, false);
        //this.loader.src = 'http://mozorg.cdn.mozilla.net/media/img/styleguide/identity/marketplace/usage-logo-rocket.png';
        this.loader.src = 'images/img2.png';
        
        // Reflow canvas size/margin on resize
        window.addEventListener('resize', this, false);
        this.reflow();
    },

    reflow: function () {
        // 2d vectors to store various sizes
        var browser = [
            window.innerWidth, window.innerHeight];
        // Minimum scale to fit whole canvas
        var scale = this.scale = Math.min(
            browser[0] / this.content[0],
            browser[1] / this.content[1]);
        // Scaled content size
        var size = [
            this.content[0] * scale, this.content[1] * scale];
        // Offset from top/left
        var offset = this.offset = [
            (browser[0] - size[0]) / 2, (browser[1] - size[1]) / 2];

        // Apply CSS transform
        var rule = "translate(" + offset[0] + "px, " + offset[1] + "px) scale(" + scale + ")";
        this.element.style.transform = rule;
        this.element.style.webkitTransform = rule;

        var imageObj = new Image();
        imageObj.src = 'images/img2.png';
        this.ctx.drawImage(imageObj, 0, 0);
    },

    // Handle all events
    handleEvent: function (evt) {
        switch (evt.type) {
            case 'resize':
                // Window resized
                this.reflow();
                break;
            case 'click':
                // Canvas clicked
                if (!this.img) break;
                // Calculate position based on offset and scale
                var pos = [
                    (evt.pageX - this.offset[0] - this.img.width / 2) / this.scale,
                    (evt.pageY - this.offset[1] - this.img.height / 2) / this.scale];
                // Draw image with rounded values
                this.ctx.drawImage(this.img, pos[0] + 0.5 | 0, pos[1] + 0.5 | 0);
                break;
            case 'load':
                // Image loaded
                this.img = this.loader;
                break;
        }

    }

};

$(function(){
  Game.init();
});