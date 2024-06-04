# ts-trim-request
Typescript Express middleware to trim all incoming request object

## Installation
```
npm install ts-trim-request
```

## Usage

`ts-trim-request` is a fork of `trim-request`. It implements typescript declaration files and can trim deeper the arrays and sub-objects. It's very simple to use, just import the package and use one of its methods:

`trimRequest.all`  trim body, params and query objects

`trimRequest.body` trim only the body object

`trimRequest.param` trim the params object

`trimRequest.query` trim the query string object 

```javascript
import express from "express";
import trimRequest from "ts-trim-request";
const app: express.Application = express();

// For all routes
app.use(trimRequest.all);

// OR for a single route
app.post('/person', trimRequest.all, (req, res, next) => { 
    res.json(req.body);
});
```

If the client post:

```
{
    name: '  foo   ',
    age: 20,
    arr: ['     bar    ', '    foo         '],
    obj: {prop1: '    bar   ', prop2: '    foo   '}
}
```

The code above will return this object:

```
{
    name: 'foo',
    age: 20,
    arr: ['bar', 'foo'],
    obj: {prop1: 'bar', prop2: 'foo'}
}
```

## License

MIT License
