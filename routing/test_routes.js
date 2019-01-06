const express = require('express')
const router = express.Router()
module.exports = router


//DIRECT TEST ROUTES:
router.get('/timeline', (req, res) => {
    res.render('timeline')
})

router.get('/data-entry-content', (req, res) => {
    res.render('dataEntry_Content')
})

router.get('/data-entry', (req, res) => {
    res.render('dataEntry')
})

const Models = require(__dirname + '\\..\\data_access\\sequelize').Models

router.get('/orm-test', (req, res) => {
    Models.Portfolio.findAll({ include: [{ all: true, nested: true }] })
        .then((result) => {
            res.send(result)
        })
})

router.get('/orm-test/:id', (req, res) => {
    Models.Portfolio.findAll({
        where: { PortfolioId: req.params.id },
        include: [{
            all: true,
            nested: true,
        }]
    })
        .then((result) => {
            res.send(result)
        })
})




















