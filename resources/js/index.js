var welcomeMessages = ["Welcome ", "to my website"];
var lines = new Array();
for(i = 0; i < welcomeMessages.length; i++) {
	lines[i] = "wmline" + i;
}
$(document).ready(function() {
	var idxLine = 0;
	var idxChar = 0;
	var flicker = true;
	var flickerId;
	var printId = setInterval(periodicalPrint, 250);

	function periodicalPrint() {
		if (idxChar == 0 && idxLine > 0) {
			$("#"+lines[idxLine - 1]).html(welcomeMessages[idxLine - 1]);
		}

		var message = welcomeMessages[idxLine].substring(0, idxChar);
		var lastChar = welcomeMessages[idxLine].charAt(idxChar);
		var line = lines[idxLine];

		$("#"+line).html(message 
			+ '<span style="background-color: #FFFFFF; color: #000000">' 
			+ lastChar +'</span>');
		console.log(idxChar.toString() + " " + idxLine.toString());

		idxChar++;
		if (idxChar >= welcomeMessages[idxLine].length) {
			idxLine++;
			if (idxLine >= welcomeMessages.length) {
				console.log("Stop");
				clearInterval(printId);
				flickerId = setInterval(charFlicker, 500, line, message, lastChar);
			} else {
				idxChar = 0;
			}
		}
	}

	function charFlicker(line, message, lastChar) {
		if (flicker) {
			$("#"+line).html(message 
			+ '<span style="background-color: #FFFFFF; color: #000000">' 
			+ lastChar +'</span>');
			flicker = false;
		} else {
			$("#"+line).html(message 
			+ '<span style="background-color: #000000; color: #FFFFFF">' 
			+ lastChar +'</span>');
			flicker = true;
		}
	}

	$(".welcome-screen").on("click", function() {
		if (flickerId != undefined) {
			clearInterval(flickerId);
		}
	});

});