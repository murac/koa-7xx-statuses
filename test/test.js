var request = require('supertest')
  , koa = require('koa')
  , developerStatuses = require('../lib/7xxStatusCodes');

describe('Koa 7xx Status', function () {
    it('should throw an error if an invalid code has been sent', function (done) {
        try {
            var app = developerStatuses({ '001': 'This is a new code' })
        }catch (e){
            done();
        }
    });

    it('should ignore any invalid data in the codes param', function (done) {
            var app = developerStatuses("This is a non Object");

            app.use(async function (ctx,next) {
                try {
                    await next()
                } catch (err) {
                    console.error(err.stack)
                }
            });

            app.use(async function (ctx) {
                ctx.status = 200;
            });

            request(app.listen()).get('/').end(function(err, res){
                res.statusCode.should.equal(200);
                done();
            });

    });

    it('should throw back the new custom code and message on use of the new status', function (done) {
        var app = developerStatuses({
            '801': 'Code Series 8'
        });

        app.use(async function (ctx, next) {
            try {
                await next()
            } catch (err) {
                console.error(err.stack)
            }
        });

        app.use(async function (ctx) {
            ctx.status = 801;
        });

        request(app.listen()).get('/').end(function(err, res){
            res.statusCode.should.equal(801);
            res.text.should.equal('Code Series 8');
            done();
        });
    });

    it('should overwite the status Message for an existing code', function (done) {
        var app = developerStatuses({
            '200': 'Say Whaaaattt!!'
        });

        app.use(async function (ctx,next) {
            try {
                await next()
            } catch (err) {
                console.error(err.stack)
            }
        });

        app.use(async function (ctx) {
            ctx.status = 200;
        });

        request(app.listen()).get('/').end(function(err, res){
            res.statusCode.should.equal(200);
            res.text.should.equal('Say Whaaaattt!!');
            done();
        });
    });

    it('should throw an error if the code does not exist in statuses', function (done) {
        var app = developerStatuses({
            '200': 'Say Whaaaattt!!',
            '801': 'Code Series 8',
            '802': 'Code Series 8',
            '803': 'Code Series 8',
            '804': 'Code Series 8',
            '805': 'Code Series 8'
        });

        app.use(async function (ctx,next) {
            try {
                await next()
            } catch (err) {
                if(err.message.indexOf("invalid status code:") > -1){
                    done()
                }else{
                    console.error(err.stack);
                }
            }
        });

        app.use(async function (ctx) {
            ctx.status = 810;
        });

        request(app.listen()).get('/').end();
    });
});
