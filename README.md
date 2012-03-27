Transform Image UI

The Transform Image UI is a CSS3 & Javascript based component that will transform an image on-screen according to user actions. Resize, rotate & flip (horizontal and vertical) options are all available, allowing the image to be transformed in a dynamic, user friendly and interesting way.

When the user is happy with their transforms and the image is as they’d like, the hidden form fields can be submitted (such as when the user clicks a button to confirm their transform actions are complete) and of course used by a another script to take further action, such as using perhaps ASP.net or PHP to actually apply those transforms to an image on the web server.

Setup
This component has been built so it can be deployed easily to your own project, though the quickest way to get things up and running would be to use all the component files in the component folder. Just change the src attribute within the index.html file to that of your image. When you open this webpage in your web browser, your image will appear along with transform controls (when you mouse over the image).

Usage
Clicking Resize will indicate that you can either click or click & drag to resize the image. It will resize centrally on the screen, with 0.5 second animated easing of the outer edge of the image, to meet with the mouse pointer position if you just click, or if you click & drag, it will do the same but with no animated easing. Clicking Rotate will rotate the image 90 degrees clockwise from it’s current position. Clicking Flip Horizontal or Flip Vertical will flip the image in that direction. Both rotating & flipping are animated too.

Output
Whatever you choose the output action to be, when you submit the hidden form to a webpage, it will send 6 form fields via a POST sending method for you to pick up and use with your next page of code/script. The 6 fields include tImageWidth, tImageHeight, tImageRotate, tImageFlipX, tImageFlipY plus tImageSrc. The values for tImageWidth and tImageHeight are integer numbers indicating the size of the image in pixels. tImageRotate will contain a value of 0, 90, 180 or 270, which corresponds to the degrees the image has been rotated. tImageFlipX and tImageFlipY will have a value of 1 to indicate it’s not been flipped and -1 to indicate it has. Lastly, tImageSrc is the image filename that the transform actions have been applied to.

Making it your own
Obviously these files will likely just be the foundation of what you’d like on your website. Even though the hard work has been done for you, you will likely want to make some adjustments, such as dynamically changing the src attribute of the image, altering the submit button to be a Save button etc.

Requirements
This component has been built to take advantage of the CSS3 transform and transition properties. It also makes significant use of JavaScript. For these reasons, it should be noted that this component works with modern web browsers and is not necessarily backwards compatible with older browsers who do not support the latest CSS properties. Browsers that should support the necessary CSS3 properties include Chrome 9+, Firefox 4+, Internet Explorer 9+, Safari 5+ and Opera 11+.

Happy Transforming!
