"use strict";
var $ = require('jquery')

var town = $('#town');
var description = $('#description')
var temp = $('#temp')
var humidity = $('#humidity')
var weather_pic = $('#weather_pic')
var wind_speed = $('#wind_speed')

function addDailyToDom(data){
  var currentCondition = data.weather[0].main

  town.html(data.name)
  description.html(`Conditions: ${data.weather[0].main}`)
  temp.html(`Temperature: ${convertToF(data.main.temp)}`)
  humidity.html(`Humidity: ${data.main.humidity}%`)
  wind_speed.html(`Wind: ${data.wind.speed} MPH`)
  weather_pic.attr('src', selectImg(currentCondition))
}

function addThreeToDom(data){
  var today = $('#today_weather'),
      tomorrow = $('#tomorrow_weather'),
      dayAfter = $('#dayAfterWeather')

  var today_condition = data.list[0].weather[0].main
  var tomorrow_condition = data.list[1].weather[0].main
  var dayAfter_condition = data.list[2].weather[0].main

  var today_img = `<img class='condition_image' id='today_img' src='${selectImg(today_condition)}'>`
  var date = `<br><p class='date' id='today'>${new Date()}</p>`
  var currentDay = `<p class='conditions' id='today_conditions'>Conditions: ${data.list[0].weather[0].main}<p>`
  var temperature = `<p class='temp' id='today_temp'>Temperature: ${convertToF(data.list[0].temp.day)}</p>`
  var humidity = `<p class='humid' id='humid'>Humidity: ${data.list[0].humidity}%</p>`
  var today_wind = `<p class='today_wind' id='today_wind'>Wind: ${data.list[0].speed} MPH</p>`
  today.html(today_img + date + currentDay + temperature + humidity + today_wind)

  var tomorrow_img = `<img class='condition_image' id='tomorrow_img' src='${selectImg(tomorrow_condition)}'>`
  var tomorrow_date = `<br><p class='tomorrow_date' id='tomorrow_date'>${new Date()}</p>`
  var tomorrow_conditions = `<p class='tomorrow_conditions' id='tomorrow_conditions'>Conditions: ${data.list[1].weather[0].main}<p>`
  var tomorrow_temperature = `<p class='tomorrow_temp' id='tomorrow_temp'>Temperature: ${convertToF(data.list[1].temp.day)}</p>`
  var tomorrow_humidity = `<p class='tomorrow_humid' id='tomorrow_humid'>Humidity: ${data.list[1].humidity}%</p>`
  var tomorrow_wind = `<p class='tomorrow_wind' id='tomorrow_wind'>Wind: ${data.list[1].speed} MPH</p>`
  tomorrow.html(tomorrow_img + tomorrow_date + tomorrow_conditions + tomorrow_temperature + tomorrow_humidity + tomorrow_wind)

  var dayAfter_img = `<img class='condition_image' id='dayAFter_img' src='${selectImg(dayAfter_condition)}'>`
  var dayAfter_date = `<br><p class='dayAfter_date' id='dayAfter_date'>${new Date()}</p>`
  var dayAfter_conditions = `<p class='dayAfter_conditions' id='dayAfter_conditions'>Conditions: ${data.list[2].weather[0].main}<p>`
  var dayAfter_temperature = `<p class='dayAfter_temp' id='dayAfter_temp'>Temperature: ${convertToF(data.list[2].temp.day)}</p>`
  var dayAfter_humidity = `<p class='dayAfter_humid' id='dayAfter_humid'>Humidity: ${data.list[2].humidity}%</p>`
  var dayAfter_wind = `<p class='dayAfter_wind' id='dayAfter_wind'>Wind: ${data.list[2].speed} MPH</p>`
  dayAfter.html(dayAfter_img + dayAfter_date + dayAfter_conditions + dayAfter_temperature + dayAfter_humidity + dayAfter_wind)
}

function convertToF(temp){
  var fahrenheit = 1.8 * (temp - 273) + 32
  fahrenheit = fahrenheit.toFixed(0)
  return fahrenheit
}

function selectImg(condition){
  if(condition === 'Clear'){
    return 'pics/clear.jpg'
  }
  else if(condition === 'Clouds' || condition === 'few clouds'){
    return 'pics/partly.jpg'
  }
  else if(condition === 'Rain'){
    return 'pics/rain.jpg'
  }
  else if(condition === 'Storms'){
    return 'pics/storms.jpg'
  }

}

module.exports = {addDailyToDom, addThreeToDom}
