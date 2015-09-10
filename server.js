/*
** DEPENDANCIES
*/

var express= require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

/*
**	ROUTER
*/

var app = express();
var port = 8001;

app.get('/', function() {
	
});

app.get('/scrape', function(req, res){

	url = "http://www.indeed.fr/Bordeaux-(33)-Emplois-D%C3%A9veloppeur-Web";
	
	request(url, function(error, response, html){
		if (!error) {
		
			var $ = cheerio.load(html);
			var title;
			var json = {title: ""};
			
			$('#resultsCol').filter(function(){
				var data = $(this);
				
				json.title = data.text();
			});
		
			/*
			** Create a file for writting scrapped datas
			*/
			fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
				console.log('File successfully written!');
			});	
			
		}
	}); //- END OF REQUEST
	
	
	res.send('Check Console!')
});

app.listen(port.toString());
console.log('###\n### Scrapper is ready on port : '+ port +'\n###')
exports = module.exports = app;