"use strict";

var $ = require('jquery'),
    code = require('./getter'),
    dom = require('./domBuilder'),
    codeData = code()

function getCurrentWeather(zip){
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${codeData.key}`
    }).done(function(data){
      resolve(data)
      console.log(data)
    })
  })
}

function getThreeDay(zip){
  return new Promise(function(resolve, reject){
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},us&APPID=${codeData.key}`
  }).done(function(data){
    resolve(data)
    console.log(data)
  })
  })
}

$('#today_weather, #tomorrow_weather, #dayAfterWeather').hide()

$('#current').on('click', function(){
  $('#current').addClass('active')
  $('#three_day').removeClass('active')
  $('#daily').removeClass('active')

  $('#weather_current').show()
  $('#day3').hide()
  $('#day').hide()

  $('#today_weather, #tomorrow_weather, #dayAfterWeather').hide()
})

$('#three_day').on('click', function(){
  $('#three_day').addClass('active')
  $('#current').removeClass('active')
  $('#daily').removeClass('active')

  $('#weather_current').hide()
  $('#day3').show()
  $('#day').hide()

  $('#today_weather, #tomorrow_weather, #dayAfterWeather').show()
})

$('#daily').on('click', function(){
  $('#daily').addClass('active')
  $('#current').removeClass('active')
  $('#three_day').removeClass('active')

  $('#weather_current').hide()
  $('#day3').hide()
  $('#day').show()

  $('#today_weather, #tomorrow_weather, #dayAfterWeather').hide()
})

$('#getWeather').on('click', function(){
  if($('#current').hasClass('active')){
    getCurrentWeather($('#zip').val())
      .then(function(current_weather){
        dom.addDailyToDom(current_weather)
      })
  }
  else if($('#three_day').hasClass('active')){
    getThreeDay($('#zip').val())
      .then(function(three_day){
        dom.addThreeToDom(three_day)
      })
  }
})
