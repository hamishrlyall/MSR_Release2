const express = require('express')
const router = express.Router()
module.exports = router

//PUBLIC DIRECT ROUTES:
router.get('/', (req, res) => {res.render('index')})

router.get('/about', (req, res) => {res.render('about')})

router.get('/contact', (req, res) => {res.render('contact')})

router.get('/login', (req, res) => {res.render('login')})

router.get('/slideshow', (req, res) => {res.render('slideshow')})

router.get('/privacy', (req, res) => {res.render('privacy')})

//PUBLIC CONTROLLER ROUTES:
router.get('/portfolio', require(__dirname + '\\controllers\\list_portfolios'))

router.get('/portfolio/:id', require(__dirname + '\\controllers\\portfolio_id'))

router.get('/search', require(__dirname + '\\controllers\\search'))