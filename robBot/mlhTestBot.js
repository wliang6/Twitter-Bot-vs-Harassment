console.log('robBot initialized\n');


var topLattitude = '44';
var rightLongitude = '-70';
var bottomLattitude = '40'
var leftLongitude = '-74';
var place = [ leftLongitude, bottomLattitude, rightLongitude, topLattitude ]

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('statuses/filter', { locations: place });

stream.on('tweet',function(tweet){
	var string = tweet.text;
	var count;
		//keyword, In this case it is banana.
		
		count = (string.match(/Banana/g) || []).length;
		//add more keywords with
		//count += (string.match(/Apples/g) || []).length;
		
		//always outputs tweet to command line and saves it to 
		if(true){
			var name = tweet.user.screen_name;
			var dataString = tweet.user.name + "\n" + tweet.user.screen_name + "\n"
			+ tweet.user.description +"\n"+ tweet.text+"\n\n\n";

			console.log(name + ' <- tweeted -> '+ tweet.text + '\n');

			var fs = require('fs');
			fs.open('data.txt', 'a', 666, function( e, id ) {
				fs.write( id, dataString, null, 'utf8', function(){
					fs.close(id, function(){});
				});
		});
		if(count>0)
			tweetIt('-@'+ name +' just got ROB-BOTED!');
		}
});


function tweetIt(txt){
	var tweet = {
		status: txt
	}
	T.post('statuses/update',tweet,tweeted);

	function tweeted(err, data, response){
		if(err){
			console.log("something went wrong");
		}
		else{
			console.log("it worked");
		}
	}
}
