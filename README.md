# Puff ✨

[![Travis (.org)](https://img.shields.io/travis/zypeh/puff.svg?style=flat-square)](https://travis-ci.org/zypeh/puff)

Puff the magical compiler.

### Status

**Idea stage.** This is an experimental codebase written by a type theory
new-comer, functional programming novice and also a daytime developer.
So some of the part will looks cryptic and the quality of code will not be
promised.

## Docs

- [Contributing](#contributing)
  - [First time setup](#first-time-setup)
  - [Running the app locally](#running-the-app-locally)

## Contributing
**We heartily welcome any and all contributions**

### First time setup

The first step to running puff locally is downloading the code by cloning the repository:

```sh
git clone git@github.com:zypeh/puff.git
```

If you get `Permission denied` error using `ssh` refer [here](https://help.github.com/articles/error-permission-denied-publickey/)
or use `https` link as a fallback.

```sh
git clone https://github.com/zypeh/puff.git
```

#### Installation

Puff has four big installation steps:

1. **Install yarn**: We use [yarn](https://yarnpkg.com) to handle our JavaScript dependencies. (plain `npm` doesn't work due to our monorepo setup) See [the yarn documentation](https://yarnpkg.com/en/docs/install) for instructions on installing it.

Once you have yarn installed locally its time to install the JavaScript dependencies.

```sh
yarn
```

You've now finished installing everything! Let's migrate the database and you'll be ready to go :100:

### Running the app locally

#### Build the project

To build the project, run

```
yarn build
```

#### Run the project

To run the project, run

```
DEBUG=* node ./built/local/compiler/index.js
```

## License

BSD 3-Clause, see the [LICENSE](./LICENSE) file.
