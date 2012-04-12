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
			setAlert( "Invalid Key" );
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
		
	} else if ( testState = 'responded' ) {
	
		testState = 'new';
		
		var currentTime = new Date().getTime();
		var responseTime = currentTime - startTime;
		
		//alert( "keyColor: " + keyColor + " wordColor: " + currentWord );
		
		var spacebarAlert = "Press the space bar for the next trial.";
		
		var baseAlert = "";
		
		trials[currentTrial].answeredColor = keyColor;
		trials[currentTrial].responseTime = responseTime;
		
		if( responseTime < 250 ) {
			baseAlert = "Too early, wait for the stimulus.";
			trials[currentTrial].correct = false;
			trials[currentTrial].note = "answered too quickly"
		} else if( responseTime > 1500 ) {
			baseAlert = "Too slow, respond faster.";
			trials[currentTrial].correct = false;
			trials[currentTrial].note = "answered too quickly"			
		} else if( currentMode == 'practice' ) {
			if( keyColor == currentWord ) {
				baseAlert = "CORRECT.";	
				trials[currentTrial].correct = true;
			} else {
				baseAlert = "INCORRECT. THE CORRECT INK COLOR IS " + currentWord + ".";
				trials[currentTrial].correct = false;
			}
		} else {
			if( keyColor == currentWord ) {
				trials[currentTrial].correct = true;	
			} else {
				trials[currentTrial].correct = false;
			}			
		}
		
		results.push( trials[currentTrial] );		
		
		setAlert( baseAlert + " " + spacebarAlert );
	}
	
	centerWord();
	
	return false;
}