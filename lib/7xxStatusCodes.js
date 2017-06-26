var Koa = require('koa');
var statuses = require('statuses');
var merge = require('merge-descriptors');
var codes = require('../config/7xx-status-codes');

module.exports = function developerStatusCodes(moreCodes) {
    var app = new Koa();

    if(moreCodes && typeof moreCodes === 'object' && Object.keys(moreCodes).length){
        codes = Object.assign({},moreCodes,codes);
    }

    if (codes && typeof codes === 'object' && Object.keys(codes).length) {
        var message;
        for (var code in codes) {
            if (!codes.hasOwnProperty(code)) {
                throw new Error('Code doesn\'t exist: ' + code);
            }
            if (!/^[1-9]{1}[0-9]{2}$/.test(code)) {
                throw new Error('Not a three digit numerical code: ' + code);
            }

            message = codes[code].toString();

            statuses[code] = message;
            statuses[message] = statuses[message.toLowerCase()] = code;
        }
    }

    merge(app.response, {
        set status(code) {
            if (typeof statuses[code] !== 'undefined') {
                app.response._explicitStatus = true;
                this.res.statusCode = code;
                this.res.statusMessage = statuses[code];
            } else {
                throw new Error('invalid status code: ' + code);
            }
        },

        get status() {
            return this.res.statusCode;
        }
    });

    return app;
};