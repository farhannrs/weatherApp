
const request = require('postman-request')

const forecast = (latitude , longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f68b1ce438df3c0a899ba52aa3a7e868&query='+longitude+','+latitude+'&units=m'
    
    request({ url , json: true } , (error , {body} = {} ) => {

    if (error)
    {
        callback("connection failed check your network connection ", undefined)

    }else if (body.error)
    {
        callback("can't find latitude or lnagtitude ", undefined)
    }else {
        callback( undefined , body.current.weather_descriptions[0] + " It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out.")
    }   
})
}




module.exports = forecast

