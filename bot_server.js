const { Bot } = require('./bot')
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
var bot = new Bot()

app.use(bodyParser.json())

app.get('/initialize', function (req, res) {
  bot.initialize()
  res.send('ok')
});

app.get('/tick', function (req, res) {
  var sensors = req.body

  res.send(bot.tick(sensors))
});

app.listen(3001, function () {
});
