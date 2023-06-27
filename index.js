require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const API_KEY=process.env.API_KEY
const fetch=require('node-fetch')
const PORT=process.env.PORT
const app=express()

const city='Ankara'
module.exports=city
//`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=London&aqi=no`

//template engine
app.set("view engine","ejs")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async (req,res)=>{
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,{
        method:'GET',
        headers:{
            accept:'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{
        const country=json.sys.country
        const city_name=json.name
        const temp_c=Math.floor(json.main.temp-273.15) 
        const wind_mph=json.wind.speed
        const humidity=json.main.humidity
        const condition=json.weather[0].main
        
        console.log(condition)
        console.log(json)
        res.render('home',{
            country,
            city_name,
            wind_mph,
            humidity,
            temp_c,
            condition,
            
        })
        
    })
    .catch(err=>console.log(err))
})
app.post('/', async (req,res)=>{   
        const city= req.body.city_name
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,{
        method:'GET',
        headers:{
            accept:'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{
        try{
        const country=json.sys.country
        const city_name=json.name
        const temp_c=Math.floor(json.main.temp-273.15) 
        const wind_mph=json.wind.speed
        const humidity=json.main.humidity
        const condition=json.weather[0].main
        
        console.log(condition)
        console.log(json)
        res.render('home',{
            country,
            city_name,
            wind_mph,
            humidity,
            temp_c,
            condition,
            
        })
        }catch(err){
           res.render('home',{
            country:null,
            city_name:null,
            wind_mph:null,
            humidity:null,
            temp_c:null,
            condition:null,
            
        })
        }
        
        
    })
    .catch(err=>console.log(err))

    
   
})



app.listen(PORT,()=>{
    console.log(`server started on ${PORT} port`)
})
