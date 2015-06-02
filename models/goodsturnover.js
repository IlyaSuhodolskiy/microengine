var mongoose = require('../components/mongoose/'),
    async = require('async'),
    HttpMessage = require('../components/error/').HttpMessage;

var Goods = require('./goods.js').Goods,
    Providers = require('./providers.js').Providers,
    Users = require('./users.js').Users;

var Schema = mongoose.Schema,
    GoodsTurnover = new Schema({
        goods: [{ 
            type: String,
            required: true
        }],
        type: {
            type: Number,
            required: true
        },
        doc: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        sum: {
            type: Number,
            required: true
        },
        _provider: [{
            type: Schema.Types.ObjectId, 
            ref: 'Providers'
        }],
        comment: {
            type: String
        },
        _creator: [{
            type: Schema.Types.ObjectId, 
            ref: 'Users',
            required: true
        }]
    });

// Statics
    GoodsTurnover.statics.sale = function(body, creator, callback) {
        var GoodsTurnover = this,
            turnover = new GoodsTurnover({goods: body.id, type: body.type, doc: body.doc, qty: body.qty, price: body.price, sum: body.sum, comment: body.comment, _creator: creator});

        turnover.save(function(err){
            if(err) return err;
            callback(null);
        });
    };

    GoodsTurnover.statics.new = function(body, creator, callback) {
        var GoodsTurnover = this,
            sum = (Math.round(Number(body.purchaseprice)*Number(body.qty))).toFixed(0),
            turnover = new GoodsTurnover({goods: body.id, type: body.type, doc: body.doc, _provider: body.provider, qty: body.qty, price: body.purchaseprice, sum: sum, comment: body.comment, _creator: creator});

        turnover.save(function(err){
            if(err) return err;
            callback(null);
        });
    };


// Exports

    exports.GoodsTurnover = mongoose.model('GoodsTurnover', GoodsTurnover);