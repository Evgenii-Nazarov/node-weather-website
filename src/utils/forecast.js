const request = require ('request');

const forecast = (longitude,latitude,callback) => {

    const url = 'https://api.darksky.net/forecast/4e5034c5610f2ee9437a7f6f56f77a3f/'+longitude+','+latitude+'';
    request({ url , json: true}, (error,{body})=>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is '+ body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
};

module.exports = forecast;
