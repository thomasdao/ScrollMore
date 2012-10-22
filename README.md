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

    // Setup ScrollMore
    ScrollMore.opts.nextUrl = $('a#next').attr('href');
    var before = function(xhr) {
        // Show loading here;
    };
    var success = function(data) {
        // Hide loading();
        
        // Update next url. ScrollMore will load this nextUrl when user continues scrolling to bottom
        ScrollMore.opts.nextUrl = "/api/article/cursor/?curs=" + encodeURIComponent(data.cursor);
    };
    var error = function() {
        // Show Error Message here
    };
    ScrollMore.init(before, success, error);
