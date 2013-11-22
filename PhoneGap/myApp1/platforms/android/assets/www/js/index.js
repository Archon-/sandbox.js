/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
/* 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // ALL APP COD HERE
        
			
        // ALL APP COD HERE - END
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
*/
			window.requestAnimFrame = (function(){
			  return  window.requestAnimationFrame       ||
			          window.webkitRequestAnimationFrame ||
			          window.mozRequestAnimationFrame    ||
			          function( callback ){
			            window.setTimeout(callback, 1000 / 60);
			          };
			})();
			
			var Game = {

				FPS: {
					value: 0,
					lastTime: 0,
					lastTimeCounterUpdate: 0,
					history: []
				},
			
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
			        //this.loader.src = 'img/img3.png';
			        
			        // Reflow canvas size/margin on resize
			        window.addEventListener('resize', this, false);
			        this.reflow();

			      	var now = new Date().getTime();

			        this.FPS.lastTime = now;
			        this.FPS.lastTimeCounterUpdate = now;
			
			        var i = 0;
			
			        (function animloop(){
			          requestAnimFrame(animloop);
			          	Game.FPSCounterUpdate();
			            Game.render(i);
			            i += 1;
			        })();
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
			
			    },
			
			    render: function(i){
			        var imageObj = new Image(),
			            today = new Date(),
			            h = today.getHours(),
			            m = today.getMinutes(),
			            s = today.getSeconds();
			
			        Game.clearScreen();
			        console.log('Render ...');
			
			        imageObj.src = 'img/img3.png';
			        this.ctx.drawImage(imageObj, 0, 0);
			
			        this.ctx.fillStyle = "black";
			        this.ctx.font = "bold 32px Arial";
			        this.ctx.fillText("Responsive Canvas 2", 100, 200);
			        this.ctx.fillText('Time: '+h+':'+m+':'+s, 100, 300);
			        this.ctx.fillText('Render counter: '+i, 100, 400);
			        this.ctx.fillText('FPS: '+this.FPS.value, 100, 500);
			    },
			
			    clearScreen: function(){
			        this.ctx.clearRect (0, 0, 640, 960);
			    },

			    FPSCounterUpdate: function(){
			    	var now = new Date().getTime();


		    		this.FPS.history.push(~~(1000/(now - this.FPS.lastTime)));
		    		this.FPS.lastTime = now;


		    		if(this.FPS.history.length === 51){
			    		this.FPS.history.shift();
			    		if(now - this.FPS.lastTimeCounterUpdate >= 1000){
				    		this.FPS.value = ~~(this.FPS.history.reduce(function(pv, cv) { return pv + cv; }, 0)/50);
				    		this.FPS.lastTimeCounterUpdate = now;
				    	}
			    	}
			    }
			
			};
			
//(Game.init())();

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
}

function onDeviceReady() {
	Game.init();
}

window.onload = onLoad;