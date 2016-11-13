console.log('robBot initialized\n');
//box is created with top-right and bottom-left coordinates
var topLattitude = '42.745763';
var rightLongitude = '-73.650576';

var bottomLattitude = '42.708057'
var leftLongitude = '-73.701608';

var place = [ leftLongitude, bottomLattitude, rightLongitude, topLattitude ]
console.log("Location initialized to " + place);

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('statuses/filter', { locations: place });

stream.on('tweet',function(tweet){
	var string = tweet.text;
	var count;
		//harassment words, add more in the same fashion
		count = (string.match(/fuck/g) || []).length;
		count += (string.match(/faggot/g) || []).length;
		count += (string.match(/damn/g) || []).length;
		count += (string.match(/shit/g) || []).length;
		count += (string.match(/cunt/g) || []).length;
		count += (string.match(/asshole/g) || []).length;
		count += (string.match(/motherfuck/g) || []).length;
		count += (string.match(/fat/g) || []).length;
		count += (string.match(/gay/g) || []).length;
		count += (string.match(/douche/g) || []).length;
		count += (string.match(/twat/g) || []).length;
		count += (string.match(/cock/g) || []).length;
		count += (string.match(/dick/g) || []).length;
		count += (string.match(/pussy/g) || []).length;
		count += (string.match(/suck/g) || []).length;

		//set trigger number of harassment words
		if(count>2){

			var name = tweet.user.screen_name;
			var dataString = tweet.user.name + "\n" + tweet.user.screen_name + "\n"
			+ tweet.user.description +"\n"+ tweet.text+"\n\n\n";

			console.log(name);

			var fs = require('fs');
			fs.open('realBotData.txt', 'a', 666, function( e, id ) {
				fs.write( id, tweet, null, 'utf8', function(){
					fs.close(id, function(){
					});
				});
			});
			tweetIt('-@'+ name +' , this comment has been marked as offensive and has been recorded');
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
