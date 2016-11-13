console.log('robBot initialized\n');


var topLattitude = '42.745763';
var rightLongitude = '-73.650576';
var bottomLattitude = '42.708057'
var leftLongitude = '-73.701608';
var place = [ leftLongitude, bottomLattitude, rightLongitude, topLattitude ]

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

var stream = T.stream('statuses/filter', { locations: place });

stream.on('tweet',function(tweet){
	var string = tweet.text;
	var count;
		//harassment words
		count = (string.match(/MLH/g) || []).length;

		if(true){
			var name = tweet.user.screen_name;
			var dataString = tweet.user.name + "\n" + tweet.user.screen_name + "\n"
			+ tweet.user.description +"\n"+ tweet.text+"\n\n\n";

			console.log(name + ' <- tweeted -> '+ tweet.text + '\n');

			var fs = require('fs');
			fs.open('data.txt', 'a', 666, function( e, id ) {
				fs.write( id, dataString, null, 'utf8', function(){
					fs.close(id, function(){
					});
				});
		});
		if(count>0)
			tweetIt('-@'+ name +' MLH ftw!');
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
