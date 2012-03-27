// Transform Image UI
// v0.9.0 by Matt Pass
// www.mattpass.com

;(function() {

	var transformImage = {

		// reset the transition duration on demand
		setDuration: function(timeSecs) {
			for (var ind in this.cssPrefixes) {
				this.image.style[this.cssPrefixes[ind]+'TransitionDuration'] = timeSecs;
			}
		},

		// function to show or hide the menu
		showHideIcons: function(showHide) {
			if (!this.resizingImage) {
				if (showHide=="show") {
					this.menuContainer.setAttribute("style","opacity: 1");
				} else {
					this.menuContainer.setAttribute("style","opacity: 0");
				}
			}
		},

		// function to start/stop diong the image resizing & hide/show our menu & message
		doResize: function(doing) {
			if (doing=="start") {
				this.resizingImage = true;
				this.menuContainer.setAttribute("style","opacity: 0");
				this.messageContainer.setAttribute("style","opacity: 1");
				// show a mouse pointer cursor
				document.body.style.cursor='pointer';
			} else {
				this.resizingImage = false;
				this.menuContainer.setAttribute("style","opacity: 1");
				this.messageContainer.setAttribute("style","opacity: 0");
				// show a mouse pointer cursor
				document.body.style.cursor='auto';
			}
		},

		// function to resize the image if the variable is set to true
		resizeImage: function(evt) {
			if (this.resizingImage) {
				// establish variables:
				// offset of the image, mouse x-position & inner width of browser
				var oX = this.image.offsetLeft;
				var oY = this.image.offsetTop;
				// get values depending on wether which kind of browser page data is available
				var cX = evt.pageX ? evt.pageX:window.event.clientX;
				var cY = evt.pageY ? evt.pageY:window.event.clientY;
				var iX = innerWidth ? innerWidth:window.innerWidth;
				var iY = innerHeight ? innerHeight:window.innerHeight;
				// establish if the mouse pointer is above or below the image
				var lowX = parseInt(parseInt(iX/2))-(parseInt(this.image.width/2));
				var highX = parseInt(parseInt(iX/2))+(parseInt(this.image.width/2));
				var lowY = parseInt(parseInt(iY/2))-(parseInt(this.image.height/2));
				var highY = parseInt(parseInt(iY/2))+(parseInt(this.image.height/2));
				var withinImageWidth = ((cX>lowX)&&(cX<highX));
				// if within 20 pixels, switch this setting around (this stops indecisive flickering)
				if (withinImageWidth && ((cY>lowY+20)&&(cY<highY-20))) {withinImageWidth=false};
				// if we're controlling image size according to the width
				if (!withinImageWidth) {
					// the width of our image is determined after applying these values
					var sizeX = this.transArray[0] - (((this.transArray[0])-(-((parseInt(iX/2))+oX-cX)))*2);
					// if we have clicked on the left hand side of the image
					// reverse the value from negative to positive
					if (sizeX < parseInt(this.transArray[0]/2)) {sizeX=-sizeX};
					// if we still have a negative value, make it positive
					if (sizeX < 0) {sizeX=-sizeX};
					// the height is then determined by the width and the proportion ratio
					var sizeY = parseInt(sizeX / this.proportionRatioY);
				// we're controlling the image size according to the height
				} else {
					// the height of our image is determined after applying these values
					var sizeY = this.transArray[1] - (((this.transArray[1])-(-((parseInt(iY/2))+oY-cY)))*2);
					// if we have clicked on the top side of the image
					// reverse the value from negative to positive
					if (sizeY < parseInt(this.transArray[1]/2)) {sizeY=-sizeY};
					// if we still have a negative value, make it positive
					if (sizeY < 0) {sizeY=-sizeY};
					// the width is then determined by the width and the proportion ratio
					var sizeX = parseInt(sizeY * this.proportionRatioY);
				}
				// OK, now we can set our width & height
				this.image.style.width = sizeX+"px";
				this.image.style.height = sizeY+"px";
				// plus now we can offset the image so it's central to the screen
				this.image.style.left = "50%";
				this.image.style.top = "50%";
				this.image.style.margin = (-(sizeY/2)) + "px 0 0 " +(-(sizeX/2)) + "px";
				// save the now sizes we've established within the array
				this.transArray[0] = sizeX;
				this.transArray[1] = sizeY;
				// lastly, call the function to redo all the styles
				transformImage.redoStyle();
			}
		},

		// function to rotate the image an extra 90 degrees
		rotateImage: function() {
			this.transArray[2]+=90;
			// set width to height and height to width
			var width=this.transArray[0];this.transArray[0]=this.transArray[1];this.transArray[1]=width;
			// lastly, call the function to redo all the styles
			transformImage.redoStyle();
		},

		// function to flip the image horizontally & vertically
		flipImage: function(direction) {
			// convert the number of degrees in the array down to within a 0-360 range
			var degrees0to360 = ((this.transArray[2]/360)-parseInt(this.transArray[2]/360))*4*90;
			// if the image is at 90 or 270 degrees, flipping direction needs to be switched around
			if (direction=="horizontal" && (degrees0to360==90||degrees0to360==270)) {direction="vertical"}
			else if (direction=="vertical" && (degrees0to360==90||degrees0to360==270)) {direction="horizontal"};
			// reverse the scale on the axis in question (so 1 becomes -1 and -1 becomes 1)
			if (direction=="horizontal") {this.transArray[3]=-this.transArray[3]};
			if (direction=="vertical") {this.transArray[4]=-this.transArray[4]};
			// lastly, call the function to redo all the styles
			transformImage.redoStyle();
		},

		// function to apply our styles & update form fields
		redoStyle: function() {
			// firstly, set a variable to contain the rotate & flip X & Y transforms
			var transform="rotate("+this.transArray[2]+"deg) scaleX("+this.transArray[3]+") scaleY("+this.transArray[4]+")";
			// then for all the browser prefixes, apply the transform
			for (var ind in this.cssPrefixes) {
				this.image.style[this.cssPrefixes[ind]+"Transform"] = transform;
			}
			// update the width & height displays
			this.widthDisplay.innerHTML = this.transArray[0];
			this.heightDisplay.innerHTML = this.transArray[1];
			// OK, now set the form fields to the array items
			document.getElementById("tImageWidth").value = this.transArray[0];
			document.getElementById("tImageHeight").value = this.transArray[1];
			// convert the number of degrees in the array down to within a 0-360 range
			var degrees0to360 = ((this.transArray[2]/360)-parseInt(this.transArray[2]/360))*4*90;
			document.getElementById("tImageRotate").value = degrees0to360;
			document.getElementById("tImageFlipX").value = this.transArray[3];
			document.getElementById("tImageFlipY").value = this.transArray[4];
			// plus identify the image src
			document.getElementById("tImageSrc").value = document.getElementById("tImage").src;
			// build some text to display the values of our transforms
			var formDataDisplay = "Values that will be output... Height: " + this.transArray[0] + ", Width: " + this.transArray[1]
			+ " ... Rotate: " + document.getElementById("tImageRotate").value
			+ " ... Flip-X: " + this.transArray[3] + ", " + "Flip-Y: " + this.transArray[4];
			// lastly, display the text
			document.getElementById("formDataDisplay").innerHTML = formDataDisplay;
		}
	};

	// add onload event without overriding existing one
	var load = function() {

		// quit if this function has already been called
		if (arguments.callee.done) return;

		// SETUP ALL THE VARIABLES

		// identify the image to have transforms applied against it
		transformImage.image = document.getElementById('tImage');

		// set an array to start with values for;
		// width, height, rotate (degrees), flipX, flipY (1=normal and -1=reverse)
		transformImage.transArray = [transformImage.image.width,transformImage.image.height,0,1,1];

		// set the margin on the image, according to the width & height
		transformImage.image.setAttribute("style","margin:-"+parseInt(transformImage.image.height/2)+"px 0 0 -"
		+parseInt(transformImage.image.width/2)+"px");

		// identify the spans that show the width & height displays
		transformImage.widthDisplay = document.getElementById('tImageWidthDisplay');
		transformImage.heightDisplay = document.getElementById('tImageHeightDisplay');

		// identify our menu container & message container
		transformImage.menuContainer = document.getElementById('tImageMenuContainer');
		transformImage.messageContainer = document.getElementById('tImageMessageContainer');

		// set an array with the CSS prefixes for browsers
		transformImage.cssPrefixes = ["webkit","Moz","o",""];

		// work out the proportion ratio between width & height
		transformImage.proportionRatioY = transformImage.transArray[0]/transformImage.transArray[1];

		// set the width & height of the image to begin with
		transformImage.image.style.width = transformImage.transArray[0]+"px";
		transformImage.image.style.height = transformImage.transArray[1]+"px";

		// lastly, state we're not resizing an image at present
		transformImage.resizingImage = false;

		// IDENTIFY THE FUNCTIONS

		tImageShowIcons = function() {transformImage.showHideIcons('show')};
		tImageHideIcons = function() {transformImage.showHideIcons('hide')};
		tImageRotateImage = function() {transformImage.rotateImage()};
		tImageDoResize = function(startStop) {transformImage.doResize(startStop)};
		tImageResizeImage = function(event) {transformImage.resizeImage(event)};
		tImagesetDuration = function(time) {transformImage.setDuration(time)};
		tImageFlipImage = function(direction) {transformImage.flipImage(direction)};

		// DECLARE SOME MOUSE EVENTS

		document.onmousedown = function(event) {
			transformImage.mouseClick=true;
			tImageResizeImage(event);
		};
		document.onmouseup = function() {
			transformImage.mouseClick=false;
			tImageDoResize('stop');
			tImagesetDuration('0.5s');
		};
		document.onmousemove = function(event) {
			if(transformImage.mouseClick==true){
				tImagesetDuration('0s');
				tImageResizeImage(event);
			}
		};

		// SET THE INITIAL STATE

		transformImage.setDuration('0.5s');
		transformImage.redoStyle();

		// flag this function so we don't do the same thing twice
		arguments.callee.done = true;
	};

	// trigger the load function upon window loading
	if (window.addEventListener){
		window.addEventListener('load', load, false);
	} else if (window.attachEvent){
		window.attachEvent('onload', load);
	}

})();