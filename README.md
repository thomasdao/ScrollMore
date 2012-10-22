ScrollMore
==========

ScrollMore is simple alternative for famous infinite scroll jquery plugin. The Infinite Scroll plugin in my view focuses too much on WordPress and getting more unnecessary features.

ScrollMore only does most basic features:

1) Check if user has scroll near bottom

2) Load nextUrl using jQuery Ajax

3) Notify caller via callback when success, error, and beforeSend event

How to use
==========

First, include the plugin:

	<script src="/path/to/plugins/scrollmore/jquery.scrollmore.min.js"></script>

Using ScrollMore is very simple

```javascript
// Setup ScrollMore
ScrollMore.opts.nextUrl = "/pages/2/";
// You can edit distance to bottom before load. Default value is 100px.
ScrollMore.opts.distanceToBottom = 100;

var before = function(xhr) {
    // Show loading here;
    console.log("Before Send");
};

// data is the content of the next url loaded
var success = function(data) {
    console.log(data);
    // Hide loading();
    
    // Update next url. ScrollMore will load this nextUrl when user continues scrolling to bottom.
    // To stop, just set ScrollMore.opts.nextUrl = undefined;
    ScrollMore.opts.nextUrl = "/pages/3/";
};
var error = function() {
    // Show Error Message here
    console.log("Error");
};
ScrollMore.init(before, success, error);
```

If you want to check if user scroll near bottom, there is a simple function for that too
```javascript
ScrollMore.isNearBottom()
```