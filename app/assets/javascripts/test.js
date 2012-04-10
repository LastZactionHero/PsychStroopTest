$( document ).ready( function() {

	$( document ).keydown( function( event ){ keyPress( event ) } );					
	initTest();		
	testCycle();	
} );


var keyColor = null;
function keyPress( event ) {
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

function centerWord() {
	var docHeight = $( document ).height();
	var wordHeight = $( "#study-box" ).height();		
	var wordTop = ( docHeight - wordHeight ) / 2
	$( "#study-box" ).css( 'top', wordTop );
	
	var focusHeight = $( "#focus-box" ).height();
	var focusTop = ( docHeight - focusHeight ) / 2 + 32;
	$( "#focus-box" ).css( 'top', focusTop );
	
	var docWidth = $( document ).width();
	var wordWidth = $( "#study-box" ).width();
	var wordLeft = ( docWidth - wordWidth ) / 2;
	$( "#study-box" ).css( 'left', wordLeft );
	
	var focusWidth = $( "#focus-box" ).width();
	var focusLeft = ( docWidth - focusWidth ) / 2;
	$( "#focus-box" ).css( 'left', focusLeft );
}

var testState = null;
var trials = null;
var currentTrial = 0;

function initTest() {
	testState = 'new';		
	trials = generateTrials();
	currentTrial = 0;
}

var timeoutId = null;
var currentWord = null;
var startTime = null;

function testCycle() {			
	
	if( testState == 'new' ) {
	
	    testState = 'focus';
	    
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
			setAlert( "Test completed." );
		}
		
	} else if ( testState == 'testing' ) {
		
		testState = 'new';			
		setAlert( 'Took too long to respond. Press Spacebar to start next trial.' );
		
	} else if ( testState = 'responded' ) {
	
		testState = 'new';
		
		var currentTime = new Date().getTime();
		var responseTime = currentTime - startTime;
		
		//alert( "keyColor: " + keyColor + " wordColor: " + currentWord );
		
		if( responseTime < 250 ) {
			setAlert( 'Answered too quickly.' );
		} else if( keyColor == currentWord ) {
			setAlert( 'Correct ' + responseTime + "ms. Press Spacebar to start next trial." );
		} else {
			setAlert( 'Incorrect ' + responseTime + "ms. Press Spacebar to start next trial." );
		}			
	}
	
	centerWord();
	
	return false;
}


function clearAlert() {
	setAlert( "" );
}

function setAlert( text ) {
	$( "#alert-box" ).html( text );
}