const request = require('postman-request')


const geoCode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZmFyaGFubnJzIiwiYSI6ImNrYmFkMTVjYzBtdGsyeXBoa3pidzJ5eGEifQ.9GEgCe1154xpllb2lKG3kA'
    
    request({url : url , json: true} , (error, {body} = {}) => {
        if (error) {
    
            callback("can't connect to the internet", undefined)
    
        } else if (body.features.length === 0){
    
            callback('undefine location or city' , undefined)
    
        }else {
            
            callback(undefined, {

                latitude: body.features[0].center[1] ,
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}



module.exports = {
    geoCode: geoCode
}