const path = require('path');
const express = require('express');
const hbs = require ('hbs');

const geocode = require ('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zhenia Nazarov'
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Zhenia Nazarov'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful text.',
        name: 'Zhenia Nazarov'
    })
});

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location,
                addres: req.query.address
            });

        })
    })

});

app.get('/products', (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send( {
        product: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404 Help',
        name: 'Zhenia Nazarov',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Zhenia Nazarov',
        errorMessage: 'Page was not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
});