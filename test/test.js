var request = require('supertest')
  , koa = require('koa')
  , customStatuses = require('../lib/7xxStatusCodes');

describe('Koa Custom Status', function () {
    it('should throw an error if an invalid code has been sent', function (done) {
        try {
            var app = customStatuses(koa(), { '001': 'This is a new code' })
        }catch (e){
            done();
        }
    });

    it('should throw an error if valid app instance of Koa not passed', function (done) {
        try {
            var app = customStatuses('Word!!')
        }catch (e){
            done();
        }

    });

    it('should ignore any invalid data in the codes param', function (done) {
            var app = customStatuses(koa(), "This is a non Object")

            app.use(function* (next) {
                try {
                    yield* next
                } catch (err) {
                    console.error(err.stack)
                }
            });

            app.use(function* () {
                this.status = 200;
            });

            request(app.listen()).get('/').end(function(err, res){
                res.statusCode.should.equal(200);
                done();
            });

    });

    it('should throw back the new custom code and message on use of the new status', function (done) {
        var app = customStatuses(koa(), {
            '701': 'Code Series 7'
        });

        app.use(function* (next) {
            try {
                yield* next
            } catch (err) {
                console.error(err.stack)
            }
        });

        app.use(function* () {
            this.status = 701;
        });

        request(app.listen()).get('/').end(function(err, res){
            res.statusCode.should.equal(701);
            res.text.should.equal('Code Series 7');
            done();
        });
    });

    it('should overwite the status Message for an existing code', function (done) {
        var app = customStatuses(koa(), {
            '200': 'Say Whaaaattt!!'
        });

        app.use(function* (next) {
            try {
                yield* next
            } catch (err) {
                console.error(err.stack)
            }
        });

        app.use(function* () {
            this.status = 200;
        });

        request(app.listen()).get('/').end(function(err, res){
            res.statusCode.should.equal(200);
            res.text.should.equal('Say Whaaaattt!!');
            done();
        });
    });

    it('should throw an error if the code does not exist in statuses', function (done) {
        var app = customStatuses(koa(), {
            '200': 'Say Whaaaattt!!',
            '701': 'Code Series 7',
            '702': 'Code Series 7',
            '703': 'Code Series 7',
            '704': 'Code Series 7',
            '705': 'Code Series 7',
        });

        app.use(function* (next) {
            try {
                yield* next
            } catch (err) {
                if(err.message.indexOf("invalid status code:") > -1){
                    done()
                }else{
                    console.error(err.stack);
                }
            }
        });

        app.use(function* () {
            this.status = 710;
        });

        request(app.listen()).get('/').end();
    });
});
