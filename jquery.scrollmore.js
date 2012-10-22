window.ScrollMore = window.ScrollMore || {
	// Basic variables
	opts : {
		nextUrl : "",
		distanceToBottom : 100,
	},

	// Use internally, to prevent next URL is loaded multiple times
	_blockUrls : {},

	// Check if user scroll near bottom
	// Taken from http://stackoverflow.com/questions/3898130/how-to-check-if-a-user-has-scrolled-to-the-bottom
	isNearbottom : function() {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - this.opts.distanceToBottom) {
			return true;
		}
		return false;
	},

	// Do AJAX GET for the nextUrl, with callback before, success and error
	// Simply jQuery Ajax here
	get : function(before, success, error) {
		var $this = this;
		$.ajax({
			type : "GET",
			url : $this.opts.nextUrl,
			beforeSend : function(xhr) {
				before(xhr);
			}
		}).done(function(data) {
			success(data);
		}).fail(function(jqXHR, textStatus) {
			error(jqXHR, textStatus);
		});
	},

	// Initialize the scroll with callback functions
	// Adopt pattern from http://ejohn.org/blog/learning-from-twitter/ to prevent slow performance with scroll event
	init : function(before, success, error) {
		var didScroll = false;
		$(window).scroll(function() {
			didScroll = true;
		});

		var $this = this;
		setInterval(function() {
			if (didScroll) {
				didScroll = false;
				if ($this.isNearbottom()) {
					if ($this.opts.nextUrl !== "" && $this.opts.nextUrl !== undefined) {
						// If the next url is already loaded, it will not be loaded when user continues scrolling
						if (($this.opts.nextUrl in $this._blockUrls) == false) {
							$this.get(before, success, error);
							$this._blockUrls[$this.opts.nextUrl] = true;
						}
					}
				}
			}
		}, 250);
	}
};