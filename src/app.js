const path= require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('postman-request');
//Define path for express configuration 
const publicDirectoryPath = path.join(__dirname ,  '../public')
const partialsDirectoryPath = path.join(__dirname , '../templates/partials')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')

//Setup handlerbar engine and views location
app.set('view engine' , 'hbs')
app.set('views' ,viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('' , (req , res ) => {

    res.render('index', {
        title: "Weather App",
        name: "Farhan Qazi Web-App Developer"
    })
})


app.get('/about' , (req , res) => {
    res.render('about' , {
        title: "About Me",
        name: "Farhan Qazi Web-App Developer"
        
    })
})

app.get('/help', (req , res) => { 
        res.render('help', {
            title:"Help page",
            helpTxt: "in this page you can take any type of help thanks",
            name: 'Farhan Qazi Web-App Developer'
        })

    })
    
    app.get('/products', (req , res) => {
        if(!req.query.search){
            return res.send({
                error: 'please enter any search variable '
            })
        }
        console.log(req.query)
        res.send({
            products: []
        })
    })
    

    



    app.get('/weather', (req , res) => {

       
        if(!req.query.address ){
            return res.send({
                error: 'please provide the address'
            })
        }

        else {
            geoCode.geoCode(req.query.address, (error , {longitude , latitude , location} = {} ) => {
        
              if(error){
                return res.send( {error: error} )
              }
        
                  forecast(longitude , latitude, (error, forecastData) => {
                
                    if(error) {
                        return res.send( {error: error} )
                    }

                    res.send({
                        location: location,
                        forcast: forecastData,
                        address: req.query.address
                    })
        
              })  
            
        })
        
        }
        


       // console.log(req.query)
        
    })

   
    app.get('/help/*' , (req , res) => {
        res.render('404' , {
            title : '404',
            name : 'Farhan Qazi',
            errorMessage: 'Help article not found'
        })
    })

    

app.get('*' , (req , res) => {
    res.render('404' , {
        title : '404',
        name : 'Farhan Qazi',
        errorMessage: 'Page not found'
    })
})















app.listen(3000, () => {
    console.log("server is on port 3000")
})