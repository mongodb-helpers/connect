# @mongodb-helpers/connect

---

[![Build Status][travis-img]][travis-url]
[![Coverage Status][coverage-img]][coverage-url]
[![NPM version][npm-badge]][npm-url]
![Code Size][code-size-badge]
[![License][license-badge]][license-url]

<!-- ***************** -->

[travis-img]: https://travis-ci.com/mongodb-helpers/connect.svg?branch=master
[travis-url]: https://travis-ci.com/mongodb-helpers/connect
[coverage-img]: https://coveralls.io/repos/github/mongodb-helpers/connect/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/mongodb-helpers/connect?branch=master
[npm-badge]: https://img.shields.io/npm/v/@mongodb-helpers/connect.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@mongodb-helpers/connect
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg?style=flat
[license-url]: https://github.com/mongodb-helpers/connect/blob/master/LICENSE
[code-size-badge]: https://img.shields.io/github/languages/code-size/mongodb-helpers/connect
[pr-welcoming-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat

<!-- ***************** -->

### Don't repeat yourself when you want to connect to mongodb 🧚🏻‍♂️.

## `Installation`

```bash
# npm
$ npm install @mongodb-helpers/connect mongodb
# yarn
$ yarn add @mongodb-helpers/connect mongodb
```

When use mongoose should you also add `mongoose`

## `Usage`

This is a practical example of how to use.

```typescript
import { connect, withMongoose } from "@mongodb-helpers/connect";

const connection = await connect({ url: process.env.MONGODB_URL });
// connection.db : database instance
// connection.client: mongodb client instance
// connection.onClose: helper function to close connection

// withMongoose take mongodb client instance as param
withMongoose(connection.client);
```

#### License

---

[MIT](LICENSE) &copy; [Imed Jaberi](https://github.com/3imed-jaberi)
