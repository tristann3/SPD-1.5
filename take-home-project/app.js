// Require Libraries
const express = require('express')
const exphbs = require('express-handlebars')

// App Setup
const app = express()
app.use(express.static('public'))

// Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Routes
app.get('/', (req, res) => {
  const request = require('request');
  request("https://api.openweathermap.org/data/2.5/onecall?lat=37.7749&lon=122.4194&exclude=hourly,minutely,alerts,current&appid=3c6f33e8d54ce7d32758431a919a8a2c", function (error, response, body) {
    content = JSON.parse(body)
    let daily = []
    var x = 0
    for (x=0; x < content["daily"].length; x++) {
      daily.push(content["daily"][x]["weather"][0]["main"])
    }
    console.log(daily)
    res.render('home', {daily})
  });


})

// Start Server
app.listen(3000, () => {
  console.log('Server listening on port localhost:3000!')
})
