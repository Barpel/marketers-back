'use strict';
const marketerService = require('../services/marketer-service');
const BASE_URL = '/api/marketer';

function addMarketerRoutes(app) {
    //marketer list
    app.get(`${BASE_URL}`, (req, res) => {
        marketerService.query()
            .then(marketers => res.json(marketers));
    });
    //single marketer - email
    app.get(`${BASE_URL}/email/:email`, (req, res) => {
        const { email } = req.params;
        marketerService.getByEmail(email)
            .then(marketer => res.json(marketer))
    });

    //single marketer by id
    app.get(`${BASE_URL}/id/:marketerId`, (req, res) => {
        const marketerId = req.params.marketerId;
        marketerService.getById(marketerId)
            .then(marketer => res.json(marketer));
    });

    //add marketer
    app.post(BASE_URL, (req, res) => {
        const marketer = req.body;
        console.log('marketer', marketer)
        marketerService.getByEmail(marketer.email)
            .then(returnedMarketer => {

                if (!returnedMarketer) {
                    marketerService.addMarketer(marketer)
                        .then(savedMarketer => res.json(savedMarketer));
                };
            });
    });

    //update marketer
    app.put(`${BASE_URL}/:marketerId`, (req, res) => {
        const marketerData = req.body;
        marketerService.update(marketerData)
            .then(marketer => res.json(marketer));
    });

    app.delete(`${BASE_URL}/:marketerId`, (req, res) => {
        const marketerId = req.params.marketerId;
        marketerService.remove(marketerId)
            .then(_ => res.end(`Marketer ${marketerId} was deleted`));
    })

};

module.exports = addMarketerRoutes;