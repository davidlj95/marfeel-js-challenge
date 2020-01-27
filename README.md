# [Marfeel][marfeel] JS Challenge
This repository solves a [challenge proposed by the HR recruitment team](challenge.pdf) at [Marfeel][marfeel]

## Live version
There's a live version of the app at

https://davidlj95.com/marfeel-js-challenge

## Usage

### 1. Dependencies
To start developing, first install the dependencies

```sh
yarn install
```

Or, if you prefer `npm`:

```sh
npm install
```

### 2. Launching the server
Run the `start` run script in order to start a web server and serve the main `index.html` with all JS bundled thanks to rollup.

```sh
npm start
```

You have a local instance of the app at

http://localhost:3000

> `Browser-sync` will take care to update the browser whenever you change any source file. 
>
> `Rollup` will also bundle all the JS code whenever any JS source file changes.
>


### 3. Tests
There are unit tests with `Karma` and `Jasmine`, to launch them use

```sh 
npm test
```

A browser window will open and load all tests there.

[marfeel]: https://www.marfeel.com/
