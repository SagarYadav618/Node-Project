'use strict';

var Book = require('../models/bookModel');

module.exports = function (router) {

    router.get('/', function (req, res) {
        Book.find({}, function (err,doctor) {
            if(err){
                console.log(err);
            }
            doctor.forEach(function (book) {
                book.truncText=book.truncate(100);
            });
            var model={
                doctor: doctor
            };
            res.render('index', model);
        });
    });
};
