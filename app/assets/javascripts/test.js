var currentMode = null;
var currentTrial = 0;
var currentWord = null;
var testState = null;
var keyColor = null;

var trials = null;
var timeoutId = null;
var startTime = null;


$( document ).ready( function() {
	$( document ).keydown( function( event ){ keyPress( event ) } );					
	changeMode();	
} );


function changeMode() {
	if( currentMode == null ) {
		currentMode = 'practice';
		
		testState = 'new';
		trials = generateTrials( currentMode );
		currentTrial = 0;
		
		setPracticeMessage();
		
	} else if( currentMode == 'practice' ) {
		currentMode = 'real';
		
		testState = 'new';
		trials = generateTrials( currentMode );
		currentTrial = 0;
		
		setRealMessage();
		
	} else if( currentMode == 'real' ) {
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
			keyColor = 'GREEN';
		} else if ( keyCode == 74 ) {
			keyColor = 'BLUE';
		} else if ( keyCode == 76 ) {
			keyColor = 'YELLOW';
		}
	
		if( keyColor != null ) {
			clearTimeout( timeoutId );
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
		
		if( currentTrial < trials.length ) {
			var trial = trials[currentTrial++];		
			currentWord = trial.inkColor;
				
			$( "#study-box" ).html( "<p class='" + trial.inkColor + "'>" + trial.textColor + "</p>" );
			timeoutId = setTimeout( testCycle, 1500 );
			startTime = new Date().getTime();	
		} else {
			changeMode();
		}
		
	} else if ( testState == 'testing' ) {
		
		testState = 'new';			
		setAlert( 'Took too long to respond. Press Spacebar to start next trial.' );
		
	} else if ( testState = 'responded' ) {
	
		testState = 'new';
		
		var currentTime = new Date().getTime();
		var responseTime = currentTime - startTime;
		
		//alert( "keyColor: " + keyColor + " wordColor: " + currentWord );
		
		var spacebarAlert = "Press Spacebar to start the next trial.";
		
		var baseAlert = "";
		
		if( responseTime < 250 ) {
			baseAlert = "Answered too quickly.";
		} else if( currentMode == 'practice' ) {
			if( keyColor == currentWord ) {
				baseAlert = "Correct.";				
			} else {
				baseAlert = "Incorrect.";
			}
		}
		
		setAlert( baseAlert + " " + spacebarAlert );
	}
	
	centerWord();
	
	return false;
}