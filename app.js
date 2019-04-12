const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:startup');

// Routes
const genres = require('./routes/genres');
const home = require('./routes/home');

const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const auth = require('./auth');
const express = require('express')
const app = express();

mongoose.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDb...'))
	.catch((err) => console.log('Cannot connect of MongoDb')); 

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/api/genres', genres);
app.use(home);
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

if(app.get('env') === 'development') {
	app.use(morgan('tiny'));
	debug('Morgan enabled');
}
// DB work
debug('Connected to the database...');


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(logger);

app.use(auth);
app.use(helmet());

const port = process.env.PORT || 3000 ;

app.listen(port, () => console.log(`Listening on port ${port}...`));