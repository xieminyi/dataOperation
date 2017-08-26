const express = require("express"),
    bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.all('/*', (req, res, next) => { // Enable Cross Origin Resource Sharing

	//CORS headers
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	// Set custom headers for CORS
	res.header("Access-Control-Allow-Headers", "Content-type,Accpet,X-Access-Token,X-key");
	if(req.method == "OPTIONS"){
		res.status(200).end();
	}
	else{
		next();
	}
});

app.use('/', require('./routes')); // The list of routes for our application.

// If no route is matched by now, it must be a 400
app.use((err, req, res, next) => {
  	res.status(400);
  	res.setHeader('Content-Type', 'application/json');
  	res.send(JSON.stringify({
    	error:'Could not decode request: JSON parsing failed'
  	}, null, 3));
});

// Start the server
app.set('port', process.env.PORT || 3000);
 
const server = app.listen(app.get('port'), () => { // Start the server
  console.log('Server starts');
});

module.exports = app; // for testing