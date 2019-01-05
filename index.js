// Express
const express = require('express');
const app = express();
// Routers
const indexRouter = require('./routers/index.router.js');
const funcRouter = require('./routers/func.router.js');
const procedure = require('./routers/procedure.router.js');
// Body parser
const bodyParser = require('body-parser');
// Short id
const shortId = require('shortid');
// Cookies parser
const cookieParser = require('cookie-parser');

// Set Pug modules	
app.set('view engine', 'pug');
app.set('views', './views/');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')) // Send static file
app.use(cookieParser(shortId.generate())); // Using cookie

app.use('/', indexRouter); // Index get
app.use('/procedure', procedure)
app.use('/func', funcRouter) // Func get

app.listen(7777, function() {
	console.log('Server is listening on port 7777');
})