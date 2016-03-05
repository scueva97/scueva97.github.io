var welcomeMessages = ["Website in", "progress..."]
var lines = new Array();
for(i = 0; i < welcomeMessages.length; i++) {
	lines[i] = "wmline" + i;
}
var colorPattern = ['#385380', '#43A367', '#A8D966', '#C6F1A2'];

$(document).ready(function() {
	fullpageSetUp();
	welcomeAnim();

});

function welcomeAnim() {
	var idxLine = 0;
	var idxChar = 0;
	var flicker = true;
	var flickerId;
	var printId = setInterval(periodicalPrint, 100);

	function periodicalPrint() {
		if (idxChar == 0 && idxLine > 0) {
			$("#"+lines[idxLine - 1]).html(welcomeMessages[idxLine - 1]);
		}

		var message = welcomeMessages[idxLine].substring(0, idxChar);
		var lastChar = welcomeMessages[idxLine].charAt(idxChar);
		var line = lines[idxLine];

		$("#"+line).html(message 
			+ '<span style="background-color: ' 
			+ colorPattern[2] + '; color: ' + colorPattern[0] + '">' 
			+ lastChar +'</span>');
		//console.log(idxChar.toString() + " " + idxLine.toString());

		idxChar++;
		if (idxChar >= welcomeMessages[idxLine].length) {
			idxLine++;
			if (idxLine >= welcomeMessages.length) {
				//console.log("Stop");
				clearInterval(printId);
				flickerId = setInterval(charFlicker, 500, line, message, lastChar);
				setTimeout(finishLoadScreen, 2000);
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

	$('#welcome-screen').on('click', finishLoadScreen);

	function finishLoadScreen() {
		$('#welcome-screen').fadeOut(500, function() {
			console.log("Fade");
			clearInterval(flickerId);
		});
		// if (flickerId != undefined) {
		// 	$(this).toggleClass('hidden');
		// 	$('#welcome-message').remove();
		// 	$("#welcome-screen").animate({
		// 		"bottom": "0px",
		// 	}, 4000, function() {
		// 		console.log("Anim");
		// 	}); 
		// 	clearInterval(flickerId);
		// }
	}

	function slideUpFirstPage() {

	}
}

function fullpageSetUp() {
	$('#fullpage').fullpage({
        //Navigation
        menu: '#menu',
        lockAnchors: false,
        anchors:['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['firstSlide', 'secondSlide'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

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
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
}