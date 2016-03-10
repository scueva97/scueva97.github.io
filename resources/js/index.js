var welcomeMessages = ["Hello there stranger. ", "Welcome to my website!"]
var lines = new Array();
for(i = 0; i < welcomeMessages.length; i++) {
	lines[i] = "wmline" + i;
}
var pageAnchorTags = ['Home', 'About', 'Projects', 'Experience'];
var colorPattern = ['#385380', '#43A367', '#A8D966', '#C6F1A2'];
// Parameter name and value to indicate the user has already been welcomed
var URL_WLCM_PARAM = "wlcm";
var URL_WLCM_PARAM_STOP = "done";

/**
* Once the document has loaded, begin the page setup
*/
$(document).ready(function() {
	fullpageSetUp();

	// If this is the first time the user enters the website, then play the animation
	// Else, go straight to the contents
	if (getUrlParameter(URL_WLCM_PARAM) !== URL_WLCM_PARAM_STOP)
		welcomeAnim();
	else {
		$('#slide-up-wrapper').show();
		$('#welcome-screen').hide();
	}
	startTextFlipInX();

	/**
	* Changes to lighter-colored icons when hover over them
	*/
	$('.business-icon').hover( function () {
		var src = $(this).attr('src');
		if (src.indexOf('-hover') >= 0) {
			$(this).attr('src', src.replace('-hover', '') );			
		} else {
			$(this).attr('src', src.replace(/\.png/, '-hover.png') );
		}
        
   	});
});

/**
* Enable scrolling if true, disable if false
*/
function toggleScrolling(toggle) {
	$.fn.fullpage.setAllowScrolling(toggle);
	$.fn.fullpage.setKeyboardScrolling(toggle);
}

/**
* Animation user sees when the page is first loaded
*/
function welcomeAnim() {
	toggleScrolling(false);

	var typingDelay = 100;
	var idxLine = 0;
	var idxChar = 0;
	var flicker = true;
	var flickerId;
	var printId = setInterval(periodicalPrint, typingDelay);

	function periodicalPrint() {
		if (idxChar == 0 && idxLine > 0) {
			$("#"+lines[idxLine - 1]).html(welcomeMessages[idxLine - 1]);
		}

		var welcomeLine = welcomeMessages[idxLine];
		var message = welcomeLine.substring(0, idxChar);
		var lastChar = welcomeLine.charAt(idxChar);
		var line = lines[idxLine];

		$("#"+line).html(message 
			+ '<span style="background-color: ' 
			+ colorPattern[2] + '; color: ' + colorPattern[0] + '">' 
			+ lastChar +'</span>');

		idxChar++;
		if (idxChar >= welcomeMessages[idxLine].length) {
			idxLine++;
			if (idxLine >= welcomeMessages.length) {
				clearInterval(printId);
				flickerId = setInterval(charFlicker, 500, line, message, lastChar);
				setTimeout(finishLoadScreen, 2500);
			} else {
				idxChar = 0;
			}
		}
	}

	function charFlicker(line, message, lastChar) {
		if (flicker) {
			$("#"+line).html(message 
			+ '<span style="background-color: ' 
			+ colorPattern[0] + '; color: ' + colorPattern[2] + '">' 
			+ lastChar +'</span>');
			flicker = false;
		} else {
			$("#"+line).html(message 
			+ '<span style="background-color: ' 
			+ colorPattern[2] + '; color: ' + colorPattern[0] + '">' 
			+ lastChar +'</span>');
			flicker = true;
		}
	}
	
	function finishLoadScreen() {
		$('#welcome-screen').fadeOut(500, function() {
			clearInterval(flickerId);
			slideUpFirstPage();
			toggleScrolling(true);
			setUrlParameter(URL_WLCM_PARAM, URL_WLCM_PARAM_STOP);
		});
	}

	function slideUpFirstPage() {
		$('#slide-up-wrapper').toggle("slide", { direction: "down" }, 1500);
	}
}

/**
* Starts the transition animation among headliners after the welcoming animation
*/
function startTextFlipInX() {
	$("#description-flipX").Morphext({
		animation: "flipInX",
		separator: ",",
		speed: 3500
	});
}

/**
* Adds the given parameter to the url
* from http://stackoverflow.com/questions/13063838/add-change-parameter-of-url-and-redirect-to-the-new-url
*/
function setUrlParameter(paramName, paramValue) {
    var url = window.location.href;
    var domain = getHostname(url);
    var hash = location.hash;
    url = url.replace(hash, '');
    url = url.replace(domain, '');
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
    if (url.indexOf("?") < 0)
        url += "?" + paramName + "=" + paramValue;
    else
        url += "&" + paramName + "=" + paramValue;
    }
    window.history.pushState("Done welcoming", "Done welcoming", url + hash);

    function getHostname(url) {
    	var m = url.match(/^http:\/\/[^/]+/);
    	return m ? m[0] : null;
	}
}

/**
* Gets the paramter value from the url
* from http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
*/
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

/**
* Initializes the fullpage plugin
* All possible properties are shown, those commented out use default
*/
function fullpageSetUp() {
	$('#fullpage').fullpage({
        //Navigation
        // menu: '#menu',
        // lockAnchors: false,
        anchors: pageAnchorTags,
        // navigation: false,
        // navigationPosition: 'right',
        // navigationTooltips: ['firstSlide', 'secondSlide'],
        // showActiveTooltip: false,
        // slidesNavigation: true,
        // slidesNavPosition: 'bottom',

        //Scrolling
        // css3: true,
        // scrollingSpeed: 700,
        // autoScrolling: true,
        // fitToSection: true,
        // fitToSectionDelay: 1000,
        scrollBar: false,
        // easing: 'easeInOutCubic',
        // easingcss3: 'ease',
        // loopBottom: false,
        // loopTop: false,
        // loopHorizontal: true,
        // continuousVertical: false,
        // normalScrollElements: '#element1, .element2',
        // scrollOverflow: false,
        // touchSensitivity: 15,
        // normalScrollElementTouchThreshold: 5,

        //Accessibility
        // keyboardScrolling: true,
        // animateAnchor: true,
        recordHistory: false,

        //Design
        // controlArrows: true,
        // verticalCentered: true,
        // resize : false,
        sectionsColor : colorPattern,
        // paddingTop: '3em',
        // paddingBottom: '10px',
        // fixedElements: '#header, .footer',
        // responsiveWidth: 0,
        // responsiveHeight: 0,

        //Custom selectors
        // sectionSelector: '.section',
        // slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
}