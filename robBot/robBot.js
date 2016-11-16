console.log('robBot initialized\n');
//box to restrict tweets by location data
//box is created with top-right and bottom-left geographical coordinates
var topLattitude = '44';
var rightLongitude = '-72';

var bottomLattitude = '40'
var leftLongitude = '-74';
//coordinates currently set to albany
var Albany = [ leftLongitude, bottomLattitude, rightLongitude, topLattitude ]
console.log("Location initialized to " + Albany);

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('statuses/filter', { locations: Albany });

stream.on('tweet',function(tweet){
	var string = tweet.text;
	var count;
		//words have weights from 1-3
		//harassment words, add more in the same fashion
		count = (string.match(/fuck/g) || []).length*2;
		count += (string.match(/faggot/g) || []).length*3;
		count += (string.match(/damn/g) || []).length;
		count += (string.match(/shit/g) || []).length;
		count += (string.match(/cunt/g) || []).length*3;
		count += (string.match(/asshole/g) || []).length*3;
		count += (string.match(/motherfuck/g) || []).length*2;
		count += (string.match(/fat/g) || []).length;
		count += (string.match(/gay/g) || []).length;
		count += (string.match(/douche/g) || []).length*2;
		count += (string.match(/twat/g) || []).length;
		count += (string.match(/cock/g) || []).length;
		count += (string.match(/dick/g) || []).length;
		count += (string.match(/pussy/g) || []).length;
		count += (string.match(/suck/g) || []).length;
		count += (string.match(/nigg/g) || []).length*3;

		//set threshold number of harassment words
		if(count>3){

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
			//tweets back with the following message
			tweetIt('-@'+ name +' , this comment has been marked as offensive and has been recorded');
		}
});

//tweet function
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
