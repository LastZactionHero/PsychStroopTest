var currentMode = null;
var currentTrial = -1;
var currentWord = null;
var testState = null;
var keyColor = null;

var trials = null;
var timeoutId = null;
var startTime = null;
var results = new Array();


$( document ).ready( function() {
	$( document ).keydown( function( event ){ keyPress( event ) } );					
	changeMode();
} );


function changeMode() {
	if( currentMode == null ) {
		currentMode = 'practice';
		
		testState = 'new';
		trials = generateTrials( currentMode );
		currentTrial = -1;
		
		setPracticeMessage();
		
	} else if( currentMode == 'practice' ) {
		currentMode = 'real';
		
		testState = 'new';
		trials = generateTrials( currentMode );
		currentTrial = -1;
		
		setRealMessage();
		
	} else if( currentMode == 'real' ) {
		currentMode = 'uploading';
				
		setUploadingMessage();
		uploadResults( results );
	} else if( currentMode == 'uploading' ) {
		currentMode = 'finished';
		
		setFinishedMessage();
	}

	centerWord();	
}


function keyPress( event ) {
	if( currentMode == 'finished' ) {
		return;
	}
	
	keyColor = null;	
	var keyCode = event.which;
	
	if( testState == 'testing' ) {
		if( keyCode == 83 ) {
			keyColor = 'RED';
		} else if ( keyCode == 70 ) {
			keyColor = 'BLUE';
		} else if ( keyCode == 74 ) {
			keyColor = 'GREEN';
		} else if ( keyCode == 76 ) {
			keyColor = 'YELLOW';
		}
	
		if( keyColor != null ) {
			testState = 'responded';
			testCycle();	
		} else {
			testState = 'invalid';
			testCycle();			
		}
				
	} else if( testState == 'new' ) {
		
		if( keyCode == 32 ) {
			testCycle();
		}
		
	}
			
}


function testCycle() {			
	
	if( testState == 'new' ) {
	
	    testState = 'focus';
	    
	    hideMessages();
	    clearAlert();
	    $( "#study-box" ).html( "<p></p>" );
		timeoutId = setTimeout( testCycle, 500 );
		
	} else if( testState == 'focus' ) {
		
		testState = 'testing'
		
		if( currentTrial < ( trials.length - 1 ) ) {
			currentTrial++;
			var trial = trials[currentTrial];		
			currentWord = trial.inkColor;
				
			$( "#study-box" ).html( "<p class='" + trial.inkColor + "'>" + trial.textColor + "</p>" );
			startTime = new Date().getTime();	
		} else {
			changeMode();
		}
		
	/*} else if ( testState == 'testing' ) {
		
		testState = 'new';			
		setAlert( 'Took too long to respond. Press Spacebar to start next trial.' );
		trials[currentTrial].correct = false;
		trials[currentTrial].note = "answered too slowly"
		trials[currentTrial].responseTime = -1;
		results.push( trials[currentTrial] ); */
		
	} else if ( testState == 'responded' ) {
	
		testState = 'new';
		
		var currentTime = new Date().getTime();
		var responseTime = currentTime - startTime;
		
		//alert( "keyColor: " + keyColor + " wordColor: " + currentWord );		
		
		
		trials[currentTrial].answeredColor = keyColor;
		trials[currentTrial].responseTime = responseTime;
		
		var line1 = "";
		var line2 = "";
		var line3 = "Press the space bar for the next trial.";
				
		
		if( keyColor == currentWord ) {
			line1 = "CORRECT!";
			trials[currentTrial].correct = true;	
		} else {
			line1 = "INCORRECT!";
			if( currentMode == 'practice' ) {
				line1 += " THE CORRECT INK COLOR IS " + currentWord + ".";
			}
			trials[currentTrial].correct = false;
		}			
		
		if( responseTime < 200 ) {
			line2 = "Too early, wait for the stimulus.";
			trials[currentTrial].correct = false;
			trials[currentTrial].note = "answered too quickly"
		} else if( responseTime > 1800 ) {
			line2 = "Too slow, respond faster.";
			trials[currentTrial].correct = false;
			trials[currentTrial].note = "answered too slowly"	
		}
		
		results.push( trials[currentTrial] );		
		
		setAlert( line1 + "<br />" + line2 + "<br />" + line3 );
		
	} else if ( testState == 'invalid' ) {
		testState = 'new'			
		setAlert( "Invalid Key" );
		
		// Move current trial to the end of the list
		bad_trial = trials[currentTrial];
		trials.splice( currentTrial, 1 );
		trials.push( bad_trial );
		currentTrial -= 1;		
	}
	
	centerWord();
	
	return false;
}
