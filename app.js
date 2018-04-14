'use strict'

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var routes = require('./routes')
var requestIp = require('request-ip')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

app.use(requestIp.mw())

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

module.exports = app
