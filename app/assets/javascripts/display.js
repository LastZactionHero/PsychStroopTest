function clearAlert() {
	setAlert( "" );
}

function setAlert( text ) {
	$( "#alert-box" ).html( text );
}

function setPracticeMessage() {
	hideMessages();
	$( "#message-box-practice" ).show();
	hideTest();
}

function setRealMessage( text ) {
	hideMessages();
	$( "#message-box-real" ).show();
	hideTest();
}

function setFinishedMessage( text ) {
	hideMessages();
	$( "#message-box-finished" ).show();
	hideTest();
}

function setUploadingMessage( text ) {
	hideMessages();
	$( "#message-box-uploading" ).show();
	hideTest();
}

function hideMessages() {
	$( ".message-box" ).hide();
	$( "#focus-box" ).show();
	$( "#study-box" ).show();
	$( "#alert-box" ).show();
	$( "#key-colors" ).show();
}

function hideTest() {
	$( "#focus-box" ).hide();
	$( "#study-box" ).hide();
	$( "#alert-box" ).hide();
	$( "#key-colors" ).hide();
}

function centerWord() {
	var docHeight = $( document ).height();
	var wordHeight = $( "#study-box" ).height();		
	var wordTop = ( docHeight - wordHeight ) / 2
	$( "#study-box" ).css( 'top', wordTop );
	
	var focusHeight = $( "#focus-box" ).height();
	var focusTop = ( docHeight - focusHeight ) / 2 + 28
	$( "#focus-box" ).css( 'top', focusTop );

	var alertHeight = $( "#alert-box" ).height();
	var alertTop = ( docHeight - alertHeight ) / 2 + 80;
	$( "#alert-box" ).css( 'top', alertTop );
		
	var docWidth = $( document ).width();
	var wordWidth = $( "#study-box" ).width();
	var wordLeft = ( docWidth - wordWidth ) / 2;
	$( "#study-box" ).css( 'left', wordLeft );
	
	var focusWidth = $( "#focus-box" ).width();
	var focusLeft = ( docWidth - focusWidth ) / 2;
	$( "#focus-box" ).css( 'left', focusLeft );
	
	var alertWidth = $( "#alert-box" ).width();
	var alertLeft = ( docWidth - alertWidth ) / 2;
	$( "#alert-box" ).css( 'left', alertLeft );		
}