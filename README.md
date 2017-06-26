# Koa Custom Statuses

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/koa-7xx-statuses.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-7xx-statuses
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/koa-7xx-statuses.svg?style=flat-square
[download-url]: https://npmjs.org/package/koa-7xx-statuses

Are your koajs REST APIs just not ‘expressive’ enough? Do you spend your days wishing you could be truly transparent in how you represent failed HTTP calls to your consumers? Well, now you can! With `koa-7xx-statuses`! 

Leverage some of those good old standbys such as: 

- 735: Fucking IE
- 745: I don’t always test my code, but when I do, I do it in production
- 747: Motherfucking Snakes on the Motherfucking Plane!
- 799: The End of the World

…and many, many more!

(Full list can be found @ [RFC for the 7XX Range of HTTP Status codes - Developer Errors](https://github.com/joho/7XX-rfc))

The module definition is extremely simple. Just mount the module onto the app using `koa-mount` and provide additional codes as a JSON object if you wish.

Most credit goes to [Srinivas Iyer](https://github.com/srinivasiyer/) who originally wrote the fantastic package called [koa-custom-statuses](https://github.com/srinivasiyer/koa-custom-statuses) which i simply improved upon. Thank you Srini!
```js

const Koa = require('koa');
const mount = require('koa-mount');
const k7xxStatuses = require('koa-7xx-statuses');
const app = new Koa()

const developerStatusCodes = new k7xxStatuses();
app.use(mount(developerStatusCodes));

app.use(async (ctx, next) => {
        await next();
        ctx.status = 799;
});

```

Of course, if you wish to overwrite, or add your own status codes, just provide them as an argument:

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
```
There are just some basics you need to keep in mind for OPTIONALLY ADDED codes:

- The status codes can be 3 digit numbers only.
- The codes you declare will overwrite the Koa Defaults.
- You can only use default Koa codes or the codes defined in the module. Any others will throw an error

## License

[MIT](LICENSE)
