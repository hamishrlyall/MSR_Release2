const Async = require('async')
const Sequelize = require(__basedir + '\\data_access\\sequelize')
const Op = require('sequelize').Op;
const Models = Sequelize.Models
const DB = Sequelize.DB

module.exports = (req, res) => {
    var params = {
        name: req.query.name || '',
        place: req.query.place || '',
        regNum: req.query.regNum || '',
        battalion: req.query.battalion || ''
    }
    //FIRST
    Async.parallel({
        aif: (callback) => { aif_search(params, (err, results) => { callback(err, results) })},
        msr: (callback) => { msr_search(params, (results) => { callback(null, results) })}
    },
        (err, results1) => {

        if (err) throw err
        //SECOND
        Async.parallel({
            msrGeoCodes: (callback) => { geocode_results(results1.msr, (geoCodes) => { callback(err, geoCodes) }) },
            aifGeoCodes: (callback) => { geocode_results(results1.aif, (geoCodes) => { callback(err, geoCodes) }) },
            multimedia: (callback) => { get_multimedia(results1.msr, (pictures) => { callback(err, pictures) }) }
        },
        (err, results2) => {
            if (err) throw err

            //res.send(results2.aifGeoCodes)

            res.render('search', { params: params, aif_results: results1.aif, msr_results: results1.msr, msrGeoCodes: results2.msrGeoCodes, aifGeoCodes: results2.aifGeoCodes, multimedia: results2.multimedia })
        })
    })
}

let msr_search = (params, callback) => {

    //remove whitespace
    var nameParam = params.name.trim()
    //remove quotes
    nameParam = nameParam.replace(/['"]+/g, '');
    //add 'OR' inbetween words
    nameParam = nameParam.replace(/\s/g, " OR ");

    if ((nameParam + params.place + params.regNum + params.battalion).trim() == '') {
        callback([])
    } else {

        var query = 'SELECT * FROM Portfolio WHERE 1=1'

        if (nameParam != '') {
            query += ` AND CONTAINS(firstName,'${nameParam}')`;
            query += ` OR CONTAINS(lastName,'${nameParam}')`;
            query += ` OR CONTAINS(otherName,'${nameParam}')`;
            query += ` OR CONTAINS(alias,'${nameParam}')`;
        }
        query += params.place != "" ? ` AND UPPER(Address) LIKE '%${params.place.trim().toUpperCase()}%'` : ''
        query += params.regNum != "" ? ` AND UPPER(regimentNo) LIKE '${params.regNum.trim().toUpperCase()}'` : ''
        query += params.battalion != "" ? ` AND UPPER(Battalion) LIKE '%${params.battalion.trim().toUpperCase()}%'` : ''

        DB.query(query, { model: Models.Portfolio })
            .then((msr_results) => {
                //console.log("MSR: " + msr_results)
                callback(msr_results)
            })
    }
}

let aif_search = function (params, callback) {

    const request = require('request')
    const cheerio = require('cheerio')
    const baseAddress = 'https://www.aif.adfa.edu.au'
    const pageSize = 50;
    params.page = params.page != '' ? params.page : 1

    var url = baseAddress + `/search?type=search&name=${params.name}&regNum=${params.regNum}&place=${params.place}&townOnly=y&start=${params.page * pageSize}&pageSize=${pageSize}`
    //console.log('searching AIF for: ' + JSON.stringify(params) + ' @ ' + url)
    var listings = []
    request(url, (err, res, body) => {
        if(err){
            return callback(err, null)
        } else {
            var $ = cheerio.load(body)
            $('tr').each((index, element) => {
                if ($('tr').length-1 != index) {

                    var regNum = element.childNodes[1].firstChild
                    var name = element.childNodes[2].firstChild
                    var place = element.childNodes[3].firstChild
                    var battalion = element.childNodes[4].firstChild
                    var href = ''

                    if (regNum !== null) regNum = regNum
                    if (name !== null) name = name
                    if (place !== null) place = place
                    if (battalion !== null) battalion = battalion.firstChild

                    if (regNum !== null) regNum = regNum.data
                    if (name !== null) {
                        href = baseAddress + name.attribs.href
                        name = name.firstChild.data
                    }
                    if (place !== null) place = place.data
                    if (battalion !== null) battalion = battalion.data                
                    
                    listings.push({
                        regNum : regNum,
                        name : name,
                        address : place,
                        battalion : battalion,
                        href: href
                    })
                }
            })
            //console.log(listings)
            return callback(null, listings)
        }
    })
}

let geocode_results = (results, callback) => {

    var geocoder = require('google-geocoder');
    var geo = geocoder({
        key: 'AIzaSyCnMPnfHJVK--hem_SCkY5litS3iodzjZQ'
    });

    var geoCodes = []

    Async.forEachOf(results, (result, index, callback) => {

        geo.find(result.address, (err, res) => {
            if (err) {

            } else {
                geoCodes[index] = res[0] != null ? [res[0].location.lat, res[0].location.lng] : null
            }
            callback()
        });
    }, (err) => {
        if (err) throw err

        callback(geoCodes)
    });
}

let get_multimedia = (results, callback) => {

    PortfolioIds = results.map(m => m.dataValues.PortfolioId)
    //console.log(PortfolioIds)

    Models.Portfolio.findAll({
        attributes: ['PortfolioId', 'MultimediaId'],
        where: {
            PortfolioId: {
                [Op.in]: PortfolioIds
            }
        },
        include: ['Multimedia']
    }).then((portfolios) => {
        callback(portfolios)
    })

}