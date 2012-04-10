function clearAlert() {
	setAlert( "" );
}

function setAlert( text ) {
	$( "#alert-box" ).html( text );
}

function setPracticeMessage() {
	hideMessages();
	$( "#message-box-practice" ).show();
}

function setRealMessage( text ) {
	hideMessages();
	$( "#message-box-real" ).show();
}

function setFinishedMessage( text ) {
	hideMessages();
	$( "#message-box-finished" ).show();
}

function hideMessages() {
	$( ".message-box" ).hide();
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