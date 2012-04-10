function Trial() {
	this.textColor = null;
	this.inkColor = null;
	this.type = null;
	this.sortVar = null;
	this.mode = null;
	
	this.answeredColor = null;
	this.correct = null;
	this.responseTime = null;
	this.note = null;
}

COLORS = [ "RED", "GREEN", "YELLOW", "BLUE" ]

function generateTrials( mode ) {
	var trials = generateIncongruentTrials();
	trials = generateCongruentTrials( mode ).concat( generateIncongruentTrials( mode ) );		
	trials = randomizeTrials( trials );
	debugPrintTrials( trials );
	return trials;
}

function generateCongruentTrials( mode ) {
	var trials = new Array();
	
	//for( var x = 0; x < 6; x++ ) {
		for( var i = 0; i < COLORS.length; i++ ) {
			var trial = new Trial();
			trial.textColor = COLORS[i];
			trial.inkColor = COLORS[i];
			trial.type = 'congruent';
			trial.mode = mode;
			trials.push( trial );	
		}
	//}

	if( mode == 'practice' ) {
		trials = trials.slice( 0, 5 );
	}
	
	return trials;
}

function generateIncongruentTrials( mode ) {
	var trials = new Array();
	
	//for( var x = 0; x < 3; x++ ) {
		for( var textColor = 0; textColor < COLORS.length; textColor++ ) {
			for( var inkColor = 0; inkColor < COLORS.length; inkColor++ ) {
				if( textColor != inkColor ) {
					var trial = new Trial();
					trial.textColor = COLORS[textColor];
					trial.inkColor = COLORS[inkColor];
					trial.type = 'incongruent';
					trial.mode = mode;
					trials.push( trial );
				}
			}
		}
	//}
	
	if( mode == 'practice' ) {
		trials = trials.slice( 0, 5 );
	}
	
	return trials;
}

function randomizeTrials( trials ) {
	// Assign each trial a random value
	for( var i = 0; i < trials.length; i++ ) {
		trials[i].sortVar = Math.random();
	}
	
	// Sort by value
	return trials.sort( function( a, b ) { return ( a.sortVar - b.sortVar ); } );
}

function debugPrintTrials( trials ) {
    console.debug( "Trials: " + trials.length );
	for( var i = 0; i < trials.length; i++ ) {
		console.debug( trials[i].inkColor + " " + trials[i].textColor + " " + trials[i].sortVar );
	}
}

function uploadResults( results ) {

	$.ajax({
		  type: 'POST',
		  url: '/trials',
		  data: { 'user_id' : user_id, 'results' : results },
		  success: function( data ){ changeMode(); },
	});
}