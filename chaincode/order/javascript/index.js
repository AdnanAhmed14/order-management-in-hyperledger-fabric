'use strict';
const Order = require('./ordermanagement');
const Invoice = require('./invoice')
module.exports.Order = {
    Order,
    Invoice
};
module.exports.contracts = [ Order, Invoice ];
