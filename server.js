const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view emgine', 'hbs')
// app.use(express.static(__dirname + '/public')) // localhost:3000/help.html

app.use((req, res, next) => {
	var now = new Date().toString()
	var log = `${now}: ${req.method} ${req.url}`
	fs.appendFile(`server.log`, log + '\n', (err) => {
		if(err){
			console.log('unable to append to server.log');
		}
	})
	next()
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// })


hbs.registerHelper(`getCurrentYear`, () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	// console.log(text);
	return text.toUpperCase()
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'home Page',
		welcommessage: 'Welcom to Dana web'
	})
})
app.get('/about',(req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	})
})

app.get('/bad',(req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	})
})

app.listen(port, () => {
	console.log(`server is up on port ${port}`);
})