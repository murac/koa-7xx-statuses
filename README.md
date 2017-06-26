# Koa Custom Statuses

[![NPM version][npm-image]][npm-url]
[![iojs version][iojs-image]][iojs-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/koa-7xx-statuses.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-7xx-statuses
[iojs-image]: https://img.shields.io/badge/io.js-%3E=_1.0-yellow.svg?style=flat-square
[iojs-url]: http://iojs.org/
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/koa-7xx-statuses.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-7xx-statuses

Koa has a defined set of HTTP response codes that can be retured in a request.
While they are shandard HTTP codes and will be enough most of the time,
Sometimes, there is a need for creating custom codes.
This module enables you to achieve just that declaring the additional codes you require in the very beginning.
It also enables you to change the status message of existing status codes.

The module definition is extremely simple. Just mount the module onto the app and provide additional codes if you wish.

```js

const Koa = require('koa');
const mount = require('koa-mount');
const k7xxStatuses = require('koa-7xx-statuses');
const app = new Koa()


// Cause you feel like it
optionalCodes = {
                    '200': 'Im Loving it!!',
                    '499': 'Cos I can come that close to 500',
                    '999': 'Polish Programmer'
                };

const developerStatusCodes = new k7xxStatuses(optionalCodes);

app.use(mount(developerStatusCodes));

app.use(async (ctx, next) => {
        await next();
        ctx.status = 700;
});

```

There are just some basics you need to keep in mind for OPTIONALLY ADDED codes:

- The status codes can be 3 digit numbers only.
- The codes you declare will overwrite the Koa Defaults.
- You can only use default Koa codes or the codes defined in the module. Any others will throw an error

## License

[MIT](LICENSE)
