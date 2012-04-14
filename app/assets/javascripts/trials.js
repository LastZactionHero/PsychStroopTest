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
	this.trial_num = null;
}

COLORS = [ "RED", "GREEN", "YELLOW", "BLUE" ]

function generateTrials( mode ) {
	var trials = generateIncongruentTrials();
	trials = generateCongruentTrials( mode ).concat( generateIncongruentTrials( mode ) );		
	trials = randomizeTrials( trials );
	trials = separateTrials( trials );
	debugPrintTrials( trials );
	return trials;
}

function generateCongruentTrials( mode ) {
	var trials = new Array();
	
	var iteration = 0;
	if( novel_admin ) {
		iterations = 15;
	} else {
		if( mode == 'practice' ) {
			iterations = 1;
		} else {
			iterations = 6;
		}
	}	
	
	for( var x = 0; x < iterations; x++ ) {
		for( var i = 0; i < COLORS.length; i++ ) {
			var trial = new Trial();
			trial.textColor = COLORS[i];
			trial.inkColor = COLORS[i];
			trial.type = 'congruent';
			trial.mode = mode;
			trials.push( trial );	
		}
	}
	
	if( mode == 'practice' ) {
		if( novel_admin ) {
			trials = trials.slice( 0, 10 );
		} else {
			trials = trials.slice( 0, 4 );
		}		
	}
	
	return trials;
}

function generateIncongruentTrials( mode ) {
	var trials = new Array();
	
	var iterations = 0
	if( novel_admin ) {
		iterations = 5;
	} else {
		iterations = 2;
	}
	
	for( var x = 0; x < iterations; x++ ) {
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
	}
	
	if( mode == 'practice' ) {
		if( novel_admin ) {
			trials = trials.slice( 0, 10 );
		} else {
			trials = trials.slice( 0, 2 );
		}		
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
    //console.debug( "Trials: " + trials.length );
	//for( var i = 0; i < trials.length; i++ ) {
	//	console.debug( i + ": Condition: " + trials[i].type + " Ink: " + trials[i].inkColor + " Text Color: " + trials[i].textColor + " " + trials[i].sortVar );
	//}
}

function uploadResults( results ) {

	$.ajax({
		  type: 'POST',
		  url: '/trials',
		  data: { 'user_id' : user_id, 'results' : results },
		  success: function( data ){ changeMode(); },
	});
}

function separateTrials( trials ) {
	
	for( var pass = 0; pass < 10; pass++ ) {
		//console.debug( "Separation Pass " + pass );
		var reshuffle = false; 
		
		for( var i = 1; i < ( trials.length - 1 ); i++ ) {
			if( trials[i].inkColor == trials[i+1].inkColor ) {
				//console.debug( "Trial " + i + " and " + ( i + 1 ) + " have the same ink color" );
				reshuffle = true;
				
				// Find a new spot for trial[i]
				for( var j = 1; j < ( trials.length - 1 ); j++ ) {
					var p = (j + i + pass) % ( trials.length - 1 ) + 1;
					
					if( trials[p-1].inkColor != trials[i].inkColor && trials[p+1] != trials[i].inkColor &&
					    trials[i-1].inkColor != trials[p].inkColor && trials[i-1] != trials[p].inkColor &&
					    i != p ) {
						var tempTrial = new Trial();
						tempTrial = trials[i];
						trials[i] = trials[p];
						trials[p] = tempTrial;			
						//console.debug( "Found a good spot at " + p );
						break;
					}
				}
			}		
		}
		
		if( reshuffle == false ) {
			break;
		}
	}
	
	return trials;
}






