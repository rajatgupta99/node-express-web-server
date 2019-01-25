const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = (process.env.PORT) ? process.env.PORT : 3000;
var app = express();

app.listen(port, () =>  {
  console.log('Express server running on port: '+port);
});

// 1. Serving pages using a view engine
app.set('view engine', 'hbs');

// 2. Serving Static Directory (Middleware)
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)  =>  {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('./log/server.log', log + '\n', (err)  =>  {
      (err) ? console.log('Error logging the request!')  : '';
  });
  next();
});

app.use((req, res, next)  =>  {
    res.render('maintenance.hbs');
});

// Registering Partials
hbs.registerPartials(__dirname + '/views/partials');

// Registering Helpers
hbs.registerHelper('getCurrentYear', () =>  {
    return new Date().getFullYear();
});

hbs.registerHelper('toUpperCase', (text)  =>  {
    return text.toUpperCase();
})

app.get('/', (req, res) =>  {
    res.render('home.hbs', {
      pageTitle : 'Home Page',
      pageMessage : 'Welcome to Home Page!'
    });
});

app.get('/about', (req, res) =>  {
    res.render('about.hbs', {
      pageTitle : 'About Page',
      pageMessage : 'Welcome to About Page!'
    });
});

app.get('/bad', (req, res)  =>  {
    res.send({
      errorMessage : 'Unable to handle request'
    });
});
